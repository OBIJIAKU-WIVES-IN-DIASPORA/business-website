import { createHash, timingSafeEqual } from "node:crypto";

// Donation data contains donors' names and emails, so these endpoints need ADMIN_API_KEY.
// Send it as "Authorization: Bearer <key>" or "x-api-key: <key>".
export function adminError(request: Request): Response | null {
  const key = process.env.ADMIN_API_KEY;
  if (!key) return Response.json({ error: "Donation API is disabled: ADMIN_API_KEY is not set." }, { status: 503 });
  const given = request.headers.get("x-api-key") ?? request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const h = (v: string) => createHash("sha256").update(v).digest();
  if (!timingSafeEqual(h(given), h(key))) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}
