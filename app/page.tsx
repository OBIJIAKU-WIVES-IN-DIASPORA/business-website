import type { Metadata } from "next";
import Link from "next/link";
import { POSTS, PROGRAMS, SITE, TRUSTEES } from "@/lib/site";
import { Button, Container, DonateBanner, ProgramCard, Section, SectionHeading, TextLink } from "@/components/ui";
import Icon from "@/components/Icon";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} | Care for widows, orphans, the elderly & the sick` },
  alternates: { canonical: "/" },
};

const STATS = [
  { value: "4", label: "Groups we serve" },
  { value: "6", label: "Care programs" },
  { value: "CAC", label: `Registered, IT No. ${SITE.itNumber}` },
  { value: "2026", label: "Year founded" },
];

const VALUES = [
  ["Compassion", "We serve every person with kindness and respect."],
  ["Dignity", "Help should build people up, never talk them down."],
  ["Transparency", "We account for every gift and report back openly."],
  ["Empowerment", "We aim for lasting independence, not dependence."],
];

const WAYS = [
  ["Give once", "A single gift directed to the cause you care about most.", "/donate"],
  ["Give monthly", "Regular giving lets us plan and help people for longer.", "/donate?frequency=monthly"],
  ["Give your time", "Volunteer your skills, your voice or your hands.", "/volunteer"],
];

const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { dateStyle: "long" });

export default function Home() {
  return (
    <>
      <Hero />

      <Section>
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="mb-4 text-sm font-medium text-brand-700">Who we are</p>
            <h2 className="text-brand-950">Practical help for people who are too often overlooked</h2>
            <p className="lead mt-6 text-zinc-600">
              {SITE.name} is a registered charity providing holistic humanitarian support to widows, orphans, the elderly and the sick, through educational sponsorships, healthcare assistance, vocational skills and micro-business empowerment.
            </p>
            <div className="mt-8"><Button href="/about">More about us</Button></div>
          </Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 self-center">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="border-t border-brand-950/15 pt-5">
                <dd className="text-5xl font-medium tracking-[-0.03em] text-brand-950">{s.value}</dd>
                <dt className="mt-2 text-sm text-zinc-600">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading
            eyebrow="Our programs"
            title="Six ways we help,"
            accent="one aim: independence"
            intro="From school fees to start-up support, each program meets an urgent need and builds toward a steadier future."
            action={<TextLink href="/programs">All programs</TextLink>}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p, i) => <ProgramCard key={p.slug} p={p} index={i} />)}
          </div>
        </Container>
      </Section>

      <section className="mx-3 rounded-3xl bg-brand-950 text-white sm:mx-6">
        <Section>
          <Container>
            <SectionHeading light eyebrow="Our values" title="What guides" accent="everything we do" />
            <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 0.1} className="bg-brand-950 p-7">
                  <span className="text-sm text-brand-100/60">0{i + 1}</span>
                  <h3 className="mt-10">{t}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-brand-100">{d}</p>
                </Reveal>
              ))}
            </ol>
          </Container>
        </Section>
      </section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Our team" title="Led by" accent="our trustees" intro="The foundation is governed by its registered trustees." />
          <div className="grid gap-4 sm:grid-cols-2">
            {TRUSTEES.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
              <div className="flex items-center gap-5 rounded-3xl bg-white p-7 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-100 text-lg font-medium text-brand-700">{t.initials}</span>
                <div>
                  <h3 className="text-brand-950">{t.name}</h3>
                  <p className="mt-1 text-[15px] text-zinc-600">{t.role}</p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading eyebrow="Ways to give" title="Choose how you" accent="make a difference" />
          <div className="grid gap-4 md:grid-cols-3">
            {WAYS.map(([t, d, h], i) => (
              <Reveal key={t} delay={i * 0.12} className="h-full">
              <Link href={h}
                className={`group flex h-full min-h-64 flex-col justify-between rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 ${i === 0 ? "bg-brand-700 text-white hover:bg-brand-900" : "bg-white hover:bg-brand-50"}`}>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${i === 0 ? "bg-white/15" : "bg-brand-50 text-brand-700"}`}>
                  <Icon name="arrow" className="h-4 w-4 -rotate-45 transition-transform group-hover:rotate-0" />
                </span>
                <div>
                  <h3 className={i === 0 ? "" : "text-brand-950"}>{t}</h3>
                  <p className={`mt-3 text-[15px] leading-7 ${i === 0 ? "text-brand-100" : "text-zinc-600"}`}>{d}</p>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionHeading eyebrow="News" title="Latest" accent="updates" action={<TextLink href="/news">All news</TextLink>} />
          <ul className="border-t border-brand-950/15">
            {POSTS.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 0.1} className="border-b border-brand-950/15">
                <Link href={`/news/${p.slug}`} className="group grid gap-2 py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-8">
                  <time dateTime={p.date} className="text-sm text-zinc-500">{fmt(p.date)}</time>
                  <div>
                    <h3 className="text-brand-950">{p.title}</h3>
                    <p className="mt-1 text-[15px] text-zinc-600">{p.excerpt}</p>
                  </div>
                  <Icon name="arrow" className="hidden h-5 w-5 text-brand-700 transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <DonateBanner />
    </>
  );
}
