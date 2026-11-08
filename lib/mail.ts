import { optionalEnv } from "./env";
import { BANK, SITE } from "./site";
import { formatMoney, isCurrency } from "./currency";
import { countryName } from "./countries";
import type { Donation } from "./db";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function receiptContent(d: Donation) {
  const amount = formatMoney(d.amountMinor / 100, d.currency);
  const date = (d.paidAt ?? new Date()).toLocaleDateString("en-GB", { dateStyle: "long" });
  const rows: [string, string][] = [
    ["Receipt no.", d.receiptNo ?? ""], ["Date", date], ["Donor", d.donor.name], ["Country", countryName(d.country)],
    ["Supporting", d.causeLabel], ["Payment reference", d.txRef], ["Amount", amount],
  ];
  const html = `<!doctype html><html><body style="margin:0;background:#f4f2e8;font-family:Arial,Helvetica,sans-serif;color:#17261c">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#1f4a31;color:#fff;padding:28px 32px"><img src="${SITE.url}/brand/logo-white.png" alt="${esc(SITE.name)}" width="300" style="display:block;border:0;max-width:100%;height:auto"><div style="font-size:13px;opacity:.8;margin-top:12px">Donation receipt</div></td></tr>
<tr><td style="padding:32px">
<h1 style="font-size:24px;margin:0 0 12px;font-weight:600">Thank you, ${esc(d.donor.name.split(" ")[0])}.</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 24px;color:#3a4a40">Your gift of <strong>${esc(amount)}</strong> has been received. It will go toward <strong>${esc(d.causeLabel)}</strong>, helping widows, orphans, the elderly and the sick. We are deeply grateful.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-top:1px solid #e3e0d2">
${rows.map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e3e0d2;color:#6b756e">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #e3e0d2;text-align:right;font-weight:600">${esc(v)}</td></tr>`).join("")}
</table>
<p style="font-size:13px;line-height:1.6;color:#6b756e;margin:24px 0 0">Please keep this email as your receipt. Questions? Reply to this email or write to ${esc(SITE.email)}.</p>
</td></tr>
<tr><td style="background:#f4f2e8;padding:20px 32px;font-size:12px;color:#6b756e">${esc(SITE.name)}<br>Registered Incorporated Trustee, CAC IT No. ${esc(SITE.itNumber)}<br>${esc(SITE.address.street)}, ${esc(SITE.address.city)}, ${esc(SITE.address.state)}, ${esc(SITE.address.country)}</td></tr>
</table></td></tr></table></body></html>`;
  const text = `Thank you, ${d.donor.name}.\n\nYour gift of ${amount} has been received and will go toward ${d.causeLabel}.\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${SITE.name}\nCAC IT No. ${SITE.itNumber}`;
  return { html, text, subject: `Thank you for your donation. Receipt ${d.receiptNo}` };
}

// Sends through Resend's REST API. The Idempotency-Key means a retry can never email a donor twice.
export async function sendReceipt(d: Donation): Promise<void> {
  const key = optionalEnv("RESEND_API_KEY");
  const from = optionalEnv("MAIL_FROM");
  if (!key || !from) throw new Error("Email is not configured (RESEND_API_KEY / MAIL_FROM).");
  const { html, text, subject } = receiptContent(d);
  const notify = optionalEnv("NOTIFY_EMAIL");
  const res = await fetch(optionalEnv("RESEND_API_URL") ?? "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `receipt-${d.receiptNo}` },
    body: JSON.stringify({ from, to: [d.donor.email], ...(notify ? { bcc: [notify] } : {}), reply_to: SITE.email, subject, html, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

// Sent right after a donor logs a bank-transfer gift: the exact account for their currency and the reference to quote.
export function transferEmail(d: Donation) {
  const cur = isCurrency(d.currency) ? d.currency : "NGN";
  const amount = formatMoney(d.amountMinor / 100, d.currency);
  const foreign = cur !== "NGN";
  const rows: [string, string][] = [
    ["Bank", BANK.name], ["Account name", BANK.accountName], [`Account number (${cur})`, BANK.accounts[cur]],
    ["Sort code", BANK.sortCode], ...(foreign ? [["SWIFT code", BANK.swift] as [string, string]] : []), ["Bank address", BANK.address],
    ["Amount to send", amount], ["Payment reference", d.txRef],
  ];
  const first = d.donor.name && d.donor.name !== "Friend" ? d.donor.name.split(" ")[0] : "friend";
  const html = `<!doctype html><html><body style="margin:0;background:#f4f2e8;font-family:Arial,Helvetica,sans-serif;color:#17261c">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#1f4a31;color:#fff;padding:28px 32px"><img src="${SITE.url}/brand/logo-white.png" alt="${esc(SITE.name)}" width="300" style="display:block;border:0;max-width:100%;height:auto"><div style="font-size:13px;opacity:.8;margin-top:12px">Bank transfer details</div></td></tr>
