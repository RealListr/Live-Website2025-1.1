// @ts-nocheck
// Dev-only local store for listings (evicting, compact)
const KEY = "rl:listings:v2";     // single compact key
const MAX = 50;                   // keep the most recent N items

type Listing = any;

function readAll(): Listing[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) || [];
  } catch {
    return [];
  }
}

function writeAll(list: Listing[]) {
  // Evict oldest if over MAX
  const trimmed = list.slice(-MAX);
  localStorage.setItem(KEY, JSON.stringify(trimmed));
}

export function saveListing(slug: string, data: Listing) {
  const all = readAll().filter(x => x?.slug !== slug);
  all.push({ ...data, slug, _ts: Date.now() });
  writeAll(all);
  return { ok: true, slug };
}

export function getListing(slug: string) {
  return readAll().find(x => x?.slug === slug) || null;
}

export function getRecentListings(limit = 36) {
  return readAll()
    .sort((a, b) => (b?._ts || 0) - (a?._ts || 0))
    .slice(0, limit);
}
