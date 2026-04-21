/* ServicesSection — Boss Result Framing v2
   Design: Warm white bg, 3-tier cards + brand matrix strategy callout
   Strategy: "What do I GET?" not "What can you DO?"
   Key message: Each tier = a business outcome, not a tech deliverable
   Brand matrix: special callout for 铺货转品牌 operators */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  recommended: string;
  showMore: string;
  showLess: string;
  ctaLabel: string;
  tiers: {
    tag: string;
    name: string;
    price: string;
    timeline: string;
    outcome: string;
    tagline: string;
    results: string[];
    includes: string[];
    highlight: boolean;
  }[];
  matrixTitle: string;
  matrixBadge: string;
  matrixDesc: string;
  matrixPoints: string[];
  matrixCta: string;
  note: string;
}> = {
  zh: {
    eyebrow: "服务套餐",
    title: "你能得到什么结果？",
    subtitle: "每个方案都以你的业务结果为核心，而不是技术功能列表。",
    recommended: "最受欢迎",
    showMore: "查看全部包含内容",
    showLess: "收起",
    ctaLabel: "获取报价",
    tiers: [
      {
        tag: "适合：刚起步的品牌",
        name: "品牌展示站",
        price: "¥3,800",
        timeline: "7 天交付",
        outcome: "你得到的结果",
        tagline: "7天后，你有一个能让客户信任你的专业品牌网站",
        results: [
          "客户搜索你的品牌，第一眼就觉得专业",
          "有地方放你的产品故事、联系方式、品牌价值观",
          "比同行的 Shopify 模板站看起来贵 30%",
          "Google 能收录你，SEO 基础打好",
        ],
        includes: [
          "5 页专业品牌网站",
          "移动端完美适配",
          "联系表单（询盘直达你的邮箱）",
          "Google Analytics 数据追踪",
          "基础 SEO 设置（标题/描述/结构）",
          "Vercel 部署（0 服务器费用）",
          "自定义域名绑定",
          "1 轮修改",
        ],
        highlight: false,
      },
      {
        tag: "适合：准备开始收款的品牌",
        name: "电商独立站",
        price: "¥8,800",
        timeline: "21 天交付",
        outcome: "你得到的结果",
        tagline: "21天后，你有一个能全球收款、自动处理订单的独立站",
        results: [
          "不再给亚马逊交 15% 佣金，利润全归你",
          "支持 Stripe/PayPal/支付宝，全球买家都能付款",
          "订单自动确认、库存自动更新，不用人盯着",
          "多语言自动切换，欧美/日本客户无障碍购买",
        ],
        includes: [
          "完整电商购物系统",
          "商品目录 + 规格变体（颜色/尺码等）",
          "全球支付网关（Stripe/PayPal/支付宝）",
          "自动订单确认邮件",
          "库存追踪 + 低库存提醒",
          "折扣码 + 节假日促销触发器",
          "用户评论系统",
          "SEO + 网站地图",
          "数据分析面板",
          "2 轮修改",
        ],
        highlight: true,
      },
      {
        tag: "适合：想让独立站自己运转的品牌",
        name: "全自动化方案",
        price: "¥18,000",
        timeline: "30 天交付",
        outcome: "你得到的结果",
        tagline: "30天后，你的独立站基本不需要人工干预就能运转",
        results: [
          "社媒内容定时自动发布，省掉 1 个运营岗",
          "订单追踪、库存预警、节假日促销全自动",
          "内容后台你的团队 3 分钟学会操作",
          "AI 引用你的品牌，搜索引擎长期带来免费流量",
        ],
        includes: [
          "包含电商独立站全部功能",
          "n8n 自动化工作流（定时任务/触发器）",
          "社媒自动发布（Instagram/TikTok/Facebook）",
          "订单追踪 + 库存预警自动化",
          "节假日营销自动触发",
          "无头 CMS 内容管理后台（团队可自行更新）",
          "高级数据库面板（用户数据/评论/流量）",
          "上线后 30 天技术支持",
          "团队操作培训",
          "文档交接",
        ],
        highlight: false,
      },
    ],
    matrixBadge: "特别方案",
    matrixTitle: "从铺货到品牌：矩阵建站战略",
    matrixDesc: "如果你过去做的是铺货模式，现在想转型做品牌、提高客单价——这个方案专门为你设计。",
    matrixPoints: [
      "以「场景化产品矩阵」方式建站，一个品牌下多个产品线，每个都有独立落地页",
      "覆盖长尾词 + 短尾词，让 Google 和 AI 搜索引擎都能找到你的每个产品",
      "品牌堡垒策略：用内容体系建立护城河，让竞争对手难以复制",
      "从「卖商品」升级到「卖品牌」，客单价提升 30–50%，平台依赖降低",
    ],
    matrixCta: "了解矩阵建站方案",
    note: "所有方案均为固定报价，无隐藏费用。付款后开始，按时交付，不满意全额退款。",
  },
  en: {
    eyebrow: "SERVICES",
    title: "What results do you get?",
    subtitle: "Every package is defined by your business outcome, not a list of tech features.",
    recommended: "Most Popular",
    showMore: "See everything included",
    showLess: "Show less",
    ctaLabel: "Get a quote",
    tiers: [
      {
        tag: "For: brands just getting started",
        name: "Brand Presence",
        price: "¥3,800",
        timeline: "7-day delivery",
        outcome: "What you get",
        tagline: "In 7 days, you have a professional brand site that makes customers trust you",
        results: [
          "Customers Google you and immediately see a credible brand",
          "A home for your product story, contact info, and brand values",
          "Looks 30% more premium than a generic Shopify template",
          "Google can index you — SEO foundation is set",
        ],
        includes: [
          "5-page professional brand website",
          "Mobile-perfect responsive design",
          "Contact form (inquiries go straight to your inbox)",
          "Google Analytics tracking",
          "Basic SEO (titles, meta, structure)",
          "Vercel deployment (zero server cost)",
          "Custom domain connection",
          "1 round of revisions",
        ],
        highlight: false,
      },
      {
        tag: "For: brands ready to start collecting payments",
        name: "E-Commerce Store",
        price: "¥8,800",
        timeline: "21-day delivery",
        outcome: "What you get",
        tagline: "In 21 days, you have a store that takes global payments and processes orders automatically",
        results: [
          "Stop paying Amazon 15% — keep 100% of your profit",
          "Stripe/PayPal/Alipay — buyers worldwide can pay you",
          "Orders auto-confirmed, inventory auto-updated — no manual work",
          "Multi-language auto-switch — US, EU, Japan buyers buy without friction",
        ],
        includes: [
          "Full e-commerce shopping system",
          "Product catalog + variants (color, size, etc.)",
          "Global payment gateways (Stripe/PayPal/Alipay)",
          "Automated order confirmation emails",
          "Inventory tracking + low-stock alerts",
          "Discount codes + holiday promotion triggers",
          "Customer review system",
          "SEO + sitemap",
          "Analytics dashboard",
          "2 rounds of revisions",
        ],
        highlight: true,
      },
      {
        tag: "For: brands that want their store to run itself",
        name: "Full Automation",
        price: "¥18,000",
        timeline: "30-day delivery",
        outcome: "What you get",
        tagline: "In 30 days, your store runs with minimal human intervention",
        results: [
          "Social content auto-publishes on schedule — saves 1 full-time ops hire",
          "Order tracking, inventory alerts, holiday promos — all automated",
          "Content dashboard your team learns in 3 minutes",
          "AI cites your brand, search engines bring free traffic long-term",
        ],
        includes: [
          "Everything in E-Commerce Store",
          "n8n automation workflows (scheduled tasks / triggers)",
          "Social media auto-publishing (Instagram/TikTok/Facebook)",
          "Order tracking + inventory alert automation",
          "Holiday marketing auto-triggers",
          "Headless CMS (team can update content themselves)",
          "Advanced database panel (users, reviews, traffic)",
          "30-day post-launch technical support",
          "Team training session",
          "Documentation handover",
        ],
        highlight: false,
      },
    ],
    matrixBadge: "Special Strategy",
    matrixTitle: "From dropshipping to brand: the matrix store strategy",
    matrixDesc: "If you've been running a dropshipping model and want to shift to brand-building and higher AOV — this strategy is designed for you.",
    matrixPoints: [
      "Build with a 'scene-based product matrix' — one brand, multiple product lines, each with its own landing page",
      "Cover long-tail + short-tail keywords so Google and AI search engines find every product you sell",
      "Brand fortress strategy: build a content moat that competitors can't easily replicate",
      "Upgrade from 'selling products' to 'selling a brand' — AOV up 30–50%, platform dependency down",
    ],
    matrixCta: "Learn about matrix store strategy",
    note: "All packages are fixed-price. No hidden fees. Work starts on payment. Delivered on time. Full refund if not satisfied.",
  },
  ja: {
    eyebrow: "サービス",
    title: "どんな結果が得られますか？",
    subtitle: "すべてのプランはビジネス成果を中心に設計されています。技術機能リストではありません。",
    recommended: "最も人気",
    showMore: "含まれるすべての内容を見る",
    showLess: "閉じる",
    ctaLabel: "見積もりを取る",
    tiers: [
      {
        tag: "対象：ブランドを始めたばかりの方",
        name: "ブランドサイト",
        price: "¥3,800",
        timeline: "7日納品",
        outcome: "得られる結果",
        tagline: "7日後、顧客に信頼されるプロのブランドサイトが完成",
        results: [
          "顧客がGoogle検索して、すぐにプロのブランドと認識",
          "商品ストーリー、連絡先、ブランド価値観の発信拠点",
          "一般的なShopifyテンプレートより30%高級感が出る",
          "Googleにインデックスされ、SEOの基盤が整う",
        ],
        includes: [
          "5ページのプロブランドサイト",
          "モバイル完全対応デザイン",
          "お問い合わせフォーム",
          "Google Analyticsトラッキング",
          "基本SEO設定",
          "Vercelデプロイ（サーバー費用ゼロ）",
          "カスタムドメイン接続",
          "1回の修正",
        ],
        highlight: false,
      },
      {
        tag: "対象：決済を始める準備ができたブランド",
        name: "ECストア",
        price: "¥8,800",
        timeline: "21日納品",
        outcome: "得られる結果",
        tagline: "21日後、グローバル決済と自動注文処理ができるストアが完成",
        results: [
          "Amazonの15%手数料不要 — 利益は全部あなたのもの",
          "Stripe/PayPal/Alipay — 世界中のバイヤーが支払い可能",
          "注文自動確認、在庫自動更新 — 手動作業不要",
          "多言語自動切替 — 米国、EU、日本のバイヤーがスムーズに購入",
        ],
        includes: [
          "完全なECショッピングシステム",
          "商品カタログ＋バリアント（色、サイズなど）",
          "グローバル決済ゲートウェイ（Stripe/PayPal/Alipay）",
          "自動注文確認メール",
          "在庫追跡＋在庫切れアラート",
          "割引コード＋季節プロモーショントリガー",
          "顧客レビューシステム",
          "SEO＋サイトマップ",
          "分析ダッシュボード",
          "2回の修正",
        ],
        highlight: true,
      },
      {
        tag: "対象：ストアを自動運営したいブランド",
        name: "フル自動化",
        price: "¥18,000",
        timeline: "30日納品",
        outcome: "得られる結果",
        tagline: "30日後、最小限の人手でストアが自動運営される",
        results: [
          "SNSコンテンツが自動スケジュール投稿 — 運用担当1名分を削減",
          "注文追跡、在庫アラート、季節プロモーションがすべて自動化",
          "コンテンツダッシュボードをチームが3分で習得",
          "AIがブランドを引用、検索エンジンが長期的に無料流入をもたらす",
        ],
        includes: [
          "ECストアのすべての機能を含む",
          "n8n自動化ワークフロー（スケジュールタスク/トリガー）",
          "SNS自動投稿（Instagram/TikTok/Facebook）",
          "注文追跡＋在庫アラート自動化",
          "季節マーケティング自動トリガー",
          "ヘッドレスCMS（チームが自分でコンテンツ更新可能）",
          "高度なデータベースパネル（ユーザー、レビュー、トラフィック）",
          "ローンチ後30日技術サポート",
          "チームトレーニング",
          "ドキュメント引き渡し",
        ],
        highlight: false,
      },
    ],
    matrixBadge: "特別戦略",
    matrixTitle: "ドロップシッピングからブランドへ：マトリックスストア戦略",
    matrixDesc: "ドロップシッピングモデルからブランド構築・高AOVへの転換を目指す方向けに設計された戦略です。",
    matrixPoints: [
      "「シーン別商品マトリックス」で構築 — 1ブランド、複数商品ライン、各々に独立ランディングページ",
      "ロングテール＋ショートテールキーワードをカバー — GoogleとAI検索エンジンが全商品を発見",
      "ブランド要塞戦略：競合が簡単に模倣できないコンテンツの堀を構築",
      "「商品を売る」から「ブランドを売る」へ — AOV30〜50%向上、プラットフォーム依存度低下",
    ],
    matrixCta: "マトリックスストア戦略を詳しく見る",
    note: "すべてのプランは固定料金です。隠れた費用はありません。支払い後に作業開始、期日通り納品、不満足の場合は全額返金。",
  },
};

