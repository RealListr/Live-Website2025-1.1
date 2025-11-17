"use client";

import { useEffect, useState } from "react";

type DemoListing = {
  id: string;
  languageLabel: string;
  languageTag: string;
  headline: string;
  address: string;
  price: string;
  description: string;
};

const demoListings: DemoListing[] = [
  {
    id: "zh",
    languageLabel: "中文（简体）",
    languageTag: "Mandarin",
    headline: "光线充足的高层公寓，步行可达城市生活",
    address: "Level 23, 88 Harbour Street, Sydney NSW",
    price: "拍卖 / Auction",
    description:
      "为华语买家提供专业中文说明与图片说明，一键生成多语言展示。",
  },
  {
    id: "ar",
    languageLabel: "العربية",
    languageTag: "Arabic",
    headline: "شقة عائلية أنيقة مع إطلالة على الأفق",
    address: "15 Ocean View Drive, Brighton VIC",
    price: "للاسترشاد بالسعر – Contact Agent",
    description:
      "عرض مخصص باللغة العربية يساعدك على الوصول للمشترين والمستثمرين الجدد.",
  },
  {
    id: "hi",
    languageLabel: "हिन्दी",
    languageTag: "Hindi",
    headline: "धूप से भरपूर अपार्टमेंट, स्कूल और ट्रांसपोर्ट के पास",
    address: "302/15 Riverbank Road, Parramatta NSW",
    price: "From $795,000",
    description:
      "हिन्दी विवरण के साथ आपकी लिस्टिंग सीधे समुदाय तक पहुँचती है, बिना अतिरिक्त कॉपीराइटिंग के।",
  },
  {
    id: "en",
    languageLabel: "English",
    languageTag: "English",
    headline: "Corner penthouse with skyline and harbour views",
    address: "PH01, 1 RealListr Place, Sydney NSW",
    price: "EOI – Expressions of Interest",
    description:
      "A single RealListr card, shared in English and translated into multiple languages in minutes.",
  },
];

function ListingSlide({ listing }: { listing: DemoListing }) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-neutral-500">
        <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Multi-language preview
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-50 px-2 py-1 text-[11px]">
          <span>{listing.languageLabel}</span>
          <span className="text-neutral-400">· {listing.languageTag}</span>
        </span>
      </div>

      {/* “Image” strip placeholder */}
      <div className="mb-4 h-40 w-full rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
        <div className="flex h-full w-full flex-col justify-between p-3 text-xs text-white/80">
          <div className="inline-flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium">
              RealListr card preview
            </span>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 w-28 rounded-full bg-white/20" />
            <div className="h-1.5 w-20 rounded-full bg-white/10" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {listing.price}
        </div>
        <h3 className="text-sm font-semibold leading-snug text-neutral-900">
          {listing.headline}
        </h3>
        <p className="text-xs text-neutral-600">{listing.address}</p>
        <p className="mt-2 text-xs text-neutral-600">{listing.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-dashed border-neutral-200 pt-3 text-[11px] text-neutral-500">
        <span>Generated with RealListr</span>
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Multi-language ready
        </span>
      </div>
    </div>
  );
}

export default function SellRealListrPage() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % demoListings.length);
        setFading(false);
      }, 250); // fade-out
    }, 3500); // time each card stays

    return () => clearInterval(interval);
  }, []);

  const current = demoListings[index];

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row lg:items-center">
      {/* LEFT: sales copy */}
      <section className="w-full lg:w-1/2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Sell RealListr into your network.
        </h1>
        <p className="mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
          RealListr turns one listing into a multi-language campaign — without
          extra copywriting, design, or tech setup. Show agents and offices how
          your properties can speak to buyers in their own language.
        </p>

        <div className="mt-6 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              For trainers &amp; BDMs
            </div>
            <p className="mt-1 text-sm">
              Run a short RealListr demo in-office and leave them with a live
              property card link they can share that same day.
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              For growth partners
            </div>
            <p className="mt-1 text-sm">
              Introduce RealListr to your agent network and earn from
              subscriptions and campaign spend over time.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm text-neutral-700">
          <p>Use this page when you’re:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Running a quick office demo or Zoom walkthrough</li>
            <li>Sending RealListr to an agent before a follow-up call</li>
            <li>Explaining multi-language cards to a director or BDM</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@reallistr.com.au?subject=Sell%20RealListr"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            Email RealListr
          </a>
          <span className="text-xs text-neutral-500">
            We’ll reply with partner options and launch timelines.
          </span>
        </div>
      </section>

      {/* RIGHT: fading multilingual card preview */}
      <section className="flex w-full justify-center lg:w-1/2">
        <div className="relative w-full max-w-md">
          <div
            className={`transition-opacity duration-300 ${
              fading ? "opacity-0" : "opacity-100"
            }`}
          >
            <ListingSlide listing={current} />
          </div>

          {/* dots under the card */}
          <div className="mt-3 flex justify-center gap-1.5">
            {demoListings.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setFading(false);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-neutral-900"
                    : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Show ${l.languageLabel} preview`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
