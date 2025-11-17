// src/app/connection-centre/page.tsx
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth";
import ConnectionCentreClient from "./ConnectionCentreClient";

export default async function ConnectionCentrePage() {
  const authed = await requireAuth();
  if (!authed) {
    redirect("/login");
  }

  return <ConnectionCentreClient />;
}
