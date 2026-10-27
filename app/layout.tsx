import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { OG_ALT, OG_IMAGE } from "@/lib/seo";
import { siteGraph } from "@/lib/seo";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | NGO in Nigeria`, template: "%s | Obijiaku Wives in Diaspora" },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website", siteName: SITE.name, title: SITE.name, description: SITE.description,
    url: "/", locale: "en_NG", images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_ALT, type: "image/jpeg" }],
  },
  twitter: { card: "summary_large_image", title: SITE.name, description: SITE.description, images: [OG_IMAGE] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Paste the token from Google Search Console / Bing Webmaster Tools into these env vars.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
  other: { "geo.region": "NG-IM", "geo.placename": "Owerri, Imo State, Nigeria" },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = { themeColor: "#0b3d22" };


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${inter.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <JsonLd data={siteGraph()} />
        <ScrollProgress />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
