// src/app/connection-centre/page.tsx
// @ts-nocheck
"use client";

import React, { useMemo, useRef, useState } from "react";
import MainFeedCard from "@/components/MainFeedCard";
import { publishToFeed } from "@/lib/publishToFeed";
// …your existing imports…
import { uploadMany } from "@/lib/uploadMedia";


/* ---------- Languages (UI labels; can expand anytime) ---------- */
const LANGS = [
  { code: "en", label: "English" },
  { code: "zh-Hans", label: "中文（简体）Mandarin" },
  { code: "yue", label: "粵語 Cantonese" },
  { code: "pa", label: "ਪੰਜਾਬੀ Punjabi" },
  { code: "vi", label: "Tiếng Việt" },
  { code: "ar", label: "العربية Arabic" },
];

const UI: Record<string, any> = {
  en: {
    connectionCentre: "Connection Centre",
    languagePreset: "Language Preset",
    addAgent: "+ Add Agent",
    addAgency: "+ Add Agency",
    agencyPlaceholder: "Agency",
    price: "Price",
    address: "Address",
    beds: "Beds",
    baths: "Baths",
    cars: "Cars",
    type: "Property Type",
    campaign: "Campaign",
    campaignDetail: "Campaign detail (optional)",
    zoning: "Property Zoning",
    landArea: "Land Area (m²)",
    floorArea: "Building Area (m²)",
    nabers: "NABERS",
    solar: "Solar Power / Wattage",
    evInstalled: "EV Charger Installed",
    media: "Media",
    images: "Images (lead + gallery)",
    videos: "Videos",
    listr: "ListrCutz",
    propertyDetails: "Property Details",
    openDate: "Open Date",
    start: "Start",
    end: "End",
    descEN: "Property Description (EN)",
    upload: "Upload",
    close: "Close",
    preview: "Preview (not public)",
    publish: "Publish",
    viewLive: "View Live",
  },
  "zh-Hans": {
    connectionCentre: "连接中心",
    languagePreset: "语言预设",
    addAgent: "+ 添加经纪人",
    addAgency: "+ 添加机构",
    agencyPlaceholder: "机构",
    price: "价格",
    address: "地址",
    beds: "卧室",
    baths: "浴室",
    cars: "车位",
    type: "物业类型",
    campaign: "营销活动",
    campaignDetail: "活动详情（可选）",
    zoning: "规划分区",
    landArea: "土地面积（m²）",
    floorArea: "建筑面积（m²）",
    nabers: "NABERS",
    solar: "太阳能 / 功率",
    evInstalled: "是否安装EV充电",
    media: "媒体",
    images: "图片（封面 + 图集）",
    videos: "视频",
    listr: "ListrCutz",
    propertyDetails: "物业详情",
    openDate: "开放日期",
    start: "开始",
    end: "结束",
    descEN: "物业描述（英文）",
    upload: "上传",
    close: "关闭",
    preview: "预览（非公开）",
    publish: "发布",
    viewLive: "查看公开页",
  },
  yue: {
    connectionCentre: "連接中心",
    languagePreset: "語言預設",
    addAgent: "+ 加入代理",
    addAgency: "+ 加入機構",
    agencyPlaceholder: "機構",
    price: "價格",
    address: "地址",
    beds: "睡房",
    baths: "浴室",
    cars: "車位",
    type: "物業類型",
    campaign: "銷售活動",
    campaignDetail: "活動詳情（可選）",
    zoning: "規劃分區",
    landArea: "土地面積（m²）",
    floorArea: "建築面積（m²）",
    nabers: "NABERS",
    solar: "太陽能 / 功率",
    evInstalled: "是否安裝EV充電",
    media: "媒體",
    images: "圖片（封面＋圖庫）",
    videos: "影片",
    listr: "ListrCutz",
    propertyDetails: "物業詳情",
    openDate: "開放日期",
    start: "開始",
    end: "結束",
    descEN: "物業描述（英文）",
    upload: "上載",
    close: "關閉",
    preview: "預覽（非公開）",
    publish: "發佈",
    viewLive: "查看公開頁",
  },
  pa: {
    connectionCentre: "ਕਨੇਕਸ਼ਨ ਸੈਂਟਰ",
    languagePreset: "ਭਾਸ਼ਾ ਪ੍ਰੀਸੈੱਟ",
    addAgent: "+ ਏਜੰਟ ਜੋੜੋ",
    addAgency: "+ ਏਜੰਸੀ ਜੋੜੋ",
    agencyPlaceholder: "ਏਜੰਸੀ",
    price: "ਕੀਮਤ",
    address: "ਪਤਾ",
    beds: "ਬੈੱਡ",
    baths: "ਬਾਥ",
    cars: "ਕਾਰ ਸਪੇਸ",
    type: "ਪਰਾਪਰਟੀ ਕਿਸਮ",
    campaign: "ਕੈਂਪੇਨ",
    campaignDetail: "ਕੈਂਪੇਨ ਵੇਰਵਾ (ਵਿਕਲਪਿਕ)",
    zoning: "ਜ਼ੋਨਿੰਗ",
    landArea: "ਜ਼ਮੀਨ ਖੇਤਰ (m²)",
    floorArea: "ਬਿਲਡਿੰਗ ਖੇਤਰ (m²)",
    nabers: "NABERS",
    solar: "ਸੋਲਰ / ਵਾਟੇਜ",
    evInstalled: "EV ਚਾਰਜਰ ਲੱਗਿਆ",
    media: "ਮੀਡੀਆ",
    images: "ਤਸਵੀਰਾਂ (ਲੀਡ + ਗੈਲਰੀ)",
    videos: "ਵੀਡੀਓ",
    listr: "ListrCutz",
    propertyDetails: "ਪਰਾਪਰਟੀ ਵੇਰਵੇ",
    openDate: "ਓਪਨ ਤਾਰੀਖ",
    start: "ਸ਼ੁਰੂ",
    end: "ਖਤਮ",
    descEN: "ਪਰਾਪਰਟੀ ਵੇਰਵਾ (EN)",
    upload: "ਅਪਲੋਡ",
    close: "ਬੰਦ",
    preview: "ਪ੍ਰੀਵਿਊ (ਪਬਲਿਕ ਨਹੀਂ)",
    publish: "ਪਬਲਿਸ਼",
    viewLive: "ਲਾਈਵ ਵੇਖੋ",
  },
  vi: {
    connectionCentre: "Trung tâm Kết nối",
    languagePreset: "Ngôn ngữ mặc định",
    addAgent: "+ Thêm Môi giới",
    addAgency: "+ Thêm Đại lý",
    agencyPlaceholder: "Đại lý",
    price: "Giá",
    address: "Địa chỉ",
    beds: "Phòng ngủ",
    baths: "Phòng tắm",
    cars: "Chỗ đậu xe",
    type: "Loại bất động sản",
    campaign: "Chiến dịch",
    campaignDetail: "Chi tiết chiến dịch (tùy chọn)",
    zoning: "Quy hoạch",
    landArea: "Diện tích đất (m²)",
    floorArea: "Diện tích sàn (m²)",
    nabers: "NABERS",
    solar: "Điện mặt trời / Công suất",
    evInstalled: "Có sẵn sạc EV",
    media: "Phương tiện",
    images: "Hình ảnh (ảnh bìa + thư viện)",
    videos: "Video",
    listr: "ListrCutz",
    propertyDetails: "Chi tiết bất động sản",
    openDate: "Ngày mở cửa",
    start: "Bắt đầu",
    end: "Kết thúc",
    descEN: "Mô tả (EN)",
    upload: "Tải lên",
    close: "Đóng",
    preview: "Xem thử (không công khai)",
    publish: "Đăng",
    viewLive: "Xem trang công khai",
  },
  ar: {
    connectionCentre: "مركز الاتصال",
    languagePreset: "إعداد اللغة",
    addAgent: "+ إضافة وكيل",
    addAgency: "+ إضافة وكالة",
    agencyPlaceholder: "الوكالة",
    price: "السعر",
    address: "العنوان",
    beds: "غرف",
    baths: "حمامات",
    cars: "مواقف",
    type: "نوع العقار",
    campaign: "الحملة",
    campaignDetail: "تفاصيل الحملة (اختياري)",
    zoning: "التصنيف",
    landArea: "مساحة الأرض (م²)",
    floorArea: "مساحة البناء (م²)",
    nabers: "NABERS",
    solar: "الطاقة الشمسية / الواط",
    evInstalled: "شاحن EV مثبت",
    media: "الوسائط",
    images: "الصور (الغلاف + المعرض)",
    videos: "الفيديو",
    listr: "ListrCutz",
    propertyDetails: "تفاصيل العقار",
    openDate: "تاريخ الفتح",
    start: "البداية",
    end: "النهاية",
    descEN: "وصف العقار (EN)",
    upload: "رفع",
    close: "إغلاق",
    preview: "معاينة (غير عامة)",
    publish: "نشر",
    viewLive: "عرض الصفحة العامة",
  },
};

