/* ServicesSection v3 — Value-first, no tech jargon
   Design: 3 pricing cards, center card highlighted (gold border)
   Key fix: Each card = 1 business outcome promise, NOT a feature list
   Structure: Outcome headline → Price → What you get (results) → Brand matrix callout
   Hover: card lifts slightly
   Mobile: Single column stack, full-width cards */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  matrixTitle: string;
  matrixDesc: string;
  matrixPoints: string[];
  plans: {
    tag: string;
    name: string;
    promise: string;
    price: string;
    priceNote: string;
    timeline: string;
    results: string[];
    cta: string;
    highlight: boolean;
  }[];
  compareLabel: string;
  compareNote: string;
}> = {
  zh: {
    eyebrow: "服务方案",
    title: "选一个，7 天后你的品牌就在线了",
    subtitle: "三个方案，对应三种业务阶段。",
    matrixTitle: "品牌矩阵建站策略（所有方案均可加购）",
    matrixDesc: "不是建一个网站，而是建一个品牌堡垒。每个产品、每个使用场景、每个目标人群都有独立落地页，形成完整的 SEO 矩阵。让 Google 和 AI 持续给你带来免费流量。",
    matrixPoints: [
      "长尾词 + 短尾词全覆盖",
      "场景化产品展示页",
      "AI 引用优化（GEO）",
      "品牌内容矩阵",
    ],
    plans: [
      {
        tag: "入门",
        name: "品牌展示站",
        promise: "7 天内，你有一个让客户信任你的专业官网",
        price: "¥3,800",
        priceNote: "一次性，含首年域名",
        timeline: "7 天交付",
        results: [
          "客户第一眼就觉得你是正规品牌",
          "Google 能找到你（基础 SEO）",
          "手机和电脑都好看",
          "你自己能改内容，不用找开发",
          "上线后 7 天免费修改",
        ],
        cta: "我要这个",
        highlight: false,
      },
      {
        tag: "推荐",
        name: "跨境电商站",
        promise: "21 天内，你有一个能收全球订单、自动运营的独立站",
        price: "¥8,800",
        priceNote: "一次性，含首年域名+服务器",
        timeline: "21 天交付",
        results: [
          "全球客户能用自己的货币付款",
          "订单自动确认、发货通知自动发送",
          "节假日促销自动触发，不需要人盯",
          "比 Shopify 每年省 ¥5,000–20,000",
          "你拥有所有代码和数据",
          "附带操作培训 + 操作手册",
        ],
        cta: "这个最适合我",
        highlight: true,
      },
      {
        tag: "全套",
        name: "品牌增长系统",
        promise: "30 天内，你有一个能自动获客、自动运营、持续增长的品牌体系",
        price: "¥18,000",
        priceNote: "一次性，含3个月维护",
        timeline: "30 天交付",
        results: [
          "品牌矩阵建站（多产品线全覆盖）",
          "社媒内容自动发布到各平台",
          "AI 内容生成 + 定时发布",
          "完整数据分析面板",
          "季度 SEO 报告 + 关键词追踪",
          "3 个月专属维护支持",
        ],
        cta: "我要全套",
        highlight: false,
      },
    ],
    compareLabel: "不确定选哪个？",
    compareNote: "发消息告诉我你的情况，我帮你选最适合的方案。",
  },
  en: {
    eyebrow: "PACKAGES",
    title: "Pick one — your brand is live in 7 days",
    subtitle: "Three packages for three business stages.",
    matrixTitle: "Brand Matrix Strategy (add-on for all packages)",
    matrixDesc: "Not just one website — a brand fortress. Every product, every use case, every target audience gets its own landing page, forming a complete SEO matrix. Google and AI continuously bring you free traffic.",
    matrixPoints: [
      "Long-tail + short-tail keyword coverage",
      "Scene-based product landing pages",
      "AI citation optimization (GEO)",
      "Brand content matrix",
    ],
    plans: [
      {
        tag: "Starter",
        name: "Brand Showcase Site",
        promise: "In 7 days, you have a professional website that makes customers trust you",
        price: "¥3,800",
        priceNote: "One-time, includes first-year domain",
        timeline: "7-day delivery",
        results: [
          "Customers see you as a legitimate brand at first glance",
          "Google can find you (basic SEO)",
          "Looks great on mobile and desktop",
          "You can edit content yourself — no developer needed",
          "7-day free revision period after launch",
        ],
        cta: "I want this",
        highlight: false,
      },
      {
        tag: "Recommended",
        name: "Cross-border E-commerce Store",
        promise: "In 21 days, you have an independent store that takes global orders and runs itself",
        price: "¥8,800",
        priceNote: "One-time, includes first-year domain + server",
        timeline: "21-day delivery",
        results: [
          "Global customers pay in their own currency",
          "Orders auto-confirmed, shipping notifications auto-sent",
          "Holiday promotions auto-trigger — no manual work",
          "Save ¥5,000–20,000/year vs Shopify",
          "You own all the code and data",
          "Includes operations training + manual",
        ],
        cta: "This is the one for me",
        highlight: true,
      },
      {
        tag: "Full System",
        name: "Brand Growth System",
        promise: "In 30 days, you have a brand system that auto-acquires customers, auto-operates, and keeps growing",
        price: "¥18,000",
        priceNote: "One-time, includes 3 months maintenance",
        timeline: "30-day delivery",
        results: [
          "Brand matrix store (full multi-product coverage)",
          "Social content auto-published to all platforms",
          "AI content generation + scheduled publishing",
          "Full analytics dashboard",
          "Quarterly SEO report + keyword tracking",
          "3 months dedicated maintenance support",
        ],
        cta: "I want the full system",
        highlight: false,
      },
    ],
    compareLabel: "Not sure which to pick?",
    compareNote: "Send me a message about your situation and I'll recommend the right package.",
  },
  ja: {
    eyebrow: "プラン",
    title: "1つ選べば、7日後にブランドが公開される",
    subtitle: "3つのビジネスステージに対応した3つのプラン。",
    matrixTitle: "ブランドマトリックス戦略（全プランに追加可能）",
    matrixDesc: "1つのウェブサイトではなく、ブランド要塞を構築。すべての商品、ユースケース、ターゲット層に独自のランディングページを設置し、完全なSEOマトリックスを形成。GoogleとAIが継続的に無料トラフィックをもたらす。",
    matrixPoints: [
      "ロングテール + ショートテールキーワード全網羅",
      "シーンベースの商品ランディングページ",
      "AI引用最適化（GEO）",
      "ブランドコンテンツマトリックス",
    ],
    plans: [
      {
        tag: "スターター",
        name: "ブランド展示サイト",
        promise: "7日以内に、顧客があなたを信頼するプロのウェブサイトが完成",
        price: "¥3,800",
        priceNote: "一回払い、初年度ドメイン込み",
        timeline: "7日納品",
        results: [
          "顧客が一目で正規ブランドと認識",
          "Googleがあなたを見つけられる（基本SEO）",
          "スマートフォンとパソコンで美しく表示",
          "開発者不要でコンテンツを自分で編集",
          "ローンチ後7日間の無料修正",
        ],
        cta: "これにする",
        highlight: false,
      },
      {
        tag: "おすすめ",
        name: "越境ECストア",
        promise: "21日以内に、世界中の注文を受け取り自動運営できる独立サイトが完成",
        price: "¥8,800",
        priceNote: "一回払い、初年度ドメイン+サーバー込み",
        timeline: "21日納品",
        results: [
          "世界中のバイヤーが自国通貨で決済",
          "注文自動確認、発送通知自動送信",
          "季節プロモーション自動トリガー",
          "Shopifyより年間¥5,000〜20,000節約",
          "コードとデータを完全所有",
          "操作トレーニング + マニュアル付き",
        ],
        cta: "これが一番合っている",
        highlight: true,
      },
      {
        tag: "フルシステム",
        name: "ブランド成長システム",
        promise: "30日以内に、自動集客・自動運営・継続成長するブランド体系が完成",
        price: "¥18,000",
        priceNote: "一回払い、3ヶ月メンテナンス込み",
        timeline: "30日納品",
        results: [
          "ブランドマトリックス建設（複数商品ライン全網羅）",
          "SNSコンテンツを全プラットフォームに自動投稿",
          "AIコンテンツ生成 + 定時投稿",
          "完全分析ダッシュボード",
          "四半期SEOレポート + キーワード追跡",
          "3ヶ月専属メンテナンスサポート",
        ],
        cta: "フルシステムにする",
        highlight: false,
      },
    ],
    compareLabel: "どれを選ぶか迷っていますか？",
    compareNote: "状況を教えてください。最適なプランをお勧めします。",
  },
};

