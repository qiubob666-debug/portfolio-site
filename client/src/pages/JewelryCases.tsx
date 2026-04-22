/* JewelryCases.tsx — Jewelry & Watch Independent Sites Case Studies
   6 premium case studies showcasing design system extraction & cross-fusion
   Cases: LUMIÈRE, ÉLAN, AETHER, MAISON, FJORD, TERRA */

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import { useState } from "react";

const CASES = [
  {
    id: 1,
    name: "LUMIÈRE",
    nameZh: "光彩",
    style: "Mejuri Minimalism × Missoma Editorial",
    styleZh: "Mejuri 极简奶油风 × Missoma 编辑感",
    color: "#F7F4EF",
    accent: "#D4A574",
    desc: "Warm cream aesthetic with editorial jewelry layering culture. Focuses on everyday luxury and self-expression.",
    descZh: "温暖的奶油色美学融合编辑感的珠宝叠戴文化。强调日常奢华与自我表达。",
    features: ["Mega Menu Navigation", "Product Layering Guide", "Editorial Content", "Instagram Social Wall"],
    featuresZh: ["Mega菜单导航", "产品叠戴指南", "编辑内容", "Instagram社交墙"],
    link: "/jewelry-cases/case1.html",
  },
  {
    id: 2,
    name: "ÉLAN",
    nameZh: "优雅",
    style: "Daniel Wellington Minimalism × Nordgreen Nordic",
    styleZh: "DW 极简黑白 × Nordgreen 北欧风",
    color: "#FFFFFF",
    accent: "#000000",
    desc: "Scandinavian minimalism with black & white elegance. Emphasizes timeless design and global accessibility.",
    descZh: "北欧极简主义的黑白优雅。强调永恒设计与全球可达性。",
    features: ["Responsive Mega Menu", "Color Theme Toggle", "Product Grid", "Mobile-First Design"],
    featuresZh: ["响应式Mega菜单", "颜色主题切换", "产品网格", "移动优先设计"],
    link: "/jewelry-cases/case2.html",
  },
  {
    id: 3,
    name: "AETHER",
    nameZh: "以太",
    style: "VRAI Tech Diamond × Mejuri Typography",
    styleZh: "VRAI 深色科技钻石风 × Mejuri 排版",
    color: "#1A1A1A",
    accent: "#E8D5B7",
    desc: "Deep tech aesthetic with geometric diamond visuals. Showcases 3D customization and lab-grown diamond storytelling.",
    descZh: "深色科技美学融合几何钻石视觉。展示3D定制与培育钻石故事。",
    features: ["SVG Geometric Graphics", "Irregular Grid Layout", "Craftsmanship Process", "Tech Narrative"],
    featuresZh: ["SVG几何图形", "不规则网格布局", "工艺流程展示", "科技叙事"],
    link: "/jewelry-cases/case3.html",
  },
  {
    id: 4,
    name: "MAISON",
    nameZh: "梅松",
    style: "Missoma Editorial × Nordgreen Minimalism",
    styleZh: "Missoma 时尚编辑风 × Nordgreen 极简",
    color: "#F5E6D3",
    accent: "#8B6914",
    desc: "Fashion editorial aesthetic with layering culture. Combines warm earth tones with Nordic minimalism.",
    descZh: "时尚编辑美学融合叠戴文化。结合温暖的大地色系与北欧极简。",
    features: ["Stacking Guide Tabs", "Hover Animations", "Editorial Photography", "Warm Color Palette"],
    featuresZh: ["叠戴指南Tab", "悬停动效", "编辑摄影", "温暖色系"],
    link: "/jewelry-cases/case4.html",
  },
  {
    id: 5,
    name: "FJORD",
    nameZh: "峡湾",
    style: "Nordgreen Nordic × Solios Sustainability",
    styleZh: "Nordgreen 北欧极简 × Solios 可持续",
    color: "#F0F0F0",
    accent: "#3D6B4F",
    desc: "Nordic minimalism with sustainability focus. Features giving-back program and environmental impact metrics.",
    descZh: "北欧极简主义融合可持续发展理念。展示回馈计划与环保指标。",
    features: ["Cause Selection", "Gender Navigation", "Sustainability Data", "Giving Back Program"],
    featuresZh: ["慈善选择", "性别导航", "可持续数据", "回馈计划"],
    link: "/jewelry-cases/case5.html",
  },
  {
    id: 6,
    name: "TERRA",
    nameZh: "大地",
    style: "Solios Sustainability × DW Global Fashion",
    styleZh: "Solios 大地可持续风 × DW 全球化时尚",
    color: "#F7F4EF",
    accent: "#8B6914",
    desc: "Earth-tone sustainability narrative with B Corp certification. Emphasizes solar technology and circular design.",
    descZh: "大地色系的可持续发展叙事融合B Corp认证。强调太阳能技术与循环设计。",
    features: ["Diagonal Hero Layout", "B Corp Certification", "Solar Technology Steps", "Material Sourcing"],
    featuresZh: ["斜切Hero布局", "B Corp认证", "太阳能技术步骤", "材料溯源"],
    link: "/jewelry-cases/case6.html",
  },
];

