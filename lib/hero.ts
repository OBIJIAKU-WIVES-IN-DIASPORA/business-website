import { existsSync } from "node:fs";
import { join } from "node:path";
import { Caveat } from "next/font/google";

export const script = Caveat({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });
export const HERO_SRC = "/images/hero.jpg";
export const hasHeroPhoto = existsSync(join(process.cwd(), "public", HERO_SRC));
export const HERO_ACCENT = "#a9c0ea";
