"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/site";

export default function NavLinks() {
  const path = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
      {NAV.map((n) => {
        const active = path === n.href || path.startsWith(`${n.href}/`);
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`relative cursor-pointer py-1 transition ${active ? "font-medium text-white" : "text-white/75 hover:text-white"}`}
          >
            {n.label}
            {active && <span className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-donate" />}
          </Link>
        );
      })}
    </nav>
  );
}