export default function ServicesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="services" style={{ background: "#FAFAF8", padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px", lineHeight: 1.1 }}>
            {c.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#777", maxWidth: 480, lineHeight: 1.7 }}>
            {c.subtitle}
          </p>
        </motion.div>

        {/* Tier cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginBottom: 80 }}>
          {c.tiers.map((tier, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{ background: tier.highlight ? "#1A1A1A" : "#FFFFFF", border: tier.highlight ? "1px solid #8B6914" : "1px solid #E8E4DC", padding: "48px 36px", position: "relative", display: "flex", flexDirection: "column" }}
            >
              {tier.highlight && (
                <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#8B6914", padding: "4px 16px", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FAFAF8", whiteSpace: "nowrap" }}>
                  {c.recommended}
                </div>
              )}

              {/* Tag */}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", color: tier.highlight ? "rgba(255,255,255,0.3)" : "#AAA", marginBottom: 16, marginTop: tier.highlight ? 12 : 0 }}>
                {tier.tag}
              </div>

              {/* Name */}
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: tier.highlight ? "#FAFAF8" : "#1A1A1A", marginBottom: 16, lineHeight: 1.2 }}>
                {tier.name}
              </div>

              {/* Price + timeline */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 48, fontWeight: 700, lineHeight: 1, color: tier.highlight ? "#D4C49A" : "#1A1A1A" }}>
                  {tier.price}
                </span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", color: tier.highlight ? "rgba(255,255,255,0.35)" : "#AAA" }}>
                  {tier.timeline}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: tier.highlight ? "rgba(255,255,255,0.08)" : "#E8E4DC", marginBottom: 24 }} />

              {/* Outcome label */}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B6914", marginBottom: 12 }}>
                {tier.outcome}
              </div>

              {/* Tagline */}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: tier.highlight ? "rgba(255,255,255,0.65)" : "#555", lineHeight: 1.65, marginBottom: 20, fontStyle: "italic" }}>
                {tier.tagline}
              </p>

              {/* Results */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                {tier.results.map((r, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: tier.highlight ? "rgba(255,255,255,0.75)" : "#444", marginBottom: 10, lineHeight: 1.5 }}>
                    <span style={{ color: "#8B6914", flexShrink: 0, marginTop: 1, fontSize: 14 }}>✓</span>
                    {r}
                  </li>
                ))}
              </ul>

              {/* Expandable includes */}
              <button onClick={() => setExpanded(expanded === i ? null : i)}
                style={{ background: "none", border: "none", padding: "0 0 16px", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: tier.highlight ? "rgba(255,255,255,0.35)" : "#AAA", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 6 }}
              >
                <span>{expanded === i ? c.showLess : c.showMore}</span>
                <motion.span animate={{ rotate: expanded === i ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ display: "inline-block" }}>v</motion.span>
              </button>

              <AnimatePresence>
                {expanded === i && (
                  <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                    style={{ listStyle: "none", padding: 0, margin: "0 0 24px", overflow: "hidden" }}
                  >
                    {tier.includes.map((f, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: tier.highlight ? "rgba(255,255,255,0.45)" : "#888", marginBottom: 8, lineHeight: 1.5 }}>
                        <span style={{ color: "#8B6914", flexShrink: 0, marginTop: 1 }}>+</span>
                        {f}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* CTA */}
              <motion.a href="#contact" whileHover={{ y: -2 }}
                style={{ display: "block", textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 24px", textDecoration: "none", background: tier.highlight ? "#8B6914" : "transparent", color: tier.highlight ? "#FAFAF8" : "#1A1A1A", border: tier.highlight ? "1px solid #8B6914" : "1px solid #D4C49A", transition: "all 0.2s", marginTop: "auto" }}
                onMouseEnter={e => { if (!tier.highlight) { e.currentTarget.style.background = "#1A1A1A"; e.currentTarget.style.color = "#FAFAF8"; e.currentTarget.style.borderColor = "#1A1A1A"; } }}
                onMouseLeave={e => { if (!tier.highlight) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1A1A1A"; e.currentTarget.style.borderColor = "#D4C49A"; } }}
              >
                {c.ctaLabel} →
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Brand Matrix Strategy callout */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ background: "#1A1A1A", padding: "56px 64px", position: "relative", overflow: "hidden" }}
        >
          {/* Background accent */}
          <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, background: "radial-gradient(circle, rgba(139,105,20,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", position: "relative" }}>
            <div>
              <div style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B6914", border: "1px solid rgba(139,105,20,0.4)", padding: "4px 12px", marginBottom: 24 }}>
                {c.matrixBadge}
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 600, color: "#FAFAF8", margin: "0 0 20px", lineHeight: 1.2 }}>
                {c.matrixTitle}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 32 }}>
                {c.matrixDesc}
              </p>
              <motion.a href="#contact" whileHover={{ y: -2 }}
                style={{ display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 28px", textDecoration: "none", background: "transparent", color: "#D4C49A", border: "1px solid rgba(139,105,20,0.5)", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#8B6914"; e.currentTarget.style.borderColor = "#8B6914"; e.currentTarget.style.color = "#FAFAF8"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(139,105,20,0.5)"; e.currentTarget.style.color = "#D4C49A"; }}
              >
                {c.matrixCta} →
              </motion.a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {c.matrixPoints.map((pt, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: i < c.matrixPoints.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#8B6914", flexShrink: 0, marginTop: 2 }}>0{i + 1}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#AAA", textAlign: "center", marginTop: 32, letterSpacing: "0.05em", lineHeight: 1.7 }}
        >
          {c.note}
        </motion.p>
      </div>
    </section>
  );
}
