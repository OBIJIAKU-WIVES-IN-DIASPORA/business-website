"use client";
import { useEffect, useRef, type ElementType, type ReactNode } from "react";

// Fades and lifts content into place as it scrolls into view.
// Content is visible by default (no JS, crawlers, reduced motion); only elements that start
// below the fold are hidden after hydration and revealed once, when they enter the viewport.
export default function Reveal({ children, delay = 0, as = "div", className = "" }: {
  children: ReactNode; delay?: number; as?: "div" | "li" | "section"; className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ "--rd": `${delay}s` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
