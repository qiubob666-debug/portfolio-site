/* ProcessSection v3 — Hover-reveal interaction
   Design: Left = step list (minimal), Right = detail panel (appears on hover)
   User sees: step name + milestone tag → hover → see "you do" + "Our team does" detail
   Key: First impression is clean timeline, detail appears on demand
   Mobile: tap to reveal */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  defaultHint: string;
  youLabel: string;
  meLabel: string;
  steps: {
    id: number;
    day: string;
    title: string;
    milestone?: string;
    youDo: string;
    iDo: string;
    outcomes: string[];
  }[];
  guarantee: string;
  ctaLabel: string;
}> = {
  zh: {
    eyebrow: "合作方式",
    title: "你只需要做 3 件事",
    subtitle: "点击每个步骤，查看你需要做什么，以及团队来做什么",
    defaultHint: "← 点击左侧步骤查看详情",
    youLabel: "你需要做的",
    meLabel: "团队来做的",
    steps: [
      {
        id: 0,
        day: "第 1 天",
        title: "快速确认需求",
        milestone: "需求确认",
        youDo: "提出你的想法：品牌名、目标客户、产品类型、参考网站（有的话）。发给我你的 Logo 或参考图。大概 30 分钟的沟通。",
        iDo: "专业需求确认路径：整理品牌定位、竞品分析、目标用户画像、网站架构规划、技术方案选型。团队给你一份完整的项目计划书。",
        outcomes: ["需求文档", "网站架构图", "项目时间表"],
      },
      {
        id: 1,
        day: "第 2–5 天",
        title: "设计与开发",
        youDo: "看我发给你的设计稿，告诉我「这里改一下」或「可以」。你不需要懂设计，只需要告诉我你喜不喜欢。",
        iDo: "团队完成品牌视觉系统（颜色、字体、Logo 应用）、所有页面设计稿、前端开发、SEO 内容写作、支付网关配置、域名部署。",
        outcomes: ["设计稿确认", "开发进度更新", "演示链接"],
      },
      {
        id: 2,
        day: "第 6 天",
        title: "验收与调整",
        youDo: "在你的手机和电脑上点一遍。告诉我哪里不对，或者「没问题」。",
        iDo: "团队根据你的反馈修改。性能优化（加载速度测试）。跨浏览器兼容性检查。移动端适配确认。",
        outcomes: ["修改完成", "性能报告", "上线前检查清单"],
      },
      {
        id: 3,
        day: "第 7 天",
        title: "品牌站正式上线",
        milestone: "品牌站上线",
        youDo: "确认上线。",
        iDo: "团队正式部署到生产环境。绑定你的域名，全球可访问。提交 Google 收录（通常 1–3 天内被索引）。发给你操作手册和后台登录信息。",
        outcomes: ["域名绑定完成", "Google 收录提交", "全球可访问", "操作手册交付"],
      },
      {
        id: 4,
        day: "第 8–21 天",
        title: "电商系统上线",
        milestone: "电商站上线",
        youDo: "上传你的产品图片和描述。设置你的价格和库存。",
        iDo: "团队配置购物车和结账流程。接入 Stripe/PayPal 支付网关。多币种自动转换。订单管理系统。自动化营销流程（弃购提醒、节假日促销）。数据分析面板。",
        outcomes: ["支付系统上线", "多货币支持", "订单自动化", "数据面板"],
      },
      {
        id: 5,
        day: "上线后",
        title: "持续维护与增长",
        youDo: "正常做生意。有问题随时发消息。",
        iDo: "月度技术维护。SEO 持续优化（关键词排名追踪）。小改动免费处理。有问题 24 小时内响应。每季度给你一份网站数据报告。",
        outcomes: ["24h 响应", "月度维护", "SEO 追踪", "季度报告"],
      },
    ],
    guarantee: "固定报价 · 按时交付 · 不满意全额退款",
    ctaLabel: "开始合作",
  },
  en: {
    eyebrow: "HOW WE WORK",
    title: "You only need to do 3 things",
    subtitle: "Click each step to see what you do — and what Our team does",
    defaultHint: "← Click a step on the left to see details",
    youLabel: "What you do",
    meLabel: "What our team does",
    steps: [
      {
        id: 0,
        day: "Day 1",
        title: "Rapid requirements",
        milestone: "Requirements confirmed",
        youDo: "Share your idea: brand name, target customers, product type, reference sites (if any). Send me your logo or reference images. About 30 minutes of conversation.",
        iDo: "Professional requirements process: brand positioning, competitive analysis, target user profiles, site architecture planning, tech stack selection. Our team gives you a complete project plan.",
        outcomes: ["Requirements doc", "Site architecture", "Project timeline"],
      },
      {
        id: 1,
        day: "Days 2–5",
        title: "Design & development",
        youDo: "Review the design mockup I send you. Tell me 'change this' or 'looks good.' You don't need to know design — just tell me if you like it.",
        iDo: "Our team completes the brand visual system (colors, fonts, logo application), all page designs, frontend development, SEO content writing, payment gateway configuration, domain deployment.",
        outcomes: ["Design approved", "Dev progress updates", "Demo link"],
      },
      {
        id: 2,
        day: "Day 6",
        title: "Review & revisions",
        youDo: "Click through the site on your phone and computer. Tell me what's off — or 'looks good.'",
        iDo: "Our team applies your feedback. Performance optimization (load speed testing). Cross-browser compatibility check. Mobile responsiveness confirmation.",
        outcomes: ["Revisions done", "Performance report", "Pre-launch checklist"],
      },
      {
        id: 3,
        day: "Day 7",
        title: "Brand site goes live",
        milestone: "Brand site live",
        youDo: "Confirm launch.",
        iDo: "Our team deploys to production. Connect your domain — globally accessible. Submit to Google indexing (typically indexed in 1–3 days). Send you the operations manual and dashboard login.",
        outcomes: ["Domain connected", "Google indexing submitted", "Globally accessible", "Manual delivered"],
      },
      {
        id: 4,
        day: "Days 8–21",
        title: "E-commerce system live",
        milestone: "E-commerce live",
        youDo: "Upload your product photos and descriptions. Set your prices and inventory.",
        iDo: "Our team configures shopping cart and checkout. Integrate Stripe/PayPal payment gateways. Multi-currency auto-conversion. Order management system. Automated marketing flows (abandoned cart, holiday promotions). Analytics dashboard.",
        outcomes: ["Payment system live", "Multi-currency", "Order automation", "Analytics dashboard"],
      },
      {
        id: 5,
        day: "After launch",
        title: "Ongoing maintenance",
        youDo: "Run your business. Message me when something comes up.",
        iDo: "Our team handles monthly technical maintenance. Ongoing SEO optimization (keyword ranking tracking). Minor changes handled for free. 24-hour response time. Quarterly site analytics report.",
        outcomes: ["24h response", "Monthly maintenance", "SEO tracking", "Quarterly report"],
      },
    ],
    guarantee: "Fixed price · On-time delivery · Full refund if not satisfied",
    ctaLabel: "Start working together",
  },
  ja: {
    eyebrow: "協業方法",
    title: "あなたがすることは3つだけ",
    subtitle: "各ステップをクリックして、あなたと私がすることを確認",
    defaultHint: "← 左のステップをクリックして詳細を確認",
    youLabel: "あなたがすること",
    meLabel: "私がすること",
    steps: [
      {
        id: 0,
        day: "1日目",
        title: "迅速な要件確認",
        milestone: "要件確認",
        youDo: "アイデアを共有：ブランド名、ターゲット顧客、商品タイプ、参考サイト（あれば）。ロゴや参考画像を送ってください。約30分の会話。",
        iDo: "プロの要件確認プロセス：ブランドポジショニング、競合分析、ターゲットユーザープロファイル、サイト構造計画、技術スタック選定。完全なプロジェクト計画書を提供。",
        outcomes: ["要件書", "サイト構造", "プロジェクトスケジュール"],
      },
      {
        id: 1,
        day: "2〜5日目",
        title: "デザイン＆開発",
        youDo: "送ったデザインモックアップを確認。「ここを変えて」または「いいね」と教えてください。デザインを知る必要はありません。",
        iDo: "ブランドビジュアルシステム（色、フォント、ロゴ適用）、全ページデザイン、フロントエンド開発、SEOコンテンツ執筆、決済ゲートウェイ設定、ドメインデプロイ。",
        outcomes: ["デザイン承認", "開発進捗更新", "デモリンク"],
      },
      {
        id: 2,
        day: "6日目",
        title: "確認＆修正",
        youDo: "スマートフォンとパソコンでサイトをクリックして確認。問題があれば教えてください。",
        iDo: "フィードバック反映。パフォーマンス最適化（読み込み速度テスト）。クロスブラウザ互換性チェック。モバイル対応確認。",
        outcomes: ["修正完了", "パフォーマンスレポート", "ローンチ前チェックリスト"],
      },
      {
        id: 3,
        day: "7日目",
        title: "ブランドサイト公開",
        milestone: "ブランドサイト公開",
        youDo: "ローンチを確認。",
        iDo: "本番環境にデプロイ。ドメイン接続—世界中からアクセス可能。Googleインデックス申請（通常1〜3日以内にインデックス）。操作マニュアルとダッシュボードログイン情報を送付。",
        outcomes: ["ドメイン接続完了", "Googleインデックス申請", "世界中からアクセス可能", "マニュアル納品"],
      },
      {
        id: 4,
        day: "8〜21日目",
        title: "ECシステム公開",
        milestone: "EC公開",
        youDo: "商品写真と説明をアップロード。価格と在庫を設定。",
        iDo: "ショッピングカートとチェックアウト設定。Stripe/PayPal決済ゲートウェイ統合。多通貨自動変換。注文管理システム。自動化マーケティングフロー（カート放棄、季節プロモーション）。分析ダッシュボード。",
        outcomes: ["決済システム公開", "多通貨対応", "注文自動化", "分析ダッシュボード"],
      },
      {
        id: 5,
        day: "ローンチ後",
        title: "継続メンテナンス",
        youDo: "通常通りビジネスを運営。何かあればメッセージ。",
        iDo: "月次技術メンテナンス。継続的SEO最適化（キーワードランキング追跡）。軽微な変更は無料対応。24時間以内の返信。四半期ごとのサイト分析レポート。",
        outcomes: ["24h返信", "月次メンテナンス", "SEO追跡", "四半期レポート"],
      },
    ],
    guarantee: "固定料金 · 期日通り納品 · 不満足の場合は全額返金",
    ctaLabel: "協業を始める",
  },
};

