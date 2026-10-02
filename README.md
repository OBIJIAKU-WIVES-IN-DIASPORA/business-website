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
