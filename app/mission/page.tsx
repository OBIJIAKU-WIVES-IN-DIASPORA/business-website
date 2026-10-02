import type { Metadata } from "next";
import { Container, DonateBanner, PageHero } from "@/components/ui";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Our Mission & Vision",
  description: "Our mission is to provide holistic humanitarian support to widows, orphans, the elderly and the sick, and help them build independent, dignified lives.",
  alternates: { canonical: "/mission" },
};

export default function Mission() {
  return (
    <>
      <PageHero title="Our mission," accent="our promise" />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-8">
            <h2 className="text-brand-950">Mission</h2>
            <p className="mt-4 leading-7 text-zinc-700">To provide holistic humanitarian support to widows, orphans, the elderly and the sick through education, healthcare, practical skills and small-business empowerment.</p>
          </div>
          <div className="rounded-3xl bg-white p-8">
            <h2 className="text-brand-950">Vision</h2>
            <p className="mt-4 leading-7 text-zinc-700">A society where no widow, orphan, elderly or sick person is left behind, and where every family can live with dignity and hope.</p>
          </div>
        </Container>
      </section>
      <section className="bg-sand py-16">
        <Container>
          <h2 className="text-brand-950">What we commit to</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {["Put the needs of beneficiaries first", "Use every donation for the purpose it was given", "Report openly on what we do", "Move people from relief toward independence"].map((c) => (
              <li key={c} className="flex gap-3 rounded-lg bg-white p-4"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />{c}</li>
            ))}
          </ul>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
