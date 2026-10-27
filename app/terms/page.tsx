import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description: 'Terms for using the Obijiaku Wives in Diaspora Care Foundation website and making donations.',
  path: '/terms',
});

export default function Page() {
  return (
    <>
      <PageHero title="Terms of Use" />
      <section className="py-14"><Container className="max-w-3xl text-lg leading-8 text-zinc-700"><p>Content on this site is provided for general information about our work. Donations are used for the cause selected or, where needed most, at the trustees&apos; discretion. By using this site you agree to use it lawfully.</p><p className="mt-4 text-sm text-zinc-500">TODO: have this text reviewed by a legal adviser before launch.</p></Container></section>
    </>
  );
}
