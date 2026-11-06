"use client";
import { useActionState, useState } from "react";
import { BANK, CAUSES, SITE } from "@/lib/site";
import { pledgeTransfer, startDonation, type FormState } from "@/lib/actions";
import { CURRENCIES, formatMoney, type CurrencyCode } from "@/lib/currency";
import { COUNTRIES } from "@/lib/countries";
import { Honeypot } from "./Field";

const init: FormState = { ok: false, message: "" };
const field = "mt-1 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm focus:border-brand-500";
const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-medium transition-colors ${on ? "border-brand-700 bg-brand-700 text-white" : "border-zinc-300 bg-white hover:bg-brand-50"}`;

function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try { await navigator.clipboard.writeText(value); } catch {
      const t = document.createElement("textarea"); t.value = value; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
    }
    setDone(true); setTimeout(() => setDone(false), 1800);
  }
  return (
    <button type="button" onClick={copy} aria-label={`Copy ${label}`} className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${done ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"}`}>
      {done ? "Copied ✓" : "Copy"}
    </button>
  );
}

function Row({ k, v, copy, strong }: { k: string; v: string; copy?: boolean; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-brand-950/10 py-3 last:border-0">
      <div className="min-w-0"><dt className="text-xs text-zinc-500">{k}</dt><dd className={`break-words ${strong ? "text-lg font-medium tracking-wide text-brand-950" : "text-sm font-medium"}`}>{v}</dd></div>
      {copy && <CopyButton value={v} label={k} />}
    </div>
  );
}

// The account changes with the chosen currency; `key` re-triggers the slide-in so the swap is noticeable.
function Account({ currency }: { currency: CurrencyCode }) {
  const foreign = currency !== "NGN";
  return (
    <dl key={currency} className="panel-swap">
      <Row k={`${CURRENCIES[currency].label} account number`} v={BANK.accounts[currency]} copy strong />
      <Row k="Account name" v={BANK.accountName} copy />
      <Row k="Bank" v={BANK.name} />
      <Row k="Sort code" v={BANK.sortCode} copy />
      {foreign && <Row k="SWIFT code" v={BANK.swift} copy />}
      <Row k="Bank address" v={BANK.address} />
    </dl>
  );
}

