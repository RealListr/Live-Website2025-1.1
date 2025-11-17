// src/lib/auth.ts
import { cookies } from "next/headers";

export async function requireAuth() {
  // In Next 16, cookies() is async and returns a Promise<ReadonlyRequestCookies>
  const cookieStore = await cookies();
  const auth = cookieStore.get("rlauth")?.value;
  return auth === "valid";
}
