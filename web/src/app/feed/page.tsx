// src/app/feed/page.tsx
// @ts-nocheck
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import MainFeedCard from "@/components/MainFeedCard";
import { getRecentListings } from "@/lib/store";

/* ---------------------- UI labels (small) ---------------------- */
const UI = {
  en: { solar: "Solar Power / Wattage", evInstalled: "EV Charger Installed", evYes: "Yes", evNo: "No" },
  "zh-Hans": { solar: "太阳能 / 功率", evInstalled: "是否安装EV充电", evYes: "是", evNo: "否" },
  yue: { solar: "太陽能 / 功率", evInstalled: "是否安裝EV充電", evYes: "是", evNo: "否" },
  vi: { solar: "Điện mặt trời / Công suất", evInstalled: "Có sẵn sạc EV", evYes: "Có", evNo: "Không" },
  ar: { solar: "الطاقة الشمسية / الواط", evInstalled: "شاحن EV مثبت", evYes: "نعم", evNo: "لا" },
};

/* ---------------------- Domain labels (campaign/type) ---------------------- */
const LABELS = {
  en: {
    campaign: {
      "For Sale": "For Sale",
      Auction: "Auction",
      "Private Treaty": "Private Treaty",
      EOI: "EOI (Expression of Interest)",
      Sold: "Sold",
      "Sold by Auction": "Sold by Auction",
      "Under Contract": "Under Contract",
      "Under Negotiation": "Under Negotiation",
      Tender: "Tender",
      Leasing: "Leasing",
      "For Rent": "For Rent",
      "Off Market": "Off Market",
      "Pre Market": "Pre Market",
      "Open to Offers": "Open to Offers",
      "Mortgage in Possession": "Mortgage in Possession",
      "Secret Sale": "Secret Sale",
      "Secret Auction": "Secret Auction",
    },
    type: { Apartment: "Apartment", Villa: "Villa", Office: "Office" },
  },
  "zh-Hans": {
    campaign: {
      "For Sale": "出售",
      Auction: "拍卖",
      "Private Treaty": "私下洽谈",
      EOI: "意向征集",
      Sold: "已售",
      "Sold by Auction": "拍卖成交",
      "Under Contract": "已签约",
      "Under Negotiation": "谈判中",
      Tender: "招标",
      Leasing: "租赁",
      "For Rent": "出租",
      "Off Market": "非公开市场",
      "Pre Market": "预上市",
      "Open to Offers": "接受报价",
      "Mortgage in Possession": "按揭接管",
      "Secret Sale": "私密销售",
      "Secret Auction": "私密拍卖",
    },
    type: { Apartment: "公寓", Villa: "别墅", Office: "办公室" },
  },
  yue: {
    campaign: {
      "For Sale": "出售",
      Auction: "拍賣",
      "Private Treaty": "私下議價",
      EOI: "意向書",
      Sold: "已售",
      "Sold by Auction": "拍賣售出",
      "Under Contract": "已簽約",
      "Under Negotiation": "議價中",
      Tender: "招標",
      Leasing: "租賃",
      "For Rent": "出租",
      "Off Market": "非公開",
      "Pre Market": "預上市",
      "Open to Offers": "歡迎出價",
      "Mortgage in Possession": "銀行接管",
      "Secret Sale": "私密放售",
      "Secret Auction": "私密拍賣",
    },
    type: { Apartment: "單位", Villa: "洋房", Office: "辦公室" },
  },
  vi: {
    campaign: {
      "For Sale": "Bán",
      Auction: "Đấu giá",
      "Private Treaty": "Thỏa thuận riêng",
      EOI: "Bày tỏ quan tâm",
      Sold: "Đã bán",
      "Sold by Auction": "Bán qua đấu giá",
      "Under Contract": "Đang trong hợp đồng",
      "Under Negotiation": "Đang thương lượng",
      Tender: "Chào thầu",
      Leasing: "Cho thuê",
      "For Rent": "Cho thuê",
      "Off Market": "Ngoài thị trường",
      "Pre Market": "Trước khi lên thị trường",
      "Open to Offers": "Mở nhận đề nghị",
      "Mortgage in Possession": "Tài sản do ngân hàng nắm giữ",
      "Secret Sale": "Bán kín",
      "Secret Auction": "Đấu giá kín",
    },
    type: { Apartment: "Căn hộ", Villa: "Biệt thự", Office: "Văn phòng" },
  },
  ar: {
    campaign: {
      "For Sale": "للبيع",
      Auction: "مزاد",
      "Private Treaty": "اتفاق خاص",
      EOI: "إبداء اهتمام",
      Sold: "تم البيع",
      "Sold by Auction": "تم البيع بالمزاد",
      "Under Contract": "قيد العقد",
      "Under Negotiation": "قيد التفاوض",
      Tender: "مناقصة",
      Leasing: "تأجير",
      "For Rent": "للإيجار",
      "Off Market": "خارج السوق",
      "Pre Market": "قبل الطرح",
      "Open to Offers": "مفتوح للعروض",
      "Mortgage in Possession": "تحت حيازة البنك",
      "Secret Sale": "بيع سري",
      "Secret Auction": "مزاد سري",
    },
    type: { Apartment: "شقة", Villa: "فيلا", Office: "مكتب" },
  },
};

const tDict = (lang: string, group: "campaign" | "type", value: string) =>
  (LABELS as any)?.[lang]?.[group]?.[value] ||
  (LABELS as any)?.en?.[group]?.[value] ||
  value;

/* ---------------------- Page ---------------------- */
const LANGS = [
  { code: "en", label: "English" },
  { code: "zh-Hans", label: "中文（简体）Mandarin" },
  { code: "yue", label: "粵語 Cantonese" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ar", label: "العربية Arabic" },
];

export default function FeedPage() {
  const [lang, setLang] = useState("en");
  const ui = UI[lang] || UI.en;
  const rtl = lang === "ar";

  // dev store (swap to real DB later)
  const listings = useMemo(() => (getRecentListings(36) || []).filter(Boolean), []);

  return (
    <div className="p-5 space-y-4" dir={rtl ? "rtl" : "ltr"}>
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-[-0.01em]">Discover Properties</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-600">Language</label>
          <select
            className="rounded-md border border-neutral-300 px-3 py-1 text-sm"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {listings.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-6 text-neutral-500">
          No listings yet. Check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((item) => (
            <Link key={item.slug} href={`/p/${item.slug}?lang=${lang}`} className="block">
              <MainFeedCard
                listing={item}
                lang={lang}
                ui={ui}   // current language slice
                UI={UI}   // full dict for any UI[lang] lookups
                tDict={tDict}
                agents={item.agents || []}
                agencies={item.agencies || []}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
