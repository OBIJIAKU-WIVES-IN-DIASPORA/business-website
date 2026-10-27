import type { MetadataRoute } from "next";
import { POSTS, PROGRAMS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const top: [string, number][] = [["", 1], ["/donate", 0.9], ["/about", 0.9], ["/programs", 0.9], ["/transparency", 0.8], ["/faq", 0.8], ["/mission", 0.7], ["/impact", 0.7], ["/volunteer", 0.7], ["/news", 0.7], ["/contact", 0.6], ["/privacy", 0.2], ["/terms", 0.2]];
  return [
    ...top.map(([p, priority]) => ({ url: `${SITE.url}${p}`, lastModified: SITE.updated, changeFrequency: "monthly" as const, priority })),
    ...PROGRAMS.map((p) => ({ url: `${SITE.url}/programs/${p.slug}`, lastModified: SITE.updated, priority: 0.7 })),
    ...POSTS.map((p) => ({ url: `${SITE.url}/news/${p.slug}`, lastModified: p.date, priority: 0.6 })),
  ];
}