export default function ServicesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [expandedMatrix, setExpandedMatrix] = useState(false);

  return (
    <section id="services" style={{ background: "#FAFAF8", padding: "120px 0" }}>
      <div className="services-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 600, color: "#1A1A1A", margin: "0 0 12px", lineHeight: 1.1 }}>
            {c.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999" }}>{c.subtitle}</p>
        </motion.div>

        {/* Pricing cards */}
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginBottom: 48 }}>
          {c.plans.map((plan, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{
                background: plan.highlight ? "#1A1A1A" : "#FFFFFF",
                border: plan.highlight ? "2px solid #8B6914" : "2px solid transparent",
                padding: "40px 36px 36px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Tag */}
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: plan.highlight ? "#8B6914" : "#BBB",
                marginBottom: 16,
              }}>
                {plan.tag}
              </div>

              {/* Plan name */}
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 22,
                fontWeight: 600,
                color: plan.highlight ? "#FAFAF8" : "#1A1A1A",
                marginBottom: 12,
                lineHeight: 1.2,
              }}>
                {plan.name}
              </div>

              {/* Promise — the key value statement */}
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: plan.highlight ? "rgba(255,255,255,0.55)" : "#666",
                lineHeight: 1.6,
                marginBottom: 28,
                paddingBottom: 28,
                borderBottom: plan.highlight ? "1px solid rgba(255,255,255,0.08)" : "1px solid #E8E4DC",
              }}>
                {plan.promise}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 44,
                  fontWeight: 700,
                  color: plan.highlight ? "#D4C49A" : "#1A1A1A",
                  lineHeight: 1,
                }}>
                  {plan.price}
                </span>
              </div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8,
                color: plan.highlight ? "rgba(255,255,255,0.25)" : "#BBB",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}>
                {plan.priceNote}
              </div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: "#8B6914",
                letterSpacing: "0.1em",
                marginBottom: 28,
              }}>
                {plan.timeline}
              </div>

              {/* Results list */}
              <div style={{ flex: 1, marginBottom: 32 }}>
                {plan.results.map((r, ri) => (
                  <div key={ri} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#8B6914", fontSize: 12, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: plan.highlight ? "rgba(255,255,255,0.6)" : "#555",
                      lineHeight: 1.5,
                    }}>
                      {r}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a href="#contact" whileHover={{ x: 2 }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  background: plan.highlight ? "#8B6914" : "transparent",
                  border: plan.highlight ? "none" : "1px solid #1A1A1A",
                  color: plan.highlight ? "#FAFAF8" : "#1A1A1A",
                  textDecoration: "none",
                  display: "block",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  if (!plan.highlight) { e.currentTarget.style.background = "#1A1A1A"; e.currentTarget.style.color = "#FAFAF8"; }
                }}
                onMouseLeave={e => {
                  if (!plan.highlight) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1A1A1A"; }
                }}
              >
                {plan.cta} →
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Brand Matrix callout — expandable */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <button
            onClick={() => setExpandedMatrix(!expandedMatrix)}
            style={{
              width: "100%",
              background: "#1A1A1A",
              border: "none",
              padding: "24px 36px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: "#8B6914", marginBottom: 6 }}>
                {locale === "zh" ? "进阶策略" : locale === "ja" ? "上級戦略" : "ADVANCED STRATEGY"}
              </div>
              <div className="matrix-title" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 20, fontWeight: 600, color: "#FAFAF8" }}>
                {c.matrixTitle}
              </div>
            </div>
            <motion.span animate={{ rotate: expandedMatrix ? 45 : 0 }} transition={{ duration: 0.2 }}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 20, color: "#8B6914", flexShrink: 0, marginLeft: 16 }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence>
            {expandedMatrix && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ overflow: "hidden", background: "#111" }}
              >
                <div className="matrix-expanded" style={{ padding: "36px 36px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0 }}>
                    {c.matrixDesc}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {c.matrixPoints.map((pt, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ color: "#8B6914", fontSize: 12 }}>→</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Compare note */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999" }}>
            {c.compareLabel}{" "}
          </span>
          <a href="#contact" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#8B6914", textDecoration: "none" }}>
            {c.compareNote}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .services-container {
            padding: 0 20px !important;
          }
          #services {
            padding: 72px 0 !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .services-grid > div {
            padding: 28px 24px 24px !important;
          }
          .matrix-expanded {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 24px 20px !important;
          }
          button[style*="padding: 24px 36px"] {
            padding: 20px 20px !important;
          }
          .matrix-title {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
