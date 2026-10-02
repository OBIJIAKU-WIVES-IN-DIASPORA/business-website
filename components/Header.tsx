import Link from "next/link";
import HeaderShell from "./HeaderShell";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <HeaderShell>
          <div className="flex items-center gap-10 px-6 py-4 sm:px-8">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M20 8a8 8 0 1 0-1.5 8" />
                <path d="M8 12a4 4 0 0 1 7-2.5M16 12a4 4 0 0 1-7 2.5" />
              </svg>
              Obijiaku Care
            </Link>
            <NavLinks/>
          </div>

          <div className="flex items-center gap-2 pr-4 sm:gap-4 sm:pr-6">
            <Link href="/contact" className="hidden text-white/85 transition hover:text-white sm:block">Contact us</Link>
            <Link
              href="/donate"
              className="flex items-center gap-2 rounded-full bg-donate px-5 py-2.5 font-semibold text-brand-950 shadow-sm transition hover:bg-donate-dark"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
                <path d="M12 9.5v3" />
              </svg>
              Donate
            </Link>
            <MobileMenu />
          </div>
        </HeaderShell>
  );
}
