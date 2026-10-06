import Link from "next/link";
import Logo from "./Logo";
import HeaderShell from "./HeaderShell";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <HeaderShell>
          <div className="flex items-center gap-10 px-6 py-3 sm:px-8">
            <Logo className="h-11 sm:h-14" priority />
            <NavLinks/>
          </div>

          <div className="flex items-center gap-2 pr-4 sm:gap-4 sm:pr-6">
            <Link href="/contact" className="hidden cursor-pointer text-white/85 transition hover:text-white sm:block">Contact us</Link>
            <Link
              href="/donate"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-donate px-5 py-2.5 font-semibold text-brand-950 shadow-sm transition hover:bg-donate-dark"
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
