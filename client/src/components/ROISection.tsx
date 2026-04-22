/* ROISection v4 — Deep Cost Breakdown + Visual Impact
   Design: Dark bg, stacked bar charts with progressive red reveal
   Strategy: Make bosses feel the pain of every hidden fee
   Tab1: 招人 vs 找我 (with all hidden hiring costs)
   Tab2: 亚马逊全费用细分 (15+ fee types, stacked red bars)
   Tab3: Shopify 隐藏费用 (monthly plan + plugins breakdown)
   Key: Bars animate red on scroll, saving counter prominent at top */

import { useState, useEffect, useRef } from "react";
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

export default function ROISection() {
  const { locale } = useI18n();
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Tab 1 counters
  const hiringTotal = HIRING_ITEMS.reduce((s, item) => {
    const hiddenTotal = item.hidden.reduce((hs, h) => hs + h.value, 0);
    return s + (item.salary + hiddenTotal) * 12;
  }, 0); // ~¥790,800
  const hiringCount = useCountUp(hiringTotal, 2200, inView);
  const myFee = 8800;
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
    ? ["採用 vs 私", "Amazon全費用", "Shopify隠れコスト"]
    : locale === 'en'
    ? ["Hiring vs Me", "Amazon All Fees", "Shopify Hidden Costs"]
    : ["招人 vs 找我", "亚马逊全费用", "Shopify 隐藏费用"];

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
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, color: "#FAFAF8", margin: "0 0 32px", lineHeight: 1.15 }}>
            {titleLine}
          </h2>

          {/* Prominent saving counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              gap: 12,
              padding: "20px 32px",
              background: "linear-gradient(135deg, rgba(139,105,20,0.2), rgba(212,196,154,0.08))",
              border: "1px solid rgba(212,196,154,0.3)",
            }}
          >
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#8B6914", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {locale === 'ja' ? "私に依頼すれば年間節約" : locale === 'en' ? "Working with me saves you" : "找我，每年为你节省"}
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "#D4C49A", lineHeight: 1 }}>
              ¥{savingCount.toLocaleString()}
            </span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
              {locale === 'ja' ? "/年" : locale === 'en' ? "/year" : "/年"}
            </span>
          </motion.div>
        </motion.div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 2, marginBottom: 40, flexWrap: "wrap" }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "12px 24px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s",
                background: activeTab === i ? "#8B6914" : "rgba(255,255,255,0.05)",
                color: activeTab === i ? "#FAFAF8" : "rgba(255,255,255,0.3)",
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

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                {HIRING_ITEMS.map((item, i) => {
                  const hiddenTotal = item.hidden.reduce((hs, h) => hs + h.value, 0);
                  const totalMonthly = item.salary + hiddenTotal;
                  const totalAnnual = totalMonthly * 12;
                  const segments = [
                    { value: item.salary * 12, color: item.color, label: "基本薪资" },
                    ...item.hidden.map(h => ({ value: h.value * 12, color: h.color, label: h.name })),
                  ];
                  return (
                    <div key={i}>
                      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 180px", gap: 16, alignItems: "center", marginBottom: 6 }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", textAlign: "right" }}>{item.role}</div>
                        <StackedBar segments={segments} maxVal={maxHiringVal} delay={i * 0.12} start={inView} />
                        <div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: item.color, fontWeight: 600 }}>
                            ¥{totalAnnual.toLocaleString()}/年
                          </div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>
                            基薪 ¥{item.salary.toLocaleString()} + 隐藏 ¥{hiddenTotal.toLocaleString()}/月
                          </div>
                        </div>
                      </div>
                      {/* Hidden cost breakdown */}
                      <div style={{ marginLeft: 156, display: "flex", gap: 12, flexWrap: "wrap" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0 }}>
                <div style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)", padding: "36px 32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "SELF-BUILD TEAM / YEAR" : "自建团队 / 年"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700, color: "#E74C3C", lineHeight: 1, marginBottom: 8 }}>
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
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1, marginBottom: 8 }}>
                    ¥8,800
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                    {locale === 'en' ? "Full-stack delivery in 7 days. Training included." : "7天交付，全栈覆盖，附带培训"}
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
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", width: 140, textAlign: "right", flexShrink: 0 }}>
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
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 700, color: "#E74C3C", lineHeight: 1, flexShrink: 0 }}>
                    ~{AMAZON_TOTAL_PCT}%
                  </div>
                </div>
                <div style={{ marginLeft: 156, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)" }}>
                  {locale === 'en' ? "Every ¥100 you earn, you keep only ~¥42" : "每卖出 ¥100，你实际到手约 ¥42"}
                </div>
              </div>

              {/* Individual fee bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
                {AMAZON_FEES.map((fee, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr 120px", gap: 16, alignItems: "center" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <div style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.25)", padding: "32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "AMAZON FEES / YEAR (¥1M SALES)" : "年销售额 ¥100 万，亚马逊收走"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, color: "#E74C3C", lineHeight: 1 }}>
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
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1 }}>
                    ¥8,800
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
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr 140px", gap: 16, alignItems: "center" }}>
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
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                <div style={{ background: "rgba(41,128,185,0.1)", border: "1px solid rgba(41,128,185,0.25)", padding: "32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>
                    {locale === 'en' ? "SHOPIFY FULL STACK / YEAR" : "Shopify 全套 / 年"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, color: "#5DADE2", lineHeight: 1 }}>
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
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1 }}>
                    ¥8,800
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>
                    {locale === 'en' ? "All plugins built-in. No monthly app fees." : "所有功能内置，无月度插件费"}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Source */}
        <div style={{ marginTop: 40, fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em", lineHeight: 1.8 }}>
          {sourceText}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #roi .grid-3col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
