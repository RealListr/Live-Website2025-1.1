// src/app/page.tsx
// @ts-nocheck
"use client";

import Link from "next/link";

function Logo({ className = "h-14" }) {
  // Renders an inline SVG wordmark. If you add /public/reallistr.svg later,
  // you can swap this component to <img src="/reallistr.svg" ... />
  return (
    <svg viewBox="0 0 860 180" className={className} aria-label="RealListr">
      <text x="0" y="130" fontFamily="system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif"
            fontWeight="800" fontSize="140" letterSpacing="-2">
        RealListr
      </text>
    </svg>
  );
}

// src/app/page.tsx
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="text-3xl font-extrabold tracking-tight">RealListr</div>

        <div className="flex items-center gap-3">
          <a
            href="/connection-centre"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
          >
            Create Listing
          </a>
          <a
            href="/pricing"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
          >
            Pricing
          </a>
        </div>
      </div>

      {/* Hero */}
      <section className="mt-14 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">RealListr</h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          Create beautiful multi-language property cards in minutes. Publish once, share anywhere.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="/connection-centre"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            + New Listing
          </a>
          <a
            href="/pricing"
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
          >
            Subscriptions
          </a>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mt-14 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <div className="text-sm font-semibold">Multi-language</div>
          <div className="mt-1 text-sm text-neutral-600">English + Arabic + 中文 + more</div>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <div className="text-sm font-semibold">One-click Publish</div>
          <div className="mt-1 text-sm text-neutral-600">Share a clean public link</div>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5">
          <div className="text-sm font-semibold">Agent &amp; Agency</div>
          <div className="mt-1 text-sm text-neutral-600">Avatars and co-branding</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 flex items-center justify-between border-t border-neutral-200 pt-6 text-sm text-neutral-600">
        <div>© {new Date().getFullYear()} RealListr</div>
        <nav className="flex items-center gap-4">
          <a className="hover:underline" href="/legal/terms">Terms</a>
          <a className="hover:underline" href="/legal/privacy">Privacy</a>
          <a className="hover:underline" href="/create-listing">Create Listing</a>
        </nav>
      </footer>
    </main>
  );
}

