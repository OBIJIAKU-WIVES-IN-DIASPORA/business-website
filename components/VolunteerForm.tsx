"use client";
import { useActionState } from "react";
import { submitVolunteer, type FormState } from "@/lib/actions";
import { Field, Honeypot, Status } from "./Field";

const init: FormState = { ok: false, message: "" };
const AREAS = ["Teaching and mentoring", "Healthcare support", "Skills training", "Fundraising and events", "Media and communications", "Administration", "Other"];

export default function VolunteerForm() {
  const [state, action, pending] = useActionState(submitVolunteer, init);
  return (
    <form action={action} className="space-y-4">
      <Honeypot />
      <Field label="Full name" name="name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email address" name="email" type="email" />
        <Field label="Phone number" name="phone" type="tel" />
      </div>
      <Field label="Where would you like to help?" name="interest">
        <select id="interest" name="interest" required defaultValue="" className="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-sm">
          <option value="" disabled>Select an area</option>
          {AREAS.map((a) => <option key={a}>{a}</option>)}
        </select>
      </Field>
      <Field label="Tell us about yourself" name="about" required={false}>
        <textarea id="about" name="about" rows={4} maxLength={2000} className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2.5 text-sm" />
      </Field>
      <Status state={state} />
      <button disabled={pending} className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-60">
        {pending ? "Sending…" : "Sign me up"}
      </button>
    </form>
  );
}
