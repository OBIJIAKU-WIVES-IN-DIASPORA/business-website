import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CAUSES, SITE, donationsPaused } from "@/lib/site";
import { Button, Container, PageHero } from "@/components/ui";
import DonateForm from "@/components/DonateForm";

const base: Metadata = pageMetadata({
  title: 'Donate to a Charity in Nigeria',
  description: 'Give securely to a registered Nigerian NGO in NGN, USD, GBP or EUR. Choose a cause, pay by card or transfer, and get an instant emailed receipt.',
  path: '/donate',
});
// While donations are paused the page is a notice, so keep it out of search results.
export function generateMetadata(): Metadata {
  return donationsPaused() ? { ...base, robots: { index: false, follow: true } } : base;
}

export default async function Donate({ searchParams }: PageProps<"/donate">) {
  if (donationsPaused()) {
    return (
      <>
        <PageHero image="family" title="Thank you for wanting to give," accent="we'll be ready shortly" intro="Your kindness means more than we can say." />
        <section className="py-14 sm:py-20">
          <Container className="max-w-2xl">
            <div role="status" className="rounded-3xl bg-white p-8 text-center sm:p-12">
              <p aria-hidden className="heartbeat text-6xl">💚</p>
              <h2 className="mt-5 text-brand-950">Thank you from all of us</h2>
              <p className="mt-4 leading-7 text-zinc-700">We are so grateful that you want to support widows, orphans, single parents, the elderly and the sick. Our donation page is having a small technical issue because of a delay with our payment provider, and we are working to fix it. It will be open again very shortly.</p>
              <p className="mt-4 leading-7 text-zinc-700">Please come back soon. We would love to receive your gift, and we are sorry to keep you waiting.</p>
              <p className="mt-4 leading-7 text-zinc-700">
                If you would like to give right away, please email <a className="text-brand-700 underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a className="text-brand-700 underline" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>, and we will gladly help you.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button href="/">Back to home</Button>
                <Button href="/volunteer" variant="outline">Give your time instead</Button>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  }
  const sp = await searchParams;
  const cause = typeof sp.cause === "string" && CAUSES.some((c) => c.id === sp.cause) ? sp.cause : "all";
  return (
    <>
      <PageHero image="family" title="Your gift" accent="changes lives" intro="Choose the cause closest to your heart. Every contribution goes to the people we serve." />
      <section className="py-14 sm:py-20"><Container><DonateForm initialCause={cause} /></Container></section>
    </>
  );
}
