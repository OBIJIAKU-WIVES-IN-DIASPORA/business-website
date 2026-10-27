import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS } from "@/lib/site";
import { articleLd, pageMetadata } from "@/lib/seo";
import { Container, PageHero } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.excerpt, path: `/news/${p.slug}`, type: "article", publishedTime: p.date });
}

export default async function Post({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <JsonLd data={articleLd({ title: p.title, description: p.excerpt, path: `/news/${p.slug}`, date: p.date })} />
      <PageHero title={p.title} />
      <article className="py-14">
        <Container className="max-w-3xl space-y-5 text-lg leading-8 text-zinc-700">
          <time dateTime={p.date} className="text-sm text-zinc-500">{new Date(p.date).toLocaleDateString("en-GB", { dateStyle: "long" })}</time>
          {p.body.map((t) => <p key={t}>{t}</p>)}
          <p className="pt-4 text-base">
            Learn more about our <Link href="/programs" className="text-brand-700 underline">programs</Link>, read about our <Link href="/transparency" className="text-brand-700 underline">registration and transparency</Link>, or <Link href="/donate" className="text-brand-700 underline">make a donation</Link>.
          </p>
          <div className="border-t border-brand-950/15 pt-6">
            <h2 className="mb-3 text-xl">Keep reading</h2>
            <ul className="space-y-2 text-base">
              {POSTS.filter((x) => x.slug !== p.slug).slice(0, 3).map((x) => <li key={x.slug}><Link href={`/news/${x.slug}`} className="text-brand-700 underline">{x.title}</Link></li>)}
            </ul>
          </div>
        </Container>
      </article>
    </>
  );
}
