import { MongoClient, type Collection, type ObjectId } from "mongodb";
import { env, optionalEnv } from "./env";

export type DonationStatus = "pending" | "successful" | "failed" | "cancelled" | "flagged";

export type Donation = {
  _id?: ObjectId;
  txRef: string; // our unique reference, sent to Flutterwave
  receiptNo?: string; // assigned once payment is confirmed
  status: DonationStatus;
  amountMinor: number; // kobo / cents, avoids floating point drift in totals
  currency: string;
  cause: string; // id from CAUSES, or "all"
  causeLabel: string;
  donor: { name: string; email: string; phone?: string };
  country: string; // ISO alpha-2 chosen by the donor
  createdAt: Date;
  paidAt?: Date;
  flw?: { transactionId: number; flwRef?: string; paymentType?: string; chargedAmountMinor?: number };
  emailSentAt?: Date;
  emailClaimedAt?: Date;
  emailError?: string;
};

// Reuse one connection across hot reloads in dev and across requests in production.
const g = globalThis as unknown as { _mongo?: Promise<MongoClient>; _indexes?: Promise<void> };

function client() {
  g._mongo ??= new MongoClient(env("MONGODB_URI")).connect();
  return g._mongo;
}

export async function donations(): Promise<Collection<Donation>> {
  const db = (await client()).db(optionalEnv("MONGODB_DB") ?? "obijiaku");
  const col = db.collection<Donation>("donations");
  g._indexes ??= Promise.all([
    col.createIndex({ txRef: 1 }, { unique: true }),
    col.createIndex({ status: 1, paidAt: -1 }),
    col.createIndex({ status: 1, country: 1, paidAt: -1 }),
    col.createIndex({ status: 1, cause: 1, paidAt: -1 }),
    col.createIndex({ "donor.email": 1 }),
    col.createIndex({ receiptNo: 1 }, { unique: true, sparse: true }),
  ]).then(() => undefined);
  await g._indexes;
  return col;
}

export async function nextReceiptNumber(): Promise<string> {
  const db = (await client()).db(optionalEnv("MONGODB_DB") ?? "obijiaku");
  const year = new Date().getUTCFullYear();
  const doc = await db
    .collection<{ _id: string; seq: number }>("counters")
    .findOneAndUpdate({ _id: `receipt-${year}` }, { $inc: { seq: 1 } }, { upsert: true, returnDocument: "after" });
  return `OBJ-${year}-${String(doc!.seq).padStart(6, "0")}`;
}
