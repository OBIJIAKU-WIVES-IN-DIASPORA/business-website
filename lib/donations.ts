import { randomBytes } from "node:crypto";
import { donations, nextReceiptNumber, type Donation } from "./db";
import { verifyByReference } from "./flutterwave";
import { sendReceipt } from "./mail";

export const newTxRef = () => `OBJ-${Date.now()}-${randomBytes(4).toString("hex")}`;

export type FinalizeResult =
  | { state: "successful"; donation: Donation }
  | { state: "pending" | "failed" | "cancelled" | "not_found" | "flagged"; donation?: Donation };

// Idempotent: safe to call from the redirect page, the webhook, or both, in any order.
// Only the call that flips pending -> successful assigns the receipt number.
export async function finalizeDonation(txRef: string): Promise<FinalizeResult> {
  const col = await donations();
  const existing = await col.findOne({ txRef });
  if (!existing) return { state: "not_found" };

  if (existing.status === "successful") {
    await emailReceiptOnce(existing);
    return { state: "successful", donation: (await col.findOne({ txRef })) ?? existing };
  }
  if (existing.status === "flagged") return { state: "flagged", donation: existing };

  const tx = await verifyByReference(txRef);
  if (!tx || tx.status === "pending") return { state: "pending", donation: existing };
  if (tx.status !== "successful") {
    await col.updateOne({ txRef, status: "pending" }, { $set: { status: "failed" } });
    return { state: "failed", donation: existing };
  }

  // Paid, but is it the right amount in the right currency? If not, hold it for a human to review.
  const paidMinor = Math.round(tx.amount * 100);
  if (tx.currency !== existing.currency || paidMinor < existing.amountMinor) {
    await col.updateOne({ txRef, status: "pending" }, { $set: { status: "flagged" } });
    console.error("[donation] amount/currency mismatch", { txRef, expected: existing.amountMinor, got: tx.amount, currency: tx.currency });
    return { state: "flagged", donation: existing };
  }

  const won = await col.findOneAndUpdate(
    { txRef, status: { $in: ["pending", "failed", "cancelled"] } },
    { $set: { status: "successful", paidAt: new Date(), flw: { transactionId: tx.id, flwRef: tx.flw_ref, paymentType: tx.payment_type, chargedAmountMinor: tx.charged_amount ? Math.round(tx.charged_amount * 100) : undefined } } },
    { returnDocument: "after" },
  );
  if (won) {
    const receiptNo = await nextReceiptNumber();
    await col.updateOne({ txRef }, { $set: { receiptNo } });
  }
  const done = (await col.findOne({ txRef }))!;
  await emailReceiptOnce(done);
  return { state: "successful", donation: done };
}

// Claim-then-send so two simultaneous callers never both email; retries after a failed send.
async function emailReceiptOnce(d: Donation) {
  if (d.emailSentAt || !d.receiptNo) return;
  const col = await donations();
  const stale = new Date(Date.now() - 5 * 60_000);
  const claimed = await col.findOneAndUpdate(
    { txRef: d.txRef, emailSentAt: { $exists: false }, $or: [{ emailClaimedAt: { $exists: false } }, { emailClaimedAt: { $lt: stale } }] },
    { $set: { emailClaimedAt: new Date() } },
    { returnDocument: "after" },
  );
  if (!claimed) return;
  try {
    await sendReceipt(claimed);
    await col.updateOne({ txRef: d.txRef }, { $set: { emailSentAt: new Date() }, $unset: { emailError: "", emailClaimedAt: "" } });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[donation] receipt email failed", d.txRef, msg);
    await col.updateOne({ txRef: d.txRef }, { $set: { emailError: msg }, $unset: { emailClaimedAt: "" } });
  }
}
