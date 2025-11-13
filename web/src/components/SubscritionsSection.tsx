// src/components/SubscriptionsSection.tsx
import React from "react";
import { plans } from "@/config/pricing";
import { PlanCard } from "@/components/PlanCard";

export const SubscriptionsSection: React.FC = () => {
  const domesticPlans = plans.filter((p) => p.segment === "Domestic");
  const commercialPlans = plans.filter((p) => p.segment === "Commercial");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Domestic */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Domestic</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {domesticPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* Commercial */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Commercial</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {commercialPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </div>
  );
};
