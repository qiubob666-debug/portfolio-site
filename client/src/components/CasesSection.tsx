/* CasesSection — Work Evidence
   Structure:
   1. Featured Live Case: Auraloop (full-width hero card)
   2. Concept Design Grid: 6 jewelry/watch cases (3×2)
   3. Industry Demo Row: Harrow Steelworks factory demo
   Labels: Live · Concept · Demo — legally safe, no real brand logos */
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

/* ─── Copy ─────────────────────────────────────────────────────────── */
const COPY = {
  zh: {
    eyebrow: "SELECTED WORK",
    title: "我做过什么",
    subtitle: "每个案例都可以点进去看，不是截图——是真实跑着的站点或可交互 Demo。",
    featuredLabel: "LIVE · 实战运营中",
    featuredName: "Auraloop",
    featuredTagline: "我自己的品牌矩阵实战",
    featuredDesc: "从零搭建的 Headless 品牌矩阵系统：Google + Supabase 社区认证、Headless WooCommerce 零成本平替 Shopify、Vercel 多前缀域名品牌矩阵、n8n + Sanity 内容生产工作流、高审美前端 + Cloudflare CDN 方案。这是我给客户做的所有事情，我自己先做了一遍。",
    featuredStack: ["Next.js", "Sanity CMS", "Supabase Auth", "WooCommerce Headless", "n8n", "Vercel", "Cloudflare"],
    featuredCta: "访问 Live 站点 →",
    featuredUrl: "https://auraloop.bobqiushao.online",
    conceptTitle: "概念设计案例",
    conceptSubtitle: "基于全球顶级 DTC 品牌设计语言，交叉融合创作，品牌名已脱敏。",
    cases: [
      {
        id: "case1",
        label: "Concept · 珠宝",
        name: "LUMIÈRE",
        style: "极简奶油暖白",
        inspired: "Mejuri × Missoma",
        bg: "#FAFAF8",
        accent: "#b08d57",
        textColor: "#111111",
        url: "/jewelry-cases/case1.html",
      },
      {
        id: "case2",
        label: "Concept · 手表",
        name: "ÉLAN",
        style: "北欧极简黑白",
        inspired: "Daniel Wellington × Nordgreen",
        bg: "#111111",
        accent: "#ffffff",
        textColor: "#ffffff",
        url: "/jewelry-cases/case2.html",
      },
      {
        id: "case3",
        label: "Concept · 珠宝",
        name: "AETHER",
        style: "深色科技钻石",
        inspired: "VRAI × Mejuri",
        bg: "#0a0a0a",
        accent: "#c9a96e",
        textColor: "#ffffff",
        url: "/jewelry-cases/case3.html",
      },
      {
        id: "case4",
        label: "Concept · 珠宝",
        name: "MAISON",
        style: "时尚编辑叠戴",
        inspired: "Missoma × Nordgreen",
        bg: "#F5F0E8",
        accent: "#c07830",
        textColor: "#111111",
        url: "/jewelry-cases/case4.html",
      },
      {
        id: "case5",
        label: "Concept · 手表",
        name: "FJORD",
        style: "北欧可持续极简",
        inspired: "Nordgreen × Solios",
        bg: "#F4F7F4",
        accent: "#5a7d5e",
        textColor: "#111111",
        url: "/jewelry-cases/case5.html",
      },
      {
        id: "case6",
        label: "Concept · 手表",
        name: "TERRA",
        style: "大地可持续科技",
        inspired: "Solios × Daniel Wellington",
        bg: "#F7F4EF",
        accent: "#8b6914",
        textColor: "#111111",
        url: "/jewelry-cases/case6.html",
      },
    ],
    demoTitle: "行业 Demo",
    demoSubtitle: "为特定行业场景构建的演示站，展示定制化能力。",
    demos: [
      {
        id: "harrow",
        label: "Demo · 工厂询盘站",
        name: "Harrow Steelworks",
        style: "工业风 B2B 询盘站",
        desc: "英国钢铁制造商品牌展示站，多语言询盘表单 + 产品目录 + 工厂实力展示。",
        bg: "#1C2128",
        accent: "#E8A838",
        textColor: "#ffffff",
        url: "https://github.com/qiubob666-debug",
      },
    ],
    visitLabel: "查看案例 →",
    conceptNote: "* 以上概念设计案例均为学习创作，品牌名为虚构，设计灵感来源已标注，不代表真实商业合作。",
  },
  en: {
    eyebrow: "SELECTED WORK",
    title: "What I've Built",
    subtitle: "Every case is clickable — not screenshots, but real running sites or interactive demos.",
    featuredLabel: "LIVE · In Production",
    featuredName: "Auraloop",
    featuredTagline: "My own brand matrix in production",
    featuredDesc: "A Headless brand matrix system built from scratch: Google + Supabase community auth, Headless WooCommerce as a zero-cost Shopify alternative, Vercel multi-prefix domain brand matrix, n8n + Sanity content production workflow, high-aesthetic frontend + Cloudflare CDN. Everything I do for clients, I did for myself first.",
    featuredStack: ["Next.js", "Sanity CMS", "Supabase Auth", "WooCommerce Headless", "n8n", "Vercel", "Cloudflare"],
    featuredCta: "Visit Live Site →",
    featuredUrl: "https://auraloop.bobqiushao.online",
    conceptTitle: "Concept Design Cases",
    conceptSubtitle: "Cross-fusion designs inspired by global top DTC brands. Brand names are fictional.",
    cases: [
      {
        id: "case1",
        label: "Concept · Jewelry",
        name: "LUMIÈRE",
        style: "Minimal Cream Warm White",
        inspired: "Mejuri × Missoma",
        bg: "#FAFAF8",
        accent: "#b08d57",
        textColor: "#111111",
        url: "/jewelry-cases/case1.html",
      },
      {
        id: "case2",
        label: "Concept · Watch",
        name: "ÉLAN",
        style: "Nordic Minimal Black & White",
        inspired: "Daniel Wellington × Nordgreen",
        bg: "#111111",
        accent: "#ffffff",
        textColor: "#ffffff",
        url: "/jewelry-cases/case2.html",
      },
      {
        id: "case3",
        label: "Concept · Jewelry",
        name: "AETHER",
        style: "Dark Tech Diamond",
        inspired: "VRAI × Mejuri",
        bg: "#0a0a0a",
        accent: "#c9a96e",
        textColor: "#ffffff",
        url: "/jewelry-cases/case3.html",
      },
      {
        id: "case4",
        label: "Concept · Jewelry",
        name: "MAISON",
        style: "Fashion Editorial Layering",
        inspired: "Missoma × Nordgreen",
        bg: "#F5F0E8",
        accent: "#c07830",
        textColor: "#111111",
        url: "/jewelry-cases/case4.html",
      },
      {
        id: "case5",
        label: "Concept · Watch",
        name: "FJORD",
        style: "Nordic Sustainable Minimal",
        inspired: "Nordgreen × Solios",
        bg: "#F4F7F4",
        accent: "#5a7d5e",
        textColor: "#111111",
        url: "/jewelry-cases/case5.html",
      },
      {
        id: "case6",
        label: "Concept · Watch",
        name: "TERRA",
        style: "Earth Sustainable Tech",
        inspired: "Solios × Daniel Wellington",
        bg: "#F7F4EF",
        accent: "#8b6914",
        textColor: "#111111",
        url: "/jewelry-cases/case6.html",
      },
    ],
    demoTitle: "Industry Demos",
    demoSubtitle: "Demo sites built for specific industry scenarios, showcasing custom capabilities.",
    demos: [
      {
        id: "harrow",
        label: "Demo · Factory Inquiry Site",
        name: "Harrow Steelworks",
        style: "Industrial B2B Inquiry Site",
        desc: "UK steel manufacturer brand showcase — multilingual inquiry forms + product catalog + factory capability display.",
        bg: "#1C2128",
        accent: "#E8A838",
        textColor: "#ffffff",
        url: "https://github.com/qiubob666-debug",
      },
    ],
    visitLabel: "View Case →",
    conceptNote: "* Concept design cases above are for learning purposes. Brand names are fictional. Design inspiration sources are noted. Not real commercial partnerships.",
  },
  ja: {
    eyebrow: "SELECTED WORK",
    title: "制作実績",
    subtitle: "すべてのケースはクリックできます——スクリーンショットではなく、実際に動いているサイトまたはインタラクティブなデモです。",
    featuredLabel: "LIVE · 本番稼働中",
    featuredName: "Auraloop",
    featuredTagline: "自分のブランドマトリックスを実戦で構築",
    featuredDesc: "ゼロから構築したHeadlessブランドマトリックスシステム：Google + Supabaseコミュニティ認証、Headless WooCommerceによるShopify代替、Vercelマルチプレフィックスドメインブランドマトリックス、n8n + Sanityコンテンツ制作ワークフロー、高審美フロントエンド + Cloudflare CDN。クライアントに提供するすべてを、まず自分で実践しました。",
    featuredStack: ["Next.js", "Sanity CMS", "Supabase Auth", "WooCommerce Headless", "n8n", "Vercel", "Cloudflare"],
    featuredCta: "ライブサイトを見る →",
    featuredUrl: "https://auraloop.bobqiushao.online",
    conceptTitle: "コンセプトデザインケース",
    conceptSubtitle: "グローバルトップDTCブランドのデザイン言語を参考にした創作。ブランド名は架空です。",
    cases: [
      {
        id: "case1",
        label: "Concept · ジュエリー",
        name: "LUMIÈRE",
        style: "ミニマルクリームウォームホワイト",
        inspired: "Mejuri × Missoma",
        bg: "#FAFAF8",
        accent: "#b08d57",
        textColor: "#111111",
        url: "/jewelry-cases/case1.html",
      },
      {
        id: "case2",
        label: "Concept · 時計",
        name: "ÉLAN",
        style: "北欧ミニマル白黒",
        inspired: "Daniel Wellington × Nordgreen",
        bg: "#111111",
        accent: "#ffffff",
        textColor: "#ffffff",
        url: "/jewelry-cases/case2.html",
      },
      {
        id: "case3",
        label: "Concept · ジュエリー",
        name: "AETHER",
        style: "ダークテックダイヤモンド",
        inspired: "VRAI × Mejuri",
        bg: "#0a0a0a",
        accent: "#c9a96e",
        textColor: "#ffffff",
        url: "/jewelry-cases/case3.html",
      },
      {
        id: "case4",
        label: "Concept · ジュエリー",
        name: "MAISON",
        style: "ファッション編集レイヤリング",
        inspired: "Missoma × Nordgreen",
        bg: "#F5F0E8",
        accent: "#c07830",
        textColor: "#111111",
        url: "/jewelry-cases/case4.html",
      },
      {
        id: "case5",
        label: "Concept · 時計",
        name: "FJORD",
        style: "北欧サステナブルミニマル",
        inspired: "Nordgreen × Solios",
        bg: "#F4F7F4",
        accent: "#5a7d5e",
        textColor: "#111111",
        url: "/jewelry-cases/case5.html",
      },
      {
        id: "case6",
        label: "Concept · 時計",
        name: "TERRA",
        style: "アースサステナブルテック",
        inspired: "Solios × Daniel Wellington",
        bg: "#F7F4EF",
        accent: "#8b6914",
        textColor: "#111111",
        url: "/jewelry-cases/case6.html",
      },
    ],
    demoTitle: "業界デモ",
    demoSubtitle: "特定業界シナリオ向けに構築されたデモサイト。カスタム能力を展示。",
    demos: [
      {
        id: "harrow",
        label: "Demo · 工場問い合わせサイト",
        name: "Harrow Steelworks",
        style: "インダストリアルB2B問い合わせサイト",
        desc: "英国鉄鋼メーカーのブランドショーケース——多言語問い合わせフォーム＋製品カタログ＋工場能力展示。",
        bg: "#1C2128",
        accent: "#E8A838",
        textColor: "#ffffff",
        url: "https://github.com/qiubob666-debug",
      },
    ],
    visitLabel: "ケースを見る →",
    conceptNote: "* 上記のコンセプトデザインケースは学習目的です。ブランド名は架空です。デザインのインスピレーション源は記載されています。実際の商業提携ではありません。",
  },
};

