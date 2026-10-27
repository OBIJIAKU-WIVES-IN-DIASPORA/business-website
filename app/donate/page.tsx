import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CAUSES } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = pageMetadata({
  title: 'Donate to a Charity in Nigeria',
  description: 'Give securely to a registered Nigerian NGO in NGN, USD, GBP or EUR. Choose a cause, pay by card or transfer, and get an instant emailed receipt.',
  path: '/donate',
});

export default async function Donate({ searchParams }: PageProps<"/donate">) {
  const sp = await searchParams;
  const cause = typeof sp.cause === "string" && CAUSES.some((c) => c.id === sp.cause) ? sp.cause : "all";
  return (
    <>
      <PageHero image="family" title="Your gift" accent="changes lives" intro="Choose the cause closest to your heart. Every contribution goes to the people we serve." />
      <section className="py-14 sm:py-20"><Container><DonateForm initialCause={cause} /></Container></section>
    </>
  );
}
