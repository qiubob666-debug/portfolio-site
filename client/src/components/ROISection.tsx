/* ROISection v3 — Data Visualization First
   Design: Dark bg, animated counters, visual bar charts, tab switcher
   Strategy: Show the math visually — no text walls
   Tabs: "招人 vs 找我" | "平台佣金 vs 独立站"
   Key: Numbers animate on scroll, bars grow on scroll */

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
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

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  tab1: string;
  tab2: string;
  hiringData: {
    label: string;
    items: { name: string; value: number; unit: string; note: string; color: string }[];
    totalLabel: string;
    total: number;
    totalUnit: string;
    vsLabel: string;
    vsValue: number;
    vsUnit: string;
    saving: string;
    savingNote: string;
  };
  platformData: {
    label: string;
    items: { name?: string; pct: number; label: string; note: string; color?: string }[];
    scenario: string;
    platformCost: number;
    independentCost: number;
    unit: string;
    saving: string;
    savingNote: string;
  };
  source: string;
}> = {
  zh: {
    eyebrow: "成本对比",
    title: "你花的每一分钱，都应该算清楚",
    tab1: "招人 vs 找我",
    tab2: "平台佣金 vs 独立站",
    hiringData: {
      label: "自建团队年成本（深圳，Boss直聘 2024）",
      items: [
        { name: "Shopify 开发", value: 180000, unit: "¥/年", note: "¥15,000/月 × 12", color: "#C0392B" },
        { name: "独立站运营", value: 120000, unit: "¥/年", note: "¥10,000/月 × 12", color: "#E67E22" },
        { name: "内容 & 社媒", value: 84000, unit: "¥/年", note: "¥7,000/月 × 12", color: "#F39C12" },
        { name: "设计师", value: 96000, unit: "¥/年", note: "¥8,000/月 × 12", color: "#D4AC0D" },
        { name: "试错 & 培训", value: 60000, unit: "¥/年", note: "平均估算", color: "#AAA" },
      ],
      totalLabel: "自建团队年成本",
      total: 540000,
      totalUnit: "¥/年",
      vsLabel: "找我的费用",
      vsValue: 8800,
      vsUnit: "一次性",
      saving: "年节省 ¥531,200",
      savingNote: "不含试错时间和机会成本",
    },
    platformData: {
      label: "以年销售额 ¥100 万为例",
      items: [
        { pct: 15, label: "亚马逊佣金", note: "15% × ¥100万 = ¥150,000/年", color: "#C0392B" },
        { pct: 8, label: "天猫/京东佣金", note: "8% × ¥100万 = ¥80,000/年", color: "#E67E22" },
        { pct: 3, label: "Shopify 月费+插件", note: "约 ¥3,000/月 = ¥36,000/年", color: "#F39C12" },
        { pct: 0.88, label: "独立站（找我）", note: "一次性 ¥8,800，服务器接近 ¥0", color: "#2ECC71" },
      ],
      scenario: "年销售额 ¥100 万",
      platformCost: 150000,
      independentCost: 8800,
      unit: "¥",
      saving: "第一年省下 ¥141,200",
      savingNote: "第二年起每年省下 ¥150,000",
    },
    source: "数据来源：Boss直聘 2024 深圳薪资报告 / 亚马逊官方费率 / Shopify 官网定价",
  },
  en: {
    eyebrow: "COST COMPARISON",
    title: "Every dollar you spend should be calculated clearly",
    tab1: "Hiring vs Me",
    tab2: "Platform Fees vs Independent Store",
    hiringData: {
      label: "In-house team annual cost (Shenzhen, Boss 2024)",
      items: [
        { name: "Shopify Developer", value: 180000, unit: "¥/yr", note: "¥15,000/mo × 12", color: "#C0392B" },
        { name: "Store Operations", value: 120000, unit: "¥/yr", note: "¥10,000/mo × 12", color: "#E67E22" },
        { name: "Content & Social", value: 84000, unit: "¥/yr", note: "¥7,000/mo × 12", color: "#F39C12" },
        { name: "Designer", value: 96000, unit: "¥/yr", note: "¥8,000/mo × 12", color: "#D4AC0D" },
        { name: "Trial & Training", value: 60000, unit: "¥/yr", note: "Estimated average", color: "#AAA" },
      ],
      totalLabel: "In-house team annual cost",
      total: 540000,
      totalUnit: "¥/yr",
      vsLabel: "Working with me",
      vsValue: 8800,
      vsUnit: "one-time",
      saving: "Save ¥531,200/year",
      savingNote: "Excluding trial-and-error time and opportunity cost",
    },
    platformData: {
      label: "Based on ¥1M annual sales",
      items: [
        { pct: 15, label: "Amazon Commission", note: "15% × ¥1M = ¥150,000/yr", color: "#C0392B" },
        { pct: 8, label: "Tmall/JD Commission", note: "8% × ¥1M = ¥80,000/yr", color: "#E67E22" },
        { pct: 3, label: "Shopify Monthly + Plugins", note: "~¥3,000/mo = ¥36,000/yr", color: "#F39C12" },
        { pct: 0.88, label: "Independent Store (Me)", note: "One-time ¥8,800, server ~¥0", color: "#2ECC71" },
      ],
      scenario: "¥1M Annual Sales",
      platformCost: 150000,
      independentCost: 8800,
      unit: "¥",
      saving: "Save ¥141,200 in year one",
      savingNote: "Save ¥150,000 every year after",
    },
    source: "Sources: Boss Zhipin 2024 Shenzhen Salary Report / Amazon Official Fee Schedule / Shopify Pricing",
  },
  ja: {
    eyebrow: "コスト比較",
    title: "使うお金は全て明確に計算すべき",
    tab1: "採用 vs 私",
    tab2: "プラットフォーム手数料 vs 独立サイト",
    hiringData: {
      label: "社内チーム年間コスト（深セン、Boss 2024）",
      items: [
        { name: "Shopify開発者", value: 180000, unit: "¥/年", note: "¥15,000/月 × 12", color: "#C0392B" },
        { name: "ストア運営", value: 120000, unit: "¥/年", note: "¥10,000/月 × 12", color: "#E67E22" },
        { name: "コンテンツ&SNS", value: 84000, unit: "¥/年", note: "¥7,000/月 × 12", color: "#F39C12" },
        { name: "デザイナー", value: 96000, unit: "¥/年", note: "¥8,000/月 × 12", color: "#D4AC0D" },
        { name: "試行錯誤&研修", value: 60000, unit: "¥/年", note: "平均推定", color: "#AAA" },
      ],
      totalLabel: "社内チーム年間コスト",
      total: 540000,
      totalUnit: "¥/年",
      vsLabel: "私への依頼",
      vsValue: 8800,
      vsUnit: "一回払い",
      saving: "年間¥531,200節約",
      savingNote: "試行錯誤の時間と機会コストを除く",
    },
    platformData: {
      label: "年間売上¥100万を例に",
      items: [
        { pct: 15, label: "Amazon手数料", note: "15% × ¥100万 = ¥150,000/年", color: "#C0392B" },
        { pct: 8, label: "Tmall/JD手数料", note: "8% × ¥100万 = ¥80,000/年", color: "#E67E22" },
        { pct: 3, label: "Shopify月額+プラグイン", note: "約¥3,000/月 = ¥36,000/年", color: "#F39C12" },
        { pct: 0.88, label: "独立サイト（私）", note: "一回払い¥8,800、サーバー約¥0", color: "#2ECC71" },
      ],
      scenario: "年間売上¥100万",
      platformCost: 150000,
      independentCost: 8800,
      unit: "¥",
      saving: "初年度¥141,200節約",
      savingNote: "2年目以降は毎年¥150,000節約",
    },
    source: "データソース：Boss直聘 2024深セン給与レポート / Amazon公式料率 / Shopify公式価格",
  },
};