/* ─── Component ─────────────────────────────────────────────────────── */
export default function CasesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];

  return (
    <section id="cases" className="cases-section">
      <div className="cases-container">
        {/* ── Header ── */}
        <motion.div
          className="cases-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cases-eyebrow">{c.eyebrow}</div>
          <h2 className="cases-title">{c.title}</h2>
          <p className="cases-subtitle">{c.subtitle}</p>
        </motion.div>

        {/* ── Featured Live Case: Auraloop ── */}
        <motion.a
          href={c.featuredUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cases-featured"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.005 }}
        >
          {/* Background gradient */}
          <div className="cases-featured-bg" />
          <div className="cases-featured-content">
            <div className="cases-featured-left">
              <div className="cases-featured-label">
                <span className="cases-live-dot" />
                {c.featuredLabel}
              </div>
              <div className="cases-featured-name">{c.featuredName}</div>
              <div className="cases-featured-tagline">{c.featuredTagline}</div>
              <p className="cases-featured-desc">{c.featuredDesc}</p>
              <div className="cases-featured-stack">
                {c.featuredStack.map((t) => (
                  <span key={t} className="cases-stack-tag">{t}</span>
                ))}
              </div>
            </div>
            <div className="cases-featured-right">
              <div className="cases-featured-visual">
                <div className="cases-featured-visual-inner">
                  <div className="cases-featured-visual-logo">AL</div>
                  <div className="cases-featured-visual-url">auraloop.bobqiushao.online</div>
                </div>
              </div>
              <div className="cases-featured-cta">{c.featuredCta}</div>
            </div>
          </div>
        </motion.a>

        {/* ── Concept Design Grid ── */}
        <div className="cases-section-header">
          <h3 className="cases-section-title">{c.conceptTitle}</h3>
          <p className="cases-section-sub">{c.conceptSubtitle}</p>
        </div>
        <div className="cases-grid">
          {c.cases.map((cs, i) => (
            <motion.a
              key={cs.id}
              href={cs.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cases-card"
              style={{ background: cs.bg, color: cs.textColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <div className="cases-card-label" style={{ color: cs.accent, borderColor: cs.accent + "40" }}>
                {cs.label}
              </div>
              <div className="cases-card-name" style={{ color: cs.textColor }}>
                {cs.name}
              </div>
              <div className="cases-card-style" style={{ color: cs.textColor + "99" }}>
                {cs.style}
              </div>
              <div className="cases-card-inspired" style={{ color: cs.textColor + "55" }}>
                Inspired by {cs.inspired}
              </div>
              <div className="cases-card-arrow" style={{ color: cs.accent }}>
                {c.visitLabel}
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Industry Demo ── */}
        <div className="cases-section-header">
          <h3 className="cases-section-title">{c.demoTitle}</h3>
          <p className="cases-section-sub">{c.demoSubtitle}</p>
        </div>
        <div className="cases-demos">
          {c.demos.map((d, i) => (
            <motion.a
              key={d.id}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cases-demo-card"
              style={{ background: d.bg, color: d.textColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="cases-demo-label" style={{ color: d.accent }}>
                {d.label}
              </div>
              <div className="cases-demo-name">{d.name}</div>
              <div className="cases-demo-style" style={{ color: d.textColor + "99" }}>{d.style}</div>
              <p className="cases-demo-desc" style={{ color: d.textColor + "80" }}>{d.desc}</p>
              <div className="cases-demo-cta" style={{ color: d.accent }}>{c.visitLabel}</div>
            </motion.a>
          ))}
        </div>

        {/* ── Legal Note ── */}
        <p className="cases-note">{c.conceptNote}</p>
      </div>

      <style>{`
        /* ── Section ── */
        .cases-section {
          background: #111111;
          padding: 120px 0;
        }
        .cases-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Header ── */
        .cases-header { margin-bottom: 64px; }
        .cases-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8B6914;
          margin-bottom: 20px;
        }
        .cases-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 600;
          color: #FAFAF8;
          margin: 0 0 12px;
          line-height: 1.1;
        }
        .cases-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: rgba(255,255,255,0.45);
          max-width: 560px;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Featured Card ── */
        .cases-featured {
          display: block;
          position: relative;
          border: 1px solid rgba(212,196,154,0.2);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 80px;
          text-decoration: none;
          transition: border-color 0.3s;
        }
        .cases-featured:hover { border-color: rgba(212,196,154,0.5); }
        .cases-featured-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(139,105,20,0.15) 0%, rgba(17,17,17,0) 60%);
          pointer-events: none;
        }
        .cases-featured-content {
          position: relative;
          display: flex;
          gap: 60px;
          padding: 56px 56px;
          align-items: flex-start;
        }
        .cases-featured-left { flex: 1; }
        .cases-featured-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: #D4C49A;
          margin-bottom: 16px;
        }
        .cases-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2ECC71;
          animation: pulse-dot 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .cases-featured-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 600;
          color: #FAFAF8;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          line-height: 1;
        }
        .cases-featured-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 20px;
        }
        .cases-featured-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          line-height: 1.8;
          max-width: 520px;
          margin: 0 0 24px;
        }
        .cases-featured-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cases-stack-tag {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 4px 10px;
          border-radius: 2px;
        }
        .cases-featured-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 24px;
          flex-shrink: 0;
        }
        .cases-featured-visual {
          width: 240px;
          height: 160px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cases-featured-visual-inner {
          text-align: center;
        }
        .cases-featured-visual-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 40px;
          font-weight: 600;
          color: #D4C49A;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }
        .cases-featured-visual-url {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
        }
        .cases-featured-cta {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #D4C49A;
          transition: opacity 0.2s;
        }
        .cases-featured:hover .cases-featured-cta { opacity: 0.7; }

        /* ── Section Sub-headers ── */
        .cases-section-header {
          margin-bottom: 32px;
        }
        .cases-section-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          margin: 0 0 6px;
        }
        .cases-section-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          margin: 0;
        }

        /* ── Concept Grid ── */
        .cases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          margin-bottom: 64px;
        }
        .cases-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 32px 28px;
          text-decoration: none;
          transition: transform 0.25s;
          cursor: pointer;
          min-height: 200px;
        }
        .cases-card-label {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: 1px solid;
          display: inline-block;
          padding: 3px 8px;
          border-radius: 2px;
          align-self: flex-start;
          margin-bottom: 4px;
        }
        .cases-card-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 600;
          letter-spacing: 0.05em;
          line-height: 1;
        }
        .cases-card-style {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          line-height: 1.5;
        }
        .cases-card-inspired {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.06em;
          margin-top: auto;
        }
        .cases-card-arrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          margin-top: 8px;
          transition: opacity 0.2s;
        }
        .cases-card:hover .cases-card-arrow { opacity: 0.6; }

        /* ── Demo Cards ── */
        .cases-demos {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2px;
          margin-bottom: 40px;
        }
        .cases-demo-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 36px 32px;
          text-decoration: none;
          transition: transform 0.25s;
          cursor: pointer;
          min-height: 200px;
        }
        .cases-demo-label {
          font-family: 'DM Mono', monospace;
          font-size: 8px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .cases-demo-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 600;
          line-height: 1;
        }
        .cases-demo-style {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
        }
        .cases-demo-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          line-height: 1.7;
          margin: 4px 0 0;
          max-width: 400px;
        }
        .cases-demo-cta {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          margin-top: auto;
          transition: opacity 0.2s;
        }
        .cases-demo-card:hover .cases-demo-cta { opacity: 0.6; }

        /* ── Legal Note ── */
        .cases-note {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.04em;
          line-height: 1.7;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .cases-featured-content { flex-direction: column; gap: 32px; }
          .cases-featured-right { align-items: flex-start; }
          .cases-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 767px) {
          .cases-container { padding: 0 20px; }
          .cases-section { padding: 80px 0; }
          .cases-featured-content { padding: 32px 24px; }
          .cases-featured-visual { width: 100%; }
          .cases-grid { grid-template-columns: 1fr; }
          .cases-demos { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
