/* TrustSection v3 — FAQ with proper font hierarchy
   Design: White bg, accordion, gold serif question, dark body answer
   Key fix: Question = Cormorant gold large, Answer = DM Sans light gray readable
   Expanded state: cream bg, NOT black (avoids same-color-text issue)
   Progressive: only question visible, answer slides in on click */

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
        a: "对比一下：外包机构同等品质的网站报价 ¥30,000–80,000，交付周期 60–90 天。自己招一个 Shopify 开发，深圳均价 ¥15,000/月，还需要 3–6 个月磨合。我的报价包含了开发、设计、SEO、支付配置、域名部署，7 天交付。你算一下哪个贵。",
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
        a: "我来修。所有套餐都包含上线后 7 天的免费修复期。之后的月度维护费用是 ¥800/月，包含技术支持、小改动和安全更新。有问题发微信，24 小时内响应。如果是我的代码问题，免费修复，不计入维护费。",
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
        a: "Compare: an agency charges ¥30,000–80,000 for equivalent quality, with a 60–90 day timeline. Hiring a Shopify developer in Shenzhen averages ¥15,000/month, plus 3–6 months to ramp up. My quote covers development, design, SEO, payment setup, and domain deployment — delivered in 7 days. You do the math.",
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
        a: "Our team does. All packages include a 7-day free fix period after launch. After that, monthly maintenance is ¥800/month, covering technical support, minor changes, and security updates. Send me a message on WeChat — 24-hour response time. If it's a bug in my code, it's fixed for free.",
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
        a: "比較してみましょう：エージェンシーは同等品質で¥30,000〜80,000を請求し、60〜90日かかります。深センでShopify開発者を採用すると月平均¥15,000、さらに3〜6ヶ月の立ち上げ期間が必要です。私の見積もりには開発、デザイン、SEO、決済設定、ドメインデプロイが含まれ、7日で納品します。",
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
        a: "私が修正します。すべてのプランにローンチ後7日間の無料修正期間が含まれます。その後の月次メンテナンスは¥800/月で、技術サポート、軽微な変更、セキュリティアップデートをカバーします。WeChatでメッセージを送ってください。24時間以内に返信します。",
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
    <section id="trust" style={{ background: "#FFFFFF", padding: "120px 0" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, color: "#1A1A1A", margin: "0 0 16px", lineHeight: 1.1 }}>
            {c.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#999", lineHeight: 1.7 }}>
            {c.subtitle}
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {c.faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: isOpen ? "#F5F2EC" : "#FAFAF8",
                    border: "none",
                    borderBottom: isOpen ? "none" : "1px solid #EDEAD9",
                    padding: "22px 28px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    textAlign: "left",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = "#F5F2EC"; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = "#FAFAF8"; }}
                >
                  {/* Tag */}
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 8,
                    letterSpacing: "0.12em",
                    color: isOpen ? "#8B6914" : "#BBB",
                    background: isOpen ? "rgba(139,105,20,0.08)" : "transparent",
                    padding: isOpen ? "3px 8px" : "0",
                    flexShrink: 0,
                    minWidth: 48,
                    transition: "all 0.2s",
                  }}>
                    {faq.tag}
                  </span>

                  {/* Question text — gold serif when open, dark sans when closed */}
                  <span style={{
                    fontFamily: isOpen ? "'Cormorant Garamond', Georgia, serif" : "'DM Sans', sans-serif",
                    fontSize: isOpen ? 20 : 14,
                    fontWeight: isOpen ? 600 : 400,
                    color: isOpen ? "#8B6914" : "#333",
                    lineHeight: 1.35,
                    flex: 1,
                    transition: "all 0.25s",
                  }}>
                    {faq.q}
                  </span>

                  {/* Toggle icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 18,
                      color: isOpen ? "#8B6914" : "#CCC",
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </motion.span>
                </button>

                {/* Answer — slides down */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      style={{ overflow: "hidden", background: "#F5F2EC", borderBottom: "1px solid #EDEAD9" }}
                    >
                      <div style={{ padding: "0 28px 28px 92px" }}>
                        <p style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          color: "#444",
                          lineHeight: 1.85,
                          margin: 0,
                        }}>
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", padding: "40px 40px", background: "#F5F2EC" }}
        >
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 600, color: "#1A1A1A", marginBottom: 6 }}>
              {c.ctaTitle}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0 }}>
              {c.ctaDesc}
            </p>
          </div>
          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 28px", background: "#1A1A1A", color: "#FAFAF8", textDecoration: "none", whiteSpace: "nowrap", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#8B6914")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1A1A1A")}
          >
            {c.ctaBtn} →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
