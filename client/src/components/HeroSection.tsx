/* HeroSection — Kinetic Precision design system
   Asymmetric layout: left text column with typewriter role titles,
   right circuit-board image. Stats row. Scroll indicator. */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Full-Stack Engineer",
  "Systems Architect",
  "Automation Builder",
  "UI/UX Implementer",
];

const STATS = [
  { value: "6+", label: "Repos in Production" },
  { value: "300+", label: "n8n Workflow Nodes" },
  { value: "5", label: "Tech Domains" },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const target = ROLES[roleIndex];
    let i = displayed.length;
    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 65);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 38);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  const fade = (delay = 0): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#FAFAFA",
        paddingTop: 56,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left — text column */}
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 48px",
          maxWidth: 640,
        }}
      >
        {/* Index label */}
        <div style={{ ...fade(0), display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 28, height: 1, background: "#0057FF" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#AAAAAA" }}>
            01 — Identity
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            ...fade(0.08),
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: "clamp(3rem, 5.5vw, 5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#0A0A0A",
            marginBottom: 20,
          }}
        >
          Bob<br />Qiushao
        </h1>

        {/* Typewriter role */}
        <div style={{ ...fade(0.14), height: 28, marginBottom: 32, display: "flex", alignItems: "center", gap: 2 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#0057FF", letterSpacing: "0.02em" }}>
            {displayed}
          </span>
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 16,
              background: "#0057FF",
              animation: "blink 1s step-end infinite",
            }}
          />
        </div>

        {/* Description */}
        <p
          style={{
            ...fade(0.20),
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            lineHeight: 1.85,
            color: "#666",
            maxWidth: 400,
            marginBottom: 44,
          }}
        >
          Building end-to-end systems — from React interfaces to Python APIs,
          Docker infrastructure, and n8n automation pipelines.
          This site is the portfolio. The interaction is the proof.
        </p>

        {/* Stats */}
        <div style={{ ...fade(0.26), display: "flex", gap: 36, marginBottom: 48, borderTop: "1px solid #E8E8E8", paddingTop: 32 }}>
          {STATS.map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 30, color: "#0A0A0A", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", marginTop: 5 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ ...fade(0.32), display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="#stack"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#0A0A0A", color: "#FAFAFA",
              padding: "12px 24px",
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textDecoration: "none", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0057FF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0A0A0A")}
          >
            Explore Stack →
          </a>
          <a
            href="https://github.com/qiubob666-debug"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid #E8E8E8", color: "#555",
              padding: "12px 24px",
              fontFamily: "'DM Mono', monospace", fontSize: 10,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0A0A0A"; e.currentTarget.style.color = "#0A0A0A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.color = "#555"; }}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      {/* Right — circuit board image */}
      <div
        className="hidden lg:flex"
        style={{ alignItems: "center", justifyContent: "center", padding: "80px 48px", background: "#F5F5F5" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          style={{ position: "relative", width: "100%", maxWidth: 500 }}
        >
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663570298308/AKiE4EqLYzAGppheoaN4cE/tech-graph-hero-kCaCcPrLcVQnK7QEWN9RHX.webp"
            alt="Technology graph"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: 0,
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#CCCCCC",
            }}
          >
            Interactive tech graph below ↓
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#CCCCCC" }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, #CCCCCC, transparent)",
          }}
        />
      </div>

      {/* Mobile: single column */}
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 1024px) {
          #hero { grid-template-columns: 1fr !important; }
          #hero > div:last-child { display: none !important; }
          #hero > div:first-child { padding: 100px 24px 80px !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
