import type { ReactNode } from "react";

export function Field({ label, name, type = "text", required = true, children }: { label: string; name: string; type?: string; required?: boolean; children?: ReactNode }) {
  const base = "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-brand-500";
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-zinc-800">{label}{required && <span className="text-accent"> *</span>}</label>
      {children ?? <input id={name} name={name} type={type} required={required} className={base} />}
    </div>
  );
}

export function Honeypot() {
  return (
    <div className="hidden" aria-hidden="true">
      <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

export function Status({ state }: { state: { ok: boolean; message: string } }) {
  if (!state.message) return null;
  return <p role="status" className={`rounded-md p-3 text-sm ${state.ok ? "bg-brand-50 text-brand-900" : "bg-red-50 text-red-800"}`}>{state.message}</p>;
}
