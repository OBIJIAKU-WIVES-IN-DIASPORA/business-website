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

## Database user for the public site (MongoDB Atlas)
The public site connects with a limited user. Grant it, in Atlas > Database Access (custom role):
- `donations`: find, insert, **update** (card payments are marked successful with an update)
- `counters`: find, update (receipt numbers)
- `contactMessages`, `volunteers`: insert (optional; forms still email the team without it)

The site no longer tries to create indexes at runtime. Create them once with an admin user (mongosh):

    use foundation
    db.donations.createIndex({ txRef: 1 }, { unique: true })
    db.donations.createIndex({ receiptNo: 1 }, { unique: true, sparse: true })
    db.donations.createIndex({ status: 1, paidAt: -1 })
    db.donations.createIndex({ "donor.email": 1 })

## Email
Donation instructions and receipts, contact messages and volunteer applications are sent with Resend
(`RESEND_API_KEY`, `MAIL_FROM` on a verified domain). `NOTIFY_EMAIL` receives contact/volunteer messages and a copy of receipts.
Set all three in Vercel > Settings > Environment Variables for Production, then redeploy.
