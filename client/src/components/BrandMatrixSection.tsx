/* BrandMatrixSection — Brand Matrix Strategy v2
   Design: Dark bg, typographic/numeric visual elements (NO emoji), gold accent
   Layout: Visual flow diagram + benefit cards with large stat numbers
   Strategy: Show bosses how to build a brand fortress vs spray-and-pray dropshipping
   Mobile: Single column, larger touch targets */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

const NODES = [
  {
    id: "brand",
    num: "01",
    zh: { title: "1个品牌", sub: "统一视觉 · 统一故事 · 统一信任" },
    en: { title: "1 Brand", sub: "Unified visual · story · trust" },
    ja: { title: "1つのブランド", sub: "統一ビジュアル · ストーリー · 信頼" },
    color: "#D4C49A",
    accent: "rgba(212,196,154,0.12)",
  },
  {
    id: "sites",
    num: "02",
    zh: { title: "多个场景站", sub: "厨房 · 户外 · 礼品 · 宠物…" },
    en: { title: "Multi-Scene Sites", sub: "Kitchen · Outdoor · Gift · Pet…" },
    ja: { title: "複数シーンサイト", sub: "キッチン · アウトドア · ギフト…" },
    color: "#5DADE2",
    accent: "rgba(93,173,226,0.1)",
  },
  {
    id: "seo",
    num: "03",
    zh: { title: "SEO 矩阵", sub: "长尾词全覆盖 · AI引用你的品牌" },
    en: { title: "SEO Matrix", sub: "Full long-tail coverage · AI cites you" },
    ja: { title: "SEOマトリクス", sub: "ロングテール全カバー · AIが引用" },
    color: "#2ECC71",
    accent: "rgba(46,204,113,0.08)",
  },
  {
    id: "compound",
    num: "04",
    zh: { title: "复利增长", sub: "客单价↑ · 佣金0% · 品牌资产" },
    en: { title: "Compound Growth", sub: "AOV↑ · 0% commission · Brand equity" },
    ja: { title: "複利成長", sub: "客単価↑ · 手数料0% · ブランド資産" },
    color: "#E67E22",
    accent: "rgba(230,126,34,0.1)",
  },
];

const BENEFITS = {
  zh: [
    {
      stat: "×3",
      statLabel: "客单价倍增",
      title: "品牌堡垒",
      desc: "多个场景站互相引流，形成护城河。竞争对手很难复制一个完整的品牌生态。",
    },
    {
      stat: "∞",
      statLabel: "关键词覆盖",
      title: "SEO 全覆盖",
      desc: "一个品牌站只能覆盖有限关键词。多个场景站可以覆盖从短尾词到长尾词的完整搜索矩阵。",
    },
    {
      stat: "AI",
      statLabel: "主动引用你",
      title: "AI 引用你的品牌",
      desc: "当 ChatGPT、Perplexity 回答用户问题时，有内容的品牌站会被引用。铺货店铺不会。",
    },
    {
      stat: "+200%",
      statLabel: "定价空间",
      title: "客单价提升",
      desc: "有品牌故事的产品，定价可以高出同类铺货产品 30–200%。客户买的是信任，不只是产品。",
    },
    {
      stat: "3yr",
      statLabel: "内容持续带流量",
      title: "复利效应",
      desc: "每一篇 SEO 文章、每一个场景站都是长期资产。今天发布的内容，3 年后还在给你带流量。",
    },
    {
      stat: "0¥",
      statLabel: "额外建站成本",
      title: "多语言市场",
      desc: "一套系统，自动适配英语/日语/德语市场。不用为每个市场重新建站。",
    },
  ],
  en: [
    {
      stat: "×3",
      statLabel: "AOV multiplier",
      title: "Brand Fortress",
      desc: "Multiple scene sites cross-link and funnel traffic to each other, creating a moat competitors can't easily replicate.",
    },
    {
      stat: "∞",
      statLabel: "Keyword coverage",
      title: "Full SEO Coverage",
      desc: "One brand site covers limited keywords. Multiple scene sites cover the full search matrix from head terms to long-tail.",
    },
    {
      stat: "AI",
      statLabel: "Cites your brand",
      title: "AI Cites You",
      desc: "When ChatGPT, Perplexity answer user questions, brand sites with content get cited. Dropshipping stores don't.",
    },
    {
      stat: "+200%",
      statLabel: "Pricing headroom",
      title: "Higher AOV",
      desc: "Products with brand stories can be priced 30–200% higher than generic dropshipping equivalents.",
    },
    {
      stat: "3yr",
      statLabel: "Content drives traffic",
      title: "Compound Effect",
      desc: "Every SEO article, every scene site is a long-term asset. Content published today still drives traffic 3 years from now.",
    },
    {
      stat: "0¥",
      statLabel: "Extra build cost",
      title: "Multi-language Markets",
      desc: "One system, automatically adapted for English/Japanese/German markets. No need to rebuild for each market.",
    },
  ],
  ja: [
    {
      stat: "×3",
      statLabel: "客単価倍増",
      title: "ブランド要塞",
      desc: "複数のシーンサイトが相互にトラフィックを誘導し、堀を作ります。競合他社は完全なブランドエコシステムを簡単に複製できません。",
    },
    {
      stat: "∞",
      statLabel: "キーワードカバレッジ",
      title: "完全SEOカバレッジ",
      desc: "1つのブランドサイトはキーワードが限られます。複数のシーンサイトでヘッドワードからロングテールまでカバーできます。",
    },
    {
      stat: "AI",
      statLabel: "ブランドを引用",
      title: "AIに引用される",
      desc: "ChatGPT、PerplexityがユーザーのQ&Aに答える際、コンテンツのあるブランドサイトが引用されます。",
    },
    {
      stat: "+200%",
      statLabel: "価格余地",
      title: "客単価向上",
      desc: "ブランドストーリーのある商品は、一般的な商品より30〜200%高く設定できます。",
    },
    {
      stat: "3yr",
      statLabel: "コンテンツが集客",
      title: "複利効果",
      desc: "すべてのSEO記事、すべてのシーンサイトは長期資産です。今日公開したコンテンツが3年後もトラフィックをもたらします。",
    },
    {
      stat: "0¥",
      statLabel: "追加構築コスト",
      title: "多言語市場",
      desc: "1つのシステムで英語/日本語/ドイツ語市場に自動対応。市場ごとに再構築する必要はありません。",
    },
  ],
};

