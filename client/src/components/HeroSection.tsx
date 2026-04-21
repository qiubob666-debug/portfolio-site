/* HeroSection — Boss Opportunity Cost
   Design: Warm ivory bg, asymmetric layout, gold accent
   Strategy: Open with urgency — competitor is already live, you're not
   Key message: Every day without a store = lost orders. I fix that in 7 days.
   NO tech terms. Boss language only: money, time, competition. */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const TICKER: Record<Locale, { label: string; value: string }[]> = {
  en: [
    { label: "Amazon charges per sale", value: "15% commission" },
    { label: "Shopify dev hire (Shenzhen avg)", value: "¥15,000/mo" },
    { label: "Agency brand site quote", value: "¥30,000–80,000" },
    { label: "Avg. agency delivery time", value: "60–90 days" },
    { label: "My delivery: brand website", value: "7 days" },
    { label: "Your competitors launched", value: "Last week" },
  ],
  zh: [
    { label: "亚马逊每笔订单抽佣", value: "15% 平台佣金" },
    { label: "Shopify 运营招聘均价（深圳）", value: "¥15,000/月" },
    { label: "外包机构品牌官网报价", value: "¥30,000–80,000" },
    { label: "机构平均交付周期", value: "60–90 天" },
    { label: "我的交付：品牌官网", value: "7 天" },
    { label: "你的竞争对手上线时间", value: "上周" },
  ],
  ja: [
    { label: "Amazonの販売手数料", value: "15%コミッション" },
    { label: "Shopify開発者採用コスト（深セン）", value: "¥15,000/月" },
    { label: "エージェンシーのブランドサイト見積", value: "¥30,000–80,000" },
    { label: "エージェンシーの平均納期", value: "60〜90日" },
    { label: "私の納期：ブランドサイト", value: "7日" },
    { label: "競合他社のローンチ日", value: "先週" },
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
    headline1: "Your competitors launched last week.",
    headline2: "You can be live",
    headline3: "in 7 days.",
    sub: "I build cross-border e-commerce stores that generate orders from day one — without Amazon's 15% cut, without a 3-month agency wait, without hiring a team.",
    cta1: "See the cost breakdown",
    cta2: "View packages",
    tickerLabel: "Market reality",
    stats: [
      { value: "7d", label: "brand site live" },
      { value: "0%", label: "platform commission" },
      { value: "24h", label: "response time" },
    ],
  },
  zh: {
    available: "现在接受新项目",
    headline1: "你的竞争对手上周已经上线了。",
    headline2: "你的独立站",
    headline3: "7 天可以开张。",
    sub: "我帮跨境电商老板搭建从第一天就能收款的独立站——不交亚马逊 15% 佣金，不等机构 3 个月，不用招一个团队。",
    cta1: "看成本对比",
    cta2: "查看套餐",
    tickerLabel: "市场现实",
    stats: [
      { value: "7天", label: "品牌站上线" },
      { value: "0%", label: "平台佣金" },
      { value: "24h", label: "响应时间" },
    ],
  },
  ja: {
    available: "新規プロジェクト受付中",
    headline1: "競合他社は先週ローンチした。",
    headline2: "あなたのストアは",
    headline3: "7日で開店できる。",
    sub: "初日から受注できる越境ECストアを構築します。Amazonの15%手数料なし、エージェンシーの3ヶ月待ちなし、チーム採用なし。",
    cta1: "コスト比較を見る",
    cta2: "プランを見る",
    tickerLabel: "市場の現実",
    stats: [
      { value: "7日", label: "ブランドサイト" },
      { value: "0%", label: "プラットフォーム手数料" },
      { value: "24h", label: "レスポンス" },
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

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

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
                fontSize: "clamp(36px, 5vw, 66px)", fontWeight: 600,
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
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <motion.a href="#roi" whileHover={{ y: -2 }}
                style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAFAF8", background: "#1A1A1A", padding: "14px 28px", textDecoration: "none", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#8B6914")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1A1A1A")}
              >
                {c.cta1} →
              </motion.a>
              <motion.a href="#services" whileHover={{ y: -2 }}
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
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
    </section>
  );
}
