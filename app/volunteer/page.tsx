import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Give your time and skills to support widows, orphans, the elderly and the sick. Sign up to volunteer with us.",
  alternates: { canonical: "/volunteer" },
};

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
          </div>
          <VolunteerForm />
        </Container>
      </section>
    </>
  );
}
