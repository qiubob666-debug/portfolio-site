/* HeroSection — Considered Authority
   Design: Warm white #FAFAF8, charcoal #1A1A1A, gold #8B6914
   Layout: Asymmetric 2-col — editorial headline left, live cost ticker right
   Strategy: Boss journey step 0 — Lead with THEIR problem, not MY skills
   Key message: "You're spending ¥30k/month on a problem I can solve in 7 days" */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const TICKER: Record<Locale, { label: string; value: string }[]> = {
  en: [
    { label: "Avg. Shopify dev salary (Shenzhen)", value: "¥15,000/mo" },
    { label: "Typical agency launch timeline", value: "60–90 days" },
    { label: "My delivery: brand website", value: "7 days" },
    { label: "My delivery: full e-commerce store", value: "21 days" },
    { label: "Annual savings vs. in-house team", value: "¥278,000+" },
    { label: "Automation: orders processed/day", value: "Unlimited" },
  ],
  zh: [
    { label: "深圳 Shopify 开发平均月薪", value: "¥15,000/月" },
    { label: "典型外包机构上线周期", value: "60–90 天" },
    { label: "我的交付：品牌官网", value: "7 天" },
    { label: "我的交付：完整电商独立站", value: "21 天" },
    { label: "对比自建团队年节省", value: "¥27.8 万+" },
    { label: "自动化：每日处理订单数", value: "无限制" },
  ],
  ja: [
    { label: "深センShopify開発者平均月収", value: "¥15,000/月" },
    { label: "典型的な外注リリース期間", value: "60〜90日" },
    { label: "私の納期：ブランドサイト", value: "7日" },
    { label: "私の納期：完全ECストア", value: "21日" },
    { label: "社内チーム比年間節約", value: "¥27.8万以上" },
    { label: "自動化：1日処理注文数", value: "無制限" },
  ],
};

const COPY: Record<Locale, {
  badge: string;
  h1: string; h2: string; h3: string; h4: string;
  sub: string;
  cta1: string; cta2: string;
  liveLabel: string;
  stats: { num: string; label: string }[];
}> = {
  en: {
    badge: "Available for new projects",
    h1: "Your competitors launched",
    h2: "their store last week.",
    h3: "Yours can be live",
    h4: "in 7 days.",
    sub: "I build cross-border e-commerce stores, brand websites, and automation systems — faster and cheaper than hiring a team. One person. Full-stack. Fixed price.",
    cta1: "See the cost breakdown →",
    cta2: "View services",
    liveLabel: "LIVE MARKET DATA",
    stats: [
      { num: "1", label: "person, full-stack" },
      { num: "7d", label: "brand site live" },
      { num: "24h", label: "response time" },
    ],
  },
  zh: {
    badge: "接受新项目",
    h1: "你的竞争对手",
    h2: "上周已经上线了。",
    h3: "你的独立站",
    h4: "7 天后可以上线。",
    sub: "我为跨境电商品牌搭建独立站、品牌官网和自动化系统——比招团队更快、更省钱。一个人，全栈，固定报价。",
    cta1: "查看成本对比 →",
    cta2: "了解服务",
    liveLabel: "实时市场数据",
    stats: [
      { num: "1", label: "人完成全栈" },
      { num: "7天", label: "品牌站交付" },
      { num: "24h", label: "响应时间" },
    ],
  },
  ja: {
    badge: "新規案件受付中",
    h1: "競合他社は",
    h2: "先週ストアをリリースしました。",
    h3: "あなたのサイトは",
    h4: "7日後に公開できます。",
    sub: "越境ECブランド向けに独立サイト、ブランドサイト、自動化システムを構築します。チームを雇うより速く、安く。一人で、フルスタック、固定料金。",
    cta1: "コスト比較を見る →",
    cta2: "サービスを見る",
    liveLabel: "リアルタイム市場データ",
    stats: [
      { num: "1", label: "人でフルスタック" },
      { num: "7日", label: "ブランドサイト" },
      { num: "24h", label: "返信時間" },
    ],
  },
};

export default function HeroSection() {
  const { locale } = useI18n();
  const [tickerIdx, setTickerIdx] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const ticker = TICKER[locale];
  const c = COPY[locale];

  // Rotating ticker
  useEffect(() => {
    const iv = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIdx((i) => (i + 1) % ticker.length);
        setTickerVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(iv);
  }, [ticker.length]);

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
    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.2 + 0.4,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212,196,154,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,196,154,0.35)";
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "#FAFAF8",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.8, pointerEvents: "none" }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

          {/* LEFT: Headline + CTA */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 40 }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: "50%", background: "#22C55E",
                boxShadow: "0 0 0 3px rgba(34,197,94,0.2)", animation: "heroPulse 2s infinite",
              }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#777" }}>
                {c.badge}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(38px, 5vw, 68px)",
                fontWeight: 600,
                lineHeight: 1.07,
                color: "#1A1A1A",
                margin: "0 0 28px",
                letterSpacing: "-0.01em",
              }}
            >
              {c.h1}<br />
              {c.h2}<br />
              <em style={{ fontStyle: "italic", color: "#8B6914" }}>{c.h3}</em><br />
              <em style={{ fontStyle: "italic", color: "#8B6914" }}>{c.h4}</em>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: "#666",
                maxWidth: 460,
                margin: "0 0 44px",
              }}
            >
              {c.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <motion.a
                href="#roi"
                whileHover={{ y: -2 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#FAFAF8", background: "#1A1A1A",
                  padding: "14px 28px", textDecoration: "none", transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#8B6914")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
              >
                {c.cta1}
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ y: -2 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.12em",
                  textTransform: "uppercase", color: "#1A1A1A", background: "transparent",
                  padding: "14px 28px", border: "1px solid #D4C49A", textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#8B6914")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D4C49A")}
              >
                {c.cta2}
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT: Live cost ticker + key stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Ticker card */}
            <div style={{ background: "#111111", padding: "40px", marginBottom: 2 }}>
              <div style={{
                fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#8B6914", marginBottom: 28,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: "50%", background: "#22C55E",
                  animation: "heroPulse 1.5s infinite",
                }} />
                {c.liveLabel}
              </div>

              <motion.div
                key={tickerIdx}
                animate={{ opacity: tickerVisible ? 1 : 0, y: tickerVisible ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.4)", marginBottom: 10, lineHeight: 1.5,
                }}>
                  {ticker[tickerIdx]?.label}
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: 700, color: "#D4C49A", lineHeight: 1,
                }}>
                  {ticker[tickerIdx]?.value}
                </div>
              </motion.div>

              {/* Progress dots */}
              <div style={{ display: "flex", gap: 6, marginTop: 28 }}>
                {ticker.map((_, i) => (
                  <div key={i} style={{
                    width: i === tickerIdx ? 20 : 4, height: 4,
                    background: i === tickerIdx ? "#8B6914" : "rgba(255,255,255,0.12)",
                    borderRadius: 2, transition: "all 0.3s",
                  }} />
                ))}
              </div>
            </div>

            {/* 3 key stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
              {c.stats.map((stat, i) => (
                <div key={i} style={{
                  padding: "24px 16px", background: "#FFFFFF",
                  border: "1px solid #E8E4DC", textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 28, fontWeight: 700, color: "#1A1A1A",
                    lineHeight: 1, marginBottom: 6,
                  }}>
                    {stat.num}
                  </div>
                  <div style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 9,
                    letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAA",
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
      `}</style>
    </section>
  );
}