const COPY = {
  zh: {
    index: "核心战略",
    headline: "从铺货到品牌矩阵",
    headline_em: "让每个产品都有自己的独立站",
    sub: "过去靠铺货赚差价，利润越来越薄。现在，用品牌矩阵的方式——让每个产品有自己的品牌故事和独立站，客单价更高，平台佣金 0%，SEO 复利增长。",
    flow_label: "品牌矩阵增长路径（点击节点查看详情）",
    benefits_label: "为什么矩阵建站比铺货更赚钱",
    cta: "了解如何为我的品牌建立矩阵 →",
  },
  en: {
    index: "Core Strategy",
    headline: "From Dropshipping to Brand Matrix",
    headline_em: "Every product gets its own store",
    sub: "Dropshipping margins keep shrinking. The brand matrix approach gives every product its own brand story and independent store — higher AOV, 0% commission, SEO compound growth.",
    flow_label: "Brand Matrix Growth Path (click a node for details)",
    benefits_label: "Why Matrix Stores Outperform Dropshipping",
    cta: "Learn how to build a matrix for my brand →",
  },
  ja: {
    index: "コア戦略",
    headline: "仕入れ転売からブランドマトリクスへ",
    headline_em: "すべての商品が独自のストアを持つ",
    sub: "仕入れ転売の利益率は低下しています。ブランドマトリクスアプローチで、すべての商品に独自のブランドストーリーと独立サイトを。高い客単価、手数料0%、SEO複利成長。",
    flow_label: "ブランドマトリクス成長パス（ノードをクリック）",
    benefits_label: "なぜマトリクスストアが仕入れ転売より稼げるか",
    cta: "ブランドのマトリクス構築について相談する →",
  },
};

