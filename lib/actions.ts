"use server";

import { redirect } from "next/navigation";
import { CAUSES, SITE } from "./site";
import { CURRENCIES, formatMoney, isCurrency } from "./currency";
import { isCountry } from "./countries";
import { donations } from "./db";
import { newTxRef } from "./donations";
import { createPaymentLink } from "./flutterwave";

// Form handlers. They validate input on the server and return a message.
// TODO: connect to an email service (e.g. Resend) or database so submissions reach the foundation.
// Until then submissions are only logged on the server.

export type FormState = { ok: boolean; message: string };

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
