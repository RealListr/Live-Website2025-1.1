// src/app/pricing/page.tsx
"use client";

import React, { useEffect, useState } from "react";

type PlanBase = {
  id: string;
  badge: string;
  name: string;
  subtitle: string;
  price: string;
  notes: string[];
};

type SubscriptionPlanId =
  | "domestic-agent"
  | "domestic-agency"
  | "commercial-agent"
  | "commercial-agency";

type CampaignPlanId =
  | "domestic-sale-monthly"
  | "domestic-sale-feature"
  | "domestic-sale-feature-plus"
  | "domestic-rental-feature"
  | "domestic-rental-feature-plus"
  | "commercial-sale-monthly"
  | "commercial-sale-feature"
  | "commercial-sale-feature-plus"
  | "commercial-rental-feature"
  | "commercial-rental-feature-plus";

type SubscriptionPlan = PlanBase & { id: SubscriptionPlanId };
type CampaignPlan = PlanBase & { id: CampaignPlanId };

// ===== Agent / Agency subscriptions =====
const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "domestic-agent",
    badge: "DOMESTIC",
    name: "Domestic Agent",
    subtitle: "For solo domestic agents",
    price: "$79/mo + GST",
    notes: [
      "For solo real estate agents listing domestic properties",
      "Listings: Unlimited",
      "Media: Images + video uploads supported",
      "Language: EN only (AI add-ons optional)",
      "Calendar badge included",
      "Support: Email",
      "Not included: Advanced analytics",
    ],
  },
  {
    id: "domestic-agency",
    badge: "DOMESTIC",
    name: "Domestic Agency",
    subtitle: "For domestic agencies",
    price: "$799/mo + GST",
    notes: [
      "For domestic agencies managing multiple agents",
      "Listings: Unlimited under same agency",
      "Media: Gallery + video + agency branding",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email + Priority",
      "Not included: Commercial tools",
    ],
  },
  {
    id: "commercial-agent",
    badge: "COMMERCIAL",
    name: "Commercial Agent",
    subtitle: "For individual commercial agents",
    price: "$99/mo + GST",
    notes: [
      "For individual commercial real estate agents",
      "Listings: Unlimited",
      "Media: Video + gallery",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email",
      "Not included: Advanced analytics",
    ],
  },
  {
    id: "commercial-agency",
    badge: "COMMERCIAL",
    name: "Commercial Agency",
    subtitle: "For commercial property agencies",
    price: "$799/mo + GST",
    notes: [
      "For commercial property agencies",
      "Listings: Unlimited under one business",
      "Media: Video + gallery + branding",
      "Language: EN only",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },
];

