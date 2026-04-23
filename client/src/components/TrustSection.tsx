/* TrustSection v4 — Apple-style FAQ
   Design: Clean white, large serif questions, high-contrast answers
   Mobile: Full-width cards, 17px+ body text, 44px touch targets
   Motion: Smooth spring expand, stagger entrance, no jank */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  faqs: { q: string; a: string; tag: string }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
}> = {
  zh: {
    eyebrow: "你可能在想",
    title: "老板们最常问的 8 个问题",
    subtitle: "直接回答，不绕弯子。",
    faqs: [
      {
        tag: "价格",
        q: "¥8,800 建一个独立站，是不是太贵了？",
        a: "对比一下：外包机构同等品质的网站报价 ¥30,000–80,000，交付周期 60–90 天。自己招一个 Shopify 开发，深圳均价 ¥15,000/月，还需要 3–6 个月磨合。我的报价包含了开发、设计、SEO、支付配置、域名部署，10 天交付。你算一下哪个贵。",
      },
      {
        tag: "靠谱",
        q: "你一个人能搞定这么多东西？靠谱吗？",
        a: "我有完整的技术体系——从前端设计到后端数据库到自动化流程，每个部分都有实际项目经验。不是「什么都会一点」，而是每个环节都有完整的解决方案。合作前你可以看我的项目演示，所有功能都是可以验证的。",
      },
      {
        tag: "风险",
        q: "付了钱，你做到一半跑了怎么办？",
        a: "我们可以分阶段付款：确认需求后付 50%，网站上线后付剩余 50%。每个阶段完成后我会给你看进度截图和演示链接。如果我没有按时交付或者你不满意，已付款项全额退还。这是我的承诺，也是我做生意的方式。",
      },
      {
        tag: "售后",
        q: "网站上线后出了问题，谁来修？",
        a: "我来修。所有套餐都包含上线后 7 天的免费修复期。之后的月度运维订阅是 ¥1,980/月起，包含 SEO 追踪、内容更新、性能监控和安全更新。有问题发微信，24 小时内响应。如果是我的代码问题，免费修复，不计入维护费。",
      },
      {
        tag: "操作",
        q: "我不懂技术，上线后我能自己管理网站吗？",
        a: "能。我会给你配置一个云端内容管理后台，你的团队不需要懂任何代码——改文字、换图片、加产品、看数据，点几下就完成。上线时我会给你做一次操作培训，同时提供文字版操作手册。大多数客户 3 分钟就学会了基本操作。",
      },
      {
        tag: "对比",
        q: "为什么不直接用 Shopify 建站？",
        a: "Shopify 月费 ¥200–700，每笔交易还要抽 0.5–2% 手续费，加上主题费、插件费，一年下来 ¥5,000–20,000 的持续支出。我帮你建的是你自己的独立站，一次性费用，服务器成本接近零（用 Vercel 免费托管），你完全拥有代码和数据。长期来看便宜很多，而且不受平台政策限制。",
      },
      {
        tag: "定制",
        q: "我的产品比较特殊，你能做定制化的功能吗？",
        a: "可以。标准套餐覆盖了大多数跨境电商的需求，如果你有特殊功能需求（比如定制报价系统、会员体系、多店铺管理），我们可以在报价阶段讨论，给你一个明确的定制费用。不会做到一半才告诉你要加钱。",
      },
      {
        tag: "咨询",
        q: "我现在还没想好，可以先聊聊吗？",
        a: "当然可以。发消息给我，告诉我你在做什么品类、现在的销售渠道、遇到的主要问题。我会给你一个免费的方案建议，告诉你独立站对你的情况是否值得做，以及最适合你的方案是哪个。不需要你现在就决定。",
      },
    ],
    ctaTitle: "还有其他问题？",
    ctaDesc: "发消息给我，我会在 24 小时内回复你。",
    ctaBtn: "发消息咨询",
  },
  en: {
    eyebrow: "WHAT YOU'RE THINKING",
    title: "The 8 questions bosses actually ask",
    subtitle: "Straight answers. No fluff.",
    faqs: [
      {
        tag: "Price",
        q: "¥8,800 for a website — isn't that expensive?",
        a: "Compare: an agency charges ¥30,000–80,000 for equivalent quality, with a 60–90 day timeline. Hiring a Shopify developer in Shenzhen averages ¥15,000/month, plus 3–6 months to ramp up. My quote covers development, design, SEO, payment setup, and domain deployment — delivered in 10 days. You do the math.",
      },
      {
        tag: "Reliability",
        q: "Can one person really handle all of this? Is this reliable?",
        a: "I have a complete technical system covering frontend design, backend databases, and automation workflows, with real project experience in each area. Not 'a little bit of everything' — every step has a complete solution. You can review project demos before we start — all functionality is verifiable.",
      },
      {
        tag: "Risk",
        q: "What if I pay and you disappear halfway through?",
        a: "We can do milestone-based payments: 50% after requirements are confirmed, 50% after the site launches. After each phase I'll send you progress screenshots and a demo link. If Our team doesn't deliver on time or you're not satisfied, your payment is fully refunded. That's my commitment — and how Our team does business.",
      },
      {
        tag: "Support",
        q: "If something breaks after launch, who fixes it?",
        a: "Our team does. All packages include a 7-day free fix period after launch. After that, monthly retainer starts at ¥1,980/month, covering SEO tracking, content updates, performance monitoring, and security updates. Send me a message on WeChat — 24-hour response time. If it's a bug in my code, it's fixed for free.",
      },
      {
        tag: "Management",
        q: "Our team doesn't know tech — can I manage the site myself after launch?",
        a: "Yes. I'll set up a cloud-based content management dashboard for you — your team doesn't need to know any code. Edit text, swap images, add products, check analytics — all done with a few clicks. I'll do a training session at launch and provide a written operations manual. Most clients learn the basics in 3 minutes.",
      },
      {
        tag: "vs Shopify",
        q: "Why not just build on Shopify?",
        a: "Shopify charges ¥200–700/month, plus 0.5–2% per transaction, plus theme fees and plugin fees — ¥5,000–20,000 in ongoing annual costs. What I build is your own independent store — one-time fee, near-zero server cost (hosted on Vercel for free), and you fully own the code and data. Much cheaper long-term, and you're not subject to platform policy changes.",
      },
      {
        tag: "Custom",
        q: "My product is unique — can you build custom features?",
        a: "Yes. Standard packages cover most cross-border e-commerce needs. If you need custom features (custom quote systems, membership tiers, multi-store management), we discuss them during the quote phase and I give you a clear custom cost. I won't tell you midway through that you need to pay more.",
      },
      {
        tag: "Consult",
        q: "I haven't decided yet — can we just talk first?",
        a: "Of course. Send me a message, tell me what category you're in, your current sales channels, and your main pain points. I'll give you a free recommendation — whether an independent store makes sense for your situation, and which package fits best. No commitment required.",
      },
    ],
    ctaTitle: "Still have questions?",
    ctaDesc: "Send me a message. I'll reply within 24 hours.",
    ctaBtn: "Send a message",
  },
  ja: {
    eyebrow: "あなたが考えていること",
    title: "社長がよく聞く8つの質問",
    subtitle: "率直な回答。回りくどい説明なし。",
    faqs: [
      {
        tag: "価格",
        q: "¥8,800でウェブサイトを作るのは高くないですか？",
        a: "比較してみましょう：エージェンシーは同等品質で¥30,000〜80,000を請求し、60〜90日かかります。深センでShopify開発者を採用すると月平均¥15,000、さらに3〜6ヶ月の立ち上げ期間が必要です。私の見積もりには開発、デザイン、SEO、決済設定、ドメインデプロイが含まれ、10日で納品します。",
      },
      {
        tag: "信頼性",
        q: "一人でこんなに多くのことができますか？信頼できますか？",
        a: "フロントエンドデザインからバックエンドデータベース、自動化ワークフローまで、各分野で実際のプロジェクト経験を持つ完全な技術体系があります。「何でも少しずつ」ではなく、すべてのステップに完全なソリューションがあります。開始前にプロジェクトデモを確認できます。",
      },
      {
        tag: "リスク",
        q: "支払い後に途中でいなくなったらどうなりますか？",
        a: "マイルストーン払いが可能です：要件確認後に50%、サイト公開後に残り50%。各フェーズ完了後に進捗スクリーンショットとデモリンクをお送りします。期日通りに納品できない場合や不満足の場合は、支払い済み金額を全額返金します。",
      },
      {
        tag: "サポート",
        q: "ローンチ後に問題が発生したら誰が修正しますか？",
        a: "私が修正します。すべてのプランにローンチ後7日間の無料修正期間が含まれます。その後の月額メンテナンスは¥1,980/月〜で、SEO追跡、コンテンツ更新、パフォーマンス監視、セキュリティアップデートをカバーします。WeChatでメッセージを送ってください。24時間以内に返信します。",
      },
      {
        tag: "管理",
        q: "技術がわかりません。ローンチ後に自分でサイトを管理できますか？",
        a: "できます。クラウドベースのコンテンツ管理ダッシュボードを設定します。チームはコードを知る必要がありません。テキスト編集、画像交換、商品追加、データ確認がクリックだけで完了します。ローンチ時にトレーニングセッションを行い、書面による操作マニュアルも提供します。",
      },
      {
        tag: "vs Shopify",
        q: "なぜShopifyで作らないのですか？",
        a: "Shopifyは月額¥200〜700、さらに取引ごとに0.5〜2%の手数料、テーマ費、プラグイン費で年間¥5,000〜20,000の継続コストがかかります。私が構築するのはあなた自身の独立サイトで、一回払い、サーバーコストはほぼゼロ、コードとデータを完全に所有します。",
      },
      {
        tag: "カスタム",
        q: "商品が特殊です。カスタム機能を作れますか？",
        a: "できます。標準プランはほとんどの越境EC需要をカバーします。カスタム機能が必要な場合は、見積もり段階で話し合い、明確なカスタムコストをお伝えします。途中で追加料金を請求することはありません。",
      },
      {
        tag: "相談",
        q: "まだ決めていません。まず話せますか？",
        a: "もちろんです。メッセージを送ってください。取り扱いカテゴリ、現在の販売チャネル、主な問題点を教えてください。あなたの状況に独立サイトが適しているかどうか、最適なプランはどれかについて、無料でアドバイスします。今すぐ決める必要はありません。",
      },
    ],
    ctaTitle: "他に質問がありますか？",
    ctaDesc: "メッセージを送ってください。24時間以内に返信します。",
    ctaBtn: "メッセージを送る",
  },
};

