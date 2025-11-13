// src/config/pricing.ts

export type BillingInterval = "monthly" | "one_time";
export type Segment = "Domestic" | "Commercial";

export interface Plan {
  id: string;
  name: string;
  segment: Segment;
  type: "Subscription" | "Campaign";
  stripePriceId: string;
  billingInterval: BillingInterval;
  amountAud: number;
  gstMode: "exclusive" | "inclusive";
  meta?: { headline?: string };
  bullets: string[];
}

export const plans: Plan[] = [
  // ===== DOMESTIC – SUBSCRIPTIONS =====
  {
    id: "dom_agent",
    name: "Domestic Agent",
    segment: "Domestic",
    type: "Subscription",
    stripePriceId: "price_dom_agent_79",
    billingInterval: "monthly",
    amountAud: 79,
    gstMode: "exclusive", // + GST
    meta: {
      headline: "For solo domestic agents",
    },
    bullets: [
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
    id: "dom_agency",
    name: "Domestic Agency",
    segment: "Domestic",
    type: "Subscription",
    stripePriceId: "price_dom_agency_799",
    billingInterval: "monthly",
    amountAud: 799,
    gstMode: "exclusive",
    meta: {
      headline: "For domestic agencies",
    },
    bullets: [
      "For domestic agencies managing multiple agents",
      "Listings: Unlimited under same agency",
      "Media: Gallery + video + agency branding",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email + Priority",
      "Not included: Commercial tools",
    ],
  },

  // ===== DOMESTIC – SALE CAMPAIGNS =====
  {
    id: "dom_sale_monthly_until_sold",
    name: "Domestic Sale – Monthly Until Sold",
    segment: "Domestic",
    type: "Campaign",
    stripePriceId: "price_dom_sale_599",
    billingInterval: "monthly",
    amountAud: 599,
    gstMode: "exclusive",
    meta: {
      headline: "Recurring until the property is sold",
    },
    bullets: [
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
    id: "dom_sale_feature",
    name: "Domestic Sale – Feature Campaign",
    segment: "Domestic",
    type: "Campaign",
    stripePriceId: "price_dom_sale_699",
    billingInterval: "one_time",
    amountAud: 699,
    gstMode: "exclusive",
    meta: {
      headline: "Mid-tier exposure for residential sales",
    },
    bullets: [
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
    id: "dom_sale_feature_plus",
    name: "Domestic Sale – Feature Plus",
    segment: "Domestic",
    type: "Campaign",
    stripePriceId: "price_dom_sale_1299",
    billingInterval: "one_time",
    amountAud: 1299,
    gstMode: "exclusive",
    meta: {
      headline: "Premium media + AI for residential sales",
    },
    bullets: [
      "For high-profile listings with premium media",
      "Listings: Single campaign",
      "Media: Video + images + ListrCutz",
      "Language: EN + Language AI",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },

  // ===== DOMESTIC – RENTAL CAMPAIGNS =====
  {
    id: "dom_rent_feature",
    name: "Domestic Rental – Feature",
    segment: "Domestic",
    type: "Campaign",
    stripePriceId: "price_dom_rent_199",
    billingInterval: "one_time",
    amountAud: 199,
    gstMode: "exclusive",
    meta: {
      headline: "Standard rental promotion",
    },
    bullets: [
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
    id: "dom_rent_feature_plus",
    name: "Domestic Rental – Feature Plus",
    segment: "Domestic",
    type: "Campaign",
    stripePriceId: "price_dom_rent_599",
    billingInterval: "one_time",
    amountAud: 599,
    gstMode: "exclusive",
    meta: {
      headline: "Premium rental exposure",
    },
    bullets: [
      "For premium residential rental exposure",
      "Listings: Single campaign",
      "Media: Images + video + ListrCutz",
      "Language: EN + Language AI",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },

  // ===== COMMERCIAL – SUBSCRIPTIONS =====
  {
    id: "com_agent",
    name: "Commercial Agent",
    segment: "Commercial",
    type: "Subscription",
    stripePriceId: "price_com_agent_99",
    billingInterval: "monthly",
    amountAud: 99,
    gstMode: "exclusive",
    meta: {
      headline: "For individual commercial agents",
    },
    bullets: [
      "For individual commercial real estate agents",
      "Listings: Unlimited",
      "Media: Video + gallery",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email",
      "Not included: Language AI",
    ],
  },
  {
    id: "com_agency",
    name: "Commercial Agency",
    segment: "Commercial",
    type: "Subscription",
    stripePriceId: "price_com_agency_799",
    billingInterval: "monthly",
    amountAud: 799,
    gstMode: "exclusive",
    meta: {
      headline: "For commercial property agencies",
    },
    bullets: [
      "For commercial property agencies",
      "Listings: Unlimited under one business",
      "Media: Video + gallery + branding",
      "Language: EN only",
      "Calendar badge included",
      "Support: Email + Priority",
      "Not included: Domestic tools",
    ],
  },

  // ===== COMMERCIAL – SALE CAMPAIGNS =====
  {
    id: "com_sale_monthly_until_sold",
    name: "Commercial Sale – Monthly Until Sold",
    segment: "Commercial",
    type: "Campaign",
    stripePriceId: "price_com_sale_799",
    billingInterval: "monthly",
    amountAud: 799,
    gstMode: "exclusive",
    meta: {
      headline: "Recurring until the commercial asset is sold",
    },
    bullets: [
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
    id: "com_sale_feature",
    name: "Commercial Sale – Feature Campaign",
    segment: "Commercial",
    type: "Campaign",
    stripePriceId: "price_com_sale_999",
    billingInterval: "one_time",
    amountAud: 999,
    gstMode: "exclusive",
    meta: {
      headline: "Enhanced exposure for commercial sales",
    },
    bullets: [
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
    id: "com_sale_feature_plus",
    name: "Commercial Sale – Feature Plus",
    segment: "Commercial",
    type: "Campaign",
    stripePriceId: "price_com_sale_1499",
    billingInterval: "one_time",
    amountAud: 1499,
    gstMode: "exclusive",
    meta: {
      headline: "Premium showcase for commercial sales",
    },
    bullets: [
      "For premium, high-visibility commercial campaigns",
      "Listings: Single campaign",
      "Media: Video + images + ListrCutz",
      "Language: EN + Language AI",
      "Calendar badge included",
      "Support: Priority",
      "Not included: None",
    ],
  },

  // ===== COMMERCIAL – RENTAL CAMPAIGNS =====
  {
    id: "com_rent_feature",
    name: "Commercial Rental – Feature",
    segment: "Commercial",
    type: "Campaign",
    stripePriceId: "price_com_rent_499",
    billingInterval: "one_time",
    amountAud: 499,
    gstMode: "exclusive",
    meta: {
      headline: "Standard commercial rental promotion",
    },
    bullets: [
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
    id: "com_rent_feature_plus",
    name: "Commercial Rental – Feature Plus",
    segment: "Commercial",
    type: "Campaign",
    stripePriceId: "price_com_rent_899",
    billingInterval: "one_time",
    amountAud: 899,
    gstMode: "exclusive",
    meta: {
      headline: "Premium commercial rental exposure",
    },
    bullets: [
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

export const billingPolicies = {
  refunds: {
    enabled: false,
    note: "No refunds; credit only for duplicate charges or system error.",
  },
  proration: {
    enabled: false,
  },
  trial: {
    type: "none",
  },
  gst: {
    mode: "exclusive", // Prices are + GST
  },
  checkout: {
    successUrl: "/subscriptions/success",
    cancelUrl: "/subscriptions/cancel",
  },
};