function AnimatedBar({ pct, color, delay = 0, start }: { pct: number; color: string; delay?: number; start: boolean }) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={start ? { width: `${Math.max(pct, 1)}%` } : { width: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ height: "100%", background: color, borderRadius: 2 }}
    />
  );
}

export default function ROISection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const totalCount = useCountUp(c.hiringData.total, 2000, inView);
  const vsCount = useCountUp(c.hiringData.vsValue, 1200, inView);
  const savingCount = useCountUp(531200, 2200, inView);

  const maxVal = Math.max(...c.hiringData.items.map(i => i.value));

  return (
    <section id="roi" ref={ref} style={{ background: "#111", padding: "120px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, color: "#FAFAF8", margin: 0, lineHeight: 1.15 }}>
            {c.title}
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 2, marginBottom: 48 }}>
          {[c.tab1, c.tab2].map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "12px 28px", border: "none", cursor: "pointer", transition: "all 0.2s", background: activeTab === i ? "#8B6914" : "rgba(255,255,255,0.06)", color: activeTab === i ? "#FAFAF8" : "rgba(255,255,255,0.35)" }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 0 && (
            <motion.div key="hiring" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div style={{ marginBottom: 12, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>
                {c.hiringData.label}
              </div>

              {/* Bar chart */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
                {c.hiringData.items.map((item, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr 120px", gap: 16, alignItems: "center" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>{item.name}</div>
                    <div style={{ height: 28, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
                      <AnimatedBar pct={(item.value / maxVal) * 100} color={item.color} delay={i * 0.1} start={inView} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: item.color, fontWeight: 600 }}>
                        ¥{item.value.toLocaleString()}
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Big number comparison */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 0, alignItems: "stretch" }}>
                <div style={{ background: "rgba(192,57,43,0.12)", border: "1px solid rgba(192,57,43,0.2)", padding: "40px 40px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>
                    {c.hiringData.totalLabel}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#E74C3C", lineHeight: 1 }}>
                    ¥{totalCount.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>{c.hiringData.totalUnit}</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", padding: "0 32px", background: "#111" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 48, color: "rgba(255,255,255,0.1)", fontStyle: "italic" }}>vs</div>
                </div>

                <div style={{ background: "rgba(46,204,113,0.08)", border: "1px solid rgba(46,204,113,0.2)", padding: "40px 40px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>
                    {c.hiringData.vsLabel}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#2ECC71", lineHeight: 1 }}>
                    ¥{vsCount.toLocaleString()}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8 }}>{c.hiringData.vsUnit}</div>
                </div>
              </div>

              {/* Saving callout */}
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 1.5 }}
                style={{ marginTop: 2, background: "linear-gradient(135deg, #8B6914 0%, #D4AC0D 100%)", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, color: "#FAFAF8" }}>
                  {c.hiringData.saving}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", maxWidth: 200, textAlign: "right" }}>
                  {c.hiringData.savingNote}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 1 && (
            <motion.div key="platform" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
              <div style={{ marginBottom: 12, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>
                {c.platformData.label}
              </div>

              {/* Horizontal bar chart for platform fees */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
                {c.platformData.items.map((item, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{item.label}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: item.color ?? "#8B6914" }}>{item.pct}%</span>
                    </div>
                    <div style={{ height: 36, background: "rgba(255,255,255,0.04)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
                      <AnimatedBar pct={item.pct} color={item.color ?? "#8B6914"} delay={i * 0.15} start={inView} />
                      <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
                        {item.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saving callout */}
              <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: 1.2 }}
                style={{ background: "linear-gradient(135deg, #8B6914 0%, #D4AC0D 100%)", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 600, color: "#FAFAF8" }}>
                  {c.platformData.saving}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", maxWidth: 200, textAlign: "right" }}>
                  {c.platformData.savingNote}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Source */}
        <div style={{ marginTop: 32, fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>
          {c.source}
        </div>
      </div>
    </section>
  );
}
