"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/site";
import Icon from "./Icon";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="rounded-md p-2 text-white"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-full border-b border-zinc-200 bg-white px-5 py-4 shadow-lg">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} aria-current={path === n.href || path.startsWith(`${n.href}/`) ? "page" : undefined} onClick={() => setOpen(false)} className="block rounded px-3 py-3 font-medium text-zinc-800 hover:bg-brand-50 aria-[current=page]:bg-brand-50 aria-[current=page]:text-brand-700">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
