import { optionalEnv } from "./env";
import { SITE } from "./site";
import { formatMoney } from "./currency";
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
