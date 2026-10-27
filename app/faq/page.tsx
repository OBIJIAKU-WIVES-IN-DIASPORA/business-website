import type { Metadata } from "next";
import Link from "next/link";
import { FAQ } from "@/lib/faq";
import { faqLd, pageMetadata } from "@/lib/seo";
import { Container, DonateBanner, PageHero, Section } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers about our NGO in Nigeria: registration, who we help, our programs, how to donate from abroad, receipts and how to volunteer.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero title="Questions," accent="answered" intro="Everything people ask before giving, volunteering or asking for help." />
      <Section>
        <Container className="max-w-3xl">
          <dl className="divide-y divide-brand-950/15 border-y border-brand-950/15">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <dt><h2 className="text-xl">{f.q}</h2></dt>
                <dd className="mt-2 leading-7 text-zinc-700">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-zinc-700">
            Still have a question? <Link href="/contact" className="text-brand-700 underline">Contact us</Link>, or read about our <Link href="/transparency" className="text-brand-700 underline">registration and transparency</Link>.
          </p>
        </Container>
      </Section>
      <DonateBanner />
    </>
  );
}
