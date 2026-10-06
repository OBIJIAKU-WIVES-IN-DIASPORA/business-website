import { adminError } from "@/lib/admin-auth";
import { donations } from "@/lib/db";
import { parseDonationQuery } from "@/lib/donation-query";

// GET /api/donations: donation history (successful donations only), newest first.
// Filters: q, country, cause, currency, from, to, minAmount, maxAmount. Paging: page, limit (max 100).
// Sorting: sort=date|amount, order=asc|desc.
export async function GET(request: Request) {
  const denied = adminError(request);
  if (denied) return denied;

  const parsed = parseDonationQuery(new URL(request.url).searchParams);
  if ("error" in parsed) return Response.json({ error: parsed.error }, { status: 400 });
  const { filter, page, limit, sort, order, applied } = parsed;

  try {
    const col = await donations();
    const [rows, total] = await Promise.all([
      col.find(filter).sort(sort === "amount" ? { amountMinor: order, paidAt: -1 } : { paidAt: order })
        .skip((page - 1) * limit).limit(limit).toArray(),
      col.countDocuments(filter),
    ]);
    return Response.json({
      filters: applied,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      data: rows.map((d) => ({
        id: String(d._id), receiptNo: d.receiptNo, reference: d.txRef,
        donor: { name: d.donor.name, email: d.donor.email, phone: d.donor.phone ?? null },
        amount: d.amountMinor / 100, currency: d.currency,
        cause: d.cause, causeLabel: d.causeLabel, country: d.country,
        paymentType: d.flw?.paymentType ?? null, paidAt: d.paidAt, receiptEmailed: Boolean(d.emailSentAt),
      })),
    });
  } catch (e) {
    console.error("[api/donations]", e);
    return Response.json({ error: "Could not load donations." }, { status: 500 });
  }
}
