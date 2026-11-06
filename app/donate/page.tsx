import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CAUSES, donationsPaused } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = pageMetadata({
  title: "Donate to a Charity in Nigeria",
  description: "Give to a registered Nigerian NGO in NGN, USD, GBP or EUR. Choose a cause and currency, see the right account, and get a receipt.",
  path: "/donate",
});

export default async function Donate({ searchParams }: PageProps<"/donate">) {
  const sp = await searchParams;
  const cause = typeof sp.cause === "string" && CAUSES.some((c) => c.id === sp.cause) ? sp.cause : "all";
  return (
    <>
      <PageHero image="family" title="Your gift" accent="changes lives" intro="Pick a cause, choose your currency and we will show you exactly where to send it." />
      <section className="py-14 sm:py-20"><Container><DonateForm initialCause={cause} cardEnabled={!donationsPaused()} /></Container></section>
    </>
  );
}
