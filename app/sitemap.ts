import type { MetadataRoute } from "next";
import { POSTS, PROGRAMS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/mission", "/programs", "/impact", "/donate", "/volunteer", "/news", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...PROGRAMS.map((p) => ({ url: `${SITE.url}/programs/${p.slug}`, priority: 0.6 })),
    ...POSTS.map((p) => ({ url: `${SITE.url}/news/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
