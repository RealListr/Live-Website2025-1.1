// web/src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const planId = formData.get("planId")?.toString();
  const quantity = formData.get("quantity")?.toString() ?? "1";

  console.log("DEBUG /api/checkout hit", { planId, quantity });

  return NextResponse.json(
    {
      message: "Checkout route hit",
      planId,
      quantity,
    },
    { status: 200 }
  );
}