export default function ProcessSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const active = activeStep !== null ? c.steps[activeStep] : null;

  return (
    <section id="process" style={{ background: "#FAFAF8", padding: "120px 0" }}>
      <div className="process-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, color: "#1A1A1A", margin: "0 0 12px", lineHeight: 1.1 }}>
            {c.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999" }}>{c.subtitle}</p>
        </motion.div>

        {/* Split layout: step list + detail panel */}
        <div className="process-split" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 2, minHeight: 480 }}>

          {/* Left: step list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {c.steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.button key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  style={{
                    background: isActive ? "#1A1A1A" : "#FFFFFF",
                    border: "none",
                    padding: "20px 24px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.25s",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#F0EDE5"; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "#FFFFFF"; }}
                >
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: isActive ? "#8B6914" : "#BBB", marginBottom: 4 }}>
                      {step.day}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: isActive ? "#FAFAF8" : "#1A1A1A", transition: "color 0.25s" }}>
                      {step.title}
                    </div>
                    {step.milestone && (
                      <div style={{ marginTop: 6, display: "inline-block", fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.1em", color: isActive ? "#D4C49A" : "#FAFAF8", background: isActive ? "#8B6914" : "#1A1A1A", padding: "2px 8px" }}>
                        {step.milestone}
                      </div>
                    )}
                  </div>
                  <motion.span animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.2 }}
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: isActive ? "#8B6914" : "#CCC", flexShrink: 0 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              );
            })}
          </div>

          {/* Right: detail panel */}
          <div style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div key={active.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: "40px 48px", height: "100%" }}
                >
                  {/* Day + Title */}
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", color: "#8B6914", marginBottom: 8 }}>
                    {active.day}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 600, color: "#1A1A1A", margin: "0 0 32px", lineHeight: 1.2 }}>
                    {active.title}
                  </h3>

                  {/* Two columns: you do / Our team does */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#BBB", marginBottom: 12 }}>
                        {c.youLabel}
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", lineHeight: 1.75, margin: 0 }}>
                        {active.youDo}
                      </p>
                    </div>
                    <div style={{ borderLeft: "1px solid #E8E4DC", paddingLeft: 24 }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8B6914", marginBottom: 12 }}>
                        {c.meLabel}
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#333", lineHeight: 1.75, margin: 0 }}>
                        {active.iDo}
                      </p>
                    </div>
                  </div>

                  {/* Outcomes */}
                  <div style={{ borderTop: "1px solid #E8E4DC", paddingTop: 20 }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: "0.15em", color: "#BBB", marginBottom: 12 }}>
                      {locale === "zh" ? "交付成果" : locale === "ja" ? "成果物" : "DELIVERABLES"}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {active.outcomes.map((o, i) => (
                        <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.08em", color: "#8B6914", background: "#F5F2EC", padding: "4px 12px" }}>
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ padding: "48px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#FFFFFF", border: "1px solid #E8E4DC" }}
                >
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6914", marginBottom: 24 }}>
                      {locale === 'ja' ? 'ブランド転換' : locale === 'en' ? 'BRAND TRANSFORMATION' : '品牌转型'}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 600, color: "#1A1A1A", lineHeight: 1.2, margin: "0 0 20px" }}>
                      {locale === 'ja'
                        ? <>貧販から<em style={{ fontStyle: 'italic', color: '#8B6914' }}>ブランド</em>へ。<br />たった 10 日。</>
                        : locale === 'en'
                        ? <><em style={{ fontStyle: 'italic', color: '#8B6914' }}>From dropshipping</em><br />to brand. In 10 days.</>
                        : <>从铺货到<em style={{ fontStyle: 'italic', color: '#8B6914' }}>品牌</em>，<br />只需 10 天。</>}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.85, color: "#666", margin: "0 0 28px" }}>
                      {locale === 'ja'
                        ? '独自サイトを持つブランドは資産です。顧客を直接所有し、単価を自分で設定し、リピート率を高められます。プラットフォームに永遠にお金を払い続ける必要はありません。'
                        : locale === 'en'
                        ? 'A brand with its own store is an asset. You own your customers, set your own prices, build repeat purchase loyalty — without paying platform rent forever.'
                        : '拥有独立站的品牌是资产。你直接拥有客户、自定价格、建立复购忠诚度——而不是永远交平台山路费。'}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {(locale === 'ja'
                        ? ['グーグルインデックス登録　48時間以内', '独自ドメイン + 全世界からアクセス可能', 'スマホ対応 + 多言語 + 決済ゲートウェイ']
                        : locale === 'en'
                        ? ['Google indexed within 48 hours', 'Custom domain + globally accessible', 'Mobile-ready + multi-language + payment gateway']
                        : ['Google 收录48小时内', '自定义域名 + 全球可访问', '手机适配 + 多语言 + 支付闸关']
                      ).map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 4, height: 4, background: '#8B6914', borderRadius: '50%', flexShrink: 0 }} />
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#444' }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #E8E4DC' }}>
                    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B8A882', margin: '0 0 10px' }}>
                      {locale === 'ja' ? 'ステップをクリックして詳細を確認' : locale === 'en' ? 'Click a step to see the details' : '点击左侧步骤查看详情'}
                    </p>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 18, color: '#1A1A1A', fontStyle: 'italic' }}>
                      {locale === 'ja' ? 'あなたは待つだけ。後は全部私がやります。' : locale === 'en' ? 'You wait. Our team handles everything else.' : '你只需等待。其余的交给我们团队。'}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Guarantee bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="process-guarantee" style={{ marginTop: 2, background: "#1A1A1A", padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}
        >
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#D4C49A" }}>
            {c.guarantee}
          </div>
          <motion.a href="#contact" whileHover={{ x: 4 }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAFAF8", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
          >
            {c.ctaLabel} →
          </motion.a>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #process { padding: 72px 0 !important; }
          .process-container { padding: 0 20px !important; }

          /* Single column: steps list on top, detail panel below */
          .process-split {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
            gap: 0 !important;
          }

          /* Left panel: step list */
          .process-left {
            position: static !important;
            height: auto !important;
            overflow: visible !important;
            padding: 0 !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          }

          /* Right panel: detail */
          .process-right {
            padding: 24px 0 !important;
          }

          /* Step items */
          .process-step-item {
            padding: 16px 0 !important;
          }
          .process-step-num {
            font-size: 10px !important;
          }
          .process-step-title {
            font-size: 15px !important;
          }
          .process-step-sub {
            font-size: 12px !important;
          }

          /* Guarantee bar */
          .process-guarantee {
            padding: 20px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .process-guarantee-text {
            font-size: 14px !important;
          }

          /* Section title */
          #process h2 {
            font-size: clamp(26px, 7.5vw, 36px) !important;
          }
        }
      `}</style>
    </section>
  );
}
