/* ROISection v4 — Deep Cost Breakdown + Visual Impact
   Design: Dark bg, stacked bar charts with progressive red reveal
   Strategy: Make bosses feel the pain of every hidden fee
   Tab1: 招人 vs 找我 (with all hidden hiring costs)
   Tab2: 亚马逊全费用细分 (15+ fee types, stacked red bars)
   Tab3: Shopify 隐藏费用 (monthly plan + plugins breakdown)
   Key: Bars animate red on scroll, saving counter prominent at top
   Mobile: Responsive bar charts, stacked layouts, scrollable tabs */

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) { setValue(0); return; }
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// Stacked bar segment
function StackedBar({ segments, maxVal, delay = 0, start }: {
  segments: { value: number; color: string; label: string }[];
  maxVal: number;
  delay?: number;
  start: boolean;
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const pct = (total / maxVal) * 100;
  return (
    <div style={{ height: 32, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden", position: "relative", width: "100%" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={start ? { width: `${Math.min(pct, 100)}%` } : { width: 0 }}
        transition={{ duration: 1.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ height: "100%", display: "flex", overflow: "hidden" }}
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              height: "100%",
              width: `${(seg.value / total) * 100}%`,
              background: seg.color,
              flexShrink: 0,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Single animated bar
function AnimatedBar({ pct, color, delay = 0, start }: { pct: number; color: string; delay?: number; start: boolean }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={start ? { width: `${Math.max(pct, 0.5)}%` } : { width: 0 }}
      transition={{ duration: 1.3, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ height: "100%", background: color, borderRadius: 2 }}
    />
  );
}

// Amazon fee segments for stacked bar (per ¥100 sale)
const AMAZON_FEES = [
  { key: "referral", label: "销售佣金", pct: 15, color: "#C0392B", note: "类目均值 8–15%" },
  { key: "fba", label: "FBA 配送费", pct: 12, color: "#E74C3C", note: "按重量/尺寸计，约 ¥8–20/件" },
  { key: "storage", label: "月度仓储费", pct: 3, color: "#E8604C", note: "旺季 10–12 月涨 3×" },
  { key: "inbound", label: "入库配送费", pct: 3, color: "#F0856A", note: "2024 新增，按件收取" },
  { key: "fuel", label: "燃油附加费", pct: 3.5, color: "#F4A460", note: "2026 年 4 月起 3.5%" },
  { key: "aged", label: "超龄库存费", pct: 2, color: "#F7C59F", note: "超 180 天额外收费" },
  { key: "return", label: "退货处理费", pct: 2, color: "#FDDCCC", note: "跨境退货率约 5–15%" },
  { key: "disposal", label: "销毁/移除费", pct: 1, color: "#FFE8DC", note: "滞销品处理成本" },
  { key: "ads", label: "站内广告 PPC", pct: 15, color: "#8B1A1A", note: "竞争激烈类目可达 30%+" },
  { key: "account", label: "月租费", pct: 0.5, color: "#A93226", note: "$39.99/月 ≈ ¥290" },
  { key: "prep", label: "FBA 预处理费", pct: 1, color: "#CB4335", note: "贴标/打包 ¥0.5–2/件" },
];
const AMAZON_TOTAL_PCT = AMAZON_FEES.reduce((s, f) => s + f.pct, 0); // ~58%

// Shopify fee segments
const SHOPIFY_FEES = [
  { key: "plan", label: "月费套餐", monthly: 499, color: "#2980B9", note: "Advanced ¥499/月 (年付)" },
  { key: "payment", label: "支付手续费", monthly: 300, color: "#3498DB", note: "第三方支付 0.5–2%" },
  { key: "seo", label: "SEO 插件", monthly: 198, color: "#5DADE2", note: "如 Plug In SEO / SEO Manager" },
  { key: "review", label: "评价插件", monthly: 149, color: "#7FB3D3", note: "如 Judge.me / Yotpo" },
  { key: "email", label: "邮件营销", monthly: 299, color: "#A9CCE3", note: "Klaviyo / Omnisend" },
  { key: "upsell", label: "追加销售插件", monthly: 199, color: "#C8E0EE", note: "ReConvert / Zipify" },
  { key: "loyalty", label: "积分/忠诚度", monthly: 149, color: "#D6EAF8", note: "Smile.io / LoyaltyLion" },
  { key: "analytics", label: "数据分析", monthly: 199, color: "#85C1E9", note: "Lucky Orange / Hotjar" },
  { key: "translation", label: "多语言插件", monthly: 149, color: "#AED6F1", note: "Langify / Weglot" },
  { key: "theme", label: "主题摊销", monthly: 100, color: "#BDC3C7", note: "付费主题 ¥1,200 一次性" },
];
const SHOPIFY_MONTHLY_TOTAL = SHOPIFY_FEES.reduce((s, f) => s + f.monthly, 0);

// Hiring cost items with hidden costs
const HIRING_ITEMS = [
  {
    role: "Shopify 开发",
    salary: 15000,
    hidden: [
      { name: "社保公积金 (30%)", value: 4500, color: "#E74C3C" },
      { name: "Shopify 插件费", value: 1500, color: "#C0392B" },
      { name: "招聘/猎头费", value: 2000, color: "#A93226" },
    ],
    color: "#E74C3C",
  },
  {
    role: "独立站运营",
    salary: 10000,
    hidden: [
      { name: "社保公积金 (30%)", value: 3000, color: "#E67E22" },
      { name: "运营工具/订阅", value: 800, color: "#D35400" },
      { name: "培训/试错成本", value: 1200, color: "#BA4A00" },
    ],
    color: "#E67E22",
  },
  {
    role: "内容 & 社媒",
    salary: 7000,
    hidden: [
      { name: "社保公积金 (30%)", value: 2100, color: "#F39C12" },
      { name: "素材/版权费", value: 500, color: "#D68910" },
      { name: "社媒工具订阅", value: 400, color: "#B7770D" },
    ],
    color: "#F39C12",
  },
  {
    role: "设计师",
    salary: 8000,
    hidden: [
      { name: "社保公积金 (30%)", value: 2400, color: "#D4AC0D" },
      { name: "设计软件授权", value: 300, color: "#B7950B" },
      { name: "试错/返工成本", value: 1500, color: "#9A7D0A" },
    ],
    color: "#D4AC0D",
  },
];


/* ─── ROI Calculator ─────────────────────────────────────────── */
function ROICalculator({ locale }: { locale: string }) {
  const [monthly, setMonthly] = React.useState(100000);
  const [platform, setPlatform] = React.useState<"amazon" | "shopify">("amazon");

  const amazonFeeRate = 0.58;
  const shopifyAnnual = 8800;
  const shopifyTransactionRate = 0.02;
  const ourAnnual = 22800;

  const annualRevenue = monthly * 12;
  const amazonLoss = annualRevenue * amazonFeeRate;
  const shopifyLoss = shopifyAnnual + annualRevenue * shopifyTransactionRate;
  const platformLoss = platform === "amazon" ? amazonLoss : shopifyLoss;
  const saving = platformLoss - ourAnnual;
  const roiMonths = ourAnnual / (saving / 12);

  const fmt = (n: number) => Math.round(n).toLocaleString();

  const labels = {
    zh: {
      title: "算一算：你每年亏多少？",
      sub: "输入你的月销售额，看看平台每年从你口袋里拿走多少",
      monthly_label: "月销售额（元）",
      platform_label: "当前使用平台",
      amazon: "亚马逊",
      shopify: "Shopify",
      loss_label: platform === "amazon" ? "亚马逊每年收走" : "Shopify 每年成本",
      our_label: "找我们每年花费",
      saving_label: "每年净节省",
      roi_label: "回本周期",
      roi_value: `${roiMonths < 1 ? "< 1" : fmt(roiMonths)} 个月`,
      note: "* 亚马逊费率含：佣金 15% + FBA 头程/仓储 20% + 广告 15% + 退货/销毁/附加费 8%",
    },
    en: {
      title: "Calculate Your Annual Loss",
      sub: "Enter your monthly revenue to see how much the platform takes every year",
      monthly_label: "Monthly Revenue (¥)",
      platform_label: "Current Platform",
      amazon: "Amazon",
      shopify: "Shopify",
      loss_label: platform === "amazon" ? "Amazon takes per year" : "Shopify costs per year",
      our_label: "With our team per year",
      saving_label: "Net saving per year",
      roi_label: "Payback period",
      roi_value: `${roiMonths < 1 ? "< 1" : fmt(roiMonths)} months`,
      note: "* Amazon rate includes: 15% commission + 20% FBA/storage + 15% ads + 8% returns/disposal/surcharges",
    },
    ja: {
      title: "年間損失を計算する",
      sub: "月間売上を入力して、プラットフォームが毎年いくら取るかを確認",
      monthly_label: "月間売上（¥）",
      platform_label: "現在のプラットフォーム",
      amazon: "Amazon",
      shopify: "Shopify",
      loss_label: platform === "amazon" ? "Amazonが年間取る金額" : "Shopifyの年間コスト",
      our_label: "私たちへの年間費用",
      saving_label: "年間純節約額",
      roi_label: "回収期間",
      roi_value: `${roiMonths < 1 ? "< 1" : fmt(roiMonths)} ヶ月`,
      note: "* Amazon手数料：販売手数料15% + FBA/倉庫保管20% + 広告15% + 返品/廃棄/付加費8%",
    },
  };
  const L = labels[locale as keyof typeof labels] || labels.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="roi-calc"
      style={{
        marginTop: 80,
        padding: "48px",
        background: "linear-gradient(135deg, #0D0D0D 0%, #1A1200 100%)",
        border: "1px solid rgba(212,196,154,0.2)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6914", marginBottom: 16 }}>
          ROI Calculator
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 600, color: "#FAFAF8", margin: "0 0 12px" }}>
          {L.title}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", margin: 0 }}>
          {L.sub}
        </p>
      </div>

      {/* Controls */}
      <div className="roi-controls" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
        {/* Monthly revenue slider */}
        <div>
          <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>
            {L.monthly_label}
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <input
              type="range"
              min={10000}
              max={1000000}
              step={10000}
              value={monthly}
              onChange={e => setMonthly(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#8B6914", height: 4 }}
            />
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 700, color: "#D4C49A", minWidth: 90, textAlign: "right" }}>
              ¥{fmt(monthly)}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Mono', monospace", fontSize: 8, color: "#444" }}>
            <span>¥10,000</span><span>¥1,000,000</span>
          </div>
        </div>

        {/* Platform toggle */}
        <div>
          <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>
            {L.platform_label}
          </label>
          <div style={{ display: "flex", gap: 2 }}>
            {(["amazon", "shopify"] as const).map(p => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: platform === p ? "#D4C49A" : "#1A1A1A",
                  border: `1px solid ${platform === p ? "#D4C49A" : "#2A2A2A"}`,
                  color: platform === p ? "#111" : "#666",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {p === "amazon" ? L.amazon : L.shopify}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="roi-results" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
        {/* Platform loss */}
        <div style={{ padding: "24px", background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.2)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {L.loss_label}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 700, color: "#E74C3C" }}>
            ¥{fmt(platformLoss)}
          </div>
        </div>
        {/* Our cost */}
        <div style={{ padding: "24px", background: "rgba(46,204,113,0.06)", border: "1px solid rgba(46,204,113,0.18)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {L.our_label}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 700, color: "#2ECC71" }}>
            ¥{fmt(ourAnnual)}
          </div>
        </div>
        {/* Saving */}
        <div style={{ padding: "24px", background: "rgba(212,196,154,0.06)", border: "1px solid rgba(212,196,154,0.25)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {L.saving_label}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 700, color: "#D4C49A" }}>
            ¥{saving > 0 ? fmt(saving) : "0"}
          </div>
        </div>
        {/* Payback */}
        <div style={{ padding: "24px", background: "rgba(93,173,226,0.06)", border: "1px solid rgba(93,173,226,0.18)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.3)", marginBottom: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {L.roi_label}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(18px, 2.5vw, 32px)", fontWeight: 700, color: "#5DADE2" }}>
            {L.roi_value}
          </div>
        </div>
      </div>

      {/* Note */}
      <div style={{ marginTop: 20, fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", lineHeight: 1.8 }}>
        {L.note}
      </div>
    </motion.div>
  );
}

export default function ROISection() {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Tab 1 counters
  const hiringTotal = HIRING_ITEMS.reduce((s, item) => {
    const hiddenTotal = item.hidden.reduce((hs, h) => hs + h.value, 0);
    return s + (item.salary + hiddenTotal) * 12;
  }, 0);
  const hiringCount = useCountUp(hiringTotal, 2200, inView);
  const myFee = 22800;
  const savingCount = useCountUp(hiringTotal - myFee, 2400, inView);

  // Tab 2 counter
  const amazonAnnual = Math.round(1000000 * (AMAZON_TOTAL_PCT / 100));
  const amazonCount = useCountUp(amazonAnnual, 2200, inView && activeTab === 1);

  // Tab 3 counter
  const shopifyAnnual = SHOPIFY_MONTHLY_TOTAL * 12;
  const shopifyCount = useCountUp(shopifyAnnual, 2000, inView && activeTab === 2);

  const maxHiringVal = Math.max(...HIRING_ITEMS.map(item => {
    const hiddenTotal = item.hidden.reduce((hs, h) => hs + h.value, 0);
    return (item.salary + hiddenTotal) * 12;
  }));

  const tabs = locale === 'ja'
    ? ["採用 vs 私", "Amazon全費用", "Shopify隠れコスト", "競合代理店 vs 私"]
    : locale === 'en'
    ? ["Hiring vs Me", "Amazon All Fees", "Shopify Hidden Costs", "Agency vs Me"]
    : ["招人 vs 找我", "亚马逊全费用", "Shopify 隐藏费用", "竞品建站 vs 找我"];

  const eyebrow = locale === 'ja' ? "コスト比較" : locale === 'en' ? "COST COMPARISON" : "成本对比";
  const titleLine = locale === 'ja'
    ? "あなたが気づいていないコストが、毎年利益を食い尽くしている"
    : locale === 'en'
    ? "Hidden costs are eating your profits every year"
    : "你不知道的费用，每年正在吃掉你的利润";

  const sourceText = locale === 'ja'
    ? "データ出典：Boss直聘 2024深セン給与 / Amazon公式料率 / Shopify公式価格 / 業界平均推定"
    : locale === 'en'
    ? "Sources: Boss Zhipin 2024 Shenzhen Salary / Amazon Official Fee Schedule / Shopify Official Pricing / Industry Estimates"
    : "数据来源：Boss直聘 2024 深圳薪资 / 亚马逊官方费率 / Shopify 官网定价 / 行业平均估算";

  return (
    <section id="roi" ref={ref} style={{ background: "#0D0D0D", padding: "120px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="roi-container" style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 3.5vw, 48px)", fontWeight: 600, color: "#FAFAF8", margin: "0 0 32px", lineHeight: 1.15 }}>
            {titleLine}
          </h2>

          {/* Prominent saving counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="roi-saving-banner"
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 12,
              padding: "20px 32px",
              background: "linear-gradient(135deg, rgba(139,105,20,0.2), rgba(212,196,154,0.08))",
              border: "1px solid rgba(212,196,154,0.3)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#8B6914", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {locale === 'ja' ? "私に依頼すれば年間節約" : locale === 'en' ? "Working with me saves you" : "找我，每年为你节省"}
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 700, color: "#D4C49A", lineHeight: 1 }}>
              ¥{savingCount.toLocaleString()}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
              {locale === 'ja' ? "/年" : locale === 'en' ? "/year" : "/年"}
            </span>
          </motion.div>
        </motion.div>

        {/* Tab switcher */}
        <div className="roi-tabs" style={{ display: "flex", gap: 2, marginBottom: 40, flexWrap: "wrap" }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "12px 20px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s",
                background: activeTab === i ? "#8B6914" : "rgba(255,255,255,0.05)",
                color: activeTab === i ? "#FAFAF8" : "rgba(255,255,255,0.3)",
                minHeight: 44,
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">

          {/* TAB 1: Hiring vs Me */}
          {activeTab === 0 && (
            <motion.div key="hiring" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: 10, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>
                {locale === 'ja' ? "社内チーム年間コスト（深セン、Boss直聘 2024）" : locale === 'en' ? "In-house team annual cost — Shenzhen, Boss Zhipin 2024" : "自建团队年成本（深圳，Boss直聘 2024）— 含隐藏费用"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
                {HIRING_ITEMS.map((item, i) => {
                  const hiddenTotal = item.hidden.reduce((hs, h) => hs + h.value, 0);
                  const totalMonthly = item.salary + hiddenTotal;
                  const totalAnnual = totalMonthly * 12;
                  const segments = [
                    { value: item.salary * 12, color: item.color, label: "基本薪资" },
                    ...item.hidden.map(h => ({ value: h.value * 12, color: h.color, label: h.name })),
                  ];
                  return (
                    <div key={i} className="hiring-row">
                      {/* Mobile: stacked layout; Desktop: grid */}
                      <div className="hiring-row-inner" style={{ display: "grid", gridTemplateColumns: "140px 1fr 180px", gap: 16, alignItems: "center", marginBottom: 6 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", textAlign: "right" }}>{item.role}</div>
                        <StackedBar segments={segments} maxVal={maxHiringVal} delay={i * 0.12} start={inView} />
                        <div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: item.color, fontWeight: 600 }}>
                            ¥{totalAnnual.toLocaleString()}/年
                          </div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
                            ¥{totalMonthly.toLocaleString()}/月
                          </div>
                        </div>
                      </div>
                      {/* Hidden cost breakdown */}
                      <div className="hiring-hidden" style={{ marginLeft: 156, display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {item.hidden.map((h, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <div style={{ width: 6, height: 6, background: h.color, borderRadius: 1, flexShrink: 0 }} />
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
                              {h.name} +¥{h.value.toLocaleString()}/月
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Comparison */}
              <div className="hiring-compare" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0 }}>
                <div style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)", padding: "36px 32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "SELF-BUILD TEAM / YEAR" : "自建团队 / 年"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "#E74C3C", lineHeight: 1, marginBottom: 8 }}>
                    ¥{hiringCount.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                    {locale === 'en' ? "Salary + social insurance + tools + trial errors" : "薪资 + 社保 + 工具 + 试错成本"}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", background: "rgba(255,255,255,0.02)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>vs</span>
                </div>
                <div style={{ background: "rgba(46,204,113,0.08)", border: "1px solid rgba(46,204,113,0.2)", padding: "36px 32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "WORK WITH ME / ONE-TIME" : "找我 / 一次性"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1, marginBottom: 8 }}>
                    ¥22,800
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                    {locale === 'en' ? "Full-stack delivery in 28 days. Training included." : "28天交付，全栈覆盖，附带培训"}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Amazon All Fees */}
          {activeTab === 1 && (
            <motion.div key="amazon" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: 10, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>
                {locale === 'en' ? "Amazon FBA — all fees per ¥100 sold (standard product)" : "亚马逊 FBA — 每卖出 ¥100，你实际支付的全部费用"}
              </div>

              {/* Stacked visual: single bar showing all fees */}
              <div style={{ marginBottom: 32 }}>
                <div className="amazon-total-row" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                  <div className="amazon-label" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", width: 140, textAlign: "right", flexShrink: 0 }}>
                    {locale === 'en' ? "Platform total fees" : "平台总费用占比"}
                  </div>
                  <div style={{ flex: 1, height: 48, background: "rgba(255,255,255,0.04)", borderRadius: 3, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${Math.min(AMAZON_TOTAL_PCT, 100)}%` } : { width: 0 }}
                      transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      style={{ height: "100%", display: "flex" }}
                    >
                      {AMAZON_FEES.map((fee, i) => (
                        <div key={i} style={{ height: "100%", width: `${(fee.pct / AMAZON_TOTAL_PCT) * 100}%`, background: fee.color, flexShrink: 0 }} />
                      ))}
                    </motion.div>
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 700, color: "#E74C3C", lineHeight: 1, flexShrink: 0 }}>
                    ~{AMAZON_TOTAL_PCT}%
                  </div>
                </div>
                <div className="amazon-note" style={{ marginLeft: 156, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                  {locale === 'en' ? "Every ¥100 you earn, you keep only ~¥42" : "每卖出 ¥100，你实际到手约 ¥42"}
                </div>
              </div>

              {/* Individual fee bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
                {AMAZON_FEES.map((fee, i) => (
                  <div key={i} className="fee-row" style={{ display: "grid", gridTemplateColumns: "160px 1fr 120px", gap: 16, alignItems: "center" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>{fee.label}</div>
                    <div style={{ height: 24, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                      <AnimatedBar pct={(fee.pct / AMAZON_TOTAL_PCT) * 100} color={fee.color} delay={0.3 + i * 0.08} start={inView} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fee.color, fontWeight: 600 }}>
                        ~{fee.pct}%
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.04em" }}>{fee.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Annual impact */}
              <div className="amazon-compare" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <div style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)", padding: "32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "AMAZON FEES / YEAR (¥1M SALES)" : "年销售额 ¥100 万，亚马逊收走"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 700, color: "#E74C3C", lineHeight: 1 }}>
                    ¥{amazonCount.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>
                    {locale === 'en' ? "~58% of your revenue, every year, forever" : "约 58% 的营收，每年，永久"}
                  </div>
                </div>
                <div style={{ background: "rgba(46,204,113,0.06)", border: "1px solid rgba(46,204,113,0.18)", padding: "32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "INDEPENDENT STORE / YEAR" : "独立站 / 年"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1 }}>
                    ¥22,800
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>
                    {locale === 'en' ? "One-time. 0% commission. You own everything." : "一次性。0% 佣金。品牌完全属于你。"}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Shopify Hidden Costs */}
          {activeTab === 2 && (
            <motion.div key="shopify" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: 10, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>
                {locale === 'en' ? "Shopify Advanced — monthly real cost breakdown (industry average)" : "Shopify Advanced — 真实月成本拆解（行业平均）"}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
                {SHOPIFY_FEES.map((fee, i) => (
                  <div key={i} className="fee-row" style={{ display: "grid", gridTemplateColumns: "160px 1fr 140px", gap: 16, alignItems: "center" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>{fee.label}</div>
                    <div style={{ height: 24, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                      <AnimatedBar pct={(fee.monthly / SHOPIFY_MONTHLY_TOTAL) * 100} color={fee.color} delay={0.2 + i * 0.08} start={inView} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: fee.color, fontWeight: 600 }}>
                        ¥{fee.monthly}/月
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.18)", letterSpacing: "0.04em" }}>{fee.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Annual comparison */}
              <div className="shopify-compare" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <div style={{ background: "rgba(41,128,185,0.1)", border: "1px solid rgba(41,128,185,0.25)", padding: "32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "SHOPIFY FULL STACK / YEAR" : "Shopify 全套 / 年"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 700, color: "#5DADE2", lineHeight: 1 }}>
                    ¥{shopifyCount.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>
                    {locale === 'en' ? "¥" + SHOPIFY_MONTHLY_TOTAL.toLocaleString() + "/mo × 12, before transaction fees" : "¥" + SHOPIFY_MONTHLY_TOTAL.toLocaleString() + "/月 × 12，不含交易手续费"}
                  </div>
                </div>
                <div style={{ background: "rgba(46,204,113,0.06)", border: "1px solid rgba(46,204,113,0.18)", padding: "32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "WITH ME / YEAR" : "找我 / 年"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 3vw, 44px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1 }}>
                    ¥22,800
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>
                    {locale === 'en' ? "All plugins built-in. No monthly app fees." : "所有功能内置，无月度插件费"}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Agency / Competitor vs Me */}
          {activeTab === 3 && (
            <motion.div key="agency" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: 10, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}>
                {locale === 'en' ? "Agency & platform pricing vs working with me — same deliverable, real market quotes" : "外贸建站机构 & 平台报价 vs 找我 — 同等交付物，真实市场价"}
              </div>

              {/* Competitor comparison bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 40 }}>
                {[
                  {
                    name: locale === 'en' ? "Agency (Ruinuo / Sanxing tier)" : "外贸建站机构（瑞诺 / 三行同级）",
                    price: locale === 'en' ? "¥30,000–80,000/yr" : "¥30,000–80,000/年",
                    note: locale === 'en' ? "Template-based · 60–90 day delivery · annual renewal required" : "模板建站 · 60–90 天交付 · 每年续费",
                    color: "#E74C3C",
                    pct: 100,
                  },
                  {
                    name: locale === 'en' ? "Shopify + Plugins + Developer" : "Shopify + 插件 + 开发",
                    price: locale === 'en' ? "¥25,000–40,000/yr" : "¥25,000–40,000/年",
                    note: locale === 'en' ? "Monthly fees + transaction cut + plugin lock-in, ongoing cost" : "月费 + 交易抽成 + 插件绑定，持续支出",
                    color: "#E67E22",
                    pct: 65,
                  },
                  {
                    name: locale === 'en' ? "Freelancer (template, no custom)" : "普通接单个人（模板，无定制）",
                    price: locale === 'en' ? "¥3,000–8,000" : "¥3,000–8,000",
                    note: locale === 'en' ? "Template only · no SEO · no training · no after-sales" : "纯模板 · 无 SEO · 无培训 · 无售后",
                    color: "#F39C12",
                    pct: 22,
                  },
                  {
                    name: locale === 'en' ? "Working with me (custom, full-stack)" : "找我（定制，全栈交付）",
                    price: locale === 'en' ? "¥8,800 one-time" : "¥8,800 一次性",
                    note: locale === 'en' ? "Custom design + SEO + payment + auth + training · 10-day delivery · you own everything" : "定制设计 + SEO + 支付 + 认证 + 培训 · 10 天交付 · 代码数据全归你",
                    color: "#2ECC71",
                    pct: 18,
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "220px 1fr 180px", gap: 16, alignItems: "center", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500, marginBottom: 4 }}>{item.name}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", lineHeight: 1.5 }}>{item.note}</div>
                    </div>
                    <div style={{ height: 20, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden" }}>
                      <AnimatedBar pct={item.pct} color={item.color} delay={0.2 + i * 0.1} start={inView && activeTab === 3} />
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: item.color, fontWeight: 600, textAlign: "right" }}>{item.price}</div>
                  </div>
                ))}
              </div>

              {/* Summary comparison */}
              <div className="hiring-compare" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0 }}>
                <div style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)", padding: "36px 32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "AGENCY / YEAR" : "外贸机构 / 年"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "#E74C3C", lineHeight: 1, marginBottom: 8 }}>
                    ¥30,000+
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                    {locale === 'en' ? "Template · 60–90 days · annual renewal" : "模板建站 · 60–90 天 · 每年续费"}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", background: "rgba(255,255,255,0.02)" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>vs</span>
                </div>
                <div style={{ background: "rgba(46,204,113,0.08)", border: "1px solid rgba(46,204,113,0.2)", padding: "36px 32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "WORK WITH ME / ONE-TIME" : "找我 / 一次性"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1, marginBottom: 8 }}>
                    ¥8,800
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                    {locale === 'en' ? "Custom · 10 days · you own everything" : "定制建站 · 10 天交付 · 代码数据全归你"}
                  </div>
                </div>
              </div>

              {/* Differentiation note */}
              <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(212,196,154,0.06)", border: "1px solid rgba(212,196,154,0.15)" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", lineHeight: 1.8 }}>
                  {locale === 'en'
                    ? "Key difference: agencies use templates and lock you into annual renewals. Freelancers skip SEO and training. I deliver custom-built sites with full-stack coverage — design, SEO, payment, auth, automation — in 10 days, one-time fee. You own all code and data."
                    : "核心差异：机构用模板绑定续费，普通接单者跳过 SEO 和培训。我提供定制建站，覆盖设计、SEO、支付、认证、自动化全栈，10 天交付，一次性收费，代码和数据完全归你。"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Source */}
        <div style={{ marginTop: 40, fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em", lineHeight: 1.8 }}>
          {sourceText}
        </div>

        {/* ROI Calculator */}
        <ROICalculator locale={locale} />
      </div>

      <style>{`
        @media (max-width: 767px) {
          #roi {
            padding: 72px 0 !important;
          }
          .roi-container {
            padding: 0 20px !important;
          }

          /* Saving banner — full width stacked */
          .roi-saving-banner {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            padding: 20px 20px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }

          /* Tabs — scrollable row */
          .roi-tabs {
            gap: 2px !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding-bottom: 2px !important;
          }
          .roi-tabs::-webkit-scrollbar { display: none; }
          .roi-tabs button {
            font-size: 10px !important;
            padding: 12px 14px !important;
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            min-height: 44px !important;
          }

          /* Hiring tab */
          .hiring-row-inner {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
          .hiring-row-inner > div:first-child {
            text-align: left !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: rgba(255,255,255,0.8) !important;
          }
          .hiring-hidden {
            margin-left: 0 !important;
            margin-top: 4px !important;
          }
          .hiring-compare {
            grid-template-columns: 1fr !important;
          }
          .hiring-compare > div:nth-child(2) {
            display: none !important;
          }

          /* Amazon/Shopify fee rows */
          .fee-row {
            grid-template-columns: 1fr !important;
            gap: 6px !important;
          }
          .fee-row > div:first-child {
            text-align: left !important;
            font-size: 13px !important;
            color: rgba(255,255,255,0.75) !important;
          }
          .amazon-total-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
          .amazon-label {
            width: auto !important;
            text-align: left !important;
          }
          .amazon-note {
            margin-left: 0 !important;
            font-size: 12px !important;
          }
          .amazon-compare,
          .shopify-compare {
            grid-template-columns: 1fr !important;
          }

          /* ROI Calculator */
          .roi-calc {
            padding: 24px 20px !important;
            margin-top: 48px !important;
          }
          .roi-controls {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          /* Results: 2x2 grid on mobile */
          .roi-results {
            grid-template-columns: 1fr 1fr !important;
            gap: 2px !important;
          }
          .roi-results > div {
            padding: 16px 14px !important;
          }
          .roi-results > div > div:last-child {
            font-size: 20px !important;
          }

          /* Section header */
          #roi h2 {
            font-size: clamp(24px, 7vw, 36px) !important;
            line-height: 1.2 !important;
          }

          /* Data source note */
          #roi .roi-source {
            font-size: 10px !important;
            line-height: 1.7 !important;
          }
        }
      `}</style>
    </section>
  );
}
