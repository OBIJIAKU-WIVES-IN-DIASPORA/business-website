"use client";
export default function PrintButton() {
  return <button type="button" onClick={() => window.print()} className="rounded-full border border-brand-700 px-6 py-3 text-sm font-medium text-brand-700 hover:bg-brand-50 print:hidden">Print receipt</button>;
}
