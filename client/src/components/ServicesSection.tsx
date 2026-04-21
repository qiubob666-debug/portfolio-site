/* ServicesSection — Progressive Disclosure
   Design: Warm white bg, 3-tier cards, gold highlight on recommended
   Layout: 3-column cards with expandable feature accordion
   Strategy: Boss journey step 2 — "What exactly do I get?"
   Key message: Clear tiers, clear pricing, clear outcomes */

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
    name: string;
    price: string;
    timeline: string;
    tagline: string;
    features: string[];
    extras: string[];
    cta: string;
    highlight: boolean;
  }[];
}> = {
  en: {
    eyebrow: "SERVICES",
    title: "Choose your scope",
    subtitle: "Fixed-price packages. No hidden fees. Delivered on time.",
    recommended: "Most Popular",
    showMore: "See all features",
    showLess: "Show less",
    ctaLabel: "Get a quote",
    tiers: [
      {
        name: "Brand Presence",
        price: "¥3,800",
        timeline: "7 days",
        tagline: "Your brand online, fast.",
        highlight: false,
        cta: "Start here",
        features: [
          "5-page brand website",
          "Mobile-responsive design",
          "Contact form",
          "Basic SEO setup",
          "Google Analytics",
          "1 round of revisions",
        ],
        extras: [
          "Deployed on Vercel (free hosting)",
          "Custom domain connection",
          "Performance optimized",
          "Privacy policy page",
        ],
      },
      {
        name: "E-Commerce Store",
        price: "¥8,800",
        timeline: "21 days",
        tagline: "Sell globally from day one.",
        highlight: true,
        cta: "Most popular",
        features: [
          "Full Shopify / custom storefront",
          "Product catalog + variants",
          "Payment gateway (Stripe/PayPal/Alipay)",
          "Order management dashboard",
          "Automated order confirmation emails",
          "Inventory tracking",
          "Multi-language support",
          "SEO + sitemap",
        ],
        extras: [
          "Discount codes + promotions engine",
          "Holiday campaign triggers",
          "Customer review system",
          "Analytics dashboard",
          "2 rounds of revisions",
        ],
      },
      {
        name: "Full Automation",
        price: "¥18,000",
        timeline: "30 days",
        tagline: "Your store runs itself.",
        highlight: false,
        cta: "Talk to me first",
        features: [
          "Everything in E-Commerce Store",
          "n8n workflow automation",
          "Auto social media publishing",
          "Inventory alert system",
          "CRM integration",
          "Scheduled content publishing",
          "Custom analytics dashboard",
          "API integrations (3rd party tools)",
        ],
        extras: [
          "Headless CMS (Sanity)",
          "Database + backend (Supabase)",
          "CI/CD pipeline setup",
          "30-day post-launch support",
          "Documentation handover",
        ],
      },
    ],
  },
  zh: {
    eyebrow: "服务套餐",
    title: "选择你的方案",
    subtitle: "固定报价，无隐藏费用，按时交付。",
    recommended: "最受欢迎",
    showMore: "查看全部功能",
    showLess: "收起",
    ctaLabel: "获取报价",
    tiers: [
      {
        name: "品牌展示站",
        price: "¥3,800",
        timeline: "7 天",
        tagline: "快速建立品牌在线形象。",
        highlight: false,
        cta: "从这里开始",
        features: [
          "5 页品牌网站",
          "移动端响应式设计",
          "联系表单",
          "基础 SEO 设置",
          "Google Analytics",
          "1 轮修改",
        ],
        extras: [
          "部署在 Vercel（免费托管）",
          "自定义域名绑定",
          "性能优化",
          "隐私政策页面",
        ],
      },
      {
        name: "电商独立站",
        price: "¥8,800",
        timeline: "21 天",
        tagline: "第一天就能全球销售。",
        highlight: true,
        cta: "最受欢迎",
        features: [
          "完整 Shopify / 自定义商店",
          "商品目录 + 规格变体",
          "支付网关（Stripe/PayPal/支付宝）",
          "订单管理后台",
          "自动订单确认邮件",
          "库存追踪",
          "多语言支持",
          "SEO + 网站地图",
        ],
        extras: [
          "折扣码 + 促销引擎",
          "节假日营销触发器",
          "用户评论系统",
          "数据分析面板",
          "2 轮修改",
        ],
      },
      {
        name: "全自动化方案",
        price: "¥18,000",
        timeline: "30 天",
        tagline: "让你的独立站自己运转。",
        highlight: false,
        cta: "先聊聊需求",
        features: [
          "包含电商独立站全部功能",
          "n8n 工作流自动化",
          "社媒自动发布",
          "库存预警系统",
          "CRM 集成",
          "定时内容发布",
          "自定义数据分析面板",
          "第三方 API 集成",
        ],
        extras: [
          "无头 CMS（Sanity）",
          "数据库 + 后端（Supabase）",
          "CI/CD 流水线",
          "上线后 30 天支持",
          "文档交接",
        ],
      },
    ],
  },
  ja: {
    eyebrow: "サービス",
    title: "プランを選ぶ",
    subtitle: "固定料金。追加費用なし。期日通り納品。",
    recommended: "最も人気",
    showMore: "全機能を見る",
    showLess: "閉じる",
    ctaLabel: "見積もりを取る",
    tiers: [
      {
        name: "ブランドサイト",
        price: "¥3,800",
        timeline: "7日",
        tagline: "ブランドをすぐにオンラインへ。",
        highlight: false,
        cta: "ここから始める",
        features: [
          "5ページのブランドサイト",
          "モバイル対応デザイン",
          "お問い合わせフォーム",
          "基本SEO設定",
          "Google Analytics",
          "1回の修正",
        ],
        extras: [
          "Vercelでデプロイ（無料ホスティング）",
          "カスタムドメイン接続",
          "パフォーマンス最適化",
          "プライバシーポリシーページ",
        ],
      },
      {
        name: "ECストア",
        price: "¥8,800",
        timeline: "21日",
        tagline: "初日からグローバル販売。",
        highlight: true,
        cta: "最も人気",
        features: [
          "完全なShopify/カスタムストア",
          "商品カタログ＋バリアント",
          "決済ゲートウェイ（Stripe/PayPal）",
          "注文管理ダッシュボード",
          "自動注文確認メール",
          "在庫追跡",
          "多言語対応",
          "SEO＋サイトマップ",
        ],
        extras: [
          "割引コード＋プロモーション",
          "季節キャンペーントリガー",
          "レビューシステム",
          "分析ダッシュボード",
          "2回の修正",
        ],
      },
      {
        name: "フル自動化",
        price: "¥18,000",
        timeline: "30日",
        tagline: "ストアが自動で動く。",
        highlight: false,
        cta: "まず相談する",
        features: [
          "ECストアの全機能を含む",
          "n8nワークフロー自動化",
          "SNS自動投稿",
          "在庫アラートシステム",
          "CRM統合",
          "コンテンツ定期配信",
          "カスタム分析ダッシュボード",
          "サードパーティAPI統合",
        ],
        extras: [
          "ヘッドレスCMS（Sanity）",
          "データベース＋バックエンド（Supabase）",
          "CI/CDパイプライン",
          "ローンチ後30日サポート",
          "ドキュメント引き渡し",
        ],
      },
    ],
  },
};

