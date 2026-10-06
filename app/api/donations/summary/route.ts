import { adminError } from "@/lib/admin-auth";
import { donations } from "@/lib/db";
import { parseDonationQuery } from "@/lib/donation-query";

// GET /api/donations/summary: totals for successful donations, with the same filters as /api/donations.
// Money is grouped by currency because totals in different currencies can't be added together.
export async function GET(request: Request) {
  const denied = adminError(request);
  if (denied) return denied;

  const parsed = parseDonationQuery(new URL(request.url).searchParams);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
  const { filter, applied } = parsed;

  const money = (id: unknown) => ({ $group: { _id: id, total: { $sum: "$amountMinor" }, count: { $sum: 1 } } });
  try {
    const col = await donations();
    const [r] = await col.aggregate([
      { $match: filter },
      { $facet: {
        totals: [{ $group: { _id: "$currency", total: { $sum: "$amountMinor" }, count: { $sum: 1 }, largest: { $max: "$amountMinor" } } }, { $sort: { total: -1 } }],
        donors: [{ $group: { _id: "$donor.email" } }, { $count: "n" }],
        byCause: [money({ cause: "$cause", label: "$causeLabel", currency: "$currency" }), { $sort: { total: -1 } }],
        byCountry: [money({ country: "$country", currency: "$currency" }), { $sort: { total: -1 } }],
        byMonth: [money({ month: { $dateToString: { format: "%Y-%m", date: "$paidAt" } }, currency: "$currency" }), { $sort: { "_id.month": 1 } }],
      } },
    ]).toArray();

    const m = (n: number) => n / 100;
    return Response.json({
      filters: applied,
      donationCount: r.totals.reduce((a: number, t: { count: number }) => a + t.count, 0),
      uniqueDonors: r.donors[0]?.n ?? 0,
      totals: r.totals.map((t: { _id: string; total: number; count: number; largest: number }) => ({
        currency: t._id, total: m(t.total), count: t.count, average: Math.round(t.total / t.count) / 100, largest: m(t.largest),
      })),
      byCause: r.byCause.map((x: { _id: { cause: string; label: string; currency: string }; total: number; count: number }) => ({ cause: x._id.cause, label: x._id.label, currency: x._id.currency, total: m(x.total), count: x.count })),
      byCountry: r.byCountry.map((x: { _id: { country: string; currency: string }; total: number; count: number }) => ({ country: x._id.country, currency: x._id.currency, total: m(x.total), count: x.count })),
      byMonth: r.byMonth.map((x: { _id: { month: string; currency: string }; total: number; count: number }) => ({ month: x._id.month, currency: x._id.currency, total: m(x.total), count: x.count })),
    });
  } catch (e) {
    console.error("[api/donations/summary]", e);
    return Response.json({ error: "Could not load summary." }, { status: 500 });
  }
}
