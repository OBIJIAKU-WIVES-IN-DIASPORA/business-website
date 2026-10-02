import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAUSES, PROGRAMS } from "@/lib/site";
import { Button, Container, DonateBanner, PageHero } from "@/components/ui";
import Icon from "@/components/Icon";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.short, alternates: { canonical: `/programs/${p.slug}` } };
}

export default async function ProgramPage({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p) notFound();
  const cause = CAUSES.find((c) => c.programme === p.slug);
  return (
    <>
      <PageHero title={p.title} intro={p.short} />
      <section className="py-16">
        <Container className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-5 text-lg leading-8 text-zinc-700 lg:col-span-2">
            {p.body.map((t) => <p key={t}>{t}</p>)}
            <h2 className="pt-4 text-brand-950">What this includes</h2>
            <ul className="space-y-2">
              {p.how.map((h) => <li key={h} className="flex gap-3"><Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-brand-500" />{h}</li>)}
            </ul>
          </div>
          <aside className="h-fit rounded-xl bg-sand p-6">
            <h3 className="text-brand-950">Who it helps</h3>
            <p className="mt-2 text-sm text-zinc-700">{p.beneficiaries}</p>
            <Button href={cause ? `/donate?cause=${cause.id}` : "/donate"} variant="donate" className="mt-5 w-full">Support this program</Button>
          </aside>
        </Container>
      </section>
      <DonateBanner />
    </>
  );
}
