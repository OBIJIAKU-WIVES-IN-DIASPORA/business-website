import type { Metadata } from "next";
import Link from "next/link";
import { SITE, TRUSTEES } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { Container, DonateBanner, PageHero, Section } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Registration & Transparency (CAC)",
  description: "Our CAC registration details (IT No. 9820301), registered address, trustees and how we handle donations. Verify us before you give.",
  path: "/transparency",
});

const rows: [string, string][] = [
  ["Legal name", SITE.name],
  ["Type", "Incorporated Trustee (Corporate Affairs Commission, Nigeria)"],
  ["CAC IT number", SITE.itNumber],
  ["Date of registration", SITE.registered],
  ["Status", "Active, per the CAC certified extract of 1 September 2026"],
  ["Registered office", `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}, ${SITE.address.country}`],
  ["Principal activity (as registered)", "Providing holistic humanitarian support to vulnerable demographics, including widows, orphans, the elderly and the sick, through educational sponsorships, critical healthcare assistance, vocational skill acquisition and micro-business empowerment."],
  ["First annual accounts due", "31 December 2026"],
];

export default function Transparency() {
  return (
    <>
      <PageHero title="Open about" accent="who we are" intro="We are a registered NGO in Nigeria. Here is how to check that for yourself." />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-brand-950">Registration details</h2>
            <dl className="mt-6 divide-y divide-brand-950/15 border-y border-brand-950/15">
              {rows.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <dt className="font-medium text-brand-950">{k}</dt>
                  <dd className="leading-7 text-zinc-700">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-zinc-700">These details come from our CAC certified status report. You can ask the CAC to confirm them using our IT number, or <Link href="/contact" className="text-brand-700 underline">ask us for a copy</Link>. Not sure what to look for? Read our guide on <Link href="/news/how-to-verify-a-registered-ngo-in-nigeria" className="text-brand-700 underline">how to check an NGO is registered</Link>.</p>
          </div>
          <div className="space-y-8">
            <div className="rounded-3xl bg-white p-6">
              <h3 className="text-brand-950">Trustees</h3>
              <ul className="mt-3 space-y-2 text-zinc-700">{TRUSTEES.map((t) => <li key={t.name}><span className="font-medium text-brand-950">{t.name}</span><br /><span className="text-sm">{t.role}</span></li>)}</ul>
            </div>
            <div className="rounded-3xl bg-white p-6">
              <h3 className="text-brand-950">How we handle donations</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700">
                <li>You choose the cause, or pick “where needed most”.</li>
                <li>Payments go through Flutterwave&apos;s secure checkout. We never see your card details.</li>
                <li>Every confirmed gift is recorded and you are emailed a receipt with a unique number.</li>
                <li>We will publish real figures on our <Link href="/impact" className="text-brand-700 underline">impact page</Link> as our work grows.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      <DonateBanner />
    </>
  );
}
