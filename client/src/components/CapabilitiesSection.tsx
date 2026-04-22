/* CapabilitiesSection v3 — Progressive Disclosure Cards
   Design: 6 cards in 3×2 grid, each card shows ONLY the value headline first
   Hover: card expands to show detail + data proof
   Key: User sees minimal info first, gets more when curious
   NO tech terms. Pure business value language. */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: {
    number: string;
    headline: string;
    subline: string;
    detail: string;
    proof: string;
    proofLabel: string;
  }[];
}> = {
  zh: {
    eyebrow: "你能得到什么",
    title: "6 个结果，不是 6 个功能",
    subtitle: "悬停查看每个结果如何实现",
    cards: [
      {
        number: "01",
        headline: "客户主动找上门",
        subline: "不靠广告，靠搜索排名",
        detail: "品牌矩阵建站：每个产品、每个使用场景都有独立落地页。用户搜索相关词，第一个看到的是你。ChatGPT 推荐同类产品时，引用的是你的品牌。这是持续免费的流量复利。",
        proof: "SEO 流量获客成本比广告低 87%",
        proofLabel: "HubSpot 2024",
      },
      {
        number: "02",
        headline: "卖出更高的价格",
        subline: "同款产品，品牌站溢价 30–50%",
        detail: "专业品牌网站是最强的定价工具。品牌故事、场景化展示、用户评论——让客户觉得「这个品牌值这个价」。铺货卖 ¥99，品牌卖 ¥149，同样的产品，不同的利润率。",
        proof: "有品牌官网的卖家平均客单价高 35%",
        proofLabel: "Shopify 商家数据",
      },
      {
        number: "03",
        headline: "全球客户一键付款",
        subline: "多货币、多支付方式，自动适配",
        detail: "Stripe、PayPal、Apple Pay、支付宝国际版全部内置。自动识别买家所在地区，显示对应货币。美国客户看到美元，日本客户看到日元。自定义结账流程，减少购物车放弃。",
        proof: "多货币结账提升转化率 12–18%",
        proofLabel: "Stripe 官方数据",
      },
      {
        number: "04",
        headline: "运营不再靠人盯",
        subline: "3 个岗位的工作，系统自动完成",
        detail: "订单确认、发货通知、物流追踪自动发送。库存低于设定值自动提醒。节假日促销自动触发。社媒内容定时发布。你的团队只处理真正需要人判断的事。",
        proof: "自动化减少 60–80% 重复运营工作量",
        proofLabel: "Zapier 行业报告",
      },
      {
        number: "05",
        headline: "比竞争对手加载更快",
        subline: "速度 = 排名 = 转化率",
        detail: "现代前端技术构建，全球 CDN 加速，首屏加载 < 1.5 秒。Google 把加载速度作为排名因素。你的竞争对手用 WordPress 加载 3–5 秒，你 1 秒内打开，客户不会跑。",
        proof: "每快 1 秒，转化率提升 7%",
        proofLabel: "Google Core Web Vitals",
      },
      {
        number: "06",
        headline: "你掌控一切数据",
        subline: "流量、订单、用户——全在你手里",
        detail: "云端内容管理后台，3 分钟学会操作。实时流量、产品热度、地区分布、渠道转化——一个面板全看到。用户评论一键管理。出了问题，你第一个知道，不是等客户投诉。",
        proof: "数据驱动决策的品牌年增长率高 2.3 倍",
        proofLabel: "McKinsey 数字化报告",
      },
    ],
  },
  en: {
    eyebrow: "WHAT YOU GET",
    title: "6 results, not 6 features",
    subtitle: "Hover to see how each result is achieved",
    cards: [
      {
        number: "01",
        headline: "Customers find you",
        subline: "No ads — organic search traffic",
        detail: "Brand matrix store strategy: every product and use case gets its own landing page. When someone searches, your brand appears first. When ChatGPT recommends products in your category, it cites your brand. This is compounding free traffic.",
        proof: "SEO acquisition cost is 87% lower than paid ads",
        proofLabel: "HubSpot 2024",
      },
      {
        number: "02",
        headline: "Sell at higher prices",
        subline: "Same product, brand site adds 30–50% premium",
        detail: "A professional brand website is the strongest pricing tool. Brand story, scene-based product display, customer reviews — customers feel 'this brand is worth the price.' Dropshipping sells at ¥99, brand sells at ¥149. Same product, different margin.",
        proof: "Sellers with brand websites average 35% higher AOV",
        proofLabel: "Shopify Merchant Data",
      },
      {
        number: "03",
        headline: "Global buyers pay in one click",
        subline: "Multi-currency, multi-payment, auto-adapted",
        detail: "Stripe, PayPal, Apple Pay, and international Alipay all built in. Automatically detects buyer location and shows the right currency. US buyers see USD, Japanese buyers see JPY. Custom checkout reduces cart abandonment.",
        proof: "Multi-currency checkout lifts conversion 12–18%",
        proofLabel: "Stripe Official Data",
      },
      {
        number: "04",
        headline: "Operations run themselves",
        subline: "3 full-time jobs, done by the system",
        detail: "Order confirmations, shipping notifications, tracking updates sent automatically. Low inventory alerts. Holiday promotions auto-trigger. Social content scheduled. Your team only handles things that genuinely need human judgment.",
        proof: "Automation reduces 60–80% of repetitive ops workload",
        proofLabel: "Zapier Industry Report",
      },
      {
        number: "05",
        headline: "Faster than your competitors",
        subline: "Speed = ranking = conversion rate",
        detail: "Modern frontend tech, global CDN, first-screen load < 1.5s. Google uses load speed as a ranking factor. Your competitors use WordPress (3–5s load). Your site opens in under 1 second. Customers don't leave.",
        proof: "Every 1-second improvement = 7% conversion rate increase",
        proofLabel: "Google Core Web Vitals",
      },
      {
        number: "06",
        headline: "You own all the data",
        subline: "Traffic, orders, users — all in your hands",
        detail: "Cloud-based CMS dashboard, learned in 3 minutes. Real-time traffic, product popularity, regional breakdown, channel conversion — one panel shows everything. Customer review management in one click. You know when something goes wrong before customers complain.",
        proof: "Data-driven brands grow 2.3× faster",
        proofLabel: "McKinsey Digital Report",
      },
    ],
  },
  ja: {
    eyebrow: "あなたが得るもの",
    title: "6つの結果、6つの機能ではない",
    subtitle: "ホバーして各結果の実現方法を確認",
    cards: [
      {
        number: "01",
        headline: "顧客が自分から来る",
        subline: "広告不要、検索ランキングで集客",
        detail: "ブランドマトリックス戦略：すべての商品とユースケースに独自のランディングページ。検索すると最初にあなたのブランドが表示される。ChatGPTが同カテゴリを推薦する際、あなたのブランドが引用される。これは複利的な無料トラフィック。",
        proof: "SEO獲得コストは広告より87%低い",
        proofLabel: "HubSpot 2024",
      },
      {
        number: "02",
        headline: "より高い価格で売れる",
        subline: "同じ商品でもブランドサイトで30〜50%プレミアム",
        detail: "プロのブランドサイトは最強の価格設定ツール。ブランドストーリー、シーンベースの展示、顧客レビューで「このブランドはこの価格の価値がある」と感じさせる。同じ商品でも利益率が変わる。",
        proof: "ブランドサイトを持つ販売者のAOVは35%高い",
        proofLabel: "Shopifyマーチャントデータ",
      },
      {
        number: "03",
        headline: "世界中のバイヤーがワンクリックで決済",
        subline: "多通貨・多決済方法、自動適応",
        detail: "Stripe、PayPal、Apple Pay、Alipay国際版を内蔵。バイヤーの所在地を自動検出し適切な通貨を表示。米国バイヤーにはUSD、日本バイヤーにはJPY。カスタムチェックアウトでカート放棄を削減。",
        proof: "多通貨チェックアウトでコンバージョン12〜18%向上",
        proofLabel: "Stripe公式データ",
      },
      {
        number: "04",
        headline: "運営が自動化される",
        subline: "3人分の仕事をシステムが自動完了",
        detail: "注文確認、発送通知、追跡更新を自動送信。在庫アラート。季節プロモーション自動トリガー。SNSコンテンツ定時投稿。チームは本当に人間の判断が必要なことだけを処理。",
        proof: "自動化で繰り返し作業の60〜80%を削減",
        proofLabel: "Zapier業界レポート",
      },
      {
        number: "05",
        headline: "競合より速く表示される",
        subline: "速度＝ランキング＝コンバージョン率",
        detail: "最新フロントエンド技術、グローバルCDN、ファーストスクリーン1.5秒未満。Googleは速度をランキング要因として使用。競合はWordPress（3〜5秒）、あなたのサイトは1秒以内。顧客が離れない。",
        proof: "1秒改善するごとにコンバージョン7%向上",
        proofLabel: "Google Core Web Vitals",
      },
      {
        number: "06",
        headline: "すべてのデータを掌握",
        subline: "トラフィック、注文、ユーザー—全部あなたの手に",
        detail: "クラウドCMSダッシュボード、3分で習得。リアルタイムトラフィック、商品人気度、地域分布、チャネルコンバージョンを1つのパネルで確認。レビュー管理もワンクリック。問題が起きたとき、顧客より先に知る。",
        proof: "データ駆動型ブランドの成長率は2.3倍",
        proofLabel: "McKinseyデジタルレポート",
      },
    ],
  },
};

