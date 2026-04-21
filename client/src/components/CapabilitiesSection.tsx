/* CapabilitiesSection — "6 Problems Your Store Solves" v2
   Design: Alternating light/dark cards, icon-free (text-driven), gold accent
   Strategy: Each card = 1 boss pain point → 1 concrete solution
   NO tech terms. Every sentence answers: "What does this mean for my business?"
   Topics: SEO/GEO, Payment, Automation, Brand Fortress, Speed/Conversion, Control */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  problems: {
    number: string;
    problem: string;
    solution: string;
    detail: string;
    proof: string;
  }[];
}> = {
  zh: {
    eyebrow: "你的独立站能解决什么",
    title: "老板最头疼的 6 件事，独立站全能搞定",
    subtitle: "不是技术功能，是你的业务问题。",
    problems: [
      {
        number: "01",
        problem: "没有流量，靠广告烧钱",
        solution: "让 Google 和 AI 主动给你带客户",
        detail: "品牌矩阵建站策略：每个产品、每个使用场景都有独立落地页，覆盖长尾词和短尾词。用户搜索「防水蓝牙音箱户外」，第一个出现的是你。ChatGPT、Perplexity 推荐同类产品时，引用的是你的品牌。这是持续免费的流量，不是每月烧掉的广告费。",
        proof: "SEO 流量 vs 广告流量：SEO 每年成本递减，广告每年成本递增",
      },
      {
        number: "02",
        problem: "外国客户不知道怎么付款",
        solution: "全球买家一键结账，你的账户秒到账",
        detail: "内置 Stripe、PayPal、Apple Pay、支付宝国际版，自动识别买家所在地区，显示对应货币和支付方式。美国客户看到美元，日本客户看到日元，欧洲客户看到欧元。自定义结账流程，减少购物车放弃率。支持折扣码、分期付款、订阅制收款。",
        proof: "多货币结账可提升转化率 12–18%（Stripe 官方数据）",
      },
      {
        number: "03",
        problem: "运营太累，什么都要人盯着",
        solution: "3 个岗位的工作，系统自动完成",
        detail: "订单自动确认邮件、发货通知、物流追踪更新——不需要人工发送。库存低于设定值自动提醒。节假日促销自动触发折扣码和限时 Banner。社媒内容定时发布到 Instagram/TikTok/Facebook。你的团队只需要处理真正需要人判断的事情。",
        proof: "自动化可减少 60–80% 的重复性运营工作量",
      },
      {
        number: "04",
        problem: "铺货利润越来越薄，想卖出更高客单价",
        solution: "品牌堡垒策略：让客户觉得你的产品值这个价",
        detail: "专业品牌网站本身就是溢价工具。同样的产品，有品牌故事、高质量图片、用户评论、完整的「关于我们」页面，客单价可以比同类铺货产品高 30–50%。品牌矩阵建站让你的每个产品都有完整的场景化展示，让客户看到「这个品牌懂我的需求」。",
        proof: "有品牌官网的卖家平均客单价比无官网卖家高 35%",
      },
      {
        number: "05",
        problem: "网站加载慢，客户没耐心等",
        solution: "比 WordPress 快 3–5 倍，转化率直接提升",
        detail: "用现代前端技术构建，全球 CDN 加速，首屏加载时间 < 1.5 秒。Google 把加载速度作为 SEO 排名因素——你的网站快，排名更高，流量更多。研究表明：网站每慢 1 秒，转化率下降 7%。你的竞争对手用 WordPress 建站，加载 3–5 秒，你的网站 1 秒内打开，客户不会跑。",
        proof: "加载速度每提升 1 秒，转化率提升 7%（Google 数据）",
      },
      {
        number: "06",
        problem: "网站上线了，我看不懂数据，不知道哪里出了问题",
        solution: "你的专属数据面板，一眼看懂所有关键指标",
        detail: "云端内容管理后台，你的团队 3 分钟学会操作——不需要找开发改文字。实时流量数据：哪个产品页面访问最多、哪个地区的客户最多、哪个渠道带来的转化最高。用户评论管理：一键审核、回复、置顶好评。库存和订单状态一目了然。出了问题，你能第一时间知道，而不是等客户投诉。",
        proof: "数据驱动决策的电商品牌，年增长率比行业平均高 2.3 倍",
      },
    ],
  },
  en: {
    eyebrow: "WHAT YOUR STORE SOLVES",
    title: "The 6 things that keep bosses up at night — solved",
    subtitle: "Not tech features. Your actual business problems.",
    problems: [
      {
        number: "01",
        problem: "No traffic without burning ad budget",
        solution: "Google and AI bring you customers on autopilot",
        detail: "Brand matrix store strategy: every product and every use case gets its own landing page, covering long-tail and short-tail keywords. When someone searches 'waterproof bluetooth speaker outdoor,' your brand appears first. When ChatGPT or Perplexity recommends products in your category, they cite your brand. This is compounding free traffic — not monthly ad spend that disappears when you stop paying.",
        proof: "SEO traffic cost decreases over time; ad traffic cost increases every year",
      },
      {
        number: "02",
        problem: "International customers don't know how to pay",
        solution: "Global buyers check out in one click — money lands in your account",
        detail: "Built-in Stripe, PayPal, Apple Pay, and international Alipay. Automatically detects buyer location and shows the right currency and payment method. US buyers see USD, Japanese buyers see JPY, European buyers see EUR. Custom checkout flow reduces cart abandonment. Supports discount codes, installment payments, and subscription billing.",
        proof: "Multi-currency checkout can lift conversion rates 12–18% (Stripe data)",
      },
      {
        number: "03",
        problem: "Operations are exhausting — everything needs manual attention",
        solution: "3 full-time jobs, done automatically by the system",
        detail: "Order confirmation emails, shipping notifications, tracking updates — sent automatically. Inventory alerts when stock drops below your threshold. Holiday promotions auto-trigger discount codes and limited-time banners. Social content scheduled to post to Instagram/TikTok/Facebook. Your team only handles things that genuinely require human judgment.",
        proof: "Automation can reduce 60–80% of repetitive operational workload",
      },
      {
        number: "04",
        problem: "Dropshipping margins are shrinking — need to sell at higher prices",
        solution: "Brand fortress strategy: make customers feel your product is worth the price",
        detail: "A professional brand website is itself a premium pricing tool. The same product, with a brand story, high-quality images, customer reviews, and a complete 'About Us' page, can command 30–50% higher AOV than generic dropshipping listings. The brand matrix approach gives every product a full scene-based showcase — customers see 'this brand understands my needs.'",
        proof: "Sellers with brand websites average 35% higher AOV than those without",
      },
      {
        number: "05",
        problem: "Slow website — customers leave before it loads",
        solution: "3–5× faster than WordPress — conversion rate goes up directly",
        detail: "Built with modern frontend technology, global CDN acceleration, first-screen load time < 1.5 seconds. Google uses load speed as an SEO ranking factor — your fast site ranks higher, gets more traffic. Research shows: every 1-second delay reduces conversion rate by 7%. Your competitors use WordPress (3–5 second load). Your site opens in under 1 second. Customers don't leave.",
        proof: "Every 1-second improvement in load speed = 7% conversion rate increase (Google data)",
      },
      {
        number: "06",
        problem: "Site is live but I can't read the data — don't know what's wrong",
        solution: "Your own dashboard — see every key metric at a glance",
        detail: "Cloud-based content management dashboard your team learns in 3 minutes — no developer needed to change text. Real-time traffic data: which product page gets the most visits, which region your customers come from, which channel drives the most conversions. Review management: approve, reply, and pin positive reviews in one click. Inventory and order status always visible. When something goes wrong, you know first — not after customers complain.",
        proof: "Data-driven e-commerce brands grow 2.3× faster than the industry average",
      },
    ],
  },
  ja: {
    eyebrow: "あなたのストアが解決すること",
    title: "社長を悩ませる6つの問題 — すべて解決",
    subtitle: "技術機能ではなく、実際のビジネス問題です。",
    problems: [
      {
        number: "01",
        problem: "広告費を燃やさないとトラフィックがない",
        solution: "GoogleとAIが自動的に顧客を連れてくる",
        detail: "ブランドマトリックスストア戦略：すべての商品とユースケースに独自のランディングページを設置し、ロングテール・ショートテールキーワードをカバー。「防水Bluetoothスピーカー アウトドア」で検索すると、あなたのブランドが最初に表示される。ChatGPTやPerplexityがカテゴリ内の商品を推薦する際、あなたのブランドが引用される。これは複利的な無料トラフィック。",
        proof: "SEOトラフィックコストは年々減少、広告トラフィックコストは年々増加",
      },
      {
        number: "02",
        problem: "海外の顧客が支払い方法を知らない",
        solution: "世界中のバイヤーがワンクリックで決済 — 即座に入金",
        detail: "Stripe、PayPal、Apple Pay、Alipay国際版を内蔵。バイヤーの所在地を自動検出し、適切な通貨と支払い方法を表示。米国バイヤーにはUSD、日本バイヤーにはJPY、欧州バイヤーにはEURを表示。カスタムチェックアウトフローでカート放棄率を削減。割引コード、分割払い、サブスクリプション決済をサポート。",
        proof: "多通貨チェックアウトでコンバージョン率が12〜18%向上（Stripeデータ）",
      },
      {
        number: "03",
        problem: "運営が大変 — すべてを手動で管理しなければならない",
        solution: "3人分の仕事をシステムが自動的に完了",
        detail: "注文確認メール、発送通知、追跡更新を自動送信。在庫が設定値を下回ると自動アラート。季節プロモーションが割引コードと期間限定バナーを自動トリガー。SNSコンテンツをInstagram/TikTok/Facebookに定時投稿。チームは本当に人間の判断が必要なことだけを処理。",
        proof: "自動化で繰り返し運営作業の60〜80%を削減可能",
      },
      {
        number: "04",
        problem: "ドロップシッピングの利益率が低下 — 高単価で売りたい",
        solution: "ブランド要塞戦略：顧客に「この価格は価値がある」と感じさせる",
        detail: "プロのブランドサイト自体がプレミアム価格設定ツール。同じ商品でも、ブランドストーリー、高品質な画像、顧客レビュー、充実した「About Us」ページがあれば、一般的なドロップシッピングより30〜50%高いAOVを実現できる。ブランドマトリックスアプローチで各商品を完全なシーンベースで展示。",
        proof: "ブランドサイトを持つ販売者のAOVは持たない販売者より平均35%高い",
      },
      {
        number: "05",
        problem: "サイトが遅い — 顧客が読み込みを待てない",
        solution: "WordPressより3〜5倍速い — コンバージョン率が直接向上",
        detail: "最新フロントエンド技術で構築、グローバルCDN加速、ファーストスクリーン読み込み時間1.5秒未満。Googleは読み込み速度をSEOランキング要因として使用。研究によると、1秒遅くなるごとにコンバージョン率が7%低下。競合他社はWordPress（3〜5秒）を使用。あなたのサイトは1秒以内に開く。",
        proof: "読み込み速度が1秒改善するごとにコンバージョン率が7%向上（Googleデータ）",
      },
      {
        number: "06",
        problem: "サイトは公開されているがデータが読めない — 何が問題かわからない",
        solution: "専用ダッシュボード — すべての重要指標を一目で確認",
        detail: "クラウドベースのコンテンツ管理ダッシュボードをチームが3分で習得。リアルタイムトラフィックデータ：どの商品ページが最も訪問されているか、どの地域の顧客が最も多いか、どのチャネルが最も高いコンバージョンをもたらしているか。レビュー管理：ワンクリックで承認、返信、好評をピン留め。問題が発生したとき、顧客が苦情を言う前にあなたが最初に知る。",
        proof: "データ駆動型ECブランドの年間成長率は業界平均の2.3倍",
      },
    ],
  },
};

