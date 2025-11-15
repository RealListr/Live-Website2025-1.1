// web/src/components/PlanCard.tsx
"use client";

import type { Plan } from "@/config/pricing";

interface PlanCardProps {
  plan: Plan;
}

export function PlanCard({ plan }: PlanCardProps) {
  const isSubscription = plan.type === "Subscription";
  const isFree = plan.amountAud === 0;

  const priceLabel = isFree ? "$0" : `A$${plan.amountAud}`;
  const intervalLabel =
    isSubscription && !isFree ? "/mo" : !isSubscription ? "once" : "";

  return (
    <div className="rounded-2xl border border-neutral-200 p-6 flex flex-col">
      <div className="text-xs font-medium uppercase text-neutral-500 tracking-wide">
        {plan.segment} · {plan.type}
      </div>
      <div className="mt-1 text-lg font-semibold">{plan.name}</div>
      {plan.meta?.headline && (
        <div className="mt-1 text-sm text-neutral-600">
          {plan.meta.headline}
        </div>
      )}

      <div className="mt-4 text-2xl font-bold">
        {priceLabel}
        {intervalLabel && (
          <span className="ml-1 text-base font-medium">{intervalLabel}</span>
        )}
        {!isFree && (
          <span className="ml-1 text-xs font-normal text-neutral-500">
            + GST
          </span>
        )}
      </div>

      <ul className="mt-4 space-y-1 text-sm text-neutral-700 flex-1">
        {plan.bullets.map((line, idx) => (
          <li key={idx}>• {line}</li>
        ))}
      </ul>

      <button className="mt-4 inline-flex items-center justify-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition">
        Select
      </button>
    </div>
  );
}