export default function ServicesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="services"
      style={{ background: "#FAFAF8", padding: "120px 0", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em",
            textTransform: "uppercase", color: "#8B6914", marginBottom: 20,
          }}>
            {c.eyebrow}
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600,
            color: "#1A1A1A", margin: "0 0 16px", lineHeight: 1.1,
          }}>
            {c.title}
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: "#777", maxWidth: 480, lineHeight: 1.7,
          }}>
            {c.subtitle}
          </p>
        </motion.div>

        {/* Tier cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
        }}>
          {c.tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                background: tier.highlight ? "#1A1A1A" : "#FFFFFF",
                border: tier.highlight ? "1px solid #8B6914" : "1px solid #E8E4DC",
                padding: "48px 36px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Recommended badge */}
              {tier.highlight && (
                <div style={{
                  position: "absolute", top: -1, left: "50%",
                  transform: "translateX(-50%)",
                  background: "#8B6914",
                  padding: "4px 16px",
                  fontFamily: "'DM Mono', monospace", fontSize: 9,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "#FAFAF8", whiteSpace: "nowrap",
                }}>
                  {c.recommended}
                </div>
              )}

              {/* Tier name */}
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 10,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: tier.highlight ? "#8B6914" : "#AAA",
                marginBottom: 20, marginTop: tier.highlight ? 12 : 0,
              }}>
                {tier.name}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 8 }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 52, fontWeight: 700, lineHeight: 1,
                  color: tier.highlight ? "#D4C49A" : "#1A1A1A",
                }}>
                  {tier.price}
                </span>
              </div>

              {/* Timeline */}
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 10,
                letterSpacing: "0.1em", color: tier.highlight ? "rgba(255,255,255,0.4)" : "#AAA",
                marginBottom: 20,
              }}>
                {tier.timeline}
              </div>

              {/* Tagline */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                color: tier.highlight ? "rgba(255,255,255,0.55)" : "#888",
                lineHeight: 1.6, marginBottom: 32,
              }}>
                {tier.tagline}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: tier.highlight ? "rgba(255,255,255,0.08)" : "#E8E4DC", marginBottom: 28 }} />

              {/* Core features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>
                {tier.features.map((f, j) => (
                  <li key={j} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: tier.highlight ? "rgba(255,255,255,0.75)" : "#555",
                    marginBottom: 10, lineHeight: 1.5,
                  }}>
                    <span style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: tier.highlight ? "rgba(139,105,20,0.3)" : "rgba(139,105,20,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                        <polyline points="1,2.5 2.8,4 6,1" stroke="#8B6914" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Expandable extras */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                style={{
                  background: "none", border: "none", padding: "0 0 16px",
                  fontFamily: "'DM Mono', monospace", fontSize: 9,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  color: tier.highlight ? "#8B6914" : "#AAA",
                  cursor: "pointer", textAlign: "left",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <span>{expanded === i ? c.showLess : c.showMore}</span>
                <motion.span
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: "inline-block" }}
                >
                  v
                </motion.span>
              </button>

              <AnimatePresence>
                {expanded === i && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ listStyle: "none", padding: 0, margin: "0 0 24px", overflow: "hidden" }}
                  >
                    {tier.extras.map((f, j) => (
                      <li key={j} style={{
                        display: "flex", alignItems: "flex-start", gap: 10,
                        fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                        color: tier.highlight ? "rgba(255,255,255,0.5)" : "#888",
                        marginBottom: 8, lineHeight: 1.5,
                      }}>
                        <span style={{ color: "#8B6914", flexShrink: 0, marginTop: 1 }}>+</span>
                        {f}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {/* CTA */}
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                style={{
                  display: "block", textAlign: "center",
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  padding: "14px 24px", textDecoration: "none",
                  background: tier.highlight ? "#8B6914" : "transparent",
                  color: tier.highlight ? "#FAFAF8" : "#1A1A1A",
                  border: tier.highlight ? "1px solid #8B6914" : "1px solid #D4C49A",
                  transition: "all 0.2s", marginTop: "auto",
                }}
              >
                {c.ctaLabel} →
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
