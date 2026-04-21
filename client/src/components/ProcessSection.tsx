/* ProcessSection — "You Do vs I Do" v2
   Design: Split layout, dark left (what you do = minimal), light right (what I do = extensive)
   Strategy: Boss sees how little they need to do, how much I handle
   Key message: "Your job: answer 3 questions. My job: everything else."
   NO tech terms. Time-based framing throughout. */

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  youLabel: string;
  meLabel: string;
  youSummary: string;
  meSummary: string;
  steps: {
    day: string;
    youDo: string;
    iDo: string;
    milestone?: string;
  }[];
  guarantee: string;
  guaranteeNote: string;
  ctaLabel: string;
}> = {
  zh: {
    eyebrow: "合作方式",
    title: "你只需要做 3 件事",
    subtitle: "其余的全部我来。",
    youLabel: "你需要做的",
    meLabel: "我来做的",
    youSummary: "你的总投入时间：约 3–5 小时",
    meSummary: "我的工作时间：7–30 天",
    steps: [
      {
        day: "第 1 天",
        youDo: "告诉我你的品牌名、目标客户、产品类型，发给我你的 Logo 或参考图",
        iDo: "整理需求，制定网站架构，准备设计方案，搭建开发环境",
        milestone: "需求确认",
      },
      {
        day: "第 2–5 天",
        youDo: "看我发给你的设计稿，告诉我「这里改一下」或「可以」",
        iDo: "完成品牌视觉设计，搭建所有页面，写 SEO 内容，配置支付和域名",
      },
      {
        day: "第 6 天",
        youDo: "在你的手机和电脑上点一遍，告诉我有没有问题",
        iDo: "根据你的反馈修改，做性能优化，准备上线",
      },
      {
        day: "第 7 天",
        youDo: "确认上线",
        iDo: "正式部署，绑定你的域名，提交 Google 收录，发给你操作手册",
        milestone: "品牌站上线",
      },
      {
        day: "第 8–21 天\n（电商方案）",
        youDo: "上传你的产品图片和描述，设置你的价格",
        iDo: "配置购物车、支付网关、订单系统、自动化流程、多语言、数据面板",
        milestone: "电商站上线",
      },
      {
        day: "上线后",
        youDo: "正常做生意，有问题随时联系我",
        iDo: "月度维护，技术支持，SEO 持续优化，有问题 24 小时内响应",
      },
    ],
    guarantee: "固定报价，按时交付，不满意全额退款",
    guaranteeNote: "付款后开始工作。每个阶段完成后给你看进度。不满意可以随时提出修改，超出约定范围的大改动会提前告知。",
    ctaLabel: "开始合作",
  },
  en: {
    eyebrow: "HOW WE WORK",
    title: "You only need to do 3 things",
    subtitle: "I handle everything else.",
    youLabel: "What you do",
    meLabel: "What I do",
    youSummary: "Your total time investment: ~3–5 hours",
    meSummary: "My working time: 7–30 days",
    steps: [
      {
        day: "Day 1",
        youDo: "Tell me your brand name, target customers, and product type. Send me your logo or reference images.",
        iDo: "Organize requirements, plan site architecture, prepare design concepts, set up development environment",
        milestone: "Requirements confirmed",
      },
      {
        day: "Days 2–5",
        youDo: "Review the design mockup I send you. Tell me 'change this' or 'looks good.'",
        iDo: "Complete brand visual design, build all pages, write SEO content, configure payments and domain",
      },
      {
        day: "Day 6",
        youDo: "Click through the site on your phone and computer. Tell me if anything looks off.",
        iDo: "Apply your feedback, performance optimization, prepare for launch",
      },
      {
        day: "Day 7",
        youDo: "Confirm launch",
        iDo: "Deploy to production, connect your domain, submit to Google indexing, send you the operations manual",
        milestone: "Brand site live",
      },
      {
        day: "Days 8–21\n(E-commerce)",
        youDo: "Upload your product photos and descriptions. Set your prices.",
        iDo: "Configure shopping cart, payment gateways, order system, automation workflows, multi-language, analytics dashboard",
        milestone: "E-commerce store live",
      },
      {
        day: "After launch",
        youDo: "Run your business normally. Contact me when something comes up.",
        iDo: "Monthly maintenance, technical support, ongoing SEO optimization, 24-hour response time",
      },
    ],
    guarantee: "Fixed price. On-time delivery. Full refund if not satisfied.",
    guaranteeNote: "Work starts on payment. I show you progress after each phase. Revisions are welcome — major scope changes will be discussed in advance.",
    ctaLabel: "Start working together",
  },
  ja: {
    eyebrow: "協業方法",
    title: "あなたがすることは3つだけ",
    subtitle: "残りはすべて私が担当します。",
    youLabel: "あなたがすること",
    meLabel: "私がすること",
    youSummary: "あなたの総投資時間：約3〜5時間",
    meSummary: "私の作業時間：7〜30日",
    steps: [
      {
        day: "1日目",
        youDo: "ブランド名、ターゲット顧客、商品タイプを教えてください。ロゴや参考画像を送ってください。",
        iDo: "要件整理、サイト構造計画、デザインコンセプト準備、開発環境構築",
        milestone: "要件確認",
      },
      {
        day: "2〜5日目",
        youDo: "送ったデザインモックアップを確認。「ここを変えて」または「いいね」と教えてください。",
        iDo: "ブランドビジュアルデザイン完成、全ページ構築、SEOコンテンツ執筆、決済とドメイン設定",
      },
      {
        day: "6日目",
        youDo: "スマートフォンとパソコンでサイトをクリックして確認。問題があれば教えてください。",
        iDo: "フィードバック反映、パフォーマンス最適化、ローンチ準備",
      },
      {
        day: "7日目",
        youDo: "ローンチ確認",
        iDo: "本番デプロイ、ドメイン接続、Googleインデックス申請、操作マニュアル送付",
        milestone: "ブランドサイト公開",
      },
      {
        day: "8〜21日目\n（EC）",
        youDo: "商品写真と説明をアップロード。価格を設定。",
        iDo: "ショッピングカート、決済ゲートウェイ、注文システム、自動化ワークフロー、多言語、分析ダッシュボード設定",
        milestone: "ECストア公開",
      },
      {
        day: "ローンチ後",
        youDo: "通常通りビジネスを運営。何かあればいつでも連絡。",
        iDo: "月次メンテナンス、技術サポート、継続的SEO最適化、24時間以内の返信",
      },
    ],
    guarantee: "固定料金。期日通り納品。不満足の場合は全額返金。",
    guaranteeNote: "支払い後に作業開始。各フェーズ完了後に進捗をお見せします。修正は歓迎。大きなスコープ変更は事前に相談します。",
    ctaLabel: "協業を始める",
  },
};

