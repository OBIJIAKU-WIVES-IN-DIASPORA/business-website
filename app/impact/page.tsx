import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container, DonateBanner, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: 'Our Impact & Reporting',
  description: 'How Obijiaku Wives in Diaspora Care Foundation measures and reports its impact. Real figures only, published openly as our work grows.',
  path: '/impact',
});

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
      <section className="pb-16 sm:pb-20">
        <Container className="max-w-3xl space-y-5 text-lg leading-8 text-zinc-700">
          <h2 className="text-brand-950">What we will report</h2>
          <p>Obijiaku Wives in Diaspora Care Foundation is a new NGO, registered with the Corporate Affairs Commission in September 2026. Rather than show numbers we cannot yet back up, we will publish results here as the work happens.</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Children and young people whose school costs we have covered</li>
            <li>Patients we have helped to reach treatment and medication</li>
            <li>Widows, single parents and others who have completed skills training</li>
            <li>Small businesses that have been started, and how they are doing</li>
            <li>Older people who have received care and support</li>
          </ul>
          <p>Every figure will come from our own records. You can already see how we are registered and governed on our <Link href="/transparency" className="text-brand-700 underline">transparency page</Link>, and what each program involves on the <Link href="/programs" className="text-brand-700 underline">programs page</Link>.</p>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
