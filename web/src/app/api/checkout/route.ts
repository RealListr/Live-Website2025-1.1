// web/src/app/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set in .env.local");
}

// Use Stripe's default API version used by the installed SDK
const stripe = new Stripe(stripeSecretKey);


// Agent / Agency subscriptions + recurring listing packages
const SUBSCRIPTION_PRICE_MAP: Record<string, string | undefined> = {
  // Agent / agency
  "domestic-agent": process.env.STRIPE_PRICE_DOMESTIC_AGENT,
  "domestic-agency": process.env.STRIPE_PRICE_DOMESTIC_AGENCY,
  "commercial-agent": process.env.STRIPE_PRICE_COMMERCIAL_AGENT,
  "commercial-agency": process.env.STRIPE_PRICE_COMMERCIAL_AGENCY,

  // Recurring "until sold" listing subscriptions
  "domestic-sale-monthly": process.env.STRIPE_PRICE_DOMESTIC_SALE_MONTHLY,
  "commercial-sale-monthly": process.env.STRIPE_PRICE_COMMERCIAL_SALE_MONTHLY,
};

// Advertising campaigns (true one-off payments)
const CAMPAIGN_PRICE_MAP: Record<string, string | undefined> = {
  // Domestic
  "domestic-sale-feature": process.env.STRIPE_PRICE_DOMESTIC_SALE_FEATURE,
  "domestic-sale-feature-plus":
    process.env.STRIPE_PRICE_DOMESTIC_SALE_FEATURE_PLUS,
  "domestic-rental-feature": process.env.STRIPE_PRICE_DOMESTIC_RENTAL_FEATURE,
  "domestic-rental-feature-plus":
    process.env.STRIPE_PRICE_DOMESTIC_RENTAL_FEATURE_PLUS,

  // Commercial
  "commercial-sale-feature": process.env.STRIPE_PRICE_COMMERCIAL_SALE_FEATURE,
  "commercial-sale-feature-plus":
    process.env.STRIPE_PRICE_COMMERCIAL_SALE_FEATURE_PLUS,
  "commercial-rental-feature":
    process.env.STRIPE_PRICE_COMMERCIAL_RENTAL_FEATURE,
  "commercial-rental-feature-plus":
    process.env.STRIPE_PRICE_COMMERCIAL_RENTAL_FEATURE_PLUS,
};

function getSiteOrigin(req: NextRequest) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  return (
    (req.headers.get("origin") ?? new URL(req.url).origin).replace(/\/$/, "")
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const planId = formData.get("planId")?.toString();
    const billingType =
      formData.get("billingType")?.toString() ?? "subscription";

    const quantityRaw = formData.get("quantity")?.toString() ?? "1";
    const quantityParsed = parseInt(quantityRaw, 10);
    const quantity =
      Number.isFinite(quantityParsed) && quantityParsed > 0
        ? quantityParsed
        : 1;

    if (!planId) {
      return NextResponse.redirect(
        new URL("/pricing?error=missing_plan", req.url),
      );
    }

    const origin = getSiteOrigin(req);

    // ----- CAMPAIGN (one-off payment) -----
    if (billingType === "campaign") {
      const priceId = CAMPAIGN_PRICE_MAP[planId];

      if (!priceId) {
        return NextResponse.redirect(
          new URL("/pricing?error=unknown_campaign", req.url),
        );
      }

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: priceId,
            quantity,
          },
        ],
        success_url: `${origin}/connection-centre?campaign_success=1&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing?canceled=1`,
      });

      if (!session.url) {
        return NextResponse.redirect(
          new URL("/pricing?error=no_session_url", req.url),
        );
      }

      return NextResponse.redirect(session.url, { status: 303 });
    }

    // ----- SUBSCRIPTION (recurring) -----
    const priceId = SUBSCRIPTION_PRICE_MAP[planId];
    if (!priceId) {
      return NextResponse.redirect(
        new URL("/pricing?error=unknown_subscription", req.url),
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      success_url: `${origin}/connection-centre?subscription_success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=1`,
    });

    if (!session.url) {
      return NextResponse.redirect(
        new URL("/pricing?error=no_session_url", req.url),
      );
    }

    return NextResponse.redirect(session.url, { status: 303 });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);

    const params = new URLSearchParams();
    params.set("error", "checkout_failed");

    if (err && typeof err === "object") {
      if ("code" in err && err.code) {
        params.set("code", String(err.code));
      }
      if ("message" in err && err.message) {
        // keep it short so the URL doesn't explode
        params.set(
          "msg",
          encodeURIComponent(String(err.message).slice(0, 140)),
        );
      }
    }

    const url = new URL(`/pricing?${params.toString()}`, req.url);
    return NextResponse.redirect(url);
  }
}
