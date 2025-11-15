// web/src/components/SubscriptionsSection.tsx

import Link from "next/link";
import { plans, type Plan } from "@/config/pricing";

function formatPrice(amountAud: number, interval: "monthly" | "one_time") {
  const formatted = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amountAud);

  if (interval === "monthly") {
    return `${formatted}/mo + GST`;
  }

  // one-time campaign
  return `${formatted} + GST`;
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="flex flex-col rounded-2xl border border-neutral-200 p-6">
      <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {plan.segment}
      </div>
      <div className="mt-1 text-lg font-semibold">{plan.name}</div>
      {plan.meta?.headline && (
        <div className="mt-1 text-sm text-neutral-600">{plan.meta.headline}</div>
      )}

      <div className="mt-4 text-2xl font-bold">
        {formatPrice(plan.amountAud, plan.billingInterval)}
      </div>

      <ul className="mt-4 flex-1 space-y-1 text-sm text-neutral-600">
        {plan.bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>

      <Link
        href={`/connection-centre?plan=${plan.id}`}
        className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-center text-sm text-white"
      >
        Select plan
      </Link>
    </div>
  );
}

export default function SubscriptionsSection() {
  const subscriptionPlans = plans.filter((p) => p.type === "Subscription");
  const domesticCampaigns = plans.filter(
    (p) => p.segment === "Domestic" && p.type === "Campaign"
  );
  const commercialCampaigns = plans.filter(
    (p) => p.segment === "Commercial" && p.type === "Campaign"
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Subscriptions & Campaigns</h1>
      <p className="mt-2 text-neutral-600">
        Choose a subscription for your team, then add listing campaigns as needed.
      </p>

      {/* SUBSCRIPTIONS */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Subscriptions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* DOMESTIC CAMPAIGNS */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Domestic campaigns</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Sale and rental campaigns for residential listings.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {domesticCampaigns.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* COMMERCIAL CAMPAIGNS */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Commercial campaigns</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Sale and rental campaigns for commercial assets.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {commercialCampaigns.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  );
}
