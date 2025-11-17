import { cookies } from "next/headers";

export function requireAuth() {
  const auth = cookies().get("rlauth")?.value;
  return auth === "valid";
}
