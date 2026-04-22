/* BrandMatrixSection v4 — Apple-inspired mobile-first redesign
   Desktop: horizontal flow nodes + 3-col benefits grid
   Mobile: vertical accordion nodes + 2-col benefits grid
   Motion: stagger entrance, spring expand, scroll-triggered
   Typography: large display numbers, high-contrast text */

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
    { stat: "×3", statLabel: "客单价倍增", title: "品牌堡垒", desc: "多个场景站互相引流，形成护城河。竞争对手很难复制一个完整的品牌生态。" },
    { stat: "∞", statLabel: "关键词覆盖", title: "SEO 全覆盖", desc: "一个品牌站只能覆盖有限关键词。多个场景站可以覆盖从短尾词到长尾词的完整搜索矩阵。" },
    { stat: "AI", statLabel: "主动引用你", title: "AI 引用你的品牌", desc: "当 ChatGPT、Perplexity 回答用户问题时，有内容的品牌站会被引用。铺货店铺不会。" },
    { stat: "+200%", statLabel: "定价空间", title: "客单价提升", desc: "有品牌故事的产品，定价可以高出同类铺货产品 30–200%。客户买的是信任，不只是产品。" },
    { stat: "3yr", statLabel: "内容持续带流量", title: "复利效应", desc: "每一篇 SEO 文章、每一个场景站都是长期资产。今天发布的内容，3 年后还在给你带流量。" },
    { stat: "0¥", statLabel: "额外建站成本", title: "多语言市场", desc: "一套系统，自动适配英语/日语/德语市场。不用为每个市场重新建站。" },
  ],
  en: [
    { stat: "×3", statLabel: "AOV multiplier", title: "Brand Fortress", desc: "Multiple scene sites cross-link and funnel traffic to each other, creating a moat competitors can't easily replicate." },
    { stat: "∞", statLabel: "Keyword coverage", title: "Full SEO Coverage", desc: "One brand site covers limited keywords. Multiple scene sites cover the full search matrix from head terms to long-tail." },
    { stat: "AI", statLabel: "Cites your brand", title: "AI Cites You", desc: "When ChatGPT, Perplexity answer user questions, brand sites with content get cited. Dropshipping stores don't." },
    { stat: "+200%", statLabel: "Pricing headroom", title: "Higher AOV", desc: "Products with brand stories can be priced 30–200% higher than generic dropshipping equivalents." },
    { stat: "3yr", statLabel: "Content drives traffic", title: "Compound Effect", desc: "Every SEO article, every scene site is a long-term asset. Content published today still drives traffic 3 years from now." },
    { stat: "0¥", statLabel: "Extra build cost", title: "Multi-language Markets", desc: "One system, automatically adapted for English/Japanese/German markets. No need to rebuild for each market." },
  ],
  ja: [
    { stat: "×3", statLabel: "客単価倍増", title: "ブランド要塞", desc: "複数のシーンサイトが相互にトラフィックを誘導し、堀を作ります。競合他社は完全なブランドエコシステムを簡単に複製できません。" },
    { stat: "∞", statLabel: "キーワードカバレッジ", title: "完全SEOカバレッジ", desc: "1つのブランドサイトはキーワードが限られます。複数のシーンサイトでヘッドワードからロングテールまでカバーできます。" },
    { stat: "AI", statLabel: "ブランドを引用", title: "AIに引用される", desc: "ChatGPT、PerplexityがユーザーのQ&Aに答える際、コンテンツのあるブランドサイトが引用されます。" },
    { stat: "+200%", statLabel: "価格余地", title: "客単価向上", desc: "ブランドストーリーのある商品は、一般的な商品より30〜200%高く設定できます。" },
    { stat: "3yr", statLabel: "コンテンツが集客", title: "複利効果", desc: "すべてのSEO記事、すべてのシーンサイトは長期資産です。今日公開したコンテンツが3年後もトラフィックをもたらします。" },
    { stat: "0¥", statLabel: "追加構築コスト", title: "多言語市場", desc: "1つのシステムで英語/日本語/ドイツ語市場に自動対応。市場ごとに再構築する必要はありません。" },
  ],
};