export default function TrustSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="trust" className="trust-section">
      <div className="trust-container">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="trust-header"
        >
          <div className="trust-eyebrow">{c.eyebrow}</div>
          <h2 className="trust-title">{c.title}</h2>
          <p className="trust-subtitle">{c.subtitle}</p>
        </motion.div>

        {/* ── FAQ List ── */}
        <div className="trust-faq-list">
          {c.faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                className="trust-faq-item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                {/* Question button */}
                <button
                  className={`trust-faq-btn ${isOpen ? "trust-faq-btn--open" : ""}`}
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={`trust-faq-tag ${isOpen ? "trust-faq-tag--open" : ""}`}>
                    {faq.tag}
                  </span>
                  <span className="trust-faq-q">{faq.q}</span>
                  <motion.span
                    className="trust-faq-icon"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="trust-faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA Block ── */}
        <motion.div
          className="trust-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="trust-cta-text">
            <div className="trust-cta-title">{c.ctaTitle}</div>
            <p className="trust-cta-desc">{c.ctaDesc}</p>
          </div>
          <motion.a
            href="#contact"
            className="trust-cta-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={e => (e.currentTarget.style.background = "#8B6914")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1A1A1A")}
          >
            {c.ctaBtn} →
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        /* ── Section wrapper ── */
        .trust-section {
          background: #FFFFFF;
          padding: 120px 0;
        }
        .trust-container {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Header ── */
        .trust-header {
          margin-bottom: 64px;
        }
        .trust-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8B6914;
          margin-bottom: 20px;
        }
        .trust-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 600;
          color: #111111;
          margin: 0 0 16px;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .trust-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        /* ── FAQ list ── */
        .trust-faq-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border-top: 1px solid #E8E4DC;
        }
        .trust-faq-item {
          border-bottom: 1px solid #E8E4DC;
        }

        /* ── FAQ button ── */
        .trust-faq-btn {
          width: 100%;
          background: transparent;
          border: none;
          padding: 24px 0;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          transition: background 0.2s;
          min-height: 44px;
        }
        .trust-faq-btn--open {
          background: transparent;
        }
        .trust-faq-btn:hover .trust-faq-q {
          color: #8B6914;
        }

        /* ── Tag ── */
        .trust-faq-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #AAA;
          background: #F5F2EC;
          padding: 4px 10px;
          flex-shrink: 0;
          margin-top: 3px;
          transition: all 0.2s;
          white-space: nowrap;
          border-radius: 2px;
        }
        .trust-faq-tag--open {
          color: #8B6914;
          background: rgba(139,105,20,0.1);
        }

        /* ── Question text ── */
        .trust-faq-q {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #111111;
          line-height: 1.5;
          flex: 1;
          transition: color 0.2s;
        }

        /* ── Toggle icon ── */
        .trust-faq-icon {
          font-family: 'DM Mono', monospace;
          font-size: 22px;
          color: #8B6914;
          flex-shrink: 0;
          line-height: 1;
          margin-top: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }

        /* ── Answer ── */
        .trust-faq-answer {
          padding: 0 0 28px 0;
          padding-left: calc(16px + 52px + 16px); /* gap + tag-width + gap */
        }
        .trust-faq-answer p {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: #333333;
          line-height: 1.85;
          margin: 0;
        }

        /* ── CTA block ── */
        .trust-cta {
          margin-top: 64px;
          background: #F5F2EC;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          border-radius: 4px;
        }
        .trust-cta-text {
          flex: 1;
        }
        .trust-cta-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          color: #111111;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .trust-cta-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }
        .trust-cta-btn {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 16px 32px;
          background: #1A1A1A;
          color: #FAFAF8;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          min-height: 52px;
          border-radius: 2px;
        }

        /* ════════════════════════════════════
           MOBILE — Apple-style
           ════════════════════════════════════ */
        @media (max-width: 767px) {
          .trust-section {
            padding: 72px 0;
          }
          .trust-container {
            padding: 0 20px;
          }
          .trust-header {
            margin-bottom: 48px;
          }
          .trust-title {
            font-size: clamp(28px, 8vw, 40px);
            letter-spacing: -0.025em;
          }
          .trust-subtitle {
            font-size: 15px;
          }

          /* FAQ items — bigger, more breathing room */
          .trust-faq-btn {
            padding: 20px 0;
            gap: 12px;
            align-items: flex-start;
          }
          .trust-faq-tag {
            font-size: 8px;
            padding: 3px 8px;
            margin-top: 4px;
          }
          .trust-faq-q {
            font-size: 15px;
            font-weight: 500;
            line-height: 1.55;
          }
          .trust-faq-icon {
            font-size: 20px;
            width: 24px;
            height: 24px;
            margin-top: 2px;
          }

          /* Answer — full width on mobile, no left indent */
          .trust-faq-answer {
            padding: 0 0 24px 0;
          }
          .trust-faq-answer p {
            font-size: 14px;
            line-height: 1.8;
            color: #444;
          }

          /* CTA — stacked on mobile */
          .trust-cta {
            flex-direction: column;
            align-items: flex-start;
            padding: 28px 24px;
            gap: 20px;
            margin-top: 48px;
          }
          .trust-cta-title {
            font-size: 22px;
          }
          .trust-cta-desc {
            font-size: 14px;
          }
          .trust-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 16px 24px;
            font-size: 11px;
            min-height: 52px;
          }
        }
      `}</style>
    </section>
  );
}
