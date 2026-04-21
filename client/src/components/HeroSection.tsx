/* GEOMETRIC SILENCE — Hero: vast whitespace, display serif, asymmetric balance */
import { useEffect, useState } from "react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663570298308/AKiE4EqLYzAGppheoaN4cE/gs-hero-mKjFZpLjdamx8AxoEqcC5u.webp";

export default function HeroSection() {
  const [v, setV] = useState(false);
  useEffect(() => { const t = setTimeout(() => setV(true), 60); return () => clearTimeout(t); }, []);

  const fade = (delay = 0): React.CSSProperties => ({
    opacity: v ? 1 : 0,
    transform: v ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#FAFAFA",
        paddingTop: 56,
      }}
    >
      {/* Left — text column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 48px 80px 48px",
          maxWidth: 600,
        }}
        className="gs-container"
      >
        {/* Label */}
        <p className="gs-label" style={{ ...fade(0), marginBottom: 40 }}>
          Full-Stack Developer — 2024
        </p>

        {/* Rule */}
        <div className="gs-rule" style={{ ...fade(0.06), marginBottom: 40 }} />

        {/* Display headline */}
        <h1
          className="gs-display"
          style={{ ...fade(0.12), marginBottom: 48 }}
        >
          Build<br />
          things<br />
          <em style={{ fontStyle: "italic", color: "#767676" }}>that work.</em>
        </h1>

        {/* Body */}
        <p
          className="gs-body"
          style={{ ...fade(0.18), maxWidth: 400, marginBottom: 56 }}
        >
          从前端交互到后端服务，从 CMS 内容管理到 Docker 基础设施——构建完整可运行的技术生态系统。
        </p>

        {/* CTA */}
        <div style={{ ...fade(0.24), display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#projects" className="gs-btn">
            View Work
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </a>
          <a href="#resume" className="gs-btn-outline">
            Download CV
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            ...fade(0.30),
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            marginTop: 80,
            borderTop: "1px solid #E0E0E0",
          }}
        >
          {[
            { n: "10+", l: "Projects" },
            { n: "5+", l: "Domains" },
            { n: "3+", l: "Deployed" },
          ].map((s, i) => (
            <div
              key={s.l}
              style={{
                padding: "24px 0",
                borderRight: i < 2 ? "1px solid #E0E0E0" : "none",
                paddingRight: i < 2 ? 24 : 0,
                paddingLeft: i > 0 ? 24 : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 28,
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  color: "#111111",
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {s.n}
              </div>
              <div className="gs-caption">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right — visual column (desktop only) */}
      <div
        className="hidden lg:block"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#F2F2F2",
        }}
      >
        {/* Hero image */}
        <img
          src={HERO_IMG}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: v ? 1 : 0,
            transition: "opacity 1.2s 0.3s ease",
          }}
        />

        {/* Overlay label */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            ...fade(0.5),
          }}
        >
          <p className="gs-label" style={{ color: "#767676" }}>
            Geometric Silence — 2024
          </p>
        </div>
      </div>

      {/* Mobile: stack vertically */}
      <style>{`
        @media (max-width: 1024px) {
          #about { grid-template-columns: 1fr !important; }
          #about > div:last-child { display: none !important; }
          #about > div:first-child { padding: 100px 24px 80px !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