const COPY = {
  zh: {
    index: "核心战略",
    headline: "从铺货到品牌矩阵",
    headline_em: "让每个产品都有自己的独立站",
    sub: "过去靠铺货赚差价，利润越来越薄。现在，用品牌矩阵的方式——让每个产品有自己的品牌故事和独立站，客单价更高，平台佣金 0%，SEO 复利增长。",
    flow_label: "品牌矩阵增长路径",
    flow_hint: "点击卡片查看详情",
    benefits_label: "为什么矩阵建站比铺货更赚钱",
    cta: "了解如何为我的品牌建立矩阵 →",
  },
  en: {
    index: "Core Strategy",
    headline: "From Dropshipping to Brand Matrix",
    headline_em: "Every product gets its own store",
    sub: "Dropshipping margins keep shrinking. The brand matrix approach gives every product its own brand story and independent store — higher AOV, 0% commission, SEO compound growth.",
    flow_label: "Brand Matrix Growth Path",
    flow_hint: "Tap a card to see details",
    benefits_label: "Why Matrix Stores Outperform Dropshipping",
    cta: "Learn how to build a matrix for my brand →",
  },
  ja: {
    index: "コア戦略",
    headline: "仕入れ転売からブランドマトリクスへ",
    headline_em: "すべての商品が独自のストアを持つ",
    sub: "仕入れ転売の利益率は低下しています。ブランドマトリクスアプローチで、すべての商品に独自のブランドストーリーと独立サイトを。高い客単価、手数料0%、SEO複利成長。",
    flow_label: "ブランドマトリクス成長パス",
    flow_hint: "カードをタップして詳細を確認",
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
    <section id="brand-matrix" className="bm-section">
      <div className="bm-container">

        {/* ── Section label ── */}
        <motion.div
          className="bm-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {c.index}
        </motion.div>

        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="bm-headline-block"
        >
          <h2 className="bm-headline">{c.headline}</h2>
          <h2 className="bm-headline bm-headline--em">{c.headline_em}</h2>
        </motion.div>

        <motion.p
          className="bm-sub"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {c.sub}
        </motion.p>

        {/* ── Flow diagram ── */}
        <motion.div
          className="bm-flow-section"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bm-flow-header">
            <span className="bm-section-label">{c.flow_label}</span>
            <span className="bm-flow-hint">{c.flow_hint}</span>
          </div>

          {/* Desktop: horizontal row | Mobile: vertical stack */}
          <div className="bm-nodes-row">
            {NODES.map((node, i) => {
              const label = (node[locale as keyof typeof node] as { title: string; sub: string }) || node.en;
              const isActive = activeNode === node.id;
              const details = NODE_DETAILS[node.id]?.[locale] || NODE_DETAILS[node.id]?.en || [];
              return (
                <div key={node.id} className="bm-node-wrapper">
                  {/* Node card */}
                  <motion.button
                    className={`bm-node-card ${isActive ? "bm-node-card--active" : ""}`}
                    style={{
                      borderColor: isActive ? node.color : "#1E1E1E",
                      background: isActive ? node.accent : "#111",
                    }}
                    onClick={() => setActiveNode(isActive ? null : node.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bm-node-num" style={{ color: isActive ? node.color : "#2A2A2A" }}>
                      {node.num}
                    </div>
                    <div className="bm-node-title">{label.title}</div>
                    <div className="bm-node-sub">{label.sub}</div>
                    <div
                      className="bm-node-bar"
                      style={{ background: node.color, width: isActive ? "100%" : 0 }}
                    />
                    {/* Mobile: inline expand icon */}
                    <motion.div
                      className="bm-node-expand-icon"
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: node.color }}
                    >
                      +
                    </motion.div>
                  </motion.button>

                  {/* Arrow (desktop only, between nodes) */}
                  {i < NODES.length - 1 && (
                    <div className="bm-node-arrow">→</div>
                  )}

                  {/* Mobile inline detail panel (appears below each card) */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        className="bm-node-detail-mobile"
                        key={`detail-mobile-${node.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden", borderLeft: `3px solid ${node.color}` }}
                      >
                        <div className="bm-node-detail-inner">
                          <div className="bm-node-detail-label" style={{ color: node.color }}>
                            {node.num} — {label.title}
                          </div>
                          <div className="bm-node-detail-grid">
                            {details.map((d, di) => (
                              <div key={di} className="bm-node-detail-item">
                                <span style={{ color: node.color }}>—</span>
                                <span>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Desktop detail panel (below all nodes) */}
          <AnimatePresence>
            {activeNode && (() => {
              const node = NODES.find(n => n.id === activeNode)!;
              const details = NODE_DETAILS[activeNode]?.[locale] || NODE_DETAILS[activeNode]?.en || [];
              const label = (node[locale as keyof typeof node] as { title: string; sub: string }) || node.en;
              return (
                <motion.div
                  key={activeNode}
                  className="bm-detail-desktop"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="bm-detail-desktop-inner"
                    style={{ borderLeft: `3px solid ${node.color}`, background: node.accent }}
                  >
                    <div className="bm-detail-desktop-label" style={{ color: node.color }}>
                      {node.num} — {label.title}
                    </div>
                    <div className="bm-detail-desktop-grid">
                      {details.map((d, di) => (
                        <div key={di} className="bm-detail-desktop-item">
                          <span style={{ color: node.color }}>—</span>
                          <span>{d}</span>
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
          className="bm-benefits-section"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bm-section-label bm-benefits-label">{c.benefits_label}</div>

          <div className="bm-benefits-grid">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                className="bm-benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4, borderColor: "#3A3A3A" }}
              >
                <div className="bm-benefit-stat">{item.stat}</div>
                <div className="bm-benefit-stat-label">{item.statLabel}</div>
                <div className="bm-benefit-divider" />
                <div className="bm-benefit-title">{item.title}</div>
                <p className="bm-benefit-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="bm-cta-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="#contact"
            className="bm-cta-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={e => { e.currentTarget.style.background = "#8B6914"; e.currentTarget.style.color = "#111"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#D4C49A"; }}
          >
            {c.cta}
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        /* ── Section ── */
        .bm-section {
          padding: 120px 0;
          background: #0A0A0A;
          border-top: 1px solid #1A1A1A;
        }
        .bm-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Eyebrow ── */
        .bm-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8B6914;
          margin-bottom: 48px;
        }

        /* ── Headline ── */
        .bm-headline-block { margin-bottom: 20px; }
        .bm-headline {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 700;
          line-height: 1.05;
          color: #FAFAF8;
          margin: 0;
        }
        .bm-headline--em {
          color: #D4C49A;
          font-style: italic;
          margin-top: 4px;
        }

        /* ── Sub text ── */
        .bm-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          line-height: 1.9;
          color: #888;
          max-width: 640px;
          margin: 0 0 72px;
        }

        /* ── Flow section ── */
        .bm-flow-section { margin-bottom: 80px; }
        .bm-flow-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bm-section-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #444;
        }
        .bm-flow-hint {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: #333;
          font-style: italic;
        }

        /* ── Nodes row (desktop: flex row) ── */
        .bm-nodes-row {
          display: flex;
          align-items: stretch;
          gap: 0;
        }
        .bm-node-wrapper {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .bm-node-card {
          flex: 1;
          padding: 32px 20px;
          border: 1px solid #1E1E1E;
          cursor: pointer;
          text-align: left;
          transition: all 0.25s;
          position: relative;
          min-height: 44px;
        }
        .bm-node-num {
          font-family: 'DM Mono', monospace;
          font-size: 28px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 16px;
          transition: color 0.25s;
        }
        .bm-node-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 600;
          color: #FAFAF8;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .bm-node-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #666;
          line-height: 1.6;
        }
        .bm-node-bar {
          margin-top: 16px;
          height: 2px;
          transition: width 0.3s ease;
        }
        .bm-node-expand-icon {
          display: none; /* hidden on desktop */
          position: absolute;
          top: 20px;
          right: 20px;
          font-family: 'DM Mono', monospace;
          font-size: 20px;
          line-height: 1;
        }
        .bm-node-arrow {
          padding: 0 6px;
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          color: #2A2A2A;
          flex-shrink: 0;
          user-select: none;
        }

        /* Mobile inline detail — hidden on desktop */
        .bm-node-detail-mobile { display: none; }

        /* Desktop detail panel */
        .bm-detail-desktop { display: block; }
        .bm-detail-desktop-inner {
          margin-top: 2px;
          padding: 28px 32px;
          border-right: 1px solid #1E1E1E;
          border-bottom: 1px solid #1E1E1E;
        }
        .bm-detail-desktop-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .bm-detail-desktop-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px 32px;
        }
        .bm-detail-desktop-item {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
        }
        .bm-detail-desktop-item span:first-child { flex-shrink: 0; margin-top: 2px; }

        /* ── Benefits ── */
        .bm-benefits-section { }
        .bm-benefits-label { margin-bottom: 28px; }
        .bm-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        .bm-benefit-card {
          padding: 32px 28px;
          background: #111;
          border: 1px solid #1A1A1A;
          transition: all 0.25s;
        }
        .bm-benefit-stat {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(32px, 3.5vw, 48px);
          font-weight: 700;
          color: #D4C49A;
          line-height: 1;
          margin-bottom: 4px;
        }
        .bm-benefit-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 20px;
        }
        .bm-benefit-divider {
          width: 24px;
          height: 1px;
          background: #2A2A2A;
          margin-bottom: 20px;
        }
        .bm-benefit-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          color: #FAFAF8;
          margin-bottom: 12px;
        }
        .bm-benefit-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          line-height: 1.8;
          color: #666;
          margin: 0;
        }

        /* ── CTA ── */
        .bm-cta-wrap {
          margin-top: 56px;
          text-align: center;
        }
        .bm-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: transparent;
          border: 1px solid #8B6914;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #D4C49A;
          text-decoration: none;
          transition: all 0.2s;
          min-height: 52px;
        }

        /* ════════════════════════════════════
           TABLET
           ════════════════════════════════════ */
        @media (max-width: 900px) {
          .bm-benefits-grid { grid-template-columns: 1fr 1fr !important; }
        }

        /* ════════════════════════════════════
           MOBILE — Apple-style
           ════════════════════════════════════ */
        @media (max-width: 767px) {
          .bm-section { padding: 72px 0; }
          .bm-container { padding: 0 20px; }
          .bm-eyebrow { margin-bottom: 28px; font-size: 9px; }

          /* Headline */
          .bm-headline {
            font-size: clamp(28px, 8vw, 40px);
            letter-spacing: -0.025em;
          }
          .bm-sub {
            font-size: 15px;
            margin-bottom: 48px;
            color: #999;
          }

          /* Flow section */
          .bm-flow-section { margin-bottom: 56px; }
          .bm-flow-header { margin-bottom: 16px; }

          /* Nodes: vertical stack on mobile */
          .bm-nodes-row {
            flex-direction: column;
            gap: 2px;
          }
          .bm-node-wrapper {
            flex-direction: column;
            align-items: stretch;
          }
          .bm-node-card {
            padding: 20px 20px 20px 20px;
            display: flex;
            flex-direction: column;
          }
          .bm-node-num {
            font-size: 22px;
            margin-bottom: 10px;
          }
          .bm-node-title {
            font-size: 18px;
            margin-bottom: 6px;
          }
          .bm-node-sub {
            font-size: 13px;
            color: #777;
          }
          .bm-node-bar { margin-top: 12px; }

          /* Show expand icon on mobile */
          .bm-node-expand-icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Hide desktop arrow on mobile */
          .bm-node-arrow { display: none; }

          /* Show mobile detail panel */
          .bm-node-detail-mobile {
            display: block;
            background: #111;
            border-bottom: 1px solid #1E1E1E;
          }
          .bm-node-detail-inner {
            padding: 20px 20px 24px;
          }
          .bm-node-detail-label {
            font-family: 'DM Mono', monospace;
            font-size: 9px;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 14px;
          }
          .bm-node-detail-grid {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .bm-node-detail-item {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            font-family: 'DM Sans', sans-serif;
            font-size: 14px;
            color: rgba(255,255,255,0.65);
            line-height: 1.7;
          }
          .bm-node-detail-item span:first-child { flex-shrink: 0; margin-top: 2px; }

          /* Hide desktop detail panel on mobile */
          .bm-detail-desktop { display: none; }

          /* Benefits grid: 2 columns on mobile */
          .bm-benefits-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2px;
          }
          .bm-benefit-card {
            padding: 20px 16px;
          }
          .bm-benefit-stat {
            font-size: 28px;
          }
          .bm-benefit-stat-label {
            font-size: 8px;
            margin-bottom: 14px;
          }
          .bm-benefit-divider { margin-bottom: 14px; }
          .bm-benefit-title {
            font-size: 16px;
            margin-bottom: 8px;
          }
          .bm-benefit-desc {
            font-size: 12px;
            line-height: 1.7;
            color: #777;
          }

          /* CTA */
          .bm-cta-wrap { margin-top: 40px; }
          .bm-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 16px 20px;
            font-size: 10px;
          }
        }

        @media (max-width: 400px) {
          .bm-benefits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
