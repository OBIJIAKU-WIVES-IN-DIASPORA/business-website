import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Caveat } from "next/font/google";
import ScriptText from "./ScriptText";

const script = Caveat({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });

// Drop a real photograph at public/images/hero.jpg (landscape, ~2400px wide).
const HERO_SRC = "/images/hero.jpg";
const hasPhoto = existsSync(join(process.cwd(), "public", HERO_SRC));

const NAV = [
  { label: "How to help", href: "/donate" },
  { label: "About us", href: "/about" },
  { label: "Our stories", href: "/stories" },
  { label: "Our projects", href: "/projects" },
  { label: "Map", href: "/map" },
];

const ACCENT = "#a9c0ea"; // light periwinkle used for the script + stroke

export default function Hero() {
  return (
    <section className="">
      <div className="relative isolate flex h-[calc(100vh-1.5rem)] min-h-[640px] flex-col overflow-hidden rounded-b-3xl bg-brand-900">
        {hasPhoto && (
          <Image src={HERO_SRC} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        )}
        <div className="absolute inset-0 -z-10 bg-black/45" />

        {/* Nav bar */}

        {/* Centered headline + script flourish */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6">
          <div className="relative w-full max-w-5xl pb-28 sm:pb-36">
            <h1 className="mx-auto max-w-4xl text-center text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              Together we support widows, orphans and the sick
            </h1>

            {/* Swooping stroke */}
            <svg
              viewBox="0 0 2710 450"
              className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible sm:block"
              fill="none"
              aria-hidden
            >
              <path
                d="M520 20 L110 560 C40 650 90 710 190 695 C400 670 600 700 830 745 C1000 760 1110 700 1180 590"
                pathLength={1}
                className="script-stroke"
                stroke={ACCENT}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <p
              className={`${script.className} pointer-events-none absolute bottom-0 left-1/2 w-72 -translate-x-1/2 -rotate-3 text-center text-5xl leading-[0.95] sm:bottom-2 sm:left-[24%] sm:w-auto sm:translate-x-0 sm:text-left sm:text-7xl`}
              
            >
              <ScriptText text="caring for" delay={0.8} color={ACCENT} />
              <span className="ml-10 inline-block"><ScriptText text="tomorrow" delay={1.5} color={ACCENT} /></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}