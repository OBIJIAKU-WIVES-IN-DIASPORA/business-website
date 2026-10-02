import type { Metadata } from "next";
import { Container, DonateBanner, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Impact",
  description: "How the foundation measures and reports its impact on widows, orphans, the elderly and the sick.",
  alternates: { canonical: "/impact" },
};

export default function Impact() {
  return (
    <>
      <PageHero title="Measuring what" accent="matters" intro="We are a newly registered foundation. We will publish real figures here as our work grows, never estimates." />
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How we report" title="Our reporting" accent="promise" />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Count what we do", "People supported, children sponsored, patients assisted, businesses started."],
              ["Show where money goes", "Regular summaries of income and spending by program."],
              ["Share real stories", "With consent, we will share how lives have changed."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-3xl bg-white p-6">
                <h3 className="text-brand-950">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
