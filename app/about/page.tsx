import type { Metadata } from "next";
import { SITE, TRUSTEES } from "@/lib/site";
import { Container, DonateBanner, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name}, a CAC-registered Nigerian charity caring for widows, orphans, the elderly and the sick.`,
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero title="Care that" accent="reaches home" intro="A registered Nigerian charity founded to give holistic support to the most vulnerable among us." />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-5 text-lg leading-8 text-zinc-700 lg:col-span-2">
            <p>{SITE.name} is a registered Incorporated Trustee (CAC IT No. {SITE.itNumber}), registered on {SITE.registered}.</p>
            <p>We exist to provide holistic humanitarian support to vulnerable people, including widows, orphans, the elderly and the sick. We do this through educational sponsorships, critical healthcare assistance, vocational skill acquisition and micro-business empowerment.</p>
            <p>Our approach is simple: meet urgent needs with compassion, then help people build the skills and income to secure their own future.</p>
          </div>
          <aside className="h-fit rounded-xl bg-sand p-6 text-sm">
            <h3 className="text-brand-950">Registration details</h3>
            <dl className="mt-4 space-y-3 text-zinc-700">
              <div><dt className="font-medium">Legal name</dt><dd>{SITE.name}</dd></div>
              <div><dt className="font-medium">Type</dt><dd>Incorporated Trustee</dd></div>
              <div><dt className="font-medium">CAC IT number</dt><dd>{SITE.itNumber}</dd></div>
              <div><dt className="font-medium">Registered office</dt><dd>{SITE.address.street}, {SITE.address.city}, {SITE.address.state}</dd></div>
            </dl>
          </aside>
        </Container>
      </section>
      <section className="bg-sand py-16">
        <Container>
          <h2 className="text-brand-950">Our trustees</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {TRUSTEES.map((t) => (
              <li key={t.name} className="rounded-3xl bg-white p-5">
                <p className="font-medium text-brand-950">{t.name}</p>
                <p className="text-sm text-zinc-600">{t.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
