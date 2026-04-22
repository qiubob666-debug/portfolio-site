/* BrandMatrixSection — Brand Matrix Strategy
   Design: Dark background, gold accent, flow diagram
   Layout: Visual flow: 1 Brand → Multiple Scene Sites → SEO Matrix → Compound Growth
   Strategy: Show bosses how to build a brand fortress vs spray-and-pray dropshipping */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const NODES = [
  {
    id: "brand",
    zh: { title: "1个品牌", sub: "统一视觉 · 统一故事 · 统一信任" },
    en: { title: "1 Brand", sub: "Unified visual · Unified story · Unified trust" },
    ja: { title: "1つのブランド", sub: "統一ビジュアル・統一ストーリー・統一信頼" },
    color: "#D4C49A",
  },
  {
    id: "sites",
    zh: { title: "多个场景站", sub: "厨房站 · 户外站 · 礼品站 · 宠物站…" },
    en: { title: "Multi-Scene Sites", sub: "Kitchen · Outdoor · Gift · Pet…" },
    ja: { title: "複数シーンサイト", sub: "キッチン・アウトドア・ギフト・ペット…" },
    color: "#5DADE2",
  },
  {
    id: "seo",
    zh: { title: "SEO 长尾矩阵", sub: "每个站覆盖不同关键词 · AI引用你的品牌" },
    en: { title: "Long-tail SEO Matrix", sub: "Each site covers different keywords · AI cites your brand" },
    ja: { title: "ロングテールSEOマトリクス", sub: "各サイトが異なるキーワードをカバー・AIがブランドを引用" },
    color: "#2ECC71",
  },
  {
    id: "compound",
    zh: { title: "复利增长", sub: "客单价提升 · 平台佣金 0% · 长期品牌资产" },
    en: { title: "Compound Growth", sub: "Higher AOV · 0% commission · Long-term brand equity" },
    ja: { title: "複利成長", sub: "客単価向上・手数料0%・長期ブランド資産" },
    color: "#E67E22",
  },
];

const BENEFITS = {
  zh: [
    { icon: "🏰", title: "品牌堡垒", desc: "多个场景站互相引流，形成护城河。竞争对手很难复制一个完整的品牌生态。" },
    { icon: "🔍", title: "SEO 全覆盖", desc: "一个品牌站只能覆盖有限关键词。多个场景站可以覆盖从短尾词到长尾词的完整搜索矩阵。" },
    { icon: "🤖", title: "AI 引用你", desc: "当 AI 搜索引擎（ChatGPT、Perplexity）回答用户问题时，有内容的品牌站会被引用。铺货模式的店铺不会。" },
    { icon: "💰", title: "客单价提升", desc: "有品牌故事的产品，定价可以高出同类铺货产品 30–200%。客户买的是信任，不只是产品。" },
    { icon: "📈", title: "复利效应", desc: "每一篇 SEO 文章、每一个场景站都是长期资产。今天发布的内容，3 年后还在给你带流量。" },
    { icon: "🌐", title: "多语言市场", desc: "一套系统，自动适配英语/日语/德语市场。不用为每个市场重新建站。" },
  ],
  en: [
    { icon: "🏰", title: "Brand Fortress", desc: "Multiple scene sites cross-link and funnel traffic to each other, creating a moat. Competitors can't easily replicate a full brand ecosystem." },
    { icon: "🔍", title: "Full SEO Coverage", desc: "One brand site covers limited keywords. Multiple scene sites cover the full search matrix from head terms to long-tail keywords." },
    { icon: "🤖", title: "AI Cites You", desc: "When AI search engines (ChatGPT, Perplexity) answer user questions, brand sites with content get cited. Dropshipping stores don't." },
    { icon: "💰", title: "Higher AOV", desc: "Products with brand stories can be priced 30–200% higher than generic dropshipping equivalents. Customers buy trust, not just products." },
    { icon: "📈", title: "Compound Effect", desc: "Every SEO article, every scene site is a long-term asset. Content published today still drives traffic 3 years from now." },
    { icon: "🌐", title: "Multi-language Markets", desc: "One system, automatically adapted for English/Japanese/German markets. No need to rebuild for each market." },
  ],
  ja: [
    { icon: "🏰", title: "ブランド要塞", desc: "複数のシーンサイトが相互にトラフィックを誘導し、堀を作ります。競合他社は完全なブランドエコシステムを簡単に複製できません。" },
    { icon: "🔍", title: "完全SEOカバレッジ", desc: "1つのブランドサイトはキーワードが限られます。複数のシーンサイトでヘッドワードからロングテールまでカバーできます。" },
    { icon: "🤖", title: "AIに引用される", desc: "AIサーチエンジン（ChatGPT、Perplexity）がユーザーの質問に答える際、コンテンツのあるブランドサイトが引用されます。" },
    { icon: "💰", title: "客単価向上", desc: "ブランドストーリーのある商品は、一般的な商品より30〜200%高く設定できます。顧客は信頼を買います。" },
    { icon: "📈", title: "複利効果", desc: "すべてのSEO記事、すべてのシーンサイトは長期資産です。今日公開したコンテンツが3年後もトラフィックをもたらします。" },
    { icon: "🌐", title: "多言語市場", desc: "1つのシステムで英語/日本語/ドイツ語市場に自動対応。市場ごとに再構築する必要はありません。" },
  ],
};

