# Obijiaku Wives in Diaspora Care Foundation: website

Next.js 16 (App Router) + Tailwind CSS 4.

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Before launch (search for `TODO`)
- `lib/site.ts`: real domain (or set `NEXT_PUBLIC_SITE_URL`), bank details, social links.
- `lib/actions.ts`: forms only log on the server; connect an email service or database.
- Replace the `Visual` placeholders in `components/ui.tsx` with real photos (`next/image`, files in `public/images`).
- Add real news in `lib/site.ts` (`POSTS`) and real impact figures on `/impact`.
- Have the Privacy and Terms text reviewed by a legal adviser.

## Payments (Flutterwave + MongoDB + Resend)
Copy `.env.example` to `.env.local` and fill it in.

**Flow:** donate form -> pending record in MongoDB -> Flutterwave hosted checkout -> back to `/donate/thank-you`
and/or the webhook. Both call the same idempotent `finalizeDonation()` ([lib/donations.ts](lib/donations.ts)), which
re-verifies the payment with Flutterwave (amount + currency), marks it successful, issues a receipt number and emails the receipt once.

**Go-live checklist**
1. Flutterwave: use TEST keys first. Register the webhook `https://YOUR-DOMAIN/api/webhooks/flutterwave` and set its Secret hash to `FLW_SECRET_HASH`.
2. Resend: verify your sending domain, then set `RESEND_API_KEY` and `MAIL_FROM`.
3. Set `NEXT_PUBLIC_SITE_URL` to the live domain.

**Reporting API** (successful donations only; send `Authorization: Bearer $ADMIN_API_KEY`)
- `GET /api/donations`: history. Filters: `q` (name, email, receipt, reference), `country` (NG or Nigeria), `cause`, `currency`, `from`, `to` (YYYY-MM-DD, inclusive), `minAmount`, `maxAmount` (need `currency`). Paging: `page`, `limit` (max 100). Sort: `sort=date|amount`, `order=asc|desc`.
- `GET /api/donations/summary`: totals per currency (sum, count, average, largest), unique donors, and breakdowns by cause, country and month. Same filters.
