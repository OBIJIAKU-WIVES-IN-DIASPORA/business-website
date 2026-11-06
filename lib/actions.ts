"use server";

import { redirect } from "next/navigation";
import { CAUSES, SITE, donationsPaused } from "./site";
import { CURRENCIES, formatMoney, isCurrency } from "./currency";
import { isCountry } from "./countries";
import { randomInt } from "node:crypto";
import { donations } from "./db";
import { sendTransferInstructions } from "./mail";
import { newTxRef } from "./donations";
import { createPaymentLink } from "./flutterwave";

// Form handlers. They validate input on the server and return a message.
// TODO: connect to an email service (e.g. Resend) or database so submissions reach the foundation.
// Until then submissions are only logged on the server.

export type FormState = { ok: boolean; message: string; reference?: string; emailed?: boolean };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: FormDataEntryValue | null) => (typeof v === "string" ? v.trim() : "");

export async function submitContact(_: FormState, fd: FormData): Promise<FormState> {
  if (str(fd.get("website"))) return { ok: true, message: "Thank you." }; // honeypot
  const name = str(fd.get("name")), email = str(fd.get("email")), message = str(fd.get("message"));
  if (name.length < 2 || !emailRe.test(email) || message.length < 10 || message.length > 3000)
    return { ok: false, message: "Please enter your name, a valid email and a message of at least 10 characters." };
  console.log("[contact]", { name, email });
  return { ok: true, message: "Thank you. Your message has been received and we will reply soon." };
}

export async function submitVolunteer(_: FormState, fd: FormData): Promise<FormState> {
  if (str(fd.get("website"))) return { ok: true, message: "Thank you." };
  const name = str(fd.get("name")), email = str(fd.get("email")), phone = str(fd.get("phone")), interest = str(fd.get("interest"));
  if (name.length < 2 || !emailRe.test(email) || phone.length < 7 || !interest)
    return { ok: false, message: "Please complete your name, email, phone number and area of interest." };
  console.log("[volunteer]", { name, email, interest });
  return { ok: true, message: "Thank you for offering to volunteer! We will contact you soon." };
}

export async function startDonation(_: FormState, fd: FormData): Promise<FormState> {
  if (donationsPaused()) return { ok: false, message: "Thank you for wanting to give! Online donations are temporarily unavailable, but will be open again very shortly. Please try again soon." };
  if (str(fd.get("website"))) return { ok: true, message: "Thank you." }; // honeypot
  const name = str(fd.get("name")), email = str(fd.get("email")).toLowerCase(), phone = str(fd.get("phone"));
  const currency = str(fd.get("currency")), cause = str(fd.get("cause")) || "all", country = str(fd.get("country"));
  const amount = Math.round(Number(str(fd.get("amount"))) * 100) / 100;

  if (name.length < 2 || name.length > 100 || !emailRe.test(email) || email.length > 200)
    return { ok: false, message: "Please enter your full name and a valid email address. Your receipt is sent there." };
  if (!isCurrency(currency)) return { ok: false, message: "Please choose a currency." };
  if (!isCountry(country)) return { ok: false, message: "Please choose your country." };
  const min = CURRENCIES[currency].min;
  if (!Number.isFinite(amount) || amount < min || amount > 100_000_000)
    return { ok: false, message: `The minimum gift is ${formatMoney(min, currency)}.` };
  const causeDef = CAUSES.find((c) => c.id === cause);
  if (cause !== "all" && !causeDef) return { ok: false, message: "Please choose a cause." };

  const txRef = newTxRef();
  let link: string;
  try {
    const col = await donations();
    await col.insertOne({
      txRef, status: "pending", amountMinor: Math.round(amount * 100), currency,
      cause, causeLabel: causeDef?.label ?? "Where needed most",
      donor: { name, email, ...(phone ? { phone } : {}) }, country, createdAt: new Date(),
    });
    link = await createPaymentLink({
      txRef, amount, currency, redirectUrl: `${SITE.url}/donate/thank-you`,
      customer: { email, name, ...(phone ? { phonenumber: phone } : {}) },
      title: SITE.shortName, description: `Donation: ${causeDef?.label ?? "Where needed most"}`,
      meta: { cause, country },
    });
  } catch (e) {
    console.error("[donate] could not start payment", e);
    return { ok: false, message: "Sorry, we could not start your payment. Please try again in a moment, or contact us." };
  }
  redirect(link); // to Flutterwave's hosted, PCI-compliant checkout
}

// Bank-transfer gift: log the intention, give the donor a reference to quote, and email the right account details.
// The gift is "pending" until the foundation sees the money arrive.
const REF_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const newTransferRef = () => "TRF-" + Array.from({ length: 6 }, () => REF_CHARS[randomInt(REF_CHARS.length)]).join("");

export async function pledgeTransfer(_: FormState, fd: FormData): Promise<FormState> {
  if (str(fd.get("website"))) return { ok: true, message: "Thank you." }; // honeypot
  const email = str(fd.get("email")).toLowerCase(), name = str(fd.get("name")).slice(0, 100);
  const currency = str(fd.get("currency")), cause = str(fd.get("cause")) || "all";
  const amount = Math.round(Number(str(fd.get("amount"))) * 100) / 100;

  if (!emailRe.test(email) || email.length > 200) return { ok: false, message: "Please enter a valid email address. We send your transfer details and receipt there." };
  if (!isCurrency(currency)) return { ok: false, message: "Please choose a currency." };
  const min = CURRENCIES[currency].min;
  if (!Number.isFinite(amount) || amount < min || amount > 100_000_000) return { ok: false, message: `The minimum gift is ${formatMoney(min, currency)}.` };
  const causeDef = CAUSES.find((c) => c.id === cause);
  if (cause !== "all" && !causeDef) return { ok: false, message: "Please choose a cause." };

  try {
    const col = await donations();
    const recent = await col.countDocuments({ "donor.email": email, method: "bank-transfer", createdAt: { $gt: new Date(Date.now() - 3_600_000) } });
    if (recent >= 5) return { ok: false, message: "You have logged several gifts in the last hour. Please check your email, or try again a little later." };

    const donation = {
      txRef: newTransferRef(), status: "pending" as const, method: "bank-transfer" as const,
      amountMinor: Math.round(amount * 100), currency, cause, causeLabel: causeDef?.label ?? "Where needed most",
      donor: { name: name || "Friend", email }, country: "XX", createdAt: new Date(),
    };
    await col.insertOne(donation);
    let emailed = true;
    try { await sendTransferInstructions(donation); } catch (e) { emailed = false; console.error("[transfer] instructions email failed", donation.txRef, e); }
    return { ok: true, message: "", reference: donation.txRef, emailed };
  } catch (e) {
    console.error("[transfer] could not log gift", e);
    return { ok: false, message: "Sorry, something went wrong on our side. Your gift was not logged. Please try again, or use the account details shown and email us." };
  }
}
