// src/lib/publishToFeed.ts
// @ts-nocheck

/** Canonical local/session keys — keep these in sync across the app */
const LIST_KEY       = "reallistr_feed_v1min";            // rolling list (compact)
const PTR_KEY        = "reallistr_latest_slug";           // last-published slug
const SESS_LIST_KEY  = "reallistr_feed_v1min_sess";       // session fallback
const LAST_KEY       = "reallistr_last_record_min";       // last tiny record (optional)
const SESS_LAST_KEY  = "reallistr_last_record_min_sess";  // session fallback

/* ---------------- helpers (safe, no-throw) ---------------- */
const jget = (store: Storage, key: string) => {
  try { return JSON.parse(store.getItem(key) || "null"); } catch { return null; }
};
const jset = (store: Storage, key: string, val: any) => {
  try { store.setItem(key, JSON.stringify(val)); return true; } catch { return false; }
};
const tset = (store: Storage, key: string, val: string) => {
  try { store.setItem(key, val); return true; } catch { return false; }
};

const slugBase = (listing: any) =>
  String(listing?.address?.place_name || "listing")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const cleanUrl = (u?: string) => (u && /^https?:\/\//i.test(u) ? u : ""); // strip data: urls entirely

function cleanListing(listing: any) {
  const gallery = (listing?.media?.gallery || []).map(cleanUrl).filter(Boolean);
  const lead = cleanUrl(listing?.media?.lead) || gallery[0] || "";
  return {
    ...listing,
    media: { ...listing.media, lead, gallery },
  };
}

/* -------------- main API -------------- */
export function publishToFeed(listing: any, agents: any[], agencies: any[], lang: string) {
  // build record (ensure URLs only)
  const slug = `${slugBase(listing)}-${Math.random().toString(36).slice(2, 7)}`;
  const record = {
    slug,
    lang,
    listing: cleanListing(listing),
    agents,
    agencies,
    createdAt: Date.now(),
  };

  // keep full record in-memory for this tab
  (window as any).__REAL_FEED ||= {};
  (window as any).__REAL_FEED[slug] = record;

  // write pointer first so Live View can resolve immediately
  tset(localStorage, PTR_KEY, slug) || tset(sessionStorage, PTR_KEY, slug);

  // write rolling list (dedupe, cap)
  try {
    const raw = jget(localStorage, LIST_KEY);
    const arr = Array.isArray(raw) ? raw : [];
    const next = [record, ...arr.filter((x: any) => x?.slug !== slug)].slice(0, 50);
    if (!jset(localStorage, LIST_KEY, next)) {
      // quota → keep a tiny list in sessionStorage so Live View still works
      jset(sessionStorage, SESS_LIST_KEY, [record]);
    }
  } catch {
    jset(sessionStorage, SESS_LIST_KEY, [record]);
  }

  // optional “last record” tiny cache
  jset(localStorage, LAST_KEY, { slug, lang, createdAt: record.createdAt }) ||
    jset(sessionStorage, SESS_LAST_KEY, { slug, lang, createdAt: record.createdAt });

  // never bubble quota errors
  return { ok: true, slug };
}

/** Reader used by /p/[slug] and the home feed */
export function getFeedRecordBySlug(slug: string) {
  // 1) in-memory (same tab)
  const mem = (window as any).__REAL_FEED?.[slug];
  if (mem) return mem;

  // 2) local rolling list
  const list = jget(localStorage, LIST_KEY);
  if (Array.isArray(list)) {
    const hit = list.find((x: any) => x?.slug === slug);
    if (hit) return hit;
  }

  // 3) session fallback
  const slist = jget(sessionStorage, SESS_LIST_KEY);
  if (Array.isArray(slist)) {
    const hit = slist.find((x: any) => x?.slug === slug);
    if (hit) return hit;
  }

  return null;
}
