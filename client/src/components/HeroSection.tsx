/* HeroSection — Boss Opportunity Cost
   Design: Warm ivory bg, asymmetric layout, gold accent
   Strategy: Open with urgency — competitor is already live, you're not
   Key message: Every day without a store = lost orders. I fix that in 7 days.
   NO tech terms. Boss language only: money, time, competition.
   Mobile: Single column, stacked layout, touch-friendly */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const TICKER: Record<Locale, { label: string; value: string }[]> = {
  en: [
    { label: "Amazon FBA total fee rate", value: "Up to 58%" },
    { label: "In-house team cost (Shenzhen)", value: "¥790k+/yr" },
    { label: "Agency brand site quote", value: "¥30,000–80,000" },
    { label: "Avg. agency delivery time", value: "60–90 days" },
    { label: "Shopify avg. app spend", value: "¥2,000+/mo" },
    { label: "Our delivery: full brand store", value: "7 days, ¥8,800" },
    { label: "Your competitors launched", value: "Last week" },
  ],
  zh: [
    { label: "亚马逊 FBA 全部费用占比", value: "高达 58%" },
    { label: "自建团队年成本（深圳）", value: "¥79 万+" },
    { label: "外包机构品牌官网报价", value: "¥3–8 万" },
    { label: "机构平均交付周期", value: "60–90 天" },
    { label: "Shopify 插件月均花费", value: "¥2,000+/月" },
    { label: "找我们：全套品牌站交付", value: "7 天，¥8,800" },
    { label: "你的竞争对手已上线品牌站", value: "上周" },
  ],
  ja: [
    { label: "Amazon FBA 全費用率", value: "最大 58%" },
    { label: "社内チーム年間コスト（深セン）", value: "¥79万+" },
    { label: "エージェンシーのブランドサイト見積", value: "¥3–8万" },
    { label: "エージェンシーの平均納期", value: "60〜90日" },
    { label: "Shopifyアプリ月平均費用", value: "¥2,000+/月" },
    { label: "私の納期：フルブランドサイト", value: "7日、¥8,800" },
    { label: "競合他社はすでにローンチ済み", value: "先週" },
  ],
};

const COPY: Record<Locale, {
  available: string;
  headline1: string;
  headline2: string;
  headline3: string;
  sub: string;
  cta1: string;
  cta2: string;
  tickerLabel: string;
  stats: { value: string; label: string }[];
}> = {
  en: {
    available: "Available for new projects",
    headline1: "Your competitors",
    headline2: "already have brand stores.",
    headline3: "Yours: 7 days.",
    sub: "Every day you delay, Amazon takes 58% of your revenue. Our team builds brand stores that generate orders from day one — 0% commission, 7-day delivery, no extra hiring needed.",
    cta1: "Calculate your annual loss",
    cta2: "View packages",
    tickerLabel: "What your competitors are doing",
    stats: [
      { value: "7d", label: "brand site live" },
      { value: "0%", label: "platform commission" },
      { value: "¥58万", label: "avg. annual saving" },
    ],
  },
  zh: {
    available: "现在接受新项目",
    headline1: "你的竞争对手",
    headline2: "已经有品牌独立站了。",
    headline3: "你的：7 天上线。",
    sub: "每多拖一天，就多一天把利润拱手送给亚马逊。我们团队帮跨境电商老板 7 天搭建从第一天就能收款的品牌独立站——0% 平台佣金，不等机构 3 个月，不用另外组建团队。",
    cta1: "算一算你每年亏多少",
    cta2: "查看套餐",
    tickerLabel: "你的竞争对手正在发生什么",
    stats: [
      { value: "7天", label: "品牌站上线" },
      { value: "0%", label: "平台佣金" },
      { value: "¥58万", label: "年均节省" },
    ],
  },
  ja: {
    available: "新規プロジェクト受付中",
    headline1: "競合他社は",
    headline2: "すでにブランドサイトを持っています。",
    headline3: "あなたのサイト：7日で開店。",
    sub: "1日遅らせるごとに、Amazonに売上の58%を渡し続けます。初日から受注できるブランドサイトを0%手数料・7日納品・チーム不要で構築します。",
    cta1: "年間損失を計算する",
    cta2: "プランを見る",
    tickerLabel: "競合他社の動き",
    stats: [
      { value: "7日", label: "ブランドサイト稼働" },
      { value: "0%", label: "プラットフォーム手数料" },
      { value: "¥58万", label: "年間節約平均" },
    ],
  },
};

