import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { SITE, TRUSTEES } from "@/lib/site";
import { Container, DonateBanner, PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: 'About Our NGO in Owerri, Nigeria',
  description: 'Obijiaku Wives in Diaspora Care Foundation is a CAC-registered NGO in Owerri, Imo State, supporting widows, orphans, single parents, the elderly and the sick.',
  path: '/about',
});

export default function About() {
  return (
    <>
      <PageHero title="Care that" accent="reaches home" intro="A registered non-governmental organization (NGO) in Nigeria, giving holistic support to the people most easily overlooked." />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-5 text-lg leading-8 text-zinc-700 lg:col-span-2">
            <p>{SITE.name} is a registered non-governmental organization (NGO) based in {SITE.address.city}, {SITE.address.state}, {SITE.address.country}. It is registered with the Corporate Affairs Commission (CAC) as an Incorporated Trustee, IT No. {SITE.itNumber}, since {SITE.registered}. You may also see it called the Obijiaku Wives in Diaspora Foundation.</p>
            <p>We provide holistic humanitarian support to widows, orphans, single parents, the elderly and the sick. We do this through <Link href="/programs/educational-sponsorship" className="text-brand-700 underline">educational sponsorships</Link>, <Link href="/programs/healthcare-assistance" className="text-brand-700 underline">critical healthcare assistance</Link>, <Link href="/programs/vocational-skills" className="text-brand-700 underline">vocational skill acquisition</Link> and <Link href="/programs/micro-business-empowerment" className="text-brand-700 underline">micro-business empowerment</Link>.</p>
            <p>Our approach is simple: meet urgent needs with compassion, then help people build the skills and income to secure their own future.</p>
            <h2 className="pt-4 text-brand-950">Where we work</h2>
            <p>Our registered office is in {SITE.address.city}, {SITE.address.state}, and we also keep a contact address in Lagos. Our name reflects our roots: the foundation was started by wives in the diaspora who wanted to care for people back home. Supporters in Nigeria, the UK, the US, Canada and beyond can <Link href="/donate" className="text-brand-700 underline">give in naira, dollars, pounds or euros</Link>.</p>
            <p>Want proof before you give? Read our <Link href="/transparency" className="text-brand-700 underline">registration and transparency page</Link> and our <Link href="/faq" className="text-brand-700 underline">frequently asked questions</Link>.</p>
          </div>
          <aside className="h-fit rounded-xl bg-sand p-6 text-sm">
            <h3 className="text-brand-950">Registration details</h3>
            <dl className="mt-4 space-y-3 text-zinc-700">
              <div><dt className="font-medium">Legal name</dt><dd>{SITE.name}</dd></div>
              <div><dt className="font-medium">Type</dt><dd>Incorporated Trustee</dd></div>
              <div><dt className="font-medium">CAC IT number</dt><dd>{SITE.itNumber}</dd></div>
              <div><dt className="font-medium">Registered office</dt><dd>{SITE.address.street}, {SITE.address.city}, {SITE.address.state}</dd></div>
            </dl>
          </aside>
        </Container>
      </section>
      <section className="bg-sand py-16">
        <Container>
          <h2 className="text-brand-950">Our trustees</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {TRUSTEES.map((t) => (
              <li key={t.name} className="flex items-center gap-4 rounded-3xl bg-white p-5">
                <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-brand-100">
                  <Image src={t.photo} alt={`${t.name}, ${t.role}`} fill sizes="64px" className="object-cover" style={{ objectPosition: t.position }} />
                </span>
                <div>
                  <p className="font-medium text-brand-950">{t.name}</p>
                  <p className="text-sm text-zinc-600">{t.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
