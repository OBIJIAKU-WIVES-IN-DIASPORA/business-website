import Link from "next/link";
import type { ReactNode } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import type { Program } from "@/lib/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

type BtnProps = { href: string; children: ReactNode; variant?: "primary" | "donate" | "outline" | "light"; className?: string };
export function Button({ href, children, variant = "primary", className = "" }: BtnProps) {
  const styles = {
    primary: "bg-brand-700 text-white hover:bg-brand-900",
    donate: "bg-donate font-semibold text-brand-950 hover:bg-donate-dark",
    outline: "border border-brand-700 text-brand-700 hover:bg-brand-50",
    light: "border border-white/70 text-white hover:bg-white/10",
  }[variant];
  return (
    <Link href={href} className={`inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${styles} ${className}`}>
      {children}
    </Link>
  );
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`py-20 sm:py-28 ${className}`}>{children}</section>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`mb-4 text-sm font-medium ${light ? "text-brand-100" : "text-brand-700"}`}>{children}</p>;
}

// Every section opens the same way: label, heading, short intro, optional link on the right.
export function SectionHeading({ eyebrow, title, accent, intro, light = false, center = false, action }: {
  eyebrow?: string; title: string; accent?: string; intro?: string; light?: boolean; center?: boolean; action?: ReactNode;
}) {
  return (
    <Reveal className={`mb-12 flex flex-col gap-6 sm:mb-14 ${center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
        <h2 className={light ? "text-white" : "text-brand-950"}>
          {title} {accent && <span className={light ? "text-brand-100/70" : "text-brand-500"}>{accent}</span>}
        </h2>
        {intro && <p className={`lead mt-4 ${light ? "text-brand-100" : "text-zinc-600"}`}>{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 hover:underline">
      {children} <Icon name="arrow" className="h-4 w-4" />
    </Link>
  );
}

export { default as PageHero } from "./PageHero";

// Decorative stand-in for photography. Replace with <Image> once real photos exist in /public/images.
export function Visual({ icon = "heart", className = "" }: { icon?: Program["icon"] | "heart"; className?: string }) {
  return (
    <div role="img" aria-label="Illustration" className={`flex items-center justify-center bg-brand-100 text-brand-500 ${className}`}>
      <Icon name={icon} className="h-12 w-12 opacity-70" />
    </div>
  );
}

export function ProgramCard({ p, index = 0 }: { p: Program; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 0.1} className="h-full">
    <Link href={`/programs/${p.slug}`} className="group flex h-full flex-col rounded-3xl bg-white p-7 transition-all duration-300 hover:-translate-y-1 relative before:absolute before:inset-x-0 before:top-full before:h-2 hover:bg-brand-50 hover:shadow-lg hover:shadow-brand-950/5">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 group-hover:bg-white">
        <Icon name={p.icon} className="h-5 w-5" />
      </span>
      <h3 className="mt-10 text-brand-950">{p.title}</h3>
      <p className="mt-3 flex-1 text-[15px] leading-7 text-zinc-600">{p.short}</p>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
        Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
    </Reveal>
  );
}

export function DonateBanner() {
  return (
    <section className="px-3 pb-3 sm:px-6 sm:pb-6">
      <Reveal className="rounded-3xl bg-brand-900 px-6 py-20 text-center text-white sm:py-28">
        <h2 className="mx-auto max-w-2xl">Together, we can build <span className="text-brand-100/70">a brighter tomorrow</span></h2>
        <p className="lead mx-auto mt-5 max-w-xl text-brand-100">Your gift or your time can change the life of a widow, an orphan, an elderly person or someone who is sick.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/donate" className="rounded-full bg-donate px-6 py-3 text-sm font-semibold text-brand-950 hover:bg-donate-dark">Donate now</Link>
          <Button href="/volunteer" variant="light">Become a volunteer</Button>
        </div>
      </Reveal>
    </section>
  );
}
