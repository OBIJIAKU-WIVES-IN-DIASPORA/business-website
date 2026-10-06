import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

// White + gold lockup for the dark header and footer. Source files live in /public/brand.
export default function Logo({ className = "h-14", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" aria-label={`${SITE.name}, home`} className="inline-block">
      <Image src="/brand/logo-white.png" alt={SITE.name} width={1200} height={343} sizes="240px" priority={priority} className={`w-auto ${className}`} />
    </Link>
  );
}
