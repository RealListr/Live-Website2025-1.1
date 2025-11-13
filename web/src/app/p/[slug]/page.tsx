// src/app/p/[slug]/page.tsx
// @ts-nocheck
"use client";

import React, { use, useEffect, useState } from "react";
import MainFeedCard from "@/components/MainFeedCard";

const UI = {
  en: { solar: "Solar Power / Wattage", evInstalled: "EV Charger Installed", evYes: "Yes", evNo: "No" },
  "zh-Hans": { solar: "太阳能 / 功率", evInstalled: "是否安装EV充电", evYes: "是", evNo: "否" },
  yue: { solar: "太陽能 / 功率", evInstalled: "是否安裝EV充電", evYes: "是", evNo: "否" },
  pa: { solar: "ਸੋਲਰ / ਵਾਟੇਜ", evInstalled: "EV ਚਾਰਜਰ ਲੱਗਿਆ", evYes: "ਹਾਂ", evNo: "ਨਹੀਂ" },
  vi: { solar: "Điện mặt trời / Công suất", evInstalled: "Có sẵn sạc EV", evYes: "Có", evNo: "Không" },
  ar: { solar: "الطاقة الشمسية / الواط", evInstalled: "شاحن EV مثبت", evYes: "نعم", evNo: "لا" },
};

const LIST_KEY  = "reallistr_feed_v1_min";
const LAST_KEY  = "reallistr_last_record_min";
const PTR_KEY   = "reallistr_latest_slug_min";
const SESS_LAST = "reallistr_last_record_min_sess";

function readJSON(store: Storage, key: string) {
  try { return JSON.parse(store.getItem(key) || "null"); } catch { return null; }
}

export default function PublicListingPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = use(props.params);
  const { lang = "en" } = use(props.searchParams);

  const [record, setRecord] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    // 1) in-memory
    const mem = (window as any).__REAL_FEED?.[slug];
    if (mem) { setRecord(mem); return; }

    // 2) last record (local) if matching pointer/slug
    const last = readJSON(localStorage, LAST_KEY);
    const ptr  = localStorage.getItem(PTR_KEY);
    if (last?.slug === slug || ptr === slug) { setRecord(last); return; }

    // 3) session fallback
    const sessLast = readJSON(sessionStorage, SESS_LAST);
    if (sessLast?.slug === slug) { setRecord(sessLast); return; }

    // 4) tiny shadow list -> we can still render most fields
    const tinyList = readJSON(localStorage, LIST_KEY) || readJSON(sessionStorage, LIST_KEY) || [];
    const shadow = Array.isArray(tinyList) ? tinyList.find((x: any) => x?.slug === slug) : null;
    if (shadow) {
      const synthesized = {
        slug,
        listing: {
          price: shadow.price,
          address: { place_name: shadow.address },
          beds: shadow.beds, baths: shadow.baths, cars: shadow.cars,
          type: shadow.type, campaign: shadow.campaign,
          media: shadow.media || {},
          descriptions: { [lang]: "" },
        },
        agents: [], agencies: [], lang,
      };
      setRecord(synthesized);
      return;
    }

    // 5) nothing found
    setRecord(null);
  }, [slug, lang]);

  if (!record) {
    return (
      <div className="mx-auto max-w-3xl p-5">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 text-sm">
          <div className="font-semibold mb-2">Listing not found</div>
          <div className="text-neutral-600">
            If you just published, try again in this tab, or click Publish once more to refresh the local feed.
          </div>
        </div>
      </div>
    );
  }

  const ui = UI[lang] || UI.en;

  return (
    <div className="mx-auto max-w-3xl p-5">
      <MainFeedCard
        listing={record.listing || record}
        lang={lang}
        ui={{ solar: ui.solar, evInstalled: ui.evInstalled, evYes: ui.evYes, evNo: ui.evNo }}
        UI={UI}
        tDict={(l: string, g: "campaign" | "type", v: string) => v}
        agents={record.agents || []}
        agencies={record.agencies || []}
      />
    </div>
  );
}