export default function CapabilitiesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="capabilities" style={{ background: "#F5F2EC", padding: "120px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: "#8B6914", marginBottom: 20 }}>
            {c.eyebrow}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600, color: "#1A1A1A", margin: "0 0 12px", lineHeight: 1.1 }}>
            {c.title}
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", letterSpacing: "0.03em" }}>{c.subtitle}</p>
        </motion.div>

        {/* 3×2 card grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {c.cards.map((card, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: isHovered ? "#1A1A1A" : "#FFFFFF",
                  padding: "40px 36px",
                  cursor: "default",
                  transition: "background 0.3s",
                  minHeight: 260,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Number */}
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 56, fontWeight: 700, lineHeight: 1, color: isHovered ? "rgba(255,255,255,0.06)" : "#F0EDE5", position: "absolute", top: 20, right: 24, transition: "color 0.3s" }}>
                  {card.number}
                </div>

                {/* Default view: headline + subline */}
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 600, color: isHovered ? "#FAFAF8" : "#1A1A1A", margin: "0 0 10px", lineHeight: 1.25, transition: "color 0.3s" }}>
                    {card.headline}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: isHovered ? "rgba(255,255,255,0.4)" : "#999", margin: 0, transition: "color 0.3s" }}>
                    {card.subline}
                  </p>
                </div>

                {/* Hover detail: progressive disclosure */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      style={{ marginTop: 24 }}
                    >
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: "0 0 20px" }}>
                        {card.detail}
                      </p>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, borderLeft: "2px solid #8B6914", paddingLeft: 12 }}>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#D4C49A", marginBottom: 2 }}>
                            {card.proof}
                          </div>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>
                            {card.proofLabel}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hover indicator arrow */}
                {!isHovered && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 24, fontFamily: "'DM Mono', monospace", fontSize: 9, color: "#C8B87A", letterSpacing: "0.1em" }}>
                    hover →
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