/* ---------- Domain labels for card rendering ---------- */
const LABELS: Record<string, any> = {
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
    type: {
      Apartment: "Apartment",
      Villa: "Villa",
      Townhouse: "Townhouse",
      House: "House",
      Penthouse: "Penthouse",
      Duplex: "Duplex",
      Studio: "Studio",
      Loft: "Loft",
      Office: "Office",
      Retail: "Retail",
      Warehouse: "Warehouse",
      Land: "Land",
    },
  },
};

const tDict = (lang: string, group: "campaign" | "type", value: string) =>
  LABELS?.[lang]?.[group]?.[value] || LABELS?.en?.[group]?.[value] || value;

const label = "mb-1 block text-xs font-medium text-neutral-600";
const ic =
  "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10";

const TYPE_OPTIONS = [
  "Apartment",
  "Villa",
  "Townhouse",
  "House",
  "Penthouse",
  "Duplex",
  "Studio",
  "Loft",
  "Office",
  "Retail",
  "Warehouse",
  "Land",
];

const CAMPAIGN_OPTIONS = [
  "For Sale",
  "Auction",
  "Private Treaty",
  "EOI",
  "Sold",
  "Sold by Auction",
  "Under Contract",
  "Under Negotiation",
  "Tender",
  "Leasing",
  "For Rent",
  "Off Market",
  "Pre Market",
  "Open to Offers",
  "Mortgage in Possession",
  "Secret Sale",
  "Secret Auction",
];

