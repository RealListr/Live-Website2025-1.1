// src/components/MainFeedCard.tsx
// @ts-nocheck
"use client";

import React, { useMemo, useRef, useState } from "react";

type Listing = {
  campaign: string;
  campaignDetail?: string;
  price: string;
  type: string;
  zoning?: string;
  address: { place_name?: string };
  beds: number;
  baths: number;
  cars: number;
  landArea?: string;
  floorArea?: string;
  nabers?: number | string;
  solarWattage?: string;
  evCharger: boolean;
  descriptions: Record<string, string>;
  media: { lead?: string; gallery?: string[]; videos?: string[]; listrcutz?: string[] };
  openDate?: string;
  sH?: string; sM?: string; sAP?: "AM" | "PM";
  eH?: string; eM?: string; eAP?: "AM" | "PM";
};

function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }
function to24h(h?: string, m?: string, ap?: string) {
  if (!h || !m || !ap) return "";
  let H = parseInt(h, 10);
  if (ap === "PM" && H !== 12) H += 12;
  if (ap === "AM" && H === 12) H = 0;
  return `${pad(H)}:${pad(parseInt(m, 10))}`;
}
function withinNow(dateStr?: string, start24?: string, end24?: string) {
  try {
    if (!dateStr || !start24 || !end24) return "TBA";
    const now = new Date();
    const [sh, sm] = start24.split(":").map(Number);
    const [eh, em] = end24.split(":").map(Number);
    const s = new Date(dateStr); s.setHours(sh, sm, 0, 0);
    const e = new Date(dateStr); e.setHours(eh, em, 0, 0);
    const diffMin = Math.round((s.getTime() - now.getTime()) / 60000);
    if (now >= s && now <= e) return "OPEN";
    if (diffMin > 0 && diffMin <= 15) return "OPENS 15m";
    return "TBA";
  } catch { return "TBA"; }
}
function fmtSchedule(dateStr?: string, sh?: string, sm?: string, sap?: string, eh?: string, em?: string, eap?: string) {
  if (!dateStr || !sh || !sm || !sap || !eh || !em || !eap) return "TBA";
  const start = `${sh}:${sm} ${sap}`;
  const end = `${eh}:${em} ${eap}`;
  const d = new Date(dateStr);
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}, ${start}–${end}`;
}

export default function MainFeedCard({
  listing,
  lang = "en",
  ui,
  tDict,
  onClick,
  agents = [],
  agencies = [],
}: {
  listing: Listing;
  lang?: string;
  ui: any; // current-language slice (UI[lang])
  tDict: (lang: string, group: string, value: string) => string;
  onClick?: () => void;
  agents?: Array<{ avatarUrl?: string; name?: string }>;
  agencies?: Array<{ logoUrl?: string }>;
}) {
  const statusStart = to24h(listing.sH, listing.sM, listing.sAP);
  const statusEnd = to24h(listing.eH, listing.eM, listing.eAP);
  const status = withinNow(listing.openDate, statusStart, statusEnd);

  const chips: string[] = [
    `🛏 ${listing.beds} ${ui?.beds?.toLowerCase?.() || "bed"}`,
    `🛁 ${listing.baths} ${ui?.baths?.toLowerCase?.() || "bath"}`,
    `🚗 ${listing.cars} ${ui?.cars?.toLowerCase?.() || "car"}`,
    ...(listing.landArea ? [`m² ${listing.landArea} ${ui?.landArea?.split?.("(")?.[0]?.trim?.().toLowerCase?.() || "land"}`] : []),
    ...(listing.floorArea ? [`m² ${listing.floorArea} ${ui?.floorArea?.split?.("(")?.[0]?.trim?.().toLowerCase?.() || "bldg"}`] : []),
  ];

  /* ---------- Gallery (lead + gallery) ---------- */
  const gallery: string[] = useMemo(() => {
    const lead = listing?.media?.lead ? [listing.media.lead] : [];
    const rest = Array.isArray(listing?.media?.gallery) ? listing.media.gallery : [];
    const seen = new Set<string>();
    return [...lead, ...rest].filter((u) => !!u && !seen.has(u) && seen.add(u));
  }, [listing?.media]);

  const [idx, setIdx] = useState(0);
  const go = (n: number) => setIdx((i) => (gallery.length ? (i + n + gallery.length) % gallery.length : 0));
  const goTo = (i: number) => setIdx(Math.max(0, Math.min(i, (gallery.length || 1) - 1)));

  const dragRef = useRef<{ x: number; dragging: boolean }>({ x: 0, dragging: false });
  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, dragging: true };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = e.clientX - dragRef.current.x;
    dragRef.current.dragging = false;
    if (Math.abs(d) > 40) {
      if (d < 0) go(+1);
      else go(-1);
    }
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(+1);
  };

  return (
    <article
      className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
      role={onClick ? "button" : undefined}
      onClick={onClick}
    >
      {/* Media with carousel */}
      <div className="relative">
        {gallery.length > 0 ? (
          <div
            className="relative h-[220px] w-full select-none overflow-hidden"
            role="region"
            aria-label="Property media"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
          >
            <img
              src={gallery[idx]}
              alt="Property"
              className="h-full w-full object-cover"
              loading="eager"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 text-xs shadow"
                  onClick={(ev) => { ev.stopPropagation?.(); go(-1); }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 text-xs shadow"
                  onClick={(ev) => { ev.stopPropagation?.(); go(+1); }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex h-[220px] w-full items-center justify-center bg-neutral-100 text-sm text-neutral-400">
            {ui?.images || "Images"}
          </div>
        )}

        {/* dots */}
        {gallery.length > 1 && (
          <div className="pointer-events-auto absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {gallery.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={(ev) => { ev.stopPropagation?.(); goTo(i); }}
                className={`h-2 w-2 rounded-full ${i === idx ? "bg-white" : "bg-white/60"}`}
              />
            ))}
          </div>
        )}

        {/* status chip */}
        {listing.openDate && status !== "TBA" && (
          <div className="absolute left-3 top-3 rounded bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
            {status}
          </div>
        )}
      </div>

      {/* Optional thumbnails row */}
      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-neutral-100 p-2">
          {gallery.map((u, i) => (
            <button
              key={u + i}
              title={`Image ${i + 1}`}
              onClick={(ev) => { ev.stopPropagation?.(); goTo(i); }}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded border ${
                i === idx ? "border-neutral-900" : "border-neutral-300"
              }`}
            >
              <img src={u} className="h-full w-full object-cover" loading="eager" />
            </button>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="px-5 pb-5 pt-3">
        {/* Campaign */}
        <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          {tDict(lang, "campaign", listing.campaign)}
        </div>
        {!!listing.campaignDetail && (
          <div className="mt-0.5 text-xs text-neutral-500">{listing.campaignDetail}</div>
        )}

        {/* Price + Address */}
        <div className="mt-1 text-2xl font-semibold">{listing.price || "-"}</div>
        <div className="text-sm text-neutral-600">{listing.address?.place_name || ""}</div>

        {/* Type + Zoning inline */}
        <div className="mt-2 text-right text-xs text-neutral-500">
          {tDict(lang, "type", listing.type)}
          {listing.zoning ? ` · ${listing.zoning}` : ""}
        </div>

        {/* Chips */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          {chips.map((c) => (
            <span key={c} className="rounded-full border px-2 py-1">{c}</span>
          ))}
        </div>

        {/* Description */}
        <div className="mt-3 text-sm text-neutral-800">
          {listing.descriptions?.[lang] || listing.descriptions?.en || ""}
        </div>

        {/* Attribute rows */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-neutral-500">{ui?.propertyZoning || "Property Zoning"}</div>
            <div>{listing.zoning || "-"}</div>
          </div>

          <div>
            <div className="text-neutral-500">{ui?.nabers || "NABERS"}</div>
            <div>{(listing.nabers ?? listing.nabers === 0) ? String(listing.nabers) : "-"}</div>
          </div>

          <div>
            <div className="text-neutral-500">{ui?.landArea || "Land Area (m²)"}</div>
            <div>{listing.landArea || "-"}</div>
          </div>

          <div>
            <div className="text-neutral-500">{ui?.floorArea || "Building Area (m²)"}</div>
            <div>{listing.floorArea || "-"}</div>
          </div>

          <div>
            <div className="text-neutral-500">{ui?.solar || "Solar Power / Wattage"}</div>
            <div>{listing.solarWattage || "-"}</div>
          </div>

          <div>
            <div className="text-neutral-500">{ui?.evInstalled || "EV Charger Installed"}</div>
            <div>{listing.evCharger ? (ui?.evYes || "Yes") : (ui?.evNo || "No")}</div>
          </div>

          <div className="col-span-2">
            <div className="text-neutral-500">{ui?.openDate || "Open Date"}</div>
            <div>{fmtSchedule(listing.openDate, listing.sH, listing.sM, listing.sAP, listing.eH, listing.eM, listing.eAP)}</div>
          </div>
        </div>

        {/* Agent / Agency strip */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            {(agents.length ? agents : [{}, {}]).slice(0, 2).map((a, i) => (
              <div
                key={`ag-${i}`}
                className="h-8 w-8 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100"
                aria-label={`Agent ${i + 1}`}
              >
                {a?.avatarUrl ? (
                  <img src={a.avatarUrl} className="h-full w-full object-cover" alt={`Agent ${i + 1}`} />
                ) : null}
              </div>
            ))}
          </div>
          <div className="ml-1 flex items-center -space-x-2">
            {(agencies.length ? agencies : [{}, {}]).slice(0, 2).map((ag, i) => (
              <div
                key={`co-${i}`}
                className="h-8 w-8 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100"
                aria-label={`Agency ${i + 1}`}
              >
                {ag?.logoUrl ? (
                  <img src={ag.logoUrl} className="h-full w-full object-contain p-0.5" alt={`Agency ${i + 1}`} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
