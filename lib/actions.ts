"use server";

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

export async function submitPledge(_: FormState, fd: FormData): Promise<FormState> {
  if (str(fd.get("website"))) return { ok: true, message: "Thank you." };
  const name = str(fd.get("name")), email = str(fd.get("email"));
  const amount = Number(str(fd.get("amount")));
  if (name.length < 2 || !emailRe.test(email) || !Number.isFinite(amount) || amount < 500 || amount > 1_000_000_000)
    return { ok: false, message: "Please enter your name, a valid email and an amount of at least ₦500." };
  console.log("[pledge]", { name, email, amount, cause: str(fd.get("cause")), frequency: str(fd.get("frequency")) });
  return { ok: true, message: "Thank you for your generosity! Please complete your gift using the payment details shown below." };
}