const NODE_DETAILS: Record<string, Record<string, string[]>> = {
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

export default function BrandMatrixSection() {
  const { locale } = useI18n();
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
            marginBottom: 48,
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
          style={{ marginBottom: 20 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#FAFAF8",
              margin: 0,
            }}
          >
            {c.headline}
          </h2>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#D4C49A",
              fontStyle: "italic",
              margin: "4px 0 0",
            }}
          >
            {c.headline_em}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            lineHeight: 1.9,
            color: "#888",
            maxWidth: 640,
            margin: "0 0 72px",
          }}
        >
          {c.sub}
        </motion.p>

        {/* ── Flow diagram ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80 }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#333",
              marginBottom: 24,
            }}
          >
            {c.flow_label}
          </div>

          {/* Nodes row */}
          <div className="matrix-flow-row" style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
            {NODES.map((node, i) => {
              const label = (node[locale as keyof typeof node] as { title: string; sub: string }) || node.en;
              const isActive = activeNode === node.id;
              return (
                <div key={node.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <motion.button
                    onClick={() => setActiveNode(isActive ? null : node.id)}
                    whileHover={{ y: -3 }}
                    style={{
                      flex: 1,
                      padding: "32px 20px",
                      background: isActive ? node.accent : "#111",
                      border: `1px solid ${isActive ? node.color : "#1E1E1E"}`,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.25s",
                    }}
                  >
                    {/* Number */}
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 28,
                        fontWeight: 700,
                        color: isActive ? node.color : "#2A2A2A",
                        lineHeight: 1,
                        marginBottom: 16,
                        transition: "color 0.25s",
                      }}
                    >
                      {node.num}
                    </div>
                    {/* Title */}
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "clamp(18px, 2vw, 24px)",
                        fontWeight: 600,
                        color: "#FAFAF8",
                        marginBottom: 10,
                        lineHeight: 1.2,
                      }}
                    >
                      {label.title}
                    </div>
                    {/* Sub */}
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: "#555",
                        lineHeight: 1.6,
                      }}
                    >
                      {label.sub}
                    </div>
                    {/* Active indicator */}
                    <div
                      style={{
                        marginTop: 16,
                        width: isActive ? "100%" : 0,
                        height: 2,
                        background: node.color,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </motion.button>

                  {/* Arrow between nodes */}
                  {i < NODES.length - 1 && (
                    <div
                      style={{
                        padding: "0 6px",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 14,
                        color: "#2A2A2A",
                        flexShrink: 0,
                        userSelect: "none",
                      }}
                    >
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {activeNode && (() => {
              const node = NODES.find(n => n.id === activeNode)!;
              const details = NODE_DETAILS[activeNode]?.[locale] || NODE_DETAILS[activeNode]?.en || [];
              const label = (node[locale as keyof typeof node] as { title: string; sub: string }) || node.en;
              return (
                <motion.div
                  key={activeNode}
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
                      background: node.accent,
                      borderLeft: `3px solid ${node.color}`,
                      borderRight: "1px solid #1E1E1E",
                      borderBottom: "1px solid #1E1E1E",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        color: node.color,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      }}
                    >
                      {node.num} — {label.title}
                    </div>
                    <div
                      className="detail-grid"
                      style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px 32px" }}
                    >
                      {details.map((detail, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: node.color, fontSize: 12, marginTop: 3, flexShrink: 0 }}>—</span>
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 14,
                              color: "rgba(255,255,255,0.6)",
                              lineHeight: 1.7,
                            }}
                          >
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </motion.div>

        {/* ── Benefits grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#333",
              marginBottom: 28,
            }}
          >
            {c.benefits_label}
          </div>

          <div
            className="matrix-benefits-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}
          >
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ borderColor: "#3A3A3A", y: -3 }}
                style={{
                  padding: "32px 28px",
                  background: "#111",
                  border: "1px solid #1A1A1A",
                  transition: "all 0.25s",
                }}
              >
                {/* Large stat number */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(32px, 3.5vw, 48px)",
                    fontWeight: 700,
                    color: "#D4C49A",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#555",
                    marginBottom: 20,
                  }}
                >
                  {item.statLabel}
                </div>
                {/* Divider */}
                <div style={{ width: 24, height: 1, background: "#2A2A2A", marginBottom: 20 }} />
                {/* Title */}
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: "#FAFAF8",
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </div>
                {/* Desc */}
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
          style={{ marginTop: 56, textAlign: "center" }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 40px",
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
            onMouseEnter={e => {
              e.currentTarget.style.background = "#8B6914";
              e.currentTarget.style.color = "#111";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#D4C49A";
            }}
          >
            {c.cta}
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .matrix-benefits-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .matrix-benefits-grid { grid-template-columns: 1fr !important; }
          .matrix-flow-row { flex-direction: column !important; }
          .matrix-flow-row > div { width: 100% !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
