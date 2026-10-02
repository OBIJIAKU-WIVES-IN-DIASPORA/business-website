import type { Program } from "@/lib/site";

const paths: Record<Program["icon"] | "heart" | "check" | "menu" | "close" | "arrow", string> = {
  education: "M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 9.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-3.5l-6 3-6-3Z",
  health: "M19 4h-4V0H9v4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-2 9h-4v4h-2v-4H7v-2h4V7h2v4h4v2Z",
  skills: "M22 9 12 2 2 9l10 7 8-5.6V17h2V9ZM6 14.5V18l6 4 6-4v-3.5l-6 4.2-6-4.2Z",
  business: "M4 4h16l1 5a3 3 0 0 1-2 3v8H5v-8a3 3 0 0 1-2-3l1-5Zm4 10v4h8v-4H8Z",
  widows: "M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z",
  elderly: "M12 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-2 8h4l1 6h-1v6h-2v-6H9l1-6Z",
  heart: "M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11Z",
  check: "m9 16.2-3.5-3.5L4 14.1l5 5 11-11-1.4-1.4L9 16.2Z",
  menu: "M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z",
  close: "m18.3 5.7-1.4-1.4L12 9.2 7.1 4.3 5.7 5.7 10.6 10.6 5.7 15.5l1.4 1.4L12 12l4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9Z",
  arrow: "M13 5l7 7-7 7-1.4-1.4L16.2 13H4v-2h12.2l-4.6-4.6L13 5Z",
};

export default function Icon({ name, className = "h-6 w-6" }: { name: keyof typeof paths; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}