// ===== Domestic campaigns (Advertising) =====
const domesticCampaigns: CampaignPlan[] = [
  {
    id: "domestic-sale-monthly",
    badge: "DOMESTIC",
    name: "Domestic Sale – Monthly Until Sold",
    subtitle: "Recurring until the property is sold",
    price: "$599/mo + GST",
    notes: [
      "For residential properties on recurring monthly listing",
      "Listings: 1 active until sold",
      "Media: Basic images only",
      "Language: Not included (add-on optional)",
      "Calendar badge included",
      "Support: Email",
      "Not included: Video + ListrCutz",
    ],
  },
  {
    id: "domestic-sale-feature",
    badge: "DOMESTIC",
    name: "Domestic Sale – Feature Campaign",
    subtitle: "Mid-tier exposure for residential sales",
    price: "$699 + GST",
    notes: [
      "For residential properties needing mid-tier exposure",
      "Listings: Single campaign",
      "Media: Video + images",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email",
      "Not included: ListrCutz + Language AI",
    ],
  },
  {
    id: "domestic-sale-feature-plus",
    badge: "DOMESTIC",
    name: "Domestic Sale – Feature Plus",
    subtitle: "Premium media + AI for residential sales",
    price: "$1,299 + GST",
    notes: [
      "For high-profile listings with premium media",
      "Listings: Single campaign",
      "Media: Video + images + ListrCutz",
      "Language: EN + Language AI",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },
  {
    id: "domestic-rental-feature",
    badge: "DOMESTIC",
    name: "Domestic Rental – Feature",
    subtitle: "Standard rental promotion",
    price: "$199 + GST",
    notes: [
      "For standard residential rentals",
      "Listings: Single campaign",
      "Media: Images + video",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email",
      "Not included: ListrCutz + Language AI",
    ],
  },
  {
    id: "domestic-rental-feature-plus",
    badge: "DOMESTIC",
    name: "Domestic Rental – Feature Plus",
    subtitle: "Premium rental exposure",
    price: "$599 + GST",
    notes: [
      "For premium residential rental exposure",
      "Listings: Single campaign",
      "Media: Images + video + ListrCutz",
      "Language: EN + Language AI",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },
];

// ===== Commercial campaigns (Advertising) =====
const commercialCampaigns: CampaignPlan[] = [
  {
    id: "commercial-sale-monthly",
    badge: "COMMERCIAL",
    name: "Commercial Sale – Monthly Until Sold",
    subtitle: "Recurring until the commercial asset is sold",
    price: "$799/mo + GST",
    notes: [
      "For commercial sale properties active until sold",
      "Listings: 1 active until sold",
      "Media: Basic images only",
      "Language: Not included",
      "Calendar badge included",
      "Support: Email",
      "Not included: Video + Language AI",
    ],
  },
  {
    id: "commercial-sale-feature",
    badge: "COMMERCIAL",
    name: "Commercial Sale – Feature Campaign",
    subtitle: "Enhanced exposure for commercial sales",
    price: "$999 + GST",
    notes: [
      "For enhanced commercial property exposure",
      "Listings: Single campaign",
      "Media: Video + images",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email",
      "Not included: ListrCutz + Language AI",
    ],
  },
  {
    id: "commercial-sale-feature-plus",
    badge: "COMMERCIAL",
    name: "Commercial Sale – Feature Plus",
    subtitle: "Premium showcase for commercial sales",
    price: "$1,499 + GST",
    notes: [
      "For premium, high-visibility commercial campaigns",
      "Listings: Single campaign",
      "Media: Video + images + ListrCutz",
      "Language: EN + Language AI",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },
  {
    id: "commercial-rental-feature",
    badge: "COMMERCIAL",
    name: "Commercial Rental – Feature",
    subtitle: "Standard commercial rental promotion",
    price: "$499 + GST",
    notes: [
      "For commercial rentals needing quick promotion",
      "Listings: Single campaign",
      "Media: Images + video",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email",
      "Not included: ListrCutz + Language AI",
    ],
  },
  {
    id: "commercial-rental-feature-plus",
    badge: "COMMERCIAL",
    name: "Commercial Rental – Feature Plus",
    subtitle: "Premium commercial rental exposure",
    price: "$899 + GST",
    notes: [
      "For premium commercial rental exposure",
      "Listings: Single campaign",
      "Media: Images + video + ListrCutz",
      "Language: EN + Language AI",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },
];

export default function PricingPage() {
  // ------- simple auth gate using the same rlauth cookie -------
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("rlauth=valid"));

    if (!hasCookie) {
      window.location.href = "/login";
    } else {
      setAuthed(true);
      setChecked(true);
    }
  }, []);

  if (!checked || !authed) return null;
  // --------------------------------------------------------------

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Subscriptions &amp; Campaigns</h1>
      <p className="mt-2 text-neutral-600">
        Choose a subscription for your team, then add listing campaigns as
        needed.
      </p>

      {/* ===== Subscriptions section ===== */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Subscriptions</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {subscriptionPlans.map((plan) => (
            <form
              key={plan.id}
              method="POST"
              action="/api/checkout"
              className="flex h-full flex-col rounded-2xl border border-neutral-200 p-6"
            >
              <div className="text-xs font-semibold tracking-wide text-neutral-500">
                {plan.badge}
              </div>
              <div className="mt-1 text-lg font-semibold">{plan.name}</div>
              <div className="mt-1 text-sm text-neutral-600">
                {plan.subtitle}
              </div>

              <div className="mt-4 text-2xl font-bold">{plan.price}</div>

              <ul className="mt-4 flex-1 list-disc space-y-1 pl-4 text-sm text-neutral-700">
                {plan.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>

              {/* Hidden fields for subscription checkout */}
              <input type="hidden" name="planId" value={plan.id} />
              <input type="hidden" name="billingType" value="subscription" />

              {/* Number of agents on this plan */}
              <label className="mt-4 flex items-center gap-2 text-sm text-neutral-700">
                <span>Number of agents</span>
                <input
                  type="number"
                  name="quantity"
                  min={1}
                  defaultValue={1}
                  className="w-20 rounded-md border border-neutral-300 px-2 py-1 text-sm"
                />
              </label>

              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Select plan
              </button>
            </form>
          ))}
        </div>
      </section>

      {/* ===== Domestic campaigns ===== */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Domestic campaigns</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Sale and rental campaigns for residential listings.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {domesticCampaigns.map((plan) => (
            <form
              key={plan.id}
              method="POST"
              action="/api/checkout"
              className="flex h-full flex-col rounded-2xl border border-neutral-200 p-6"
            >
              <div className="text-xs font-semibold tracking-wide text-neutral-500">
                {plan.badge}
              </div>
              <div className="mt-1 text-lg font-semibold">{plan.name}</div>
              <div className="mt-1 text-sm text-neutral-600">
                {plan.subtitle}
              </div>

              <div className="mt-4 text-2xl font-bold">{plan.price}</div>

              <ul className="mt-4 flex-1 list-disc space-y-1 pl-4 text-sm text-neutral-700">
                {plan.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>

              {/* Hidden fields for campaign checkout */}
              <input type="hidden" name="planId" value={plan.id} />
              <input type="hidden" name="billingType" value="campaign" />
              <input type="hidden" name="quantity" value="1" />

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Select plan
              </button>
            </form>
          ))}
        </div>
      </section>

      {/* ===== Commercial campaigns ===== */}
      <section className="mt-12 mb-12">
        <h2 className="text-lg font-semibold">Commercial campaigns</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Sale and rental campaigns for commercial assets.
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {commercialCampaigns.map((plan) => (
            <form
              key={plan.id}
              method="POST"
              action="/api/checkout"
              className="flex h-full flex-col rounded-2xl border border-neutral-200 p-6"
            >
              <div className="text-xs font-semibold tracking-wide text-neutral-500">
                {plan.badge}
              </div>
              <div className="mt-1 text-lg font-semibold">{plan.name}</div>
              <div className="mt-1 text-sm text-neutral-600">
                {plan.subtitle}
              </div>

              <div className="mt-4 text-2xl font-bold">{plan.price}</div>

              <ul className="mt-4 flex-1 list-disc space-y-1 pl-4 text-sm text-neutral-700">
                {plan.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>

              {/* Hidden fields for campaign checkout */}
              <input type="hidden" name="planId" value={plan.id} />
              <input type="hidden" name="billingType" value="campaign" />
              <input type="hidden" name="quantity" value="1" />

              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
              >
                Select plan
              </button>
            </form>
          ))}
        </div>
      </section>
    </main>
  );
}
