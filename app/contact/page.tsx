import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE.name} in Owerri, Imo State, Nigeria by phone, email or message.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero title="Get in" accent="touch" />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <address className="space-y-6 text-base not-italic leading-7 text-zinc-700">
            <div><h3 className="text-brand-950">Registered office</h3><p>{SITE.address.street}, {SITE.address.city}, {SITE.address.state}, {SITE.address.country}</p></div>
            <div><h3 className="text-brand-950">Lagos contact address</h3><p>{SITE.lagosOffice}</p></div>
            <div><h3 className="text-brand-950">Email</h3><a className="text-brand-700 underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
            <div><h3 className="text-brand-950">Phone</h3><a className="text-brand-700 underline" href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></div>
          </address>
          <ContactForm />
        </Container>
      </section>
    </>
  );
}