export default function HeroSection() {
  const { locale } = useI18n();
  const c = COPY[locale];
  const tickers = TICKER[locale];
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIdx(i => (i + 1) % tickers.length);
        setTickerVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(iv);
  }, [tickers.length]);

  // Subtle particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x; const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) { ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.strokeStyle = `rgba(212,196,154,${0.07 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
        }
      }
      nodes.forEach(n => { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(212,196,154,0.3)"; ctx.fill(); });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        background: "#FAFAF8", position: "relative", overflow: "hidden", paddingTop: 80,
      }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.8, pointerEvents: "none" }} />

      <div className="hero-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%", position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* LEFT: Headline + CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40 }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#777" }}>
                {c.available}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(32px, 5vw, 66px)", fontWeight: 600,
                lineHeight: 1.07, color: "#1A1A1A", margin: "0 0 28px",
              }}
            >
              {c.headline1}<br />
              <em style={{ fontStyle: "italic", color: "#8B6914" }}>{c.headline2}<br />{c.headline3}</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.8, color: "#666", maxWidth: 460, margin: "0 0 44px" }}
            >
              {c.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
              className="hero-cta-row"
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <motion.a href="#roi" whileHover={{ y: -2 }}
                className="hero-cta-primary"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAFAF8", background: "#1A1A1A", padding: "14px 28px", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B6914")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1A1A1A")}
              >
                {c.cta1} →
              </motion.a>
              <motion.a href="#services" whileHover={{ y: -2 }}
                className="hero-cta-secondary"
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1A1A1A", background: "transparent", padding: "14px 28px", border: "1px solid #D4C49A", textDecoration: "none", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#8B6914")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#D4C49A")}
              >
                {c.cta2}
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT: Market reality ticker */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ background: "#111111", padding: "40px", marginBottom: 2 }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6914", marginBottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E" }} />
                {c.tickerLabel}
              </div>
              <motion.div key={tickerIdx} animate={{ opacity: tickerVisible ? 1 : 0, y: tickerVisible ? 0 : -10 }} transition={{ duration: 0.3 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
                  {tickers[tickerIdx]?.label}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, color: "#D4C49A", lineHeight: 1 }}>
                  {tickers[tickerIdx]?.value}
                </div>
              </motion.div>
              <div style={{ display: "flex", gap: 6, marginTop: 28 }}>
                {tickers.map((_, i) => (
                  <div key={i} style={{ width: i === tickerIdx ? 20 : 4, height: 4, background: i === tickerIdx ? "#8B6914" : "rgba(255,255,255,0.12)", borderRadius: 2, transition: "all 0.3s" }} />
                ))}
              </div>
            </div>

            <div className="hero-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
              {c.stats.map((s, i) => (
                <div key={i} style={{ padding: "24px 16px", background: "#FFFFFF", border: "1px solid #E8E4DC", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#1A1A1A", lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .green-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: oklch(0.62 0.18 145);
          display: inline-block;
          animation: gp 2.5s infinite;
        }
        @keyframes gp {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.8); }
        }

        @media (max-width: 767px) {
          .hero-container {
            padding: 0 20px !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-cta-row {
            flex-direction: column !important;
          }
          .hero-cta-primary,
          .hero-cta-secondary {
            display: block !important;
            text-align: center !important;
            padding: 16px 20px !important;
            font-size: 12px !important;
          }
          .hero-stats-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 2px !important;
          }
          .hero-stats-grid > div {
            padding: 16px 8px !important;
          }
          .hero-stats-grid > div > div:first-child {
            font-size: 22px !important;
          }
        }
      `}</style>
    </section>
  );
}
