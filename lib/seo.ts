import type { Metadata } from "next";
import { SITE } from "./site";

// One helper so every page gets a unique title, description, canonical URL and matching
// Open Graph / Twitter tags (a page that only sets `title` would otherwise inherit the home page's social text).
export function pageMetadata(o: { title: string; description: string; path: string; type?: "website" | "article"; publishedTime?: string; modifiedTime?: string }): Metadata {
  const social = `${o.title} | ${SITE.shortName}`;
  const images = [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT, type: "image/jpeg" }];
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: o.path },
    openGraph: {
      type: o.type ?? "website", url: o.path, siteName: SITE.name, locale: "en_NG", title: social, description: o.description, images,
      ...(o.publishedTime ? { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime ?? o.publishedTime, authors: [SITE.name] } : {}),
    },
    twitter: { card: "summary_large_image", title: social, description: o.description, images: [OG_IMAGE] },
  };
}

export const OG_IMAGE = "/images/og-hero.jpg";
export const OG_ALT = "Women of the community gathered together, supported by Obijiaku Wives in Diaspora Care Foundation";
const abs = (p: string) => `${SITE.url}${p}`;

// Organisation + website, linked by @id so search engines treat them as one entity.
export function siteGraph() {
  const org = {
    "@type": "NGO",
    "@id": abs("/#organization"),
    name: SITE.name,
    alternateName: ["Obijiaku Wives in Diaspora Foundation"],
    url: SITE.url,
    description: SITE.description,
    logo: { "@type": "ImageObject", url: abs("/brand/logo-green.png"), width: 1200, height: 369 },
    image: abs(OG_IMAGE),
    email: SITE.email,
    telephone: SITE.phoneHref,
    foundingDate: "2026-09-01",
    identifier: { "@type": "PropertyValue", name: "Corporate Affairs Commission (Nigeria) Incorporated Trustee number", value: SITE.itNumber },
    address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.city, addressRegion: SITE.address.state, addressCountry: "NG" },
    areaServed: { "@type": "Country", name: "Nigeria" },
    knowsAbout: ["Widows support", "Orphan education sponsorship", "Healthcare assistance", "Vocational skills training", "Micro-business empowerment", "Single parents empowerment", "Elderly care"],
    contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SITE.email, telephone: SITE.phoneHref, areaServed: ["NG", "GB", "US", "CA"], availableLanguage: "English" },
    potentialAction: { "@type": "DonateAction", name: "Donate", target: abs("/donate") },
    sameAs: Object.values(SITE.social).filter((u) => u.startsWith("http")),
  };
  const website = { "@type": "WebSite", "@id": abs("/#website"), url: SITE.url, name: SITE.name, alternateName: ["Obijiaku Wives in Diaspora Foundation"], inLanguage: "en-NG", publisher: { "@id": abs("/#organization") } };
  return { "@context": "https://schema.org", "@graph": [org, website] };
}

export const articleLd = (o: { title: string; description: string; path: string; date: string }) => ({
  "@context": "https://schema.org", "@type": "Article", headline: o.title, description: o.description, inLanguage: "en-NG",
  datePublished: o.date, dateModified: o.date, image: [abs(OG_IMAGE)], mainEntityOfPage: abs(o.path),
  author: { "@id": abs("/#organization") }, publisher: { "@id": abs("/#organization") },
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});
