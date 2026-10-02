import type { CSSProperties } from "react";

// Cursive text that settles in letter by letter, then catches a slow wave of light.
// CSS only (see .script-letter in globals.css); respects prefers-reduced-motion.
export default function ScriptText({ text, delay = 0, color }: { text: string; delay?: number; color: string }) {
  let i = 0;
  return (
    <span aria-label={text} className="inline-block" style={{ "--script-color": color, color } as CSSProperties}>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {[...word].map((ch) => {
            const d = delay + i++ * 0.06;
            return (
              <span key={i} className="script-letter inline-block" style={{ "--d": `${d}s` } as CSSProperties}>{ch}</span>
            );
          })}
          {w < text.split(" ").length - 1 && <span className="inline-block w-[0.3em]" />}
        </span>
      ))}
    </span>
  );
}
