"use client";
import { useActionState } from "react";
import { submitContact, type FormState } from "@/lib/actions";
import { Field, Honeypot, Status } from "./Field";

const init: FormState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, init);
  return (
    <form action={action} className="space-y-4">
      <Honeypot />
      <Field label="Your name" name="name" />
      <Field label="Email address" name="email" type="email" />
      <Field label="Message" name="message">
        <textarea id="message" name="message" required minLength={10} maxLength={3000} rows={5} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm focus:border-brand-500" />
      </Field>
      <Status state={state} />
      <button disabled={pending} className="rounded-full bg-brand-700 px-6 py-3 text-sm font-medium text-white hover:bg-brand-900 disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
