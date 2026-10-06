import type { Filter } from "mongodb";
import type { Donation } from "./db";
import { CAUSES } from "./site";
import { COUNTRIES } from "./countries";
import { isCurrency } from "./currency";

export type Parsed = {
  filter: Filter<Donation>;
  page: number; limit: number; sort: "date" | "amount"; order: 1 | -1;
  applied: Record<string, string>;
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Turns ?q=&country=&cause=&currency=&from=&to=&minAmount=&maxAmount=&page=&limit=&sort=&order=
// into a MongoDB filter. Only successful donations are ever returned.
export function parseDonationQuery(sp: URLSearchParams): Parsed | { error: string } {
  const filter: Filter<Donation> = { status: "successful" };
  const applied: Record<string, string> = {};
  const get = (k: string) => sp.get(k)?.trim() || "";

  const q = get("q");
  if (q) {
    if (q.length > 100) return { error: "q is too long (max 100 characters)." };
    const re = new RegExp(escapeRe(q), "i");
    filter.$or = [{ "donor.name": re }, { "donor.email": re }, { txRef: re }, { receiptNo: re }];
    applied.q = q;
  }

  const country = get("country");
  if (country) {
    const c = COUNTRIES.find((x) => x.code.toLowerCase() === country.toLowerCase() || x.name.toLowerCase() === country.toLowerCase());
    if (!c) return { error: `Unknown country "${country}". Use an ISO code (NG) or name (Nigeria).` };
    filter.country = c.code;
    applied.country = c.code;
  }

  const cause = get("cause");
  if (cause) {
    if (cause !== "all" && !CAUSES.some((c) => c.id === cause)) return { error: `Unknown cause "${cause}". Use one of: all, ${CAUSES.map((c) => c.id).join(", ")}.` };
    filter.cause = cause;
    applied.cause = cause;
  }

  const currency = get("currency").toUpperCase();
  if (currency) {
    if (!isCurrency(currency)) return { error: `Unsupported currency "${currency}".` };
    filter.currency = currency;
    applied.currency = currency;
  }

  const from = get("from"), to = get("to");
  if (from || to) {
    const range: { $gte?: Date; $lte?: Date } = {};
    if (from) {
      const d = new Date(from);
      if (Number.isNaN(+d)) return { error: "from must be a date, e.g. 2026-10-01." };
      range.$gte = d; applied.from = from;
    }
    if (to) {
      const d = new Date(to);
      if (Number.isNaN(+d)) return { error: "to must be a date, e.g. 2026-10-31." };
      if (/^\d{4}-\d{2}-\d{2}$/.test(to)) d.setUTCHours(23, 59, 59, 999); // a plain date includes that whole day
      range.$lte = d; applied.to = to;
    }
    if (range.$gte && range.$lte && range.$gte > range.$lte) return { error: "from must be before to." };
    filter.paidAt = range;
  }

  const min = get("minAmount"), max = get("maxAmount");
  if (min || max) {
    if (!currency) return { error: "minAmount / maxAmount need a currency filter too, since amounts in different currencies can't be compared." };
    const r: { $gte?: number; $lte?: number } = {};
    if (min) { const n = Number(min); if (!Number.isFinite(n) || n < 0) return { error: "minAmount must be a positive number." }; r.$gte = Math.round(n * 100); applied.minAmount = min; }
    if (max) { const n = Number(max); if (!Number.isFinite(n) || n < 0) return { error: "maxAmount must be a positive number." }; r.$lte = Math.round(n * 100); applied.maxAmount = max; }
    filter.amountMinor = r;
  }

  const page = Math.max(1, parseInt(get("page") || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(get("limit") || "20", 10) || 20));
  const sort = get("sort") === "amount" ? "amount" : "date";
  const order = get("order") === "asc" ? 1 : -1;
  return { filter, page, limit, sort, order, applied };
}