export default function ProcessSection() {
  const { locale } = useI18n();
  const c = COPY[locale];

  return (
    <section id="process" style={{ background: "#FAFAF8", padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, color: "#1A1A1A", margin: "0 0 12px", lineHeight: 1.1 }}>
            {c.title}
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 400, fontStyle: "italic", color: "#8B6914", margin: 0 }}>
            {c.subtitle}
          </p>
        </motion.div>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 0, marginBottom: 2 }}>
          <div />
          <div style={{ background: "#1A1A1A", padding: "16px 32px", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            {c.youLabel}
          </div>
          <div style={{ background: "#8B6914", padding: "16px 32px", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>
            {c.meLabel}
          </div>
        </div>

        {/* Steps */}
        {c.steps.map((step, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.45, delay: i * 0.06 }}
            style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 0, marginBottom: 2, position: "relative" }}
          >
            {/* Day label */}
            <div style={{ background: "#F0EDE5", padding: "28px 20px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#8B6914", letterSpacing: "0.1em", whiteSpace: "pre-line", lineHeight: 1.4 }}>
                {step.day}
              </div>
              {step.milestone && (
                <div style={{ marginTop: 8, fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.1em", color: "#FAFAF8", background: "#8B6914", padding: "3px 8px", whiteSpace: "nowrap" }}>
                  {step.milestone}
                </div>
              )}
            </div>

            {/* You do */}
            <div style={{ background: "#FFFFFF", padding: "28px 32px", borderRight: "1px solid #E8E4DC" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", margin: 0, lineHeight: 1.7 }}>
                {step.youDo}
              </p>
            </div>

            {/* I do */}
            <div style={{ background: "#FAFAF8", padding: "28px 32px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#333", margin: 0, lineHeight: 1.7 }}>
                {step.iDo}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Summary row */}
        <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", gap: 0, marginBottom: 56 }}>
          <div style={{ background: "#1A1A1A" }} />
          <div style={{ background: "#1A1A1A", padding: "20px 32px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>{c.youSummary}</div>
          </div>
          <div style={{ background: "#8B6914", padding: "20px 32px" }}>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em" }}>{c.meSummary}</div>
          </div>
        </div>

        {/* Guarantee */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}
        >
          <div style={{ background: "#1A1A1A", padding: "48px 48px" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 2.5vw, 34px)", fontWeight: 600, color: "#D4C49A", lineHeight: 1.3, marginBottom: 20 }}>
              {c.guarantee}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, margin: 0 }}>
              {c.guaranteeNote}
            </p>
          </div>
          <div style={{ background: "#8B6914", padding: "48px 48px", display: "flex", alignItems: "center" }}>
            <motion.a href="#contact" whileHover={{ x: 4 }}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FAFAF8", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
            >
              {c.ctaLabel}
              <span style={{ fontSize: 18 }}>→</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
