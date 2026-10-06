import { timingSafeEqual } from "node:crypto";
import { env } from "@/lib/env";
import { finalizeDonation } from "@/lib/donations";

// Flutterwave -> us. Set the same "Secret hash" in Dashboard > Settings > Webhooks as FLW_SECRET_HASH.
// The body is never trusted: we only read the tx_ref, then verify the payment with Flutterwave directly.
export async function POST(request: Request) {
  const sent = Buffer.from(request.headers.get("verif-hash") ?? "");
  const expected = Buffer.from(env("FLW_SECRET_HASH"));
  if (sent.length !== expected.length || !timingSafeEqual(sent, expected)) return new Response("Unauthorized", { status: 401 });

  const body = await request.json().catch(() => null);
  const txRef = body?.data?.tx_ref ?? body?.["event.data"]?.tx_ref;
  if (typeof txRef !== "string") return new Response("OK", { status: 200 }); // not a payment event we handle

  try {
    await finalizeDonation(txRef);
  } catch (e) {
    console.error("[webhook] finalize failed", txRef, e);
    return new Response("Retry", { status: 500 }); // Flutterwave will retry
  }
  return new Response("OK", { status: 200 });
}
