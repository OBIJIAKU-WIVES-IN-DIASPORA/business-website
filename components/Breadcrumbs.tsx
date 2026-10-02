"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import JsonLd from "./JsonLd";
import { NAV, POSTS, PROGRAMS, SITE } from "@/lib/site";

const LABELS: Record<string, string> = {
  ...Object.fromEntries(NAV.map((n) => [n.href.slice(1), n.label])),
  ...Object.fromEntries(PROGRAMS.map((p) => [p.slug, p.title])),
  ...Object.fromEntries(POSTS.map((p) => [p.slug, p.title])),
  donate: "Donate", privacy: "Privacy Policy", terms: "Terms of Use",
};

export default function Breadcrumbs() {
  const segments = usePathname().split("/").filter(Boolean);
  const crumbs = [
    { name: "Home", href: "/" },
    ...segments.map((s, i) => ({
      name: LABELS[s] ?? s.replace(/-/g, " "),
      href: `/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE.url}${c.href === "/" ? "" : c.href}` })),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-5 max-w-full">
        <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/70">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="max-w-[18rem] truncate font-medium text-white">{c.name}</span>
                ) : (
                  <Link href={c.href} className="hover:text-white hover:underline">{c.name}</Link>
                )}
                {!last && <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
