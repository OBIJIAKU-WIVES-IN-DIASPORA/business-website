import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/site";
import { Container, DonateBanner, PageHero, ProgramCard } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Programs",
  description: "Educational sponsorship, healthcare assistance, vocational skills, micro-business empowerment, widows' support, single parents empowerment and elderly care in Nigeria.",
  alternates: { canonical: "/programs" },
};

export default function Programs() {
  return (
    <>
      <PageHero title="How we" accent="help" intro="Seven programs working together to meet urgent needs and build lasting independence." />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => <ProgramCard key={p.slug} p={p} index={i} />)}
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
