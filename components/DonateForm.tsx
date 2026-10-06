"use client";
import { useActionState, useState } from "react";
import { CAUSES, SITE } from "@/lib/site";
import { startDonation, type FormState } from "@/lib/actions";
import { CURRENCIES, formatMoney, type CurrencyCode } from "@/lib/currency";
import { COUNTRIES } from "@/lib/countries";
import { Field, Honeypot, Status } from "./Field";

const init: FormState = { ok: false, message: "" };
const input = "mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm focus:border-brand-500";

export default function DonateForm({ initialCause = "all" }: { initialCause?: string }) {
  const [state, action, pending] = useActionState(startDonation, init);
  const [cause, setCause] = useState(initialCause);
  const [currency, setCurrency] = useState<CurrencyCode>("NGN");
  const [amount, setAmount] = useState<number | "">(CURRENCIES.NGN.presets[1]);
  const hasBank = SITE.bank.bankName && SITE.bank.accountNumber;

  const changeCurrency = (c: CurrencyCode) => { setCurrency(c); setAmount(CURRENCIES[c].presets[1]); };

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <form action={action} className="space-y-8 lg:col-span-3">
        <Honeypot />
        <input type="hidden" name="cause" value={cause} />

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
          <legend className="text-sm font-medium text-brand-950">2. Amount</legend>
          <div className="mt-3 inline-flex rounded-full border border-zinc-300 p-1" role="group" aria-label="Currency">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
              <button type="button" key={c} aria-pressed={currency === c} onClick={() => changeCurrency(c)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium ${currency === c ? "bg-brand-700 text-white" : ""}`}>{c}</button>
            ))}
          </div>
          <input type="hidden" name="currency" value={currency} />
          <div className="mt-3 flex flex-wrap gap-2">
            {CURRENCIES[currency].presets.map((a) => (
              <button type="button" key={a} aria-pressed={amount === a} onClick={() => setAmount(a)}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${amount === a ? "border-brand-700 bg-brand-700 text-white" : "border-zinc-300 hover:bg-brand-50"}`}>{formatMoney(a, currency)}</button>
            ))}
          </div>
          <div className="mt-3 max-w-xs">
            <Field label="Or enter another amount" name="amount" type="number">
              <input id="amount" name="amount" type="number" min={CURRENCIES[currency].min} step="any" required value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} className={input} />
            </Field>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-brand-950">3. Your details</legend>
          <Field label="Full name" name="name" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email (your receipt is sent here)" name="email" type="email" />
            <Field label="Phone (optional)" name="phone" type="tel" required={false} />
          </div>
          <Field label="Country" name="country">
            <select id="country" name="country" required defaultValue="" className={input}>
              <option value="" disabled>Select your country</option>
              {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
          </Field>
        </fieldset>

        <Status state={state} />
        <button disabled={pending} className="w-full rounded-full bg-donate px-6 py-3.5 text-sm font-semibold text-brand-950 hover:bg-donate-dark disabled:opacity-60 sm:w-auto">
          {pending ? "Taking you to secure payment…" : `Donate ${typeof amount === "number" && amount ? formatMoney(amount, currency) : ""}`}
        </button>
        <p className="text-xs text-zinc-500">You will be taken to Flutterwave to pay by card, bank transfer or other methods. We never see or store your card details.</p>
      </form>

      <aside className="h-fit rounded-3xl bg-sand p-6 lg:col-span-2">
        <h3 className="text-brand-950">Secure giving</h3>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
          <li>Payments are processed by Flutterwave.</li>
          <li>You receive a receipt by email straight away.</li>
          <li>Your gift goes to the cause you choose.</li>
        </ul>
        {hasBank && (
          <dl className="mt-5 space-y-2 border-t border-brand-950/10 pt-5 text-sm">
            <p className="font-medium text-brand-950">Prefer a bank transfer?</p>
            <div><dt className="text-zinc-500">Bank</dt><dd className="font-medium">{SITE.bank.bankName}</dd></div>
            <div><dt className="text-zinc-500">Account name</dt><dd className="font-medium">{SITE.bank.accountName}</dd></div>
            <div><dt className="text-zinc-500">Account number</dt><dd className="font-medium">{SITE.bank.accountNumber}</dd></div>
          </dl>
        )}
        <p className="mt-5 text-xs leading-5 text-zinc-500">{SITE.name} is a registered Incorporated Trustee, CAC IT No. {SITE.itNumber}.</p>
      </aside>
    </div>
  );
}