export default function DonateForm({ initialCause = "all", cardEnabled = false }: { initialCause?: string; cardEnabled?: boolean }) {
  const [tState, tAction, tPending] = useActionState(pledgeTransfer, init);
  const [cState, cAction, cPending] = useActionState(startDonation, init);
  const [cause, setCause] = useState(initialCause);
  const [currency, setCurrency] = useState<CurrencyCode>("NGN");
  const [amount, setAmount] = useState<number | "">(CURRENCIES.NGN.presets[1]);
  const [method, setMethod] = useState<"transfer" | "card">("transfer");
  const [dismissed, setDismissed] = useState(false);

  const causeLabel = cause === "all" ? "Where needed most" : CAUSES.find((c) => c.id === cause)?.label ?? "Where needed most";
  const money = typeof amount === "number" && amount > 0 ? formatMoney(amount, currency) : "";
  const pending = tPending || cPending;
  const state = method === "card" ? cState : tState;
  const changeCurrency = (c: CurrencyCode) => { setCurrency(c); setAmount(CURRENCIES[c].presets[1]); };

  // ---- Thank-you view after a transfer has been logged ----
  if (tState.ok && tState.reference && !dismissed) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 sm:p-12">
        <div className="text-center">
          <p aria-hidden className="heartbeat text-6xl">💚</p>
          <h2 className="mt-4 text-brand-950">Thank you for your generosity</h2>
          <p className="mt-3 leading-7 text-zinc-700">Your gift of <strong>{money}</strong> for <strong>{causeLabel}</strong> is noted. Please complete your transfer using the details below.</p>
        </div>
        <div className="mt-8 rounded-2xl bg-brand-50 p-5">
          <p className="text-xs text-zinc-600">Put this reference in your transfer narration</p>
          <div className="mt-1 flex items-center justify-between gap-3"><span className="text-2xl font-medium tracking-widest text-brand-950">{tState.reference}</span><CopyButton value={tState.reference} label="reference" /></div>
        </div>
        <div className="mt-6"><Account currency={currency} /></div>
        <ol className="mt-8 space-y-3 text-sm leading-6 text-zinc-700">
          <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs text-white">1</span>Send {money} from your bank app, quoting the reference above.</li>
          <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs text-white">2</span>We match your gift when it arrives and email your receipt.</li>
        </ol>
        <p className={`mt-6 rounded-xl p-3 text-sm ${tState.emailed ? "bg-brand-50 text-brand-900" : "bg-amber-50 text-amber-900"}`}>
          {tState.emailed ? "We have also emailed these details to you. Check your spam folder if you can't see them." : `We couldn't email these details just now, so please screenshot this page. Questions? ${SITE.email}`}
        </p>
        <button type="button" onClick={() => setDismissed(true)} className="mt-6 w-full rounded-full border border-brand-700 px-6 py-3 text-sm font-medium text-brand-700 hover:bg-brand-50">Make another gift</button>
      </div>
    );
  }

  return (
    <form action={method === "card" ? cAction : tAction} className="grid gap-8 lg:grid-cols-5" onSubmit={() => setDismissed(false)}>
      <Honeypot />
      <input type="hidden" name="cause" value={cause} />
      <input type="hidden" name="currency" value={currency} />

      <div className="space-y-9 lg:col-span-3">
        <fieldset>
          <legend className="text-sm font-medium text-brand-950"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-700 text-xs text-white">1</span>Your details</legend>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-zinc-800">Name {method === "card" ? <span className="text-brand-700">*</span> : <span className="text-zinc-500">(optional)</span>}</label>
              <input id="name" name="name" autoComplete="name" required={method === "card"} className={field} />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-zinc-800">Email address <span className="text-brand-700">*</span></label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
              <p className="mt-1 text-xs text-zinc-500">Your transfer details and receipt are sent here.</p>
            </div>
            {method === "card" && (
              <div>
                <label htmlFor="country" className="text-sm font-medium text-zinc-800">Country <span className="text-brand-700">*</span></label>
                <select id="country" name="country" required defaultValue="" className={field}>
                  <option value="" disabled>Select your country</option>
                  {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
              </div>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-brand-950"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-700 text-xs text-white">2</span>Cause</legend>
          {/* Phones get a dropdown; larger screens get buttons */}
          <select aria-label="Cause" value={cause} onChange={(e) => setCause(e.target.value)} className={`${field} sm:hidden`}>
            {[{ id: "all", label: "Where needed most" }, ...CAUSES].map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <div className="mt-4 hidden flex-wrap gap-2 sm:flex" role="group" aria-label="Cause">
            {[{ id: "all", label: "Where needed most" }, ...CAUSES].map((c) => (
              <button type="button" key={c.id} aria-pressed={cause === c.id} onClick={() => setCause(c.id)} className={chip(cause === c.id)}>{c.label}</button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-brand-950"><span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-700 text-xs text-white">3</span>Currency and amount</legend>
          <select aria-label="Currency" value={currency} onChange={(e) => changeCurrency(e.target.value as CurrencyCode)} className={`${field} sm:hidden`}>
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => <option key={c} value={c}>{CURRENCIES[c].symbol} {c} ({CURRENCIES[c].label})</option>)}
          </select>
          <div className="mt-4 hidden grid-cols-4 gap-2 sm:grid" role="group" aria-label="Currency">
            {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
              <button type="button" key={c} aria-pressed={currency === c} onClick={() => changeCurrency(c)} className={`rounded-2xl border px-3 py-3 text-left transition-colors ${currency === c ? "border-brand-700 bg-brand-700 text-white" : "border-zinc-300 bg-white hover:bg-brand-50"}`}>
                <span className="block text-lg font-medium">{CURRENCIES[c].symbol} <span className="text-sm">{c}</span></span>
                <span className={`text-xs ${currency === c ? "text-brand-100" : "text-zinc-500"}`}>{CURRENCIES[c].label}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CURRENCIES[currency].presets.map((a) => (
              <button type="button" key={a} aria-pressed={amount === a} onClick={() => setAmount(a)} className={chip(amount === a)}>{formatMoney(a, currency)}</button>
            ))}
          </div>
          <div className="mt-4 max-w-xs">
            <label htmlFor="amount" className="text-sm font-medium text-zinc-800">Amount ({currency}) <span className="text-brand-700">*</span></label>
            <input id="amount" name="amount" type="number" inputMode="decimal" min={CURRENCIES[currency].min} step="any" required value={amount}
              onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))} className={field} />
            <p className="mt-1 text-xs text-zinc-500">Minimum {formatMoney(CURRENCIES[currency].min, currency)}</p>
          </div>
        </fieldset>
      </div>

      <aside className="lg:col-span-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <div className="flex rounded-full bg-brand-50 p-1" role="group" aria-label="Payment method">
            <button type="button" aria-pressed={method === "transfer"} onClick={() => setMethod("transfer")} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${method === "transfer" ? "bg-brand-700 text-white" : "text-brand-700"}`}>Bank transfer</button>
            <button type="button" aria-pressed={method === "card"} disabled={!cardEnabled} onClick={() => setMethod("card")} className={`flex-1 rounded-full px-3 py-2 text-sm font-medium ${method === "card" ? "bg-brand-700 text-white" : "text-brand-700"} disabled:opacity-60`}>
              Card {!cardEnabled && <span className="ml-1 text-[11px] font-normal">soon</span>}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="text-sm text-zinc-600">Your gift to <span className="font-medium text-brand-950">{causeLabel}</span></p>
            <p className="whitespace-nowrap text-2xl font-medium tracking-tight text-brand-950">{money || "—"}</p>
          </div>

          {method === "transfer" ? (
            <div className="mt-4">
              <p className="mb-1 text-sm font-medium text-brand-950">Send your {currency} gift to:</p>
              <Account currency={currency} />
              <p className="mt-3 rounded-xl bg-brand-50 p-3 text-xs leading-5 text-brand-900">Tap the button below and we will email you these details with a reference to quote, then match your gift when it arrives.</p>
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-brand-50 p-3 text-sm leading-6 text-brand-900">You will be taken to Flutterwave to pay by card or transfer. We never see or store your card details.</p>
          )}

          {state.message && !state.ok && <p data-form-status="error" role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{state.message}</p>}
          <button disabled={pending} className="mt-5 w-full rounded-full bg-donate px-6 py-3.5 text-sm font-semibold text-brand-950 hover:bg-donate-dark disabled:opacity-60">
            {pending ? "One moment…" : method === "transfer" ? "I'm giving by transfer. Email me the details" : `Donate ${money}`}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-zinc-500">{SITE.name} is a registered Incorporated Trustee, CAC IT No. {SITE.itNumber}. Please only use the account details shown on this page.</p>
        </div>
      </aside>
    </form>
  );
}
