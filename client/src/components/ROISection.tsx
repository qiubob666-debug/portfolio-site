/* ROISection — Boss Wallet Logic v2
   Design: Dark charcoal bg, gold accent
   Layout: Tab switcher (Hiring Cost / Platform Cost) + animated savings counter
   Strategy: "Show me the math" — two ways to lose money, one way to win
   Key message: You're either paying a team ¥33k/mo or Amazon 15%. Both are optional. */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ─── Copy ────────────────────────────────────────────────────────────────────

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  tab1: string;
  tab2: string;
  hiringTitle: string;
  hiringSubtitle: string;
  hiringRows: { role: string; salary: string; note: string }[];
  hiringTotal: string;
  hiringTotalNote: string;
  hiringVsBob: string;
  hiringVsBobNote: string;
  platformTitle: string;
  platformSubtitle: string;
  platformRows: { item: string; platform: string; independent: string; highlight?: boolean }[];
  platformNote: string;
  savingsLabel: string;
  savingsNote: string;
  timelineTitle: string;
  timelineRows: { phase: string; them: string; me: string }[];
  timelineNote: string;
}> = {
  zh: {
    eyebrow: "成本算法",
    title: "你的钱，正在两个地方悄悄流失",
    subtitle: "一边是招人成本，一边是平台佣金。两个都是可以避免的。",
    tab1: "招人 vs 找我",
    tab2: "平台 vs 独立站",
    hiringTitle: "自建团队需要多少钱？",
    hiringSubtitle: "数据来源：Boss直聘 2024 年深圳跨境电商岗位薪资",
    hiringRows: [
      { role: "Shopify 独立站开发", salary: "¥12,000–18,000/月", note: "还需要 3–6 个月磨合期" },
      { role: "独立站设计师", salary: "¥8,000–15,000/月", note: "外包单次报价 ¥5,000–20,000" },
      { role: "内容运营 / 文案", salary: "¥6,000–10,000/月", note: "SEO 文章、产品描述、社媒" },
      { role: "社媒运营 / 社群管理", salary: "¥5,000–8,000/月", note: "Instagram / TikTok / Facebook" },
      { role: "订单管理 / 客服", salary: "¥4,000–7,000/月", note: "旺季还需要临时工" },
    ],
    hiringTotal: "¥35,000–58,000/月",
    hiringTotalNote: "这还不包括：社保、招聘费、试错成本、离职补偿、设备采购……",
    hiringVsBob: "找 Bob：¥8,800 一次性",
    hiringVsBobNote: "包含以上所有功能，7–21 天交付，月维护 ¥800",
    platformTitle: "平台卖货 vs 独立站，差距有多大？",
    platformSubtitle: "以月销售额 ¥100,000 为例",
    platformRows: [
      { item: "平台佣金/月", platform: "¥15,000（15%）", independent: "¥0", highlight: true },
      { item: "广告费/月", platform: "¥20,000–40,000", independent: "¥3,000–8,000（SEO 长期免费流量）", highlight: true },
      { item: "品牌溢价空间", platform: "低（同质化竞争）", independent: "高（品牌背书，客单价提升 30–50%）" },
      { item: "客户数据归属", platform: "平台所有，你看不到", independent: "完全属于你，可复购营销" },
      { item: "封号/下架风险", platform: "随时可能，无预警", independent: "无，你控制一切" },
      { item: "多币种/多语言", platform: "受限，手续费高", independent: "全球支付，自动换算" },
      { item: "年利润差距", platform: "基准", independent: "多赚 ¥180,000–300,000", highlight: true },
    ],
    platformNote: "* 以上为估算，实际数据因品类和运营策略而异",
    savingsLabel: "对比自建团队，年节省",
    savingsNote: "¥35,000/月 × 12 - ¥8,800（建站）- ¥9,600（维护）= 节省 ¥401,600/年",
    timelineTitle: "时间成本对比",
    timelineRows: [
      { phase: "品牌官网上线", them: "机构：60–90 天", me: "我：7 天" },
      { phase: "电商独立站上线", them: "自建团队：3–6 个月", me: "我：21 天" },
      { phase: "SEO 内容体系搭建", them: "内容运营：3–6 个月", me: "我：同步完成" },
      { phase: "支付 + 订单系统", them: "开发：1–2 个月", me: "我：内置，即开即用" },
      { phase: "自动化运营上线", them: "需额外招人", me: "我：包含在方案内" },
    ],
    timelineNote: "每晚一天上线 = 少一天收款。你的竞争对手不会等你。",
  },
  en: {
    eyebrow: "THE MATH",
    title: "Your money is leaking from two places",
    subtitle: "Hiring costs on one side, platform commissions on the other. Both are optional.",
    tab1: "Hiring vs. Me",
    tab2: "Platform vs. Store",
    hiringTitle: "What does building a team actually cost?",
    hiringSubtitle: "Source: Boss直聘 2024 Shenzhen cross-border e-commerce salary data",
    hiringRows: [
      { role: "Shopify / store developer", salary: "¥12,000–18,000/mo", note: "Plus 3–6 months ramp-up time" },
      { role: "UI/UX designer", salary: "¥8,000–15,000/mo", note: "Or ¥5,000–20,000 per project outsourced" },
      { role: "Content writer / copywriter", salary: "¥6,000–10,000/mo", note: "SEO articles, product copy, social" },
      { role: "Social media manager", salary: "¥5,000–8,000/mo", note: "Instagram / TikTok / Facebook" },
      { role: "Order manager / customer service", salary: "¥4,000–7,000/mo", note: "Extra temp staff during peak season" },
    ],
    hiringTotal: "¥35,000–58,000/mo",
    hiringTotalNote: "Excludes: social insurance, recruitment fees, trial-and-error costs, severance, equipment...",
    hiringVsBob: "Work with Bob: ¥8,800 one-time",
    hiringVsBobNote: "All of the above included. 7–21 day delivery. ¥800/mo maintenance.",
    platformTitle: "Platform selling vs. your own store — the real gap",
    platformSubtitle: "Based on ¥100,000/month in sales",
    platformRows: [
      { item: "Platform commission/mo", platform: "¥15,000 (15%)", independent: "¥0", highlight: true },
      { item: "Advertising/mo", platform: "¥20,000–40,000", independent: "¥3,000–8,000 (SEO = long-term free traffic)", highlight: true },
      { item: "Brand premium potential", platform: "Low (commoditized)", independent: "High (brand trust lifts AOV 30–50%)" },
      { item: "Customer data ownership", platform: "Platform owns it — you're blind", independent: "100% yours — retarget and repurchase" },
      { item: "Account suspension risk", platform: "Anytime, no warning", independent: "None — you control everything" },
      { item: "Multi-currency / multi-language", platform: "Limited, high fees", independent: "Global payments, auto-converted" },
      { item: "Annual profit difference", platform: "Baseline", independent: "+¥180,000–300,000 more", highlight: true },
    ],
    platformNote: "* Estimates based on typical cross-border e-commerce operations",
    savingsLabel: "Annual savings vs. in-house team",
    savingsNote: "¥35,000/mo × 12 − ¥8,800 (build) − ¥9,600 (maintenance) = ¥401,600 saved/year",
    timelineTitle: "Time cost comparison",
    timelineRows: [
      { phase: "Brand website live", them: "Agency: 60–90 days", me: "Me: 7 days" },
      { phase: "E-commerce store live", them: "In-house team: 3–6 months", me: "Me: 21 days" },
      { phase: "SEO content system", them: "Content team: 3–6 months", me: "Me: built in simultaneously" },
      { phase: "Payment + order system", them: "Dev: 1–2 months", me: "Me: built-in, ready on day 1" },
      { phase: "Automation live", them: "Requires extra hire", me: "Me: included in package" },
    ],
    timelineNote: "Every day without a store = one day without revenue. Your competitors aren't waiting.",
  },
  ja: {
    eyebrow: "コスト計算",
    title: "お金が2か所から漏れている",
    subtitle: "採用コストとプラットフォーム手数料。どちらも回避できる。",
    tab1: "採用 vs 私",
    tab2: "プラットフォーム vs 独立サイト",
    hiringTitle: "チームを作るといくらかかる？",
    hiringSubtitle: "出典：Boss直聘 2024年深セン越境EC給与データ",
    hiringRows: [
      { role: "Shopify開発者", salary: "¥12,000–18,000/月", note: "3〜6ヶ月の立ち上げ期間も必要" },
      { role: "UIデザイナー", salary: "¥8,000–15,000/月", note: "外注なら¥5,000–20,000/プロジェクト" },
      { role: "コンテンツライター", salary: "¥6,000–10,000/月", note: "SEO記事、商品説明、SNS" },
      { role: "SNS運用担当", salary: "¥5,000–8,000/月", note: "Instagram / TikTok / Facebook" },
      { role: "注文管理・カスタマーサービス", salary: "¥4,000–7,000/月", note: "繁忙期は追加スタッフも必要" },
    ],
    hiringTotal: "¥35,000–58,000/月",
    hiringTotalNote: "社会保険、採用費、試行錯誤コスト、退職金、設備費は含まず",
    hiringVsBob: "Bobと協業：¥8,800 一回払い",
    hiringVsBobNote: "上記すべて含む。7〜21日納品。月次メンテ¥800。",
    platformTitle: "プラットフォーム販売 vs 独立サイト",
    platformSubtitle: "月間売上¥100,000の場合",
    platformRows: [
      { item: "プラットフォーム手数料/月", platform: "¥15,000（15%）", independent: "¥0", highlight: true },
      { item: "広告費/月", platform: "¥20,000–40,000", independent: "¥3,000–8,000（SEO=長期無料流入）", highlight: true },
      { item: "ブランドプレミアム", platform: "低い（コモディティ競争）", independent: "高い（ブランド力でAOV30〜50%向上）" },
      { item: "顧客データの所有権", platform: "プラットフォームが所有", independent: "完全にあなたのもの" },
      { item: "アカウント停止リスク", platform: "いつでも、予告なし", independent: "なし、すべてコントロール可能" },
      { item: "多通貨・多言語", platform: "制限あり、手数料高", independent: "グローバル決済、自動換算" },
      { item: "年間利益差", platform: "基準", independent: "+¥180,000–300,000", highlight: true },
    ],
    platformNote: "* 典型的な越境EC運営に基づく推定値",
    savingsLabel: "社内チーム比 年間節約額",
    savingsNote: "¥35,000/月 × 12 − ¥8,800（構築）− ¥9,600（保守）= ¥401,600/年節約",
    timelineTitle: "時間コスト比較",
    timelineRows: [
      { phase: "ブランドサイト公開", them: "エージェンシー：60〜90日", me: "私：7日" },
      { phase: "ECストア公開", them: "社内チーム：3〜6ヶ月", me: "私：21日" },
      { phase: "SEOコンテンツ体制", them: "コンテンツチーム：3〜6ヶ月", me: "私：同時に完成" },
      { phase: "決済＋注文システム", them: "開発：1〜2ヶ月", me: "私：内蔵、初日から使用可能" },
      { phase: "自動化稼働", them: "追加採用が必要", me: "私：プランに含む" },
    ],
    timelineNote: "1日遅れるごとに1日分の売上を失う。競合他社はあなたを待ってくれない。",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ROISection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

  return (
    <section id="roi" style={{ background: "#111111", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, color: "#FAFAF8", margin: "0 0 16px", lineHeight: 1.1 }}>
            {c.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 560, lineHeight: 1.75 }}>
            {c.subtitle}
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} style={{ display: "flex", gap: 2, marginBottom: 48 }}>
          {[c.tab1, c.tab2].map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i as 0 | 1)}
              style={{
                fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                padding: "12px 28px", border: "none", cursor: "pointer", transition: "all 0.2s",
                background: activeTab === i ? "#8B6914" : "rgba(255,255,255,0.05)",
                color: activeTab === i ? "#FAFAF8" : "rgba(255,255,255,0.35)",
              }}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Tab 1: Hiring Cost */}
        {activeTab === 0 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>

              {/* Hiring table */}
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#FAFAF8", marginBottom: 8 }}>{c.hiringTitle}</div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 28 }}>{c.hiringSubtitle}</div>

                {c.hiringRows.map((row, i) => (
                  <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "16px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>{row.role}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>{row.note}</div>
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#D4C49A", whiteSpace: "nowrap", flexShrink: 0 }}>{row.salary}</div>
                    </div>
                  </div>
                ))}

                {/* Total */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", marginTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{locale === "zh" ? "自建团队月成本" : locale === "ja" ? "社内チーム月額コスト" : "In-house team monthly cost"}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#FF6B6B" }}>{c.hiringTotal}</div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8, letterSpacing: "0.05em" }}>{c.hiringTotalNote}</div>
                </div>
              </div>

              {/* Right: savings panel */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Bob cost */}
                <div style={{ background: "rgba(139,105,20,0.1)", border: "1px solid rgba(139,105,20,0.3)", padding: "36px 32px", flex: 1 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
                    {locale === "zh" ? "对比方案" : locale === "ja" ? "比較プラン" : "Alternative"}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 40, fontWeight: 700, color: "#D4C49A", lineHeight: 1, marginBottom: 12 }}>
                    {c.hiringVsBob}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                    {c.hiringVsBobNote}
                  </div>
                </div>

                {/* Annual savings */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "32px" }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                    {c.savingsLabel}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 52, fontWeight: 700, color: "#D4C49A", lineHeight: 1, marginBottom: 12 }}>
                    <AnimatedNumber target={401600} prefix="¥" />
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", lineHeight: 1.6, letterSpacing: "0.05em" }}>
                    {c.savingsNote}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline comparison */}
            <div style={{ marginTop: 56, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 48 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 32 }}>
                {c.timelineTitle}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 2 }}>
                {c.timelineRows.map((row, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", padding: "24px 20px" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>{row.phase}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.25)", marginBottom: 6 }}>{row.them}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#D4C49A", fontWeight: 600 }}>{row.me}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8B6914", marginTop: 24, fontStyle: "italic" }}>
                {c.timelineNote}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Platform vs Independent */}
        {activeTab === 1 && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#FAFAF8", marginBottom: 8 }}>{c.platformTitle}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", marginBottom: 36 }}>{c.platformSubtitle}</div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr>
                    <th style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "0 0 20px", textAlign: "left", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      {locale === "zh" ? "对比项目" : locale === "ja" ? "比較項目" : "Item"}
                    </th>
                    <th style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "0 0 20px 24px", textAlign: "right", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      {locale === "zh" ? "平台（亚马逊/速卖通）" : locale === "ja" ? "プラットフォーム" : "Platform (Amazon etc.)"}
                    </th>
                    <th style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4C49A", padding: "0 0 20px 24px", textAlign: "right", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                      {locale === "zh" ? "你的独立站" : locale === "ja" ? "独立サイト" : "Your own store"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {c.platformRows.map((row, i) => (
                    <tr key={i}
                      style={{ background: row.highlight ? "rgba(139,105,20,0.05)" : "transparent" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                      onMouseLeave={e => (e.currentTarget.style.background = row.highlight ? "rgba(139,105,20,0.05)" : "transparent")}
                    >
                      <td style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
                        {row.highlight && <span style={{ width: 3, height: 14, background: "#8B6914", borderRadius: 2, flexShrink: 0 }} />}
                        {row.item}
                      </td>
                      <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", padding: "16px 0 16px 24px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        {row.platform}
                      </td>
                      <td style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#D4C49A", padding: "16px 0 16px 24px", textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.05)", fontWeight: 600 }}>
                        {row.independent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 16, letterSpacing: "0.05em" }}>
              {c.platformNote}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
