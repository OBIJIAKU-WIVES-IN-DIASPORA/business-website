import Image from "next/image";
import ScriptText from "./ScriptText";
import Breadcrumbs from "./Breadcrumbs";
import { HERO_ACCENT, HEROES, hasHeroPhoto, script, type HeroKey } from "@/lib/hero";

// Inner-page version of the home hero: same photo, overlay, centred type and script flourish.
export default function PageHero({ title, accent, intro, breadcrumbs = true, image = "default" }: { title: string; breadcrumbs?: boolean; accent?: string; intro?: string; image?: HeroKey }) {
  const hero = HEROES[image];
  return (
    <section>
      <div className="relative isolate flex min-h-[480px] items-center justify-center overflow-hidden rounded-b-3xl bg-brand-900 sm:min-h-[600px]">
        {hasHeroPhoto && <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: hero.pos }} />}
        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_68%_at_50%_58%,rgba(8,24,14,0.68),transparent_75%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-12 pt-28 text-center">
          {breadcrumbs && <Breadcrumbs />}
          <h1 className="text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">{title}</h1>
          {accent && (
            <p className={`${script.className} [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] mt-2 -rotate-2 text-4xl leading-none sm:text-6xl`} >
              <ScriptText text={accent} delay={0.4} color={HERO_ACCENT} />
            </p>
          )}
          {intro && <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
