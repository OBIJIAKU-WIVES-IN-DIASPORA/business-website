import Link from "next/link";
import { NAV, PROGRAMS, SITE } from "@/lib/site";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-xl font-medium text-white">{SITE.shortName}</p>
          <p className="mt-3 text-sm leading-6">{SITE.tagline}</p>
          <p className="mt-4 text-xs text-brand-100/70">Registered Incorporated Trustee, CAC IT No. {SITE.itNumber}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-white">Quick links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>)}
            <li><Link href="/donate" className="hover:text-white">Donate</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-white">Our programs</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {PROGRAMS.map((p) => <li key={p.slug}><Link href={`/programs/${p.slug}`} className="hover:text-white">{p.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-white">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{SITE.address.street}, {SITE.address.city}, {SITE.address.state}, {SITE.address.country}</p>
            <p><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></p>
            <p><a href={`tel:${SITE.phoneHref}`} className="hover:text-white">{SITE.phone}</a></p>
          </address>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="flex gap-4"><Link href="/privacy" className="hover:text-white">Privacy</Link><Link href="/terms" className="hover:text-white">Terms</Link></p>
        </Container>
      </div>
    </footer>
  );
}
