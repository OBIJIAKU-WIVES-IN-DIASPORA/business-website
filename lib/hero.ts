import { existsSync } from "node:fs";
import { join } from "node:path";
import { Caveat } from "next/font/google";

export const script = Caveat({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });
export const HERO_SRC = "/images/hero.avif";
export const hasHeroPhoto = existsSync(join(process.cwd(), "public", HERO_SRC));
export const HERO_ACCENT = "#a9c0ea";

// One photograph per message, so a page tells its story before a word is read.
// All files are 16:9 AVIF crops in /public/images/heroes. Sources and licences are in CREDITS.md in that folder.
export const HEROES = {
  default: { src: HERO_SRC, pos: "50% 40%", alt: "Women of the community gathered together" },
  education: { src: "/images/heroes/education.avif", pos: "50% 25%", alt: "Smiling students in a school classroom" },
  "education-alt": { src: "/images/heroes/education-alt.avif", pos: "50% 35%", alt: "Young girls in school uniform learning in a classroom" },
  mission: { src: "/images/heroes/mission.avif", pos: "50% 35%", alt: "Joyful children raising their fists together" },
  healthcare: { src: "/images/heroes/healthcare.avif", pos: "50% 40%", alt: "A nurse speaking with a patient in a clinic" },
  skills: { src: "/images/heroes/skills.avif", pos: "50% 28%", alt: "An artisan smiling behind her craft stall" },
  business: { src: "/images/heroes/business.avif", pos: "50% 78%", alt: "A market trader smiling at her stall in Nigeria" },
  family: { src: "/images/heroes/family.avif", pos: "50% 100%", alt: "A mother lifting her baby with a smile" },
  elderly: { src: "/images/heroes/elderly.avif", pos: "50% 50%", alt: "A smiling elderly woman" },
  volunteer: { src: "/images/heroes/volunteer.avif", pos: "50% 25%", alt: "Volunteers carrying boxes of food aid" },
} as const satisfies Record<string, { src: string; pos: string; alt: string }>;

export type HeroKey = keyof typeof HEROES;

// Program detail pages
export const PROGRAM_HERO: Record<string, HeroKey> = {
  "educational-sponsorship": "education",
  "healthcare-assistance": "healthcare",
  "vocational-skills": "skills",
  "micro-business-empowerment": "business",
  "widows-support": "default",
  "single-parents-empowerment": "family",
  "elderly-care": "elderly",
};
