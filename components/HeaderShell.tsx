"use client";
import { useEffect, useState, type ReactNode } from "react";

// Transparent over the hero; solid once the page scrolls so links stay readable on any section.
export default function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed z-50 flex w-full items-center justify-between text-sm text-white transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-brand-950/95 shadow-lg shadow-black/10" : "border-white/15 bg-gradient-to-b from-black/30 to-transparent"
      }`}
    >
      {children}
    </header>
  );
}
