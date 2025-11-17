// src/app/api/login/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  const correct = process.env.AGENT_PORTAL_PASSWORD;

  if (password && correct && password === correct) {
    const res = NextResponse.json({ ok: true });
    // simple client-readable cookie, fine for this basic gate
    res.cookies.set("rlauth", "valid", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  }

  return NextResponse.json({ error: "Invalid" }, { status: 401 });
}