/* ---------- tiny helpers ---------- */
async function filesToDataURLs(fileList: FileList | null) {
  if (!fileList?.length) return [];
  const files = Array.from(fileList);
  return await Promise.all(
    files.map(
      (f) =>
        new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result || ""));
          r.onerror = reject;
          r.readAsDataURL(f);
        })
    )
  );
}

/* ---------- small upload widgets ---------- */
function CircleUpload({ size = 84, src, alt, onPick, uploadLabel }: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const px = `${size}px`;
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-neutral-200 bg-white shadow-sm"
      style={{ width: px, height: px }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={async (e) => {
        e.preventDefault();
        const u = await filesToDataURLs(e.dataTransfer?.files || null);
        if (u.length) onPick(u[0]);
      }}
      role="button"
      aria-label={alt}
      onClick={() => inputRef.current?.click()}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="eager" />
      ) : (
        <div className="text-[11px] uppercase tracking-wide text-neutral-400">{uploadLabel}</div>
      )}
      <button
        type="button"
        className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border border-neutral-200 bg-white text-sm font-semibold shadow-sm"
      >
        +
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const u = await filesToDataURLs(e.target.files || null);
          if (u.length) onPick(u[0]);
        }}
      />
    </div>
  );
}

function SquareUpload({ size = 80, src, alt, onPick, placeholder }: any) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const px = `${size}px`;
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
      style={{ width: px, height: px }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={async (e) => {
        e.preventDefault();
        const u = await filesToDataURLs(e.dataTransfer?.files || null);
        if (u.length) onPick(u[0]);
      }}
      role="button"
      aria-label={alt}
      onClick={() => inputRef.current?.click()}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-contain p-1" loading="eager" />
      ) : (
        <div className="text-[10px] uppercase tracking-wide text-neutral-400">{placeholder}</div>
      )}
      <button
        type="button"
        className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border border-neutral-200 bg-white text-sm font-semibold shadow-sm"
      >
        +
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const u = await filesToDataURLs(e.target.files || null);
          if (u.length) onPick(u[0]);
        }}
      />
    </div>
  );
}