const COPY = {
  zh: {
    index: "核心战略",
    headline: "从铺货到品牌：",
    headline_em: "矩阵式建站战略",
    sub: "过去跨境电商靠铺货赚差价，利润越来越薄。现在，用品牌矩阵的方式，让每一个产品都有自己的品牌故事和独立站——客单价更高，平台佣金 0%，SEO 复利增长。",
    flow_label: "品牌矩阵增长路径",
    benefits_label: "为什么矩阵建站比铺货更赚钱",
    cta: "了解如何为我的品牌建立矩阵 →",
  },
  en: {
    index: "Core Strategy",
    headline: "From Dropshipping to Brand:",
    headline_em: "Matrix Store Strategy",
    sub: "Cross-border e-commerce used to rely on dropshipping margins, but margins keep shrinking. Now, use the brand matrix approach — give every product its own brand story and independent store. Higher AOV, 0% commission, SEO compound growth.",
    flow_label: "Brand Matrix Growth Path",
    benefits_label: "Why Matrix Stores Outperform Dropshipping",
    cta: "Learn how to build a matrix for my brand →",
  },
  ja: {
    index: "コア戦略",
    headline: "仕入れ転売からブランドへ：",
    headline_em: "マトリクスストア戦略",
    sub: "越境ECは仕入れ転売の利益率が低下しています。ブランドマトリクスアプローチで、すべての商品に独自のブランドストーリーと独立サイトを。高い客単価、手数料0%、SEO複利成長。",
    flow_label: "ブランドマトリクス成長パス",
    benefits_label: "なぜマトリクスストアが仕入れ転売より稼げるか",
    cta: "ブランドのマトリクス構築について相談する →",
  },
};

