/* CasesSection — 案例展示区
   Structure:
   1. Concept Design Grid: 6 jewelry/watch cases (3×2) — click → right-side drawer iframe preview
   2. Industry Demo Row: Harrow Steelworks factory demo
   Labels: Live · Concept · Demo — legally safe, no real brand logos */
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

/* ─── Copy ─────────────────────────────────────────────────────────── */
const COPY = {
  zh: {
    eyebrow: "SELECTED WORK",
    title: "我做过什么",
    subtitle: "每个案例都可以点进去看，不是截图——是真实跑着的站点或可交互 Demo。",

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
    threeCTitle: "3C 数码品类案例",
    threeCSubtitle: "基于全球顶级 3C 品牌设计语言，原创虚构品牌，品牌名已脱敏，纯学习展示用途。",
    threeCCases: [
      {
        id: "3c-case1",
        label: "Concept · 智能手机",
        name: "LUMINOS",
        style: "极简白色系 / Apple 风格",
        inspired: "Apple",
        bg: "#FFFFFF",
        accent: "#0071E3",
        textColor: "#1D1D1F",
        url: "/3c-react/index.html#/luminos",
      },
      {
        id: "3c-case2",
        label: "Concept · 无人机",
        name: "SKYVEX",
        style: "暗色科技感 / DJI 风格",
        inspired: "DJI",
        bg: "#0A0A0A",
        accent: "#FF6B00",
        textColor: "#FFFFFF",
        url: "/3c-react/index.html#/skyvex",
      },
      {
        id: "3c-case3",
        label: "Concept · 全画幅相机",
        name: "NEXARA",
        style: "日系精致多品类 / Sony 风格",
        inspired: "Sony",
        bg: "#F5F5F5",
        accent: "#E50914",
        textColor: "#1A1A1A",
        url: "/3c-react/index.html#/nexara",
      },
      {
        id: "3c-case4",
        label: "Concept · 降噪耳机",
        name: "RESONIQ",
        style: "深色金属质感 / Bose 风格",
        inspired: "Bose",
        bg: "#111111",
        accent: "#C9A84C",
        textColor: "#F5F5F5",
        url: "/3c-react/index.html#/resoniq",
      },
      {
        id: "3c-case5",
        label: "Concept · 运动相机",
        name: "ORBIVIEW",
        style: "沉浸式视频驱动 / Insta360 风格",
        inspired: "Insta360",
        bg: "#050A14",
        accent: "#00D4FF",
        textColor: "#FFFFFF",
        url: "/3c-react/index.html#/orbiview",
      },
      {
        id: "3c-case6",
        label: "Concept · 便携合成器",
        name: "FORMWERK",
        style: "极简工业风 / Teenage Engineering 风格",
        inspired: "Teenage Engineering",
        bg: "#FFFFFF",
        accent: "#FF4500",
        textColor: "#000000",
        url: "/3c-react/index.html#/formwerk",
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
    openFullLabel: "在新标签页打开 ↗",
    closeLabel: "关闭",
    conceptNote: "* 以上概念设计案例均为学习创作，品牌名为虚构，设计灵感来源已标注，不代表真实商业合作。",
  },
  en: {
    eyebrow: "SELECTED WORK",
    title: "What I've Built",
    subtitle: "Every case is clickable — not screenshots, but real running sites or interactive demos.",

    conceptTitle: "Concept Design Cases",
    conceptSubtitle: "Inspired by top global DTC brands, cross-fused into original concepts. Brand names are fictional.",
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
        style: "Nordic Minimal B&W",
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
    threeCTitle: "3C Consumer Electronics Cases",
    threeCSubtitle: "Original fictional brands inspired by world-class 3C brand design languages. Brand names are fictional, for learning and portfolio display only.",
    threeCCases: [
      {
        id: "3c-case1",
        label: "Concept · Smartphone",
        name: "LUMINOS",
        style: "Minimal White / Apple Style",
        inspired: "Apple",
        bg: "#FFFFFF",
        accent: "#0071E3",
        textColor: "#1D1D1F",
        url: "/3c-react/index.html#/luminos",
      },
      {
        id: "3c-case2",
        label: "Concept · Drone",
        name: "SKYVEX",
        style: "Dark Tech Aesthetic / DJI Style",
        inspired: "DJI",
        bg: "#0A0A0A",
        accent: "#FF6B00",
        textColor: "#FFFFFF",
        url: "/3c-react/index.html#/skyvex",
      },
      {
        id: "3c-case3",
        label: "Concept · Full-Frame Camera",
        name: "NEXARA",
        style: "Japanese Precision Multi-Category / Sony Style",
        inspired: "Sony",
        bg: "#F5F5F5",
        accent: "#E50914",
        textColor: "#1A1A1A",
        url: "/3c-react/index.html#/nexara",
      },
      {
        id: "3c-case4",
        label: "Concept · ANC Headphones",
        name: "RESONIQ",
        style: "Dark Metallic Premium / Bose Style",
        inspired: "Bose",
        bg: "#111111",
        accent: "#C9A84C",
        textColor: "#F5F5F5",
        url: "/3c-react/index.html#/resoniq",
      },
      {
        id: "3c-case5",
        label: "Concept · Action Camera",
        name: "ORBIVIEW",
        style: "Immersive Video-Driven / Insta360 Style",
        inspired: "Insta360",
        bg: "#050A14",
        accent: "#00D4FF",
        textColor: "#FFFFFF",
        url: "/3c-react/index.html#/orbiview",
      },
      {
        id: "3c-case6",
        label: "Concept · Portable Synthesizer",
        name: "FORMWERK",
        style: "Minimal Industrial / Teenage Engineering Style",
        inspired: "Teenage Engineering",
        bg: "#FFFFFF",
        accent: "#FF4500",
        textColor: "#000000",
        url: "/3c-react/index.html#/formwerk",
      },
    ],
    demoTitle: "Industry Demos",
    demoSubtitle: "Demo sites built for specific industry scenarios to showcase customization capability.",
    demos: [
      {
        id: "harrow",
        label: "Demo · Factory Inquiry Site",
        name: "Harrow Steelworks",
        style: "Industrial B2B Inquiry Site",
        desc: "UK steel manufacturer brand site — multilingual inquiry form + product catalog + factory showcase.",
        bg: "#1C2128",
        accent: "#E8A838",
        textColor: "#ffffff",
        url: "https://github.com/qiubob666-debug",
      },
    ],
    visitLabel: "View Case →",
    openFullLabel: "Open in new tab ↗",
    closeLabel: "Close",
    conceptNote: "* All concept design cases above are learning projects. Brand names are fictional. Design inspiration sources are noted. Not real commercial partnerships.",
  },
  ja: {
    eyebrow: "SELECTED WORK",
    title: "制作実績",
    subtitle: "各ケースはクリックして確認できます。スクリーンショットではなく、実際に稼働しているサイトやインタラクティブなデモです。",

    conceptTitle: "コンセプトデザインケース",
    conceptSubtitle: "世界トップのDTCブランドのデザイン言語にインスパイアされ、クロスフュージョンで創作。ブランド名は架空です。",
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
    threeCTitle: "3C デジタル家電ケース",
    threeCSubtitle: "世界トップの3Cブランドのデザイン言語にインスパイアされた架空ブランド。ブランド名は架空です。学習・ポートフォリオ展示のみ。",
    threeCCases: [
      {
        id: "3c-case1",
        label: "Concept · スマートフォン",
        name: "LUMINOS",
        style: "ミニマルホワイト / Apple スタイル",
        inspired: "Apple",
        bg: "#FFFFFF",
        accent: "#0071E3",
        textColor: "#1D1D1F",
        url: "/3c-react/index.html#/luminos",
      },
      {
        id: "3c-case2",
        label: "Concept · ドローン",
        name: "SKYVEX",
        style: "ダークテック / DJI スタイル",
        inspired: "DJI",
        bg: "#0A0A0A",
        accent: "#FF6B00",
        textColor: "#FFFFFF",
        url: "/3c-react/index.html#/skyvex",
      },
      {
        id: "3c-case3",
        label: "Concept · フルサイズカメラ",
        name: "NEXARA",
        style: "日本精密マルチカテゴリー / Sony スタイル",
        inspired: "Sony",
        bg: "#F5F5F5",
        accent: "#E50914",
        textColor: "#1A1A1A",
        url: "/3c-react/index.html#/nexara",
      },
      {
        id: "3c-case4",
        label: "Concept · ノイキャンヘッドフォン",
        name: "RESONIQ",
        style: "ダークメタリック / Bose スタイル",
        inspired: "Bose",
        bg: "#111111",
        accent: "#C9A84C",
        textColor: "#F5F5F5",
        url: "/3c-react/index.html#/resoniq",
      },
      {
        id: "3c-case5",
        label: "Concept · アクションカメラ",
        name: "ORBIVIEW",
        style: "没入型ビデオ / Insta360 スタイル",
        inspired: "Insta360",
        bg: "#050A14",
        accent: "#00D4FF",
        textColor: "#FFFFFF",
        url: "/3c-react/index.html#/orbiview",
      },
      {
        id: "3c-case6",
        label: "Concept · ポータブルシンセサイザー",
        name: "FORMWERK",
        style: "ミニマル工業デザイン / Teenage Engineering スタイル",
        inspired: "Teenage Engineering",
        bg: "#FFFFFF",
        accent: "#FF4500",
        textColor: "#000000",
        url: "/3c-react/index.html#/formwerk",
      },
    ],
    demoTitle: "業界デモ",
    demoSubtitle: "特定の業界シナリオ向けに構築されたデモサイト。カスタマイズ能力を示します。",
    demos: [
      {
        id: "harrow",
        label: "Demo · 工場問い合わせサイト",
        name: "Harrow Steelworks",
        style: "インダストリアル B2B 問い合わせサイト",
        desc: "英国鉄鋼メーカーのブランドサイト。多言語問い合わせフォーム＋製品カタログ＋工場実力展示。",
        bg: "#1C2128",
        accent: "#E8A838",
        textColor: "#ffffff",
        url: "https://github.com/qiubob666-debug",
      },
    ],
    visitLabel: "ケースを見る →",
    openFullLabel: "新しいタブで開く ↗",
    closeLabel: "閉じる",
    conceptNote: "* 上記のコンセプトデザインケースは学習目的です。ブランド名は架空です。デザインのインスピレーション源は記載されています。実際の商業提携ではありません。",
  },
};

/* ─── Case Preview Drawer ───────────────────────────────────────────── */
interface PreviewCase {
  url: string;
  name: string;
  accent: string;
}

function CaseDrawer({
  previewCase,
  onClose,
  openFullLabel,
  closeLabel,
}: {
  previewCase: PreviewCase | null;
  onClose: () => void;
  openFullLabel: string;
  closeLabel: string;
}) {
  return (
    <AnimatePresence>
      {previewCase && (
        <>
          {/* Backdrop */}
          <motion.div
            className="case-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          {/* Drawer panel */}
          <motion.div
            className="case-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 38 }}
          >
            {/* Header bar */}
            <div className="case-drawer-header">
              <span
                className="case-drawer-title"
                style={{ color: previewCase.accent }}
              >
                {previewCase.name}
              </span>
              <div className="case-drawer-actions">
                <a
                  href={previewCase.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-drawer-open-full"
                >
                  {openFullLabel}
                </a>
                <button
                  className="case-drawer-close"
                  onClick={onClose}
                  aria-label={closeLabel}
                >
                  ✕
                </button>
              </div>
            </div>
            {/* iframe */}
            <iframe
              src={previewCase.url}
              className="case-drawer-iframe"
              title={previewCase.name}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */
export default function CasesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const [previewCase, setPreviewCase] = useState<PreviewCase | null>(null);

  const openPreview = useCallback(
    (cs: { url: string; name: string; accent: string }) => {
      setPreviewCase({ url: cs.url, name: cs.name, accent: cs.accent });
    },
    []
  );

  const closePreview = useCallback(() => setPreviewCase(null), []);

  return (
    <>
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

          {/* ── Concept Design Grid ── */}
          <div className="cases-section-header">
            <h3 className="cases-section-title">{c.conceptTitle}</h3>
            <p className="cases-section-sub">{c.conceptSubtitle}</p>
          </div>
          <div className="cases-grid">
            {c.cases.map((cs, i) => (
              <motion.button
                key={cs.id}
                type="button"
                className="cases-card"
                style={{ background: cs.bg, color: cs.textColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => openPreview(cs)}
              >
                <div
                  className="cases-card-label"
                  style={{
                    color: cs.accent,
                    borderColor: cs.accent + "40",
                  }}
                >
                  {cs.label}
                </div>
                <div className="cases-card-name" style={{ color: cs.textColor }}>
                  {cs.name}
                </div>
                <div
                  className="cases-card-style"
                  style={{ color: cs.textColor + "99" }}
                >
                  {cs.style}
                </div>
                <div
                  className="cases-card-inspired"
                  style={{ color: cs.textColor + "55" }}
                >
                  Inspired by {cs.inspired}
                </div>
                <div className="cases-card-arrow" style={{ color: cs.accent }}>
                  {c.visitLabel}
                </div>
              </motion.button>
            ))}
          </div>

          {/* ── 3C Consumer Electronics Cases ── */}
          <div className="cases-section-header" style={{ marginTop: "64px" }}>
            <h3 className="cases-section-title">{c.threeCTitle}</h3>
            <p className="cases-section-sub">{c.threeCSubtitle}</p>
          </div>
          <div className="cases-grid">
            {c.threeCCases.map((cs, i) => (
              <motion.button
                key={cs.id}
                type="button"
                className="cases-card"
                style={{ background: cs.bg, color: cs.textColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                onClick={() => openPreview(cs)}
              >
                <div
                  className="cases-card-label"
                  style={{
                    color: cs.accent,
                    borderColor: cs.accent + "40",
                  }}
                >
                  {cs.label}
                </div>
                <div className="cases-card-name" style={{ color: cs.textColor }}>
                  {cs.name}
                </div>
                <div
                  className="cases-card-style"
                  style={{ color: cs.textColor + "99" }}
                >
                  {cs.style}
                </div>
                <div
                  className="cases-card-inspired"
                  style={{ color: cs.textColor + "55" }}
                >
                  Inspired by {cs.inspired}
                </div>
                <div className="cases-card-arrow" style={{ color: cs.accent }}>
                  {c.visitLabel}
                </div>
              </motion.button>
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
                <div
                  className="cases-demo-style"
                  style={{ color: d.textColor + "99" }}
                >
                  {d.style}
                </div>
                <p
                  className="cases-demo-desc"
                  style={{ color: d.textColor + "80" }}
                >
                  {d.desc}
                </p>
                <div className="cases-demo-cta" style={{ color: d.accent }}>
                  {c.visitLabel}
                </div>
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

          /* ── Section Sub-headers ── */
          .cases-section-header { margin-bottom: 32px; }
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
            text-align: left;
            border: none;
            outline: none;
            cursor: pointer;
            transition: transform 0.25s;
            min-height: 200px;
            position: relative;
          }
          .cases-card:focus-visible {
            outline: 2px solid rgba(255,255,255,0.4);
            outline-offset: -2px;
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

          /* ── Drawer Backdrop ── */
          .case-drawer-backdrop {
            position: fixed;
            inset: 0;
            z-index: 1000;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          }

          /* ── Drawer Panel ── */
          .case-drawer-panel {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1001;
            width: min(92vw, 1080px);
            background: #0d0d0d;
            display: flex;
            flex-direction: column;
            box-shadow: -8px 0 40px rgba(0,0,0,0.6);
          }

          /* ── Drawer Header ── */
          .case-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.08);
            flex-shrink: 0;
            gap: 16px;
          }
          .case-drawer-title {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.08em;
          }
          .case-drawer-actions {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .case-drawer-open-full {
            font-family: 'DM Mono', monospace;
            font-size: 10px;
            letter-spacing: 0.08em;
            color: rgba(255,255,255,0.45);
            text-decoration: none;
            transition: color 0.2s;
            white-space: nowrap;
          }
          .case-drawer-open-full:hover { color: rgba(255,255,255,0.85); }
          .case-drawer-close {
            width: 32px;
            height: 32px;
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 4px;
            background: transparent;
            color: rgba(255,255,255,0.5);
            font-size: 14px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            flex-shrink: 0;
          }
          .case-drawer-close:hover {
            background: rgba(255,255,255,0.08);
            color: #fff;
          }

          /* ── Drawer iframe ── */
          .case-drawer-iframe {
            flex: 1;
            width: 100%;
            border: none;
            background: #fff;
          }

          /* ── Responsive ── */
          @media (max-width: 1024px) {
            .cases-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 767px) {
            .cases-container { padding: 0 20px; }
            .cases-section { padding: 80px 0; }
            .cases-grid { grid-template-columns: 1fr; }
            .cases-demos { grid-template-columns: 1fr; }
            .case-drawer-panel { width: 100vw; }
            .case-drawer-open-full { display: none; }
          }
        `}</style>
      </section>

      {/* ── Case Preview Drawer (portal outside section) ── */}
      <CaseDrawer
        previewCase={previewCase}
        onClose={closePreview}
        openFullLabel={c.openFullLabel}
        closeLabel={c.closeLabel}
      />
    </>
  );
}
