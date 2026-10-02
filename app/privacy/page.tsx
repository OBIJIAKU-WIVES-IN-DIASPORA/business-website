import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Page() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="py-14"><Container className="max-w-3xl text-lg leading-8 text-zinc-700"><p>We collect only the information you give us through our forms (such as your name, email and phone number) and use it to reply to you, process your support, and keep you informed. We do not sell your data. Contact us to access or delete your information.</p><p className="mt-4 text-sm text-zinc-500">TODO: have this text reviewed by a legal adviser before launch.</p></Container></section>
    </>
  );
}