export default function JewelryCases() {
  const { locale } = useI18n();
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);

  const isZh = locale === "zh";

  return (
    <div className="jewelry-cases-page">
      {/* Hero Section */}
      <section className="jc-hero">
        <motion.div
          className="jc-hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="jc-eyebrow">
            {isZh ? "设计案例库" : "Case Studies"}
          </div>
          <h1 className="jc-hero-title">
            {isZh
              ? "6个高端珠宝独立站设计"
              : "6 Premium Jewelry & Watch Independent Sites"}
          </h1>
          <p className="jc-hero-subtitle">
            {isZh
              ? "基于Mejuri、Daniel Wellington、VRAI、Missoma、Nordgreen、Solios等顶级品牌的真实源码，深度提取设计系统，交叉融合打造的高端独立站首页。"
              : "Extracted design systems from premium brands like Mejuri, Daniel Wellington, VRAI, Missoma, Nordgreen, and Solios. Cross-fused into 6 high-end independent site homepages."}
          </p>
        </motion.div>
      </section>

      {/* Cases Grid */}
      <section className="jc-grid-section">
        <div className="jc-container">
          <div className="jc-grid">
            {CASES.map((caseItem, index) => (
              <motion.div
                key={caseItem.id}
                className="jc-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCase(caseItem.id)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                {/* Card Header */}
                <div
                  className="jc-card-header"
                  style={{
                    background: caseItem.color,
                    borderColor: hoveredCase === caseItem.id ? caseItem.accent : "#E0E0E0",
                  }}
                >
                  <div className="jc-card-num">0{caseItem.id}</div>
                  <div className="jc-card-name">{caseItem.name}</div>
                  <div className="jc-card-name-zh">{caseItem.nameZh}</div>
                </div>

                {/* Card Body */}
                <div className="jc-card-body">
                  <div className="jc-card-style">{isZh ? caseItem.styleZh : caseItem.style}</div>
                  <p className="jc-card-desc">{isZh ? caseItem.descZh : caseItem.desc}</p>

                  {/* Features */}
                  <div className="jc-features">
                    {(isZh ? caseItem.featuresZh : caseItem.features).map((feature, i) => (
                      <span key={i} className="jc-feature-tag" style={{ borderColor: caseItem.accent, color: caseItem.accent }}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a href={caseItem.link} target="_blank" rel="noopener noreferrer" className="jc-cta">
                    <span>{isZh ? "查看案例" : "View Case"}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 12L11 7M11 7H6M11 7V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design System Section */}
      <section className="jc-system-section">
        <div className="jc-container">
          <motion.div
            className="jc-system-header"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="jc-eyebrow">{isZh ? "设计系统" : "Design System"}</div>
            <h2 className="jc-section-title">
              {isZh ? "从源码到设计Token" : "From Source Code to Design Tokens"}
            </h2>
            <p className="jc-system-desc">
              {isZh
                ? "每个案例都严格遵循源品牌的排版比例、间距节奏、色值系统和交互动效。这不是简单的模板，而是对顶级品牌设计系统的深度学习与创意融合。"
                : "Each case strictly adheres to the source brand's typography scale, spacing rhythm, color system, and interaction effects. Not a template—a deep study and creative fusion of premium brand design systems."}
            </p>
          </motion.div>

          <div className="jc-system-grid">
            {[
              { icon: "🎨", title: isZh ? "色彩系统" : "Color System", desc: isZh ? "从源码提取的精确色值与渐变" : "Precise color values & gradients extracted from source" },
              { icon: "✍️", title: isZh ? "排版体系" : "Typography", desc: isZh ? "字阶、行高、字重的完整系统" : "Complete type scale, line height, font weight system" },
              { icon: "📏", title: isZh ? "间距节奏" : "Spacing Rhythm", desc: isZh ? "8px网格系统与黄金比例" : "8px grid system & golden ratio proportions" },
              { icon: "⚡", title: isZh ? "交互动效" : "Interactions", desc: isZh ? "悬停、滚动、过渡的精细控制" : "Fine-tuned hover, scroll, transition effects" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="jc-system-item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="jc-system-icon">{item.icon}</div>
                <h3 className="jc-system-title">{item.title}</h3>
                <p className="jc-system-text">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      <section className="jc-github-section">
        <div className="jc-container">
          <motion.div
            className="jc-github-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="jc-github-icon">📦</div>
            <h3 className="jc-github-title">
              {isZh ? "完整源码与素材库" : "Full Source Code & Asset Library"}
            </h3>
            <p className="jc-github-desc">
              {isZh
                ? "所有案例的HTML源码、CSS设计系统、真实品牌图片资源都已上传到GitHub，可供学习和参考。"
                : "All case HTML source, CSS design systems, and real brand assets are available on GitHub for learning and reference."}
            </p>
            <div className="jc-github-links">
              <a href="https://github.com/qiubob666-debug/jewelry-watch-website-cases" target="_blank" rel="noopener noreferrer" className="jc-github-link">
                <span>📂 {isZh ? "案例库" : "Case Repository"}</span>
              </a>
              <a href="https://github.com/qiubob666-debug/jewelry-watch-design-assets" target="_blank" rel="noopener noreferrer" className="jc-github-link">
                <span>🎨 {isZh ? "素材库" : "Asset Library"}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .jewelry-cases-page {
          background: #FAFAFA;
          overflow-x: hidden;
        }

        /* Hero */
        .jc-hero {
          min-height: 420px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
        }

        .jc-hero-content {
          max-width: 720px;
        }

        .jc-eyebrow {
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 16px;
          font-weight: 600;
        }

        .jc-hero-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }

        .jc-hero-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Grid Section */
        .jc-grid-section {
          padding: 80px 24px;
        }

        .jc-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .jc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }

        .jc-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .jc-card:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
          transform: translateY(-4px);
        }

        .jc-card-header {
          padding: 32px 24px;
          border-bottom: 1px solid #E0E0E0;
          transition: all 0.3s ease;
          position: relative;
        }

        .jc-card-num {
          font-size: 28px;
          font-weight: 700;
          color: rgba(0,0,0,0.1);
          margin-bottom: 8px;
        }

        .jc-card-name {
          font-size: 24px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .jc-card-name-zh {
          font-size: 14px;
          color: rgba(0,0,0,0.4);
          margin-top: 4px;
        }

        .jc-card-body {
          padding: 24px;
        }

        .jc-card-style {
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0,0,0,0.5);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .jc-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(0,0,0,0.6);
          margin-bottom: 16px;
        }

        .jc-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .jc-feature-tag {
          font-size: 11px;
          padding: 4px 10px;
          border: 1px solid;
          border-radius: 4px;
          display: inline-block;
          font-weight: 500;
        }

        .jc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1a1a1a;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .jc-cta:hover {
          gap: 12px;
        }

        /* System Section */
        .jc-system-section {
          padding: 80px 24px;
          background: white;
        }

        .jc-system-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .jc-section-title {
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 600;
          margin: 16px 0;
          letter-spacing: -0.02em;
        }

        .jc-system-desc {
          font-size: 16px;
          color: rgba(0,0,0,0.6);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .jc-system-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 32px;
        }

        .jc-system-item {
          text-align: center;
        }

        .jc-system-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .jc-system-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .jc-system-text {
          font-size: 14px;
          color: rgba(0,0,0,0.6);
          line-height: 1.6;
        }

        /* GitHub Section */
        .jc-github-section {
          padding: 80px 24px;
          background: #F5F5F5;
        }

        .jc-github-card {
          background: white;
          border: 1px solid #E0E0E0;
          border-radius: 12px;
          padding: 48px 32px;
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .jc-github-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .jc-github-title {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .jc-github-desc {
          font-size: 15px;
          color: rgba(0,0,0,0.6);
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .jc-github-links {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .jc-github-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: #1a1a1a;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .jc-github-link:hover {
          background: #000;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .jc-hero {
            min-height: 320px;
            padding: 48px 20px;
          }

          .jc-grid-section,
          .jc-system-section,
          .jc-github-section {
            padding: 48px 20px;
          }

          .jc-grid {
            grid-template-columns: 1fr;
          }

          .jc-system-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .jc-github-card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </div>
  );
}
