// web/src/app/subscriptions/page.tsx

import React from "react";

type SubscriptionPlan = {
  id:
    | "domestic-agent"
    | "domestic-agency"
    | "commercial-agent"
    | "commercial-agency";
  badge: string;
  name: string;
  subtitle: string;
  price: string;
  notes: string[];
};

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

export default function SubscriptionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Subscriptions &amp; Campaigns</h1>
      <p className="mt-2 text-neutral-600">
        Choose a subscription for your team, then add listing campaigns as
        needed.
      </p>

      {/* Subscriptions section */}
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

              {/* Plan ID for the checkout route */}
              <input type="hidden" name="planId" value={plan.id} />

              {/* Quantity input: how many agents on this plan */}
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

      {/* Campaign sections stay as visual only for now */}
    </main>
  );
}