export default function CapabilitiesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];

  return (
    <section id="capabilities" style={{ background: "#F5F2EC", padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 80 }}>
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

        {/* Problem cards: alternating 2-col layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {c.problems.map((p, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.05 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: isEven ? "1fr 1fr" : "1fr 1fr",
                  background: isEven ? "#FFFFFF" : "#1A1A1A",
                  overflow: "hidden",
                }}
              >
                {/* Number + Problem side */}
                <div style={{
                  padding: "48px 48px",
                  order: isEven ? 0 : 1,
                  borderRight: isEven ? "1px solid #E8E4DC" : "1px solid rgba(255,255,255,0.05)",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 72, fontWeight: 700, lineHeight: 1, color: isEven ? "#E8E4DC" : "rgba(255,255,255,0.06)", marginBottom: 16 }}>
                    {p.number}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: isEven ? "#AAA" : "rgba(255,255,255,0.25)", marginBottom: 12 }}>
                    {locale === "zh" ? "老板的问题" : locale === "ja" ? "社長の問題" : "The problem"}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 600, color: isEven ? "#1A1A1A" : "#FAFAF8", margin: "0 0 20px", lineHeight: 1.25 }}>
                    {p.problem}
                  </h3>
                  <div style={{ height: 1, background: isEven ? "#E8E4DC" : "rgba(255,255,255,0.06)", marginBottom: 20 }} />
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B6914", marginBottom: 8 }}>
                    {locale === "zh" ? "我的方案" : locale === "ja" ? "私の解決策" : "The solution"}
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: isEven ? "#1A1A1A" : "#D4C49A", margin: 0, lineHeight: 1.5 }}>
                    {p.solution}
                  </p>
                </div>

                {/* Detail + Proof side */}
                <div style={{
                  padding: "48px 48px",
                  order: isEven ? 1 : 0,
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: isEven ? "#555" : "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: "0 0 28px" }}>
                    {p.detail}
                  </p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", background: isEven ? "#F5F2EC" : "rgba(255,255,255,0.03)", borderLeft: "2px solid #8B6914" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#8B6914", flexShrink: 0, marginTop: 2 }}>DATA</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: isEven ? "#777" : "rgba(255,255,255,0.35)", lineHeight: 1.6, letterSpacing: "0.03em" }}>
                      {p.proof}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
