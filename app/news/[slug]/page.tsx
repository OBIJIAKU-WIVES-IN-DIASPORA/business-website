import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS, SITE } from "@/lib/site";
import { Container, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title, description: p.excerpt, alternates: { canonical: `/news/${p.slug}` },
    openGraph: { type: "article", publishedTime: p.date, title: p.title, description: p.excerpt },
  };
}

export default async function Post({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "NewsArticle", headline: p.title, datePublished: p.date, description: p.excerpt, author: { "@type": "Organization", name: SITE.name }, publisher: { "@type": "Organization", name: SITE.name } }} />
      <PageHero title={p.title} />
      <article className="py-14">
        <Container className="max-w-3xl space-y-5 text-lg leading-8 text-zinc-700">
          <time dateTime={p.date} className="text-sm text-zinc-500">{new Date(p.date).toLocaleDateString("en-GB", { dateStyle: "long" })}</time>
          {p.body.map((t) => <p key={t}>{t}</p>)}
        </Container>
      </article>
    </>
  );
}
