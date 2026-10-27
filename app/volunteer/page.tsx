import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHero } from "@/components/ui";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata: Metadata = pageMetadata({
  title: 'Volunteer with an NGO in Nigeria',
  description: 'Volunteer your time and skills with a registered NGO in Owerri, Nigeria. Diaspora volunteers welcome. Sign up in a minute.',
  path: '/volunteer',
});

export default function Volunteer() {
  return (
    <>
      <PageHero title="Give your time," accent="change a life" intro="Whatever your skills, there is a way for you to help." />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4 text-lg leading-8 text-zinc-700">
            <h2 className="text-brand-950">Why volunteer?</h2>
            <p>Volunteers help us reach more people. You can teach and mentor, support healthcare outreach, train in a skill, help with fundraising, or lend your voice online.</p>
            <p>Volunteers in the diaspora are most welcome. Fill in the form and we will be in touch.</p>
            <h2 className="pt-4 text-brand-950">Ways you can help</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>Teaching and mentoring children and young people</li>
              <li>Healthcare support and outreach</li>
              <li>Skills training for widows, single parents and others</li>
              <li>Fundraising and events</li>
              <li>Media, photography and communications</li>
              <li>Administration and organising</li>
            </ul>
            <p className="text-base">Not ready to volunteer? You can also <Link href="/donate" className="text-brand-700 underline">donate</Link> or read <Link href="/about" className="text-brand-700 underline">about our NGO</Link>.</p>
          </div>
          <VolunteerForm />
        </Container>
      </section>
    </>
  );
}