/* ---------- page ---------- */
export default function ConnectionCentrePage() {
  const [agents, setAgents] = useState([{ name: "Aisha Patel", avatarUrl: "" }]);
  const [agencies, setAgencies] = useState([{ logoUrl: "" }]);

  const [langPreset, setLangPreset] = useState("en");
  const lang = langPreset;
  const ui = UI[lang] || UI.en;
  const rtl = lang === "ar";

  const [content, setContent] = useState<any>({
    campaign: "For Sale",
    campaignDetail: "",
    price: "AUD 4,250,000",
    type: "Apartment",
    zoning: "",
    address: { place_name: "One JLT, Jumeirah Lake Towers" },
    beds: 2,
    baths: 2,
    cars: 1,
    landArea: "",
    floorArea: "",
    nabers: 0,
    solarWattage: "",
    evCharger: false,
    descriptions: {
      en: "Elegant 2-bed in JLT with south light and EV charging.",
      "zh-Hans": "优雅的两居室，采光充足，配备电动车充电。",
      yue: "優雅兩房，採光充足，設有電動車充電。",
      pa: "ਸੁਹਣਾ 2-ਬੈੱਡ JLT ਘਰ, ਵਧੀਆ ਰੌਸ਼ਨੀ ਅਤੇ EV ਚਾਰਜਿੰਗ ਨਾਲ。",
      vi: "Căn hộ 2 phòng ngủ thanh lịch tại JLT, nhiều ánh sáng và có sạc EV.",
      ar: "شقة أنيقة بغرفتي نوم في JLT مع إضاءة جنوبية وشحن مركبات كهربائية.",
    },
    media: { lead: "", gallery: [] as string[], videos: [] as string[], listrcutz: [] as string[] },
    openDate: "",
    sH: "11",
    sM: "15",
    sAP: "AM",
    eH: "11",
    eM: "45",
    eAP: "AM",
  });

  const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

  /* ---------- computed chips for preview (optional) ---------- */
  const chips = useMemo(() => {
    const items: string[] = [];
    items.push(`🛏 ${content.beds} ${ui.beds?.toLowerCase?.() || "bed"}`);
    items.push(`🛁 ${content.baths} ${ui.baths?.toLowerCase?.() || "bath"}`);
    items.push(`🚗 ${content.cars} ${ui.cars?.toLowerCase?.() || "car"}`);
    if (content.landArea) items.push(`m² ${content.landArea} ${ui.landArea?.toLowerCase?.() || "land"}`);
    if (content.floorArea) items.push(`m² ${content.floorArea} ${ui.floorArea?.toLowerCase?.() || "bldg"}`);
    return items;
  }, [content, ui]);

  /* ---------- uploads ---------- */

// Images
const onPickImage = async (files: FileList | null) => {
  const urls = await uploadMany(files, "images");
  if (!urls.length) return;
  setContent((p: any) => ({
    ...p,
    media: {
      ...p.media,
      lead: p.media.lead || urls[0],
      gallery: [...(p.media.gallery || []), ...urls],
    },
  }));
};
// Videos
const onPickVideo = async (files: FileList | null) => {
  const urls = await uploadMany(files, "videos");
  if (!urls.length) return;
  setContent((p: any) => ({ ...p, media: { ...p.media, videos: [...(p.media.videos || []), ...urls] } }));
};
// ListrCutz
const onPickListr = async (files: FileList | null) => {
  const urls = await uploadMany(files, "listrcutz");
  if (!urls.length) return;
  setContent((p: any) => ({ ...p, media: { ...p.media, listrcutz: [...(p.media.listrcutz || []), ...urls] } }));
};


  return (
    <div className="space-y-6 p-5" dir={rtl ? "rtl" : "ltr"}>
      {/* Language preset */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <label className="text-sm font-medium">{ui.languagePreset}</label>
        <select
          className="ml-2 rounded-md border border-neutral-300 px-3 py-1 text-sm"
          value={langPreset}
          onChange={(e) => setLangPreset(e.target.value)}
        >
          {LANGS.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      {/* Header strip: agents/agencies + summary */}
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-4 px-5 py-4">
          <div className="flex items-center gap-2">
            {agents.map((a, i) => (
              <div key={i} className="flex items-center gap-2">
                <CircleUpload
                  size={84}
                  src={a.avatarUrl}
                  alt={`Agent ${i + 1} avatar`}
                  uploadLabel={ui.upload}
                  onPick={(url: string) =>
                    setAgents((list) => list.map((x, ix) => (ix === i ? { ...x, avatarUrl: url } : x)))
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="ml-1 h-8 rounded-full border border-neutral-300 px-3 text-xs"
              onClick={() => setAgents((l) => [...l, { name: `Agent ${l.length + 1}`, avatarUrl: "" }])}
            >
              {ui.addAgent}
            </button>
          </div>

          <div className="ml-3 flex items-center gap-2">
            {agencies.map((ag, i) => (
              <SquareUpload
                key={i}
                size={80}
                src={ag.logoUrl}
                alt={`Agency ${i + 1} logo`}
                placeholder={ui.agencyPlaceholder}
                onPick={(url: string) =>
                  setAgencies((list) => list.map((x, ix) => (ix === i ? { ...x, logoUrl: url } : x)))
                }
              />
            ))}
            {agencies.length < 2 && (
              <button
                type="button"
                className="ml-1 h-8 rounded-full border border-neutral-300 px-3 text-xs"
                onClick={() => setAgencies((l) => [...l, { logoUrl: "" }])}
              >
                {ui.addAgency}
              </button>
            )}
          </div>

          <div className="ml-auto min-w-0 text-right">
            <div className="text-[11px] text-neutral-500">{content.address?.place_name || ""}</div>
            <div className="text-[16px] font-semibold tracking-[-0.01em] text-neutral-900">{content.price || "-"}</div>
          </div>
        </div>
      </div>

      {/* ===== Listing Basics ===== */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">Listing Basics</div>

        <div className="grid grid-cols-12 gap-3">
          <label className="col-span-12 md:col-span-4">
            <span className={label}>{ui.price}</span>
            <input className={ic} value={content.price} onChange={(e) => setContent({ ...content, price: e.target.value })} />
          </label>

          <label className="col-span-12 md:col-span-8">
            <span className={label}>{ui.address}</span>
            <input
              className={ic}
              value={content.address?.place_name || ""}
              onChange={(e) => setContent({ ...content, address: { place_name: e.target.value } })}
            />
          </label>

          <label className="col-span-4 md:col-span-2">
            <span className={label}>{ui.beds}</span>
            <input
              type="number"
              min={0}
              className={ic}
              value={content.beds}
              onChange={(e) => setContent({ ...content, beds: Number(e.target.value || 0) })}
            />
          </label>

          <label className="col-span-4 md:col-span-2">
            <span className={label}>{ui.baths}</span>
            <input
              type="number"
              min={0}
              className={ic}
              value={content.baths}
              onChange={(e) => setContent({ ...content, baths: Number(e.target.value || 0) })}
            />
          </label>

          <label className="col-span-4 md:col-span-2">
            <span className={label}>{ui.cars}</span>
            <input
              type="number"
              min={0}
              className={ic}
              value={content.cars}
              onChange={(e) => setContent({ ...content, cars: Number(e.target.value || 0) })}
            />
          </label>

          <label className="col-span-6 md:col-span-3">
            <span className={label}>{ui.type}</span>
            <select
              className={ic}
              value={content.type}
              onChange={(e) => setContent({ ...content, type: e.target.value })}
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {tDict(lang, "type", t)}
                </option>
              ))}
            </select>
          </label>

          <label className="col-span-6 md:col-span-3">
            <span className={label}>{ui.campaign}</span>
            <select
              className={ic}
              value={content.campaign}
              onChange={(e) => setContent({ ...content, campaign: e.target.value })}
            >
              {CAMPAIGN_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {tDict(lang, "campaign", c)}
                </option>
              ))}
            </select>
          </label>

          <label className="col-span-12 md:col-span-6">
            <span className={label}>{ui.campaignDetail}</span>
            <input
              className={ic}
              value={content.campaignDetail}
              onChange={(e) => setContent({ ...content, campaignDetail: e.target.value })}
            />
          </label>

          <label className="col-span-12 md:col-span-6">
            <span className={label}>{ui.zoning}</span>
            <input className={ic} value={content.zoning} onChange={(e) => setContent({ ...content, zoning: e.target.value })} />
          </label>

          <label className="col-span-6 md:col-span-3">
            <span className={label}>{ui.landArea}</span>
            <input className={ic} value={content.landArea} onChange={(e) => setContent({ ...content, landArea: e.target.value })} />
          </label>

          <label className="col-span-6 md:col-span-3">
            <span className={label}>{ui.floorArea}</span>
            <input className={ic} value={content.floorArea} onChange={(e) => setContent({ ...content, floorArea: e.target.value })} />
          </label>

          <label className="col-span-6 md:col-span-3">
            <span className={label}>{ui.nabers}</span>
            <input
              type="number"
              min={0}
              className={ic}
              value={content.nabers}
              onChange={(e) => setContent({ ...content, nabers: Number(e.target.value || 0) })}
            />
          </label>

          <label className="col-span-6 md:col-span-3">
            <span className={label}>{ui.solar}</span>
            <input className={ic} value={content.solarWattage} onChange={(e) => setContent({ ...content, solarWattage: e.target.value })} />
          </label>

          <label className="col-span-6 md:col-span-3">
            <span className={label}>{ui.evInstalled}</span>
            <select
              className={ic}
              value={content.evCharger ? "Yes" : "No"}
              onChange={(e) => setContent({ ...content, evCharger: e.target.value === "Yes" })}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>
      </div>

      {/* ===== Media (ABOVE Preview) ===== */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">{ui.media}</div>
        <div className="grid grid-cols-12 gap-3">
          <label className="col-span-12 md:col-span-4">
            <span className={label}>{ui.images}</span>
            <input type="file" accept="image/*" multiple className={ic} onChange={(e) => onPickImage(e.target.files)} />
            {content.media.gallery.length > 0 && (
              <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                {content.media.gallery.map((u) => (
                  <button
                    key={u}
                    type="button"
                    title="Set as lead"
                    onClick={() => setContent((p: any) => ({ ...p, media: { ...p.media, lead: u } }))}
                    className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border ${
                      content.media.lead === u ? "border-black" : "border-neutral-300"
                    }`}
                    aria-pressed={content.media.lead === u}
                  >
                    <img src={u} className="h-full w-full object-cover" loading="eager" />
                  </button>
                ))}
              </div>
            )}
          </label>
          <label className="col-span-12 md:col-span-4">
            <span className={label}>{ui.videos}</span>
            <input type="file" accept="video/*" multiple className={ic} onChange={(e) => onPickVideo(e.target.files)} />
          </label>
          <label className="col-span-12 md:col-span-4">
            <span className={label}>{ui.listr}</span>
            <input
              type="file"
              accept="video/*,image/*"
              multiple
              className={ic}
              onChange={(e) => onPickListr(e.target.files)}
            />
          </label>
        </div>
      </div>

      {/* ===== Property Details (calendar + EN description) ===== */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">{ui.propertyDetails}</div>

        <div className="mt-3 grid grid-cols-12 gap-3">
          <label className="col-span-12 md:col-span-4">
            <span className={label}>{ui.openDate}</span>
            <input
              className={ic}
              type="date"
              value={content.openDate}
              onChange={(e) => setContent((p: any) => ({ ...p, openDate: e.target.value }))}
            />
          </label>

          <label className="col-span-6 md:col-span-4">
            <span className={label}>{ui.start}</span>
            <div className="grid grid-cols-3 gap-2">
              <select className={ic} value={content.sH} onChange={(e) => setContent({ ...content, sH: e.target.value })}>
                {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select className={ic} value={content.sM} onChange={(e) => setContent({ ...content, sM: e.target.value })}>
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select className={ic} value={content.sAP} onChange={(e) => setContent({ ...content, sAP: e.target.value })}>
                {["AM", "PM"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="col-span-6 md:col-span-4">
            <span className={label}>{ui.end}</span>
            <div className="grid grid-cols-3 gap-2">
              <select className={ic} value={content.eH} onChange={(e) => setContent({ ...content, eH: e.target.value })}>
                {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select className={ic} value={content.eM} onChange={(e) => setContent({ ...content, eM: e.target.value })}>
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select className={ic} value={content.eAP} onChange={(e) => setContent({ ...content, eAP: e.target.value })}>
                {["AM", "PM"].map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>

        <div className="mt-3">
          <label className="block">
            <span className={label}>{ui.descEN}</span>
            <textarea
              className={`${ic} min-h-[96px]`}
              value={content.descriptions.en || ""}
              onChange={(e) => setContent((p: any) => ({ ...p, descriptions: { ...p.descriptions, en: e.target.value } }))}
            />
          </label>
        </div>
      </div>

      {/* ===== Preview (LAST) + Publish ===== */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="mb-3 text-sm font-semibold">{ui.preview}</div>

        <MainFeedCard
          listing={content}
          lang={lang}
          ui={{
            solar: UI[lang]?.solar || UI.en.solar,
            evInstalled: UI[lang]?.evInstalled || UI.en.evInstalled,
            evYes: "Yes",
            evNo: "No",
          }}
          UI={{
            en: { solar: UI.en.solar, evInstalled: UI.en.evInstalled, evYes: "Yes", evNo: "No" },
            "zh-Hans": { solar: UI["zh-Hans"]?.solar, evInstalled: UI["zh-Hans"]?.evInstalled, evYes: "是", evNo: "否" },
            yue: { solar: UI.yue?.solar, evInstalled: UI.yue?.evInstalled, evYes: "是", evNo: "否" },
            pa: { solar: "ਸੋਲਰ / ਵਾਟੇਜ", evInstalled: "EV ਚਾਰਜਰ ਲੱਗਿਆ", evYes: "ਹਾਂ", evNo: "ਨਹੀਂ" },
            vi: { solar: "Điện mặt trời / Công suất", evInstalled: "Có sẵn sạc EV", evYes: "Có", evNo: "Không" },
            ar: { solar: "الطاقة الشمسية / الواط", evInstalled: "شاحن EV مثبت", evYes: "نعم", evNo: "لا" },
          }}
          tDict={tDict}
          agents={agents}
          agencies={agencies}
        />

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => {
              const res = publishToFeed(content, agents, agencies, lang);
              if (res?.ok) {
                setPublishedSlug(res.slug);
                alert("Published ✅");
              } else {
                alert(`Failed: ${res?.error || "Unknown error"}`);
              }
            }}
          >
            {ui.publish}
          </button>

          {publishedSlug && (
  <a
    className="rounded-md border px-3 py-2 text-sm"
    href={`/p/${encodeURIComponent(publishedSlug)}?lang=${lang}`}
    // remove target="_blank" so we stay in the same tab (ensures in-tab memory works too)
    rel="noreferrer"
  >
    {ui.viewLive}
  </a>
)}

        </div>
      </div>
    </div>
  );
}
