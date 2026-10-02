import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Care for widows, orphans, the elderly & the sick`, template: `%s | ${SITE.shortName}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Nigeria charity", "NGO in Nigeria", "widows support", "orphans education sponsorship",
    "healthcare assistance", "skill acquisition", "donate to charity Nigeria", "Owerri Imo State NGO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: SITE.name, title: SITE.name, description: SITE.description,
    url: "/", locale: "en_NG",
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b3d22" };

const orgLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phoneHref,
  identifier: `CAC IT No. ${SITE.itNumber}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    addressCountry: "NG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <JsonLd data={orgLd} />
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
