import type { Metadata } from "next";
import { Button, Container, PageHero, Section } from "@/components/ui";
import PrintButton from "@/components/PrintButton";
import { finalizeDonation } from "@/lib/donations";
import { formatMoney } from "@/lib/currency";
import { countryName } from "@/lib/countries";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you", robots: { index: false, follow: false } };

export default async function ThankYou({ searchParams }: PageProps<"/donate/thank-you">) {
  const sp = await searchParams;
  const txRef = typeof sp.tx_ref === "string" ? sp.tx_ref : "";
  const cancelled = sp.status === "cancelled";

  let result: Awaited<ReturnType<typeof finalizeDonation>> | null = null;
  if (txRef && !cancelled) {
    try { result = await finalizeDonation(txRef); } catch (e) { console.error("[thank-you] verify failed", e); }
  }
  const d = result?.state === "successful" ? result.donation : null;

  return (
    <>
      <PageHero
        breadcrumbs={false}
        title={d ? "Thank you" : cancelled ? "Payment cancelled" : "Checking your payment"}
        accent={d ? "for your generosity" : undefined}
        intro={d ? "Your donation was successful. A receipt is on its way to your email." : cancelled ? "No payment was taken. You can try again whenever you are ready." : "We could not confirm your payment yet."}
      />
      <Section>
        <Container className="max-w-2xl">
          {d ? (
            <div className="rounded-3xl bg-white p-8">
              <h2 className="text-brand-950">Donation receipt</h2>
              <dl className="mt-6 divide-y divide-brand-950/10 text-sm">
                {([
                  ["Receipt no.", d.receiptNo ?? "Being issued"],
                  ["Date", (d.paidAt ?? new Date()).toLocaleDateString("en-GB", { dateStyle: "long" })],
                  ["Donor", d.donor.name],
                  ["Country", countryName(d.country)],
                  ["Supporting", d.causeLabel],
                  ["Payment reference", d.txRef],
                  ["Amount", formatMoney(d.amountMinor / 100, d.currency)],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3"><dt className="text-zinc-500">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                ))}
              </dl>
              <p className="mt-6 text-xs text-zinc-500">{SITE.name}, CAC IT No. {SITE.itNumber}</p>
            </div>
          ) : (
            <p className="rounded-3xl bg-white p-8 text-zinc-700">
              {cancelled ? "You cancelled the payment." : result?.state === "pending" ? "Your payment is still being processed. If you were charged, your receipt will arrive by email shortly." : result?.state === "flagged" ? "We received your payment but need to review it. We will contact you by email." : "If money left your account, please contact us with your payment reference and we will sort it out."}
              {txRef && <span className="mt-3 block text-xs text-zinc-500">Reference: {txRef}</span>}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {d ? <PrintButton /> : <Button href="/donate" variant="donate">Try again</Button>}
            <Button href="/" variant="outline">Back to home</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