export default function BrandMatrixSection() {
  const { t, locale } = useI18n();
  const c = COPY[locale as keyof typeof COPY] || COPY.en;
  const benefits = BENEFITS[locale as keyof typeof BENEFITS] || BENEFITS.en;
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section
      id="brand-matrix"
      style={{
        padding: "120px 0",
        background: "#0A0A0A",
        borderTop: "1px solid #1A1A1A",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#8B6914",
            marginBottom: 64,
          }}
        >
          {c.index}
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 24 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#FAFAF8",
              margin: "0 0 8px",
            }}
          >
            {c.headline}
            <br />
            <em style={{ fontStyle: "italic", color: "#D4C49A" }}>{c.headline_em}</em>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#888",
            maxWidth: 680,
            margin: "0 0 80px",
          }}
        >
          {c.sub}
        </motion.p>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", marginBottom: 32 }}>
            {c.flow_label}
          </div>

          {/* Flow nodes */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
              overflowX: "auto",
              paddingBottom: 8,
            }}
          >
            {NODES.map((node, i) => {
              const label = node[locale as keyof typeof node] as { title: string; sub: string } || node.en as { title: string; sub: string };
              const isActive = activeNode === node.id;
              return (
                <div key={node.id} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 160 }}>
                  <motion.div
                    onClick={() => setActiveNode(isActive ? null : node.id)}
                    whileHover={{ y: -4 }}
                    style={{
                      flex: 1,
                      padding: "28px 20px",
                      background: isActive ? `${node.color}15` : "#111",
                      border: `1px solid ${isActive ? node.color : "#222"}`,
                      cursor: "pointer",
                      transition: "all 0.25s",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: node.color,
                        marginBottom: 8,
                      }}
                    >
                      0{i + 1}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#FAFAF8",
                        marginBottom: 8,
                      }}
                    >
                      {label.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      {label.sub}
                    </div>
                  </motion.div>
                  {i < NODES.length - 1 && (
                    <div
                      style={{
                        padding: "0 8px",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 16,
                        color: "#333",
                        flexShrink: 0,
                      }}
                    >
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Node detail panel */}
          <AnimatePresence>
            {activeNode && (() => {
              const node = NODES.find(n => n.id === activeNode)!;
              const details: Record<string, Record<string, string[]>> = {
                brand: {
                  zh: ["统一的 Logo、颜色、字体系统", "品牌故事页面（About Us）", "产品背书和社会证明", "多语言适配（英/日/德/西）"],
                  en: ["Unified Logo, color, typography system", "Brand story page (About Us)", "Product endorsement and social proof", "Multi-language (EN/JA/DE/ES)"],
                  ja: ["統一ロゴ・カラー・タイポグラフィ", "ブランドストーリーページ", "商品の裏付けと社会的証明", "多言語対応（英/日/独/西）"],
                },
                sites: {
                  zh: ["厨房场景站：锅具、刀具、厨房小工具", "户外场景站：露营、登山、钓鱼装备", "礼品场景站：节日礼品、定制礼盒", "宠物场景站：宠物用品、宠物食品"],
                  en: ["Kitchen scene: cookware, knives, gadgets", "Outdoor scene: camping, hiking, fishing gear", "Gift scene: holiday gifts, custom gift boxes", "Pet scene: pet supplies, pet food"],
                  ja: ["キッチンシーン：調理器具・包丁・ガジェット", "アウトドアシーン：キャンプ・登山・釣り", "ギフトシーン：季節ギフト・カスタムボックス", "ペットシーン：ペット用品・ペットフード"],
                },
                seo: {
                  zh: ["短尾词：\"厨房刀具\" \"露营装备\"", "长尾词：\"适合新手的露营刀具推荐\"", "场景词：\"送男友的生日礼物\"", "AI 引用：ChatGPT 推荐你的品牌"],
                  en: ["Head terms: \"kitchen knives\" \"camping gear\"", "Long-tail: \"best camping knife for beginners\"", "Scene terms: \"birthday gift for boyfriend\"", "AI citation: ChatGPT recommends your brand"],
                  ja: ["ヘッドワード：「キッチンナイフ」「キャンプ用品」", "ロングテール：「初心者向けキャンプナイフ」", "シーンワード：「彼氏への誕生日プレゼント」", "AI引用：ChatGPTがブランドを推薦"],
                },
                compound: {
                  zh: ["客单价比铺货高 30–200%", "亚马逊佣金 0%（自有渠道）", "SEO 内容持续带来免费流量", "品牌资产可以融资、转让、出售"],
                  en: ["AOV 30–200% higher than dropshipping", "0% Amazon commission (own channel)", "SEO content drives free traffic continuously", "Brand equity can be financed, transferred, sold"],
                  ja: ["客単価が仕入れ転売より30〜200%高い", "Amazon手数料0%（自社チャネル）", "SEOコンテンツが継続的に無料トラフィックを生成", "ブランド資産は融資・譲渡・売却可能"],
                },
              };
              const nodeDetails = details[activeNode]?.[locale] || details[activeNode]?.en || [];
              const nodeLabel = node[locale as keyof typeof node] as { title: string; sub: string } || node.en as { title: string; sub: string };
              return (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      marginTop: 2,
                      padding: "28px 32px",
                      background: `${node.color}08`,
                      border: `1px solid ${node.color}30`,
                      borderTop: `2px solid ${node.color}`,
                    }}
                  >
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: node.color, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                      {nodeLabel.title}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px 24px" }}>
                      {nodeDetails.map((detail, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: node.color, fontSize: 12, marginTop: 2, flexShrink: 0 }}>→</span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#444", marginBottom: 32 }}>
            {c.benefits_label}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
            className="matrix-benefits-grid"
          >
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4, borderColor: "#8B6914" }}
                style={{
                  padding: "28px 24px",
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  transition: "all 0.25s",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 16 }}>{item.icon}</div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#D4C49A",
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#666",
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginTop: 48, textAlign: "center" }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              background: "transparent",
              border: "1px solid #8B6914",
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#D4C49A",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#8B6914"; e.currentTarget.style.color = "#111"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#D4C49A"; }}
          >
            {c.cta}
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .matrix-benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
