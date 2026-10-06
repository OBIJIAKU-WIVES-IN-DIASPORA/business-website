import type { Metadata } from "next";
import { Container, DonateBanner, PageHero, Section } from "@/components/ui";
import PhotoPanel from "@/components/PhotoPanel";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export const metadata: Metadata = {
  title: "Our Mission & Vision",
  description: "Our mission is to provide holistic humanitarian support to widows, orphans, the elderly and the sick, and help them build independent, dignified lives.",
  alternates: { canonical: "/mission" },
};

const MISSION_POINTS = [
  { icon: "education", text: "Keep children in school" },
  { icon: "health", text: "Make treatment reachable for the sick and elderly" },
  { icon: "business", text: "Turn skills into steady income" },
] as const;

const VISION_POINTS = [
  ["Nobody left behind", "Every widow, orphan, elderly or sick person is seen and supported."],
  ["Families with dignity", "Homes that can feed, school and care for their own."],
  ["Hope that lasts", "Help that grows into independence, year after year."],
];

const COMMITMENTS = [
  "Put the needs of beneficiaries first",
  "Use every donation for the purpose it was given",
  "Report openly on what we do",
  "Move people from relief toward independence",
];

export default function Mission() {
  return (
    <>
      <PageHero title="Our mission," accent="our promise" intro="What we do each day, and the future we are working toward." />

      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <PhotoPanel origin="62% 38%" zoom={1.7} label="Our mission">
              <p className="text-lg font-medium">Care, delivered with respect</p>
            </PhotoPanel>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-4 text-sm font-medium text-brand-700">Mission</p>
            <h2 className="text-brand-950">Holistic support, from urgent need to lasting independence</h2>
            <p className="lead mt-6 text-zinc-600">
              To provide holistic humanitarian support to widows, orphans, the elderly and the sick through education, healthcare, practical skills and small-business empowerment.
            </p>
            <ul className="mt-8 space-y-4">
              {MISSION_POINTS.map((m) => (
                <li key={m.text} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700"><Icon name={m.icon} className="h-5 w-5" /></span>
                  <span className="text-brand-950">{m.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="lg:order-2">
            <PhotoPanel origin="90% 22%" zoom={2.1} label="Our vision">
              <p className="text-lg font-medium">A brighter tomorrow for every family</p>
            </PhotoPanel>
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1">
            <p className="mb-4 text-sm font-medium text-brand-700">Vision</p>
            <h2 className="text-brand-950">A society where no one is left behind</h2>
            <p className="lead mt-6 text-zinc-600">
              A society where no widow, orphan, elderly or sick person is left behind, and where every family can live with dignity and hope.
            </p>
            <dl className="mt-8 divide-y divide-brand-950/15 border-y border-brand-950/15">
              {VISION_POINTS.map(([t, d]) => (
                <div key={t} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-medium text-brand-950">{t}</dt>
                  <dd className="text-[15px] leading-7 text-zinc-600">{d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      <section className="mx-3 mb-8 rounded-3xl bg-brand-950 text-white sm:mx-6">
        <Section>
          <Container>
            <Reveal className="mb-12 max-w-2xl">
              <p className="mb-4 text-sm font-medium text-brand-100">Our promise</p>
              <h2>What we commit to</h2>
            </Reveal>
            <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {COMMITMENTS.map((c, i) => (
                <Reveal as="li" key={c} delay={i * 0.1} className="bg-brand-950 p-7">
                  <span className="text-sm text-brand-100/60">0{i + 1}</span>
                  <p className="mt-10 text-lg font-medium leading-snug">{c}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      </section>

      <DonateBanner />
    </>
  );
}
