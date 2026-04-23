/* ServicesSection v4 — Apple product page style
   Desktop: 3-column pricing grid, center card highlighted
   Mobile: full-width stacked cards, large price, clear CTA
   Motion: stagger entrance, spring hover, smooth expand
   Typography: large price display, 15px+ body text */

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
    title: "选一个，10 天后你的品牌就在线了",
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
        promise: "10 天内，你有一个让客户信任你的专业官网",
        price: "¥8,800",
        priceNote: "一次性，含首年域名",
        timeline: "10 天交付",
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
        promise: "28 天内，你有一个能收全球订单、自动运营的独立站",
        price: "¥22,800",
        priceNote: "一次性，含首年域名+服务器",
        timeline: "28 天交付",
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
        promise: "60 天内，你有一个能自动获客、自动运营、持续增长的品牌体系",
        price: "¥58,000",
        priceNote: "一次性，含3个月维护",
        timeline: "60 天交付",
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
    retainerTitle: "月度运维订阅",
    retainerPrice: "¥1,980",
    retainerPriceNote: "/月起",
    retainerDesc: "上线后不用担心——我帮你持续优化、监控、更新内容。",
    retainerItems: [
      "每月 SEO 关键词追踪 + 报告",
      "内容更新 & 新页面添加",
      "性能监控 + 安全扫描",
      "优先响应技术问题（24h 内）",
    ],
    retainerCta: "了解运维方案",
  },
  en: {
    eyebrow: "PACKAGES",
    title: "Pick one — your brand is live in 10 days",
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
        promise: "In 10 days, you have a professional website that makes customers trust you",
        price: "¥8,800",
        priceNote: "One-time, includes first-year domain",
        timeline: "10-day delivery",
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
        promise: "In 28 days, you have an independent store that takes global orders and runs itself",
        price: "¥22,800",
        priceNote: "One-time, includes first-year domain + server",
        timeline: "28-day delivery",
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
        promise: "In 60 days, you have a brand system that auto-acquires customers, auto-operates, and keeps growing",
        price: "¥58,000",
        priceNote: "One-time, includes 3 months maintenance",
        timeline: "60-day delivery",
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
    retainerTitle: "Monthly Retainer",
    retainerPrice: "¥1,980",
    retainerPriceNote: "/month+",
    retainerDesc: "Stay worry-free after launch — I keep your site optimized, monitored, and fresh.",
    retainerItems: [
      "Monthly SEO keyword tracking + report",
      "Content updates & new page additions",
      "Performance monitoring + security scans",
      "Priority tech support (24h response)",
    ],
    retainerCta: "Learn about retainer",
  },
  ja: {
    eyebrow: "プラン",
    title: "1つ選べば、10日後にブランドが公開される",
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
        promise: "10日以内に、顧客があなたを信頼するプロのウェブサイトが完成",
        price: "¥8,800",
        priceNote: "一回払い、初年度ドメイン込み",
        timeline: "10日納品",
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
        promise: "28日以内に、世界中の注文を受け取り自動運営できる独立サイトが完成",
        price: "¥22,800",
        priceNote: "一回払い、初年度ドメイン+サーバー込み",
        timeline: "28日納品",
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
        promise: "60日以内に、自動集客・自動運営・継続成長するブランド体系が完成",
        price: "¥58,000",
        priceNote: "一回払い、3ヶ月メンテナンス込み",
        timeline: "60日納品",
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
    retainerTitle: "月額メンテナンス",
    retainerPrice: "¥1,980",
    retainerPriceNote: "/月〜",
    retainerDesc: "公開後も安心——継続的な最適化・監視・コンテンツ更新を担当します。",
    retainerItems: [
      "毎月のSEOキーワード追跡＋レポート",
      "コンテンツ更新＆新ページ追加",
      "パフォーマンス監視＋セキュリティスキャン",
      "優先テクニカルサポート（24時間以内対応）",
    ],
    retainerCta: "メンテナンスプランを見る",
  },
};

