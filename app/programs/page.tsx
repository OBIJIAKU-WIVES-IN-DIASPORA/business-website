import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PROGRAMS } from "@/lib/site";
import { Container, DonateBanner, PageHero, ProgramCard } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: 'Charity Programs in Nigeria',
  description: 'Seven programs from a registered Nigerian NGO: education sponsorship, healthcare aid, skills training, micro-business, widows, single parents and elderly care.',
  path: '/programs',
});

export default function Programs() {
  return (
    <>
      <PageHero image="education-alt" title="How we" accent="help" intro="Seven programs working together to meet urgent needs and build lasting independence." />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => <ProgramCard key={p.slug} p={p} index={i} />)}
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
