// web/src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { plans, billingPolicies } from "@/config/pricing";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    console.error("Missing STRIPE_SECRET_KEY environment variable");
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 500 }
    );
  }

  // Create Stripe client lazily, only when a request comes in
  const stripe = new Stripe(stripeKey, {});

  try {
    const body = await req.json();
    const { planId } = body as { planId?: string };

    if (!planId) {
      return NextResponse.json(
        { error: "Missing planId" },
        { status: 400 }
      );
    }

    const plan = plans.find((p) => p.id === planId);

    if (!plan) {
      return NextResponse.json(
        { error: "Invalid planId" },
        { status: 400 }
      );
    }

    const successUrl = new URL(
      billingPolicies.checkout.successUrl,
      req.nextUrl.origin
    ).toString();

    const cancelUrl = new URL(
      billingPolicies.checkout.cancelUrl,
      req.nextUrl.origin
    ).toString();

    const mode: Stripe.Checkout.SessionCreateParams.Mode =
      plan.type === "Subscription" ? "subscription" : "payment";

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: successUrl + "?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: cancelUrl,
      metadata: {
        plan_id: plan.id,
        plan_name: plan.name,
        segment: plan.segment,
        type: plan.type,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}
