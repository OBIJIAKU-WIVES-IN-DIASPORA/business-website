import type { Metadata } from "next";
import { CAUSES } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import DonateForm from "@/components/DonateForm";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give to support widows, orphans, the elderly and the sick in Nigeria. Choose a cause and give once or monthly.",
  alternates: { canonical: "/donate" },
};

export default async function Donate({ searchParams }: PageProps<"/donate">) {
  const sp = await searchParams;
  const cause = typeof sp.cause === "string" && CAUSES.some((c) => c.id === sp.cause) ? sp.cause : "all";
  const frequency = sp.frequency === "monthly" ? "monthly" : "once";
  return (
    <>
      <PageHero title="Your gift" accent="changes lives" intro="Choose the cause closest to your heart. Every contribution goes to the people we serve." />
      <section className="py-14 sm:py-20"><Container><DonateForm initialCause={cause} initialFrequency={frequency} /></Container></section>
    </>
  );
}
