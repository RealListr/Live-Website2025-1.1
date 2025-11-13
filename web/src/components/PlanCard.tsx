// src/components/PlanCard.tsx
"use client";

import React, { useState } from "react";
import type { Plan } from "@/config/pricing";

interface PlanCardProps {
  plan: Plan;
}

export const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const isMonthly = plan.billingInterval === "monthly";

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      if (!res.ok) {
        console.error("Checkout error", await res.json());
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Checkout exception", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
      <div>
        <h3 className="text-base font-semibold">{plan.name}</h3>

        <p className="text-xl font-semibold mt-1">
          AUD {plan.amountAud}{" "}
          <span className="text-xs font-medium opacity-80 ml-1">+ GST</span>
        </p>

        <p className="text-xs text-gray-500">
          {isMonthly ? "Billed Monthly" : "One-time"}
        </p>

        <p className="text-[11px] text-gray-400 mt-1">
          Price ID: <code>{plan.stripePriceId}</code>
        </p>

        {plan.meta?.headline && (
          <p className="text-xs text-gray-600 mt-1">{plan.meta.headline}</p>
        )}

        <ul className="mt-3 space-y-1 text-sm">
          {plan.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="mt-4 inline-flex items-center justify-center rounded-lg border border-gray-900 px-3 py-2 text-sm font-medium hover:bg-gray-900 hover:text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading
          ? "Redirecting..."
          : `Choose ${plan.type === "Subscription" ? "Plan" : "Campaign"}`}
      </button>
    </div>
  );
};
