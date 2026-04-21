/* HeroSection — Considered Authority
   Design: Warm white #FAFAF8, charcoal #1A1A1A, gold #8B6914
   Layout: Asymmetric 2-col — editorial headline left, stat grid right
   Strategy: Boss journey entry — "Who is this and why should I care?" */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function HeroSection() {
  const { t } = useI18n();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Reset typewriter when language changes
  useEffect(() => {
    setRoleIndex(0);
    setDisplayed("");
    setTyping(true);
  }, [t]);

  // Typewriter effect
  useEffect(() => {
    const roles = t.hero.roles;
    const target = roles[roleIndex];
    let i = displayed.length;
    if (typing) {
      if (i < target.length) {
        const timer = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 65);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(timer);
      }
    } else {
      if (i > 0) {
        const timer = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 38);
        return () => clearTimeout(timer);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex, t]);

  // Particle canvas
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

    const nodes = Array.from({ length: 36 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212,196,154,${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,196,154,0.45)";
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const stats = t.hero.stats;

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
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      {/* Vertical rule */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          background: "linear-gradient(to bottom, transparent, #E8E4DC 20%, #E8E4DC 80%, transparent)",
          opacity: 0.35,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left: editorial content */}
          <div>
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 36 }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4CAF50",
                  display: "inline-block",
                  boxShadow: "0 0 0 3px rgba(76,175,80,0.18)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#888",
                }}
              >
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(40px, 5.5vw, 72px)",
                fontWeight: 600,
                lineHeight: 1.05,
                color: "#1A1A1A",
                margin: "0 0 28px",
                letterSpacing: "-0.01em",
              }}
            >
              {t.hero.headline1}
              <br />
              {t.hero.headline2}
              <br />
              <em style={{ fontStyle: "italic", color: "#8B6914" }}>
                {t.hero.headline3}
              </em>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: "#8B6914",
                marginBottom: 24,
                minHeight: 22,
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {displayed}
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  background: "#8B6914",
                  marginLeft: 1,
                  verticalAlign: "text-bottom",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: "#666",
                margin: "0 0 48px",
                maxWidth: 440,
              }}
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <motion.a
                href="#services"
                whileHover={{ y: -2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#FAFAF8",
                  background: "#1A1A1A",
                  padding: "14px 28px",
                  textDecoration: "none",
                  cursor: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#8B6914")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
              >
                {t.hero.cta_stack}
                <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
                  <line x1="0" y1="3.5" x2="12" y2="3.5" stroke="currentColor" strokeWidth="0.8" />
                  <polyline points="8,1 12,3.5 8,6" stroke="currentColor" strokeWidth="0.8" fill="none" />
                </svg>
              </motion.a>
              <motion.a
                href="https://github.com/qiubob666-debug"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#1A1A1A",
                  background: "transparent",
                  padding: "14px 28px",
                  border: "1px solid #D4C49A",
                  textDecoration: "none",
                  cursor: "none",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#8B6914")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D4C49A")}
              >
                {t.hero.cta_github}
              </motion.a>
            </motion.div>
          </div>

          {/* Right: stat grid */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  style={{
                    padding: "36px 32px",
                    background: i % 2 === 0 ? "#FFFFFF" : "#F5F0E8",
                    border: "1px solid #E8E4DC",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 52,
                      fontWeight: 700,
                      color: "#1A1A1A",
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#999",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 24,
                paddingLeft: 4,
              }}
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                style={{
                  width: 1,
                  height: 36,
                  background: "linear-gradient(to bottom, #D4C49A, transparent)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#BBB",
                }}
              >
                {t.hero.scroll}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 1024px) {
          #hero > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          #hero > div > div > div:last-child { display: none !important; }
        }
        @media (max-width: 640px) {
          #hero { padding-top: 100px !important; }
        }
      `}</style>
    </section>
  );
}