<tr><td style="padding:32px">
<h1 style="font-size:24px;margin:0 0 12px;font-weight:600">Thank you, ${esc(first)} 💚</h1>
<p style="font-size:15px;line-height:1.6;margin:0 0 20px;color:#3a4a40">We are so grateful for your gift of <strong>${esc(amount)}</strong> toward <strong>${esc(d.causeLabel)}</strong>. Here is where to send it.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-top:1px solid #e3e0d2">
${rows.map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e3e0d2;color:#6b756e">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #e3e0d2;text-align:right;font-weight:600">${esc(v)}</td></tr>`).join("")}
</table>
<p style="font-size:14px;line-height:1.6;margin:20px 0 0"><strong>Please put your payment reference (${esc(d.txRef)}) in the transfer narration</strong> so we can match your gift. When it arrives we will email your receipt.</p>
<p style="font-size:13px;line-height:1.6;color:#6b756e;margin:16px 0 0">Questions? Reply to this email or write to ${esc(SITE.email)}. Please only use the account details above, which match our website.</p>
</td></tr>
<tr><td style="background:#f4f2e8;padding:20px 32px;font-size:12px;color:#6b756e">${esc(SITE.name)}<br>Registered Incorporated Trustee, CAC IT No. ${esc(SITE.itNumber)}</td></tr>
</table></td></tr></table></body></html>`;
  const text = `Thank you, ${first}!\n\nWe are grateful for your gift of ${amount} toward ${d.causeLabel}. Please send it to:\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nPut your payment reference (${d.txRef}) in the transfer narration. We will email your receipt when it arrives.\n\n${SITE.name}\nCAC IT No. ${SITE.itNumber}`;
  return { html, text, subject: `Your bank transfer details. Reference ${d.txRef}` };
}

export async function sendTransferInstructions(d: Donation): Promise<void> {
  const key = optionalEnv("RESEND_API_KEY"), from = optionalEnv("MAIL_FROM");
  if (!key || !from) throw new Error("Email is not configured (RESEND_API_KEY / MAIL_FROM).");
  const { html, text, subject } = transferEmail(d);
  const notify = optionalEnv("NOTIFY_EMAIL");
  const res = await fetch(optionalEnv("RESEND_API_URL") ?? "https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "Idempotency-Key": `transfer-${d.txRef}` },
    body: JSON.stringify({ from, to: [d.donor.email], ...(notify ? { bcc: [notify] } : {}), reply_to: SITE.email, subject, html, text }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
}

// Generic helper for form notifications. Never throws; returns whether Resend accepted the message.
export async function sendMail(o: { to: string; subject: string; html: string; text: string; replyTo?: string; idempotencyKey?: string }): Promise<boolean> {
  const key = optionalEnv("RESEND_API_KEY"), from = optionalEnv("MAIL_FROM");
  if (!key || !from) { console.error("[mail] not configured (RESEND_API_KEY / MAIL_FROM)"); return false; }
  try {
    const res = await fetch(optionalEnv("RESEND_API_URL") ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...(o.idempotencyKey ? { "Idempotency-Key": o.idempotencyKey } : {}) },
      body: JSON.stringify({ from, to: [o.to], reply_to: o.replyTo ?? SITE.email, subject: o.subject, html: o.html, text: o.text }),
    });
    if (!res.ok) { console.error("[mail] Resend rejected the message:", res.status, (await res.text()).slice(0, 200)); return false; }
    return true;
  } catch (e) { console.error("[mail] send failed:", e instanceof Error ? e.message : e); return false; }
}

const shell = (title: string, inner: string) => `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;color:#17261c"><h2 style="margin:0 0 16px">${esc(title)}</h2>${inner}<p style="font-size:12px;color:#6b756e;margin-top:28px">${esc(SITE.name)} · CAC IT No. ${esc(SITE.itNumber)}</p></div>`;
const table = (rows: [string, string][]) => `<table style="width:100%;border-collapse:collapse;font-size:14px">${rows.map(([k, v]) => `<tr><td style="padding:8px 0;border-bottom:1px solid #e3e0d2;color:#6b756e;width:130px;vertical-align:top">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #e3e0d2;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}</table>`;

// 1) to the foundation, 2) a thank-you copy to the person who wrote.
export async function sendFormEmails(kind: "contact" | "volunteer", f: { name: string; email: string; fields: [string, string][] }) {
  const label = kind === "contact" ? "contact message" : "volunteer application";
  const rows: [string, string][] = [["Name", f.name], ["Email", f.email], ...f.fields];
  const team = await sendMail({
    to: optionalEnv("NOTIFY_EMAIL") ?? SITE.email, replyTo: f.email, subject: `New ${label} from ${f.name}`,
    html: shell(`New ${label}`, table(rows) + `<p style="font-size:13px;color:#6b756e">Reply to this email to answer ${esc(f.name)} directly.</p>`),
    text: `New ${label}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}`,
  });
  const first = f.name.split(" ")[0];
  const ack = await sendMail({
    to: f.email, subject: kind === "contact" ? "We have received your message" : "Thank you for offering to volunteer",
    html: shell(`Thank you, ${first} 💚`, `<p style="line-height:1.6">${kind === "contact" ? "We have received your message and will reply as soon as we can." : "We are so grateful that you want to volunteer. We have received your details and will be in touch soon."}</p><p style="line-height:1.6">If you need anything in the meantime, write to ${esc(SITE.email)}.</p>`),
    text: `Thank you, ${first}! We have received your ${label} and will be in touch soon. Questions? ${SITE.email}`,
  });
  return { team, ack };
}
