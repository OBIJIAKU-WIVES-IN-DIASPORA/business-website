import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Latest news, updates and stories from the Obijiaku Wives in Diaspora Care Foundation.",
  alternates: { canonical: "/news" },
};

export default function News() {
  return (
    <>
      <PageHero title="News &" accent="updates" />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {POSTS.map((p) => (
            <article key={p.slug} className="rounded-3xl bg-white p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-brand-700">{p.category} · <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-GB", { dateStyle: "long" })}</time></p>
              <h2 className="card-title mt-2 text-brand-950"><Link href={`/news/${p.slug}`} className="hover:underline">{p.title}</Link></h2>
              <p className="mt-2 text-sm text-zinc-600">{p.excerpt}</p>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
