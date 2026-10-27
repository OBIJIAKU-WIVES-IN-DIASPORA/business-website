import Link from "next/link";
import { NAV, PROGRAMS, SITE } from "@/lib/site";
import { Container } from "./ui";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo className="h-16" />
          <p className="mt-3 text-sm leading-6">{SITE.tagline}</p>
          <p className="mt-4 text-xs text-brand-100/70">Registered Incorporated Trustee, CAC IT No. {SITE.itNumber}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-white">Quick links</h2>
          <ul className="mt-3 text-sm">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="inline-block py-1.5 hover:text-white">{n.label}</Link></li>)}
            <li><Link href="/donate" className="inline-block py-1.5 hover:text-white">Donate</Link></li>
            <li><Link href="/transparency" className="inline-block py-1.5 hover:text-white">Registration &amp; transparency</Link></li>
            <li><Link href="/faq" className="inline-block py-1.5 hover:text-white">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-white">Our programs</h2>
          <ul className="mt-3 text-sm">
            {PROGRAMS.map((p) => <li key={p.slug}><Link href={`/programs/${p.slug}`} className="inline-block py-1.5 hover:text-white">{p.title}</Link></li>)}
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-sm font-medium uppercase tracking-wider text-white">Contact</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{SITE.address.street}, {SITE.address.city}, {SITE.address.state}, {SITE.address.country}</p>
            <p><a href={`mailto:${SITE.email}`} className="inline-block py-1 hover:text-white">{SITE.email}</a></p>
            <p><a href={`tel:${SITE.phoneHref}`} className="inline-block py-1 hover:text-white">{SITE.phone}</a></p>
          </address>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="flex gap-5"><Link href="/privacy" className="inline-block py-1.5 hover:text-white">Privacy</Link><Link href="/terms" className="inline-block py-1.5 hover:text-white">Terms</Link></p>
        </Container>
      </div>
    </footer>
  );
}