export default function ServicesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [expandedMatrix, setExpandedMatrix] = useState(false);

  return (
    <section id="services" className="svc-section">
      <div className="svc-container">

        {/* ── Header ── */}
        <motion.div
          className="svc-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="svc-eyebrow">{c.eyebrow}</div>
          <h2 className="svc-title">{c.title}</h2>
          <p className="svc-subtitle">{c.subtitle}</p>
        </motion.div>

        {/* ── Pricing cards ── */}
        <div className="svc-grid">
          {c.plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`svc-card ${plan.highlight ? "svc-card--highlight" : ""}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              {/* Tag */}
              <div className={`svc-card-tag ${plan.highlight ? "svc-card-tag--highlight" : ""}`}>
                {plan.tag}
              </div>

              {/* Plan name */}
              <div className={`svc-card-name ${plan.highlight ? "svc-card-name--highlight" : ""}`}>
                {plan.name}
              </div>

              {/* Promise */}
              <div className={`svc-card-promise ${plan.highlight ? "svc-card-promise--highlight" : ""}`}>
                {plan.promise}
              </div>

              {/* Price block */}
              <div className="svc-card-price-block">
                <span className={`svc-card-price ${plan.highlight ? "svc-card-price--highlight" : ""}`}>
                  {plan.price}
                </span>
                <div className={`svc-card-price-note ${plan.highlight ? "svc-card-price-note--highlight" : ""}`}>
                  {plan.priceNote}
                </div>
                <div className="svc-card-timeline">{plan.timeline}</div>
              </div>

              {/* Results list */}
              <div className="svc-card-results">
                {plan.results.map((r, ri) => (
                  <div key={ri} className="svc-card-result-item">
                    <span className="svc-card-check">✓</span>
                    <span className={`svc-card-result-text ${plan.highlight ? "svc-card-result-text--highlight" : ""}`}>
                      {r}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                className={`svc-card-cta ${plan.highlight ? "svc-card-cta--highlight" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={e => {
                  if (!plan.highlight) {
                    e.currentTarget.style.background = "#1A1A1A";
                    e.currentTarget.style.color = "#FAFAF8";
                  }
                }}
                onMouseLeave={e => {
                  if (!plan.highlight) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#1A1A1A";
                  }
                }}
              >
                {plan.cta} →
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* ── Brand Matrix callout ── */}
        <motion.div
          className="svc-matrix-wrap"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="svc-matrix-toggle"
            onClick={() => setExpandedMatrix(!expandedMatrix)}
            aria-expanded={expandedMatrix}
          >
            <div className="svc-matrix-toggle-left">
              <div className="svc-matrix-toggle-eyebrow">
                {locale === "zh" ? "进阶策略" : locale === "ja" ? "上級戦略" : "ADVANCED STRATEGY"}
              </div>
              <div className="svc-matrix-toggle-title">{c.matrixTitle}</div>
            </div>
            <motion.span
              className="svc-matrix-toggle-icon"
              animate={{ rotate: expandedMatrix ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {expandedMatrix && (
              <motion.div
                key="matrix-expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="svc-matrix-body">
                  <p className="svc-matrix-desc">{c.matrixDesc}</p>
                  <div className="svc-matrix-points">
                    {c.matrixPoints.map((pt, i) => (
                      <div key={i} className="svc-matrix-point">
                        <span className="svc-matrix-point-arrow">→</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Compare note ── */}
        <div className="svc-compare">
          <span className="svc-compare-label">{c.compareLabel} </span>
          <a href="#contact" className="svc-compare-link">{c.compareNote}</a>
        </div>
        {/* ── Monthly Retainer Add-on ── */}
        <motion.div
          className="svc-retainer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="svc-retainer-left">
            <div className="svc-retainer-label">ADD-ON</div>
            <div className="svc-retainer-title">{c.retainerTitle}</div>
            <div className="svc-retainer-desc">{c.retainerDesc}</div>
            <ul className="svc-retainer-list">
              {c.retainerItems.map((item, i) => (
                <li key={i} className="svc-retainer-item">
                  <span className="svc-retainer-dot">·</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="svc-retainer-right">
            <div className="svc-retainer-price-wrap">
              <span className="svc-retainer-price">{c.retainerPrice}</span>
              <span className="svc-retainer-price-note">{c.retainerPriceNote}</span>
            </div>
            <a href="#contact" className="svc-retainer-cta">{c.retainerCta} →</a>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* ── Section ── */
        .svc-section {
          background: #FAFAF8;
          padding: 120px 0;
        }
        .svc-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Header ── */
        .svc-header { margin-bottom: 64px; }
        .svc-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8B6914;
          margin-bottom: 20px;
        }
        .svc-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 600;
          color: #111111;
          margin: 0 0 12px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .svc-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: #888;
          margin: 0;
          line-height: 1.6;
        }

        /* ── Grid ── */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 48px;
          align-items: stretch;
        }

        /* ── Card ── */
        .svc-card {
          background: #FFFFFF;
          border: 2px solid transparent;
          padding: 40px 32px 32px;
          display: flex;
          flex-direction: column;
          transition: all 0.25s;
        }
        .svc-card--highlight {
          background: #1A1A1A;
          border-color: #8B6914;
        }

        /* Tag */
        .svc-card-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #BBB;
          margin-bottom: 16px;
        }
        .svc-card-tag--highlight { color: #8B6914; }

        /* Name */
        .svc-card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          color: #111111;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .svc-card-name--highlight { color: #FAFAF8; }

        /* Promise */
        .svc-card-promise {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #666;
          line-height: 1.65;
          margin-bottom: 28px;
          padding-bottom: 28px;
          border-bottom: 1px solid #E8E4DC;
        }
        .svc-card-promise--highlight {
          color: rgba(255,255,255,0.5);
          border-bottom-color: rgba(255,255,255,0.08);
        }

        /* Price */
        .svc-card-price-block { margin-bottom: 28px; }
        .svc-card-price {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 48px;
          font-weight: 700;
          color: #111111;
          line-height: 1;
          display: block;
          margin-bottom: 6px;
        }
        .svc-card-price--highlight { color: #D4C49A; }
        .svc-card-price-note {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: #BBB;
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .svc-card-price-note--highlight { color: rgba(255,255,255,0.25); }
        .svc-card-timeline {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #8B6914;
          letter-spacing: 0.1em;
        }

        /* Results */
        .svc-card-results {
          flex: 1;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .svc-card-result-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .svc-card-check {
          color: #8B6914;
          font-size: 12px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .svc-card-result-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #444;
          line-height: 1.55;
        }
        .svc-card-result-text--highlight { color: rgba(255,255,255,0.6); }

        /* CTA */
        .svc-card-cta {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 16px 24px;
          background: transparent;
          border: 1px solid #1A1A1A;
          color: #1A1A1A;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          min-height: 52px;
          border-radius: 2px;
        }
        .svc-card-cta--highlight {
          background: #8B6914;
          border-color: #8B6914;
          color: #FAFAF8;
        }

        /* ── Matrix callout ── */
        .svc-matrix-wrap { }
        .svc-matrix-toggle {
          width: 100%;
          background: #1A1A1A;
          border: none;
          padding: 24px 32px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
          gap: 16px;
          min-height: 44px;
          transition: background 0.2s;
        }
        .svc-matrix-toggle:hover { background: #222; }
        .svc-matrix-toggle-left { flex: 1; min-width: 0; }
        .svc-matrix-toggle-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8B6914;
          margin-bottom: 6px;
        }
        .svc-matrix-toggle-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          color: #FAFAF8;
          line-height: 1.3;
        }
        .svc-matrix-toggle-icon {
          font-family: 'DM Mono', monospace;
          font-size: 22px;
          color: #8B6914;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }
        .svc-matrix-body {
          background: #111;
          padding: 32px 32px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .svc-matrix-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.8;
          margin: 0;
        }
        .svc-matrix-points {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .svc-matrix-point {
          display: flex;
          gap: 10px;
          align-items: flex-start;
        }
        .svc-matrix-point-arrow {
          color: #8B6914;
          font-size: 12px;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .svc-matrix-point span:last-child {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }

        /* ── Compare note ── */
        .svc-compare {
          margin-top: 28px;
          text-align: center;
        }
        .svc-compare-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #999;
        }
        .svc-compare-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #8B6914;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .svc-compare-link:hover { border-bottom-color: #8B6914; }

        /* ════════════════════════════════════
           MOBILE — Apple-style
           ════════════════════════════════════ */
        @media (max-width: 767px) {
          .svc-section { padding: 72px 0; }
          .svc-container { padding: 0 20px; }
          .svc-header { margin-bottom: 40px; }
          .svc-title {
            font-size: clamp(26px, 7.5vw, 38px);
            letter-spacing: -0.025em;
          }
          .svc-subtitle { font-size: 15px; }

          /* Cards: single column, full width */
          .svc-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 24px;
          }
          .svc-card {
            padding: 28px 24px 24px;
            border-radius: 4px;
          }
          .svc-card--highlight {
            /* Highlighted card gets extra visual weight on mobile */
            box-shadow: 0 0 0 1px #8B6914;
          }

          /* Larger price on mobile */
          .svc-card-price {
            font-size: 52px;
          }
          .svc-card-name { font-size: 22px; }
          .svc-card-promise {
            font-size: 14px;
            line-height: 1.7;
          }
          .svc-card-result-text {
            font-size: 14px;
            line-height: 1.6;
          }
          .svc-card-cta {
            font-size: 12px;
            padding: 16px;
            min-height: 52px;
          }

          /* Matrix callout */
          .svc-matrix-toggle {
            padding: 20px 20px;
          }
          .svc-matrix-toggle-title {
            font-size: 16px;
          }
          .svc-matrix-body {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px 20px;
          }
          .svc-matrix-desc { font-size: 14px; }
          .svc-matrix-point span:last-child { font-size: 14px; }

          /* Compare note */
          .svc-compare {
            margin-top: 20px;
            text-align: left;
          }
          .svc-compare-label, .svc-compare-link {
            font-size: 14px;
          }
        }
        /* ── Monthly Retainer ── */
        .svc-retainer {
          margin-top: 48px;
          background: #111111;
          border-radius: 8px;
          padding: 32px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .svc-retainer-left { flex: 1; }
        .svc-retainer-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #8B6914;
          margin-bottom: 8px;
        }
        .svc-retainer-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 600;
          color: #FAFAF8;
          margin-bottom: 8px;
        }
        .svc-retainer-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .svc-retainer-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .svc-retainer-item {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .svc-retainer-dot { color: #8B6914; flex-shrink: 0; }
        .svc-retainer-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          flex-shrink: 0;
        }
        .svc-retainer-price-wrap {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .svc-retainer-price {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(28px, 3vw, 40px);
          font-weight: 700;
          color: #D4C49A;
        }
        .svc-retainer-price-note {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
        }
        .svc-retainer-cta {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #D4C49A;
          text-decoration: none;
          border: 1px solid rgba(212,196,154,0.3);
          padding: 10px 20px;
          border-radius: 2px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .svc-retainer-cta:hover {
          background: rgba(212,196,154,0.1);
          border-color: #D4C49A;
        }
        @media (max-width: 767px) {
          .svc-retainer {
            flex-direction: column;
            padding: 24px 20px;
            gap: 24px;
          }
          .svc-retainer-right { align-items: flex-start; }
          .svc-retainer-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
