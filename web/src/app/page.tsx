// src/app/page.tsx
"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="flex items-center justify-between border-b px-4 py-3">
        <div className="text-lg font-bold">RealListr</div>

        <button
          className="text-2xl"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {/* MENU */}
      {menuOpen && (
        <div className="absolute right-4 top-14 z-20 w-52 rounded-lg border bg-white p-3 shadow-lg">
          <a
            href="/connection-centre"
            className="block rounded px-2 py-2 text-sm hover:bg-neutral-100"
          >
            Connection Centre (Upload)
          </a>
          <a
            href="/pricing"
            className="mt-1 block rounded px-2 py-2 text-sm hover:bg-neutral-100"
          >
            Subscriptions &amp; Advertising
          </a>
          <a
            href="/sell-reallistr"
            className="mt-1 block rounded px-2 py-2 text-sm hover:bg-neutral-100"
          >
            Sell RealListr
          </a>
        </div>
      )}

      {/* MAIN FEED – single column, bigger cards */}
      <section className="mx-auto w-full max-w-3xl px-4 py-6">
        <div className="space-y-5">
          {/* Taller placeholder cards – one per row */}
          <div className="h-64 rounded-2xl bg-neutral-200" />
          <div className="h-64 rounded-2xl bg-neutral-200" />
          <div className="h-64 rounded-2xl bg-neutral-200" />
        </div>
      </section>
    </main>
  );
}
