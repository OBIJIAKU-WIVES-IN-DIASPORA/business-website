import Image from "next/image";
import type { ReactNode } from "react";
import { HERO_SRC, hasHeroPhoto } from "@/lib/hero";

// A framed crop of the shared photograph. `origin` picks the part of the picture shown and
// `zoom` how close it is, so one photo can serve several sections without looking repeated.
export default function PhotoPanel({ origin, zoom = 1.6, label, children }: { origin: string; zoom?: number; label?: string; children?: ReactNode }) {
  return (
    <div className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl bg-brand-900 lg:aspect-[5/4]">
      {hasHeroPhoto && (
        <Image
          src={HERO_SRC}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="-z-10 object-cover"
          style={{ transform: `scale(${zoom})`, transformOrigin: origin }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      {label && <p className="absolute left-5 top-5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-950">{label}</p>}
      {children && <div className="absolute inset-x-5 bottom-5 text-white">{children}</div>}
    </div>
  );
}
