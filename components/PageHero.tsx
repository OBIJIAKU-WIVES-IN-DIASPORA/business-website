import Image from "next/image";
import ScriptText from "./ScriptText";
import Breadcrumbs from "./Breadcrumbs";
import { HERO_ACCENT, HERO_SRC, hasHeroPhoto, script } from "@/lib/hero";

// Inner-page version of the home hero: same photo, overlay, centred type and script flourish.
export default function PageHero({ title, accent, intro, breadcrumbs = true }: { title: string; breadcrumbs?: boolean; accent?: string; intro?: string }) {
  return (
    <section>
      <div className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden rounded-3xl bg-brand-900 sm:min-h-[540px]">
        {hasHeroPhoto && <Image src={HERO_SRC} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />}
        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-12 pt-28 text-center">
          {breadcrumbs && <Breadcrumbs />}
          <h1 className="text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {accent && (
            <p className={`${script.className} mt-2 -rotate-2 text-4xl leading-none sm:text-6xl`} >
              <ScriptText text={accent} delay={0.4} color={HERO_ACCENT} />
            </p>
          )}
          {intro && <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
