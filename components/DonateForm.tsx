"use client";
import { useActionState, useState } from "react";
import { CAUSES, SITE } from "@/lib/site";
import { submitPledge, type FormState } from "@/lib/actions";
import { Field, Honeypot, Status } from "./Field";

const init: FormState = { ok: false, message: "" };
const AMOUNTS = [5000, 10000, 25000, 50000];
const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export default function DonateForm({ initialCause = "all", initialFrequency = "once" }: { initialCause?: string; initialFrequency?: string }) {
  const [state, action, pending] = useActionState(submitPledge, init);
  const [cause, setCause] = useState(initialCause);
  const [frequency, setFrequency] = useState(initialFrequency);
  const [amount, setAmount] = useState<number | "">(10000);
  const hasBank = SITE.bank.bankName && SITE.bank.accountNumber;

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <form action={action} className="space-y-8 lg:col-span-3">
        <Honeypot />
        <input type="hidden" name="cause" value={cause} />
        <input type="hidden" name="frequency" value={frequency} />

        <fieldset>
          <legend className="text-sm font-medium text-brand-950">1. Choose a cause</legend>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by cause">
            {[{ id: "all", label: "Where needed most" }, ...CAUSES].map((c) => (
              <button type="button" key={c.id} aria-pressed={cause === c.id} onClick={() => setCause(c.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${cause === c.id ? "border-brand-700 bg-brand-700 text-white" : "border-zinc-300 hover:bg-brand-50"}`}>
                {c.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-brand-950">2. How often?</legend>
          <div className="mt-3 inline-flex rounded-md border border-zinc-300 p-1" role="group">
            {[["once", "One-time"], ["monthly", "Monthly"]].map(([v, l]) => (
              <button type="button" key={v} aria-pressed={frequency === v} onClick={() => setFrequency(v)}
                className={`rounded px-5 py-2 text-sm font-medium ${frequency === v ? "bg-brand-700 text-white" : ""}`}>{l}</button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-brand-950">3. Amount (Naira)</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {AMOUNTS.map((a) => (
              <button type="button" key={a} aria-pressed={amount === a} onClick={() => setAmount(a)}
                className={`rounded-md border px-4 py-2 text-sm font-medium ${amount === a ? "border-accent bg-accent text-white" : "border-zinc-300 hover:bg-brand-50"}`}>{naira(a)}</button>
            ))}
          </div>
          <div className="mt-3 max-w-xs">
            <Field label="Or enter another amount" name="amount" type="number">
              <input id="amount" name="amount" type="number" min={500} step={100} required value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-brand-950">4. Your details</legend>
          <Field label="Full name" name="name" />
          <Field label="Email address" name="email" type="email" />
        </fieldset>

        <Status state={state} />
        <button disabled={pending} className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-60 sm:w-auto">
          {pending ? "Please wait…" : `Give ${typeof amount === "number" && amount ? naira(amount) : ""} ${frequency === "monthly" ? "monthly" : ""}`}
        </button>
      </form>

      <aside className="h-fit rounded-xl bg-sand p-6 lg:col-span-2">
        <h3 className="text-brand-950">Bank transfer details</h3>
        {hasBank ? (
          <dl className="mt-4 space-y-2 text-sm">
            <div><dt className="text-zinc-500">Bank</dt><dd className="font-medium">{SITE.bank.bankName}</dd></div>
            <div><dt className="text-zinc-500">Account name</dt><dd className="font-medium">{SITE.bank.accountName}</dd></div>
            <div><dt className="text-zinc-500">Account number</dt><dd className="font-medium">{SITE.bank.accountNumber}</dd></div>
          </dl>
        ) : (
          <p className="mt-3 text-sm leading-6 text-zinc-700">Online card payment and bank details are being set up. To give now, please email <a className="font-medium text-brand-700 underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call {SITE.phone}.</p>
        )}
        <p className="mt-5 text-xs leading-5 text-zinc-500">Every gift is used for the cause you select. The foundation is a registered Incorporated Trustee, CAC IT No. {SITE.itNumber}.</p>
      </aside>
    </div>
  );
}
