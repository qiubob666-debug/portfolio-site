/* AboutSection — Kinetic Precision
   Personal bio, values, and the orbital skill diagram.
   Left: text. Right: orbit image. */

import { motion } from "framer-motion";

const VALUES = [
  { label: "Systems Thinking", desc: "Every component is part of a larger system. I design for the whole, not just the part." },
  { label: "Automation First", desc: "If a task runs more than twice, it should be automated. n8n, scripts, CI/CD." },
  { label: "Ownership", desc: "Self-hosted infrastructure, open-source tooling, no vendor lock-in by default." },
  { label: "Clarity in Complexity", desc: "Good architecture makes complex systems understandable. Documentation is code." },
];

export default function AboutSection() {
  return (
    <section id="about" style={{ background: "#FAFAFA", padding: "120px 0", borderTop: "1px solid #E8E8E8" }}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: "#0057FF" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#AAAAAA" }}>
              04 — About
            </span>
          </div>
        </motion.div>

        {/* Two-column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          {/* Left: bio + values */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                letterSpacing: "-0.03em",
                color: "#0A0A0A",
                lineHeight: 1.15,
                marginBottom: 28,
              }}
            >
              Building systems<br />
              <em style={{ fontStyle: "italic", color: "#AAAAAA" }}>end to end</em>
            </h2>

            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.85, color: "#555", marginBottom: 16 }}>
              Full-stack engineer with a systems mindset. I work across the entire stack —
              from crafting React interfaces to designing Python APIs, configuring Docker
              infrastructure, and building n8n automation pipelines.
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.85, color: "#555", marginBottom: 48 }}>
              Based in China. Currently building AuraLoop — an astrology platform
              with Sanity CMS, Supabase, and a custom Kerykeion-based calculation service.
              Available for freelance projects and technical consulting.
            </p>

            {/* Values */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    gap: 20,
                    padding: "16px 0",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#0A0A0A", letterSpacing: "0.02em" }}>
                    {v.label}
                  </span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#888", lineHeight: 1.6 }}>
                    {v.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: orbital diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: 460 }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663570298308/AKiE4EqLYzAGppheoaN4cE/tech-orbit-XKYZvkjfwgsCvLT7utWuuo.webp"
                alt="Technology orbit diagram"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: -16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#CCCCCC",
                  whiteSpace: "nowrap",
                }}
              >
                Skill orbit — core to periphery
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile */}
      <style>{`
        @media (max-width: 1024px) {
          #about .container > div:last-child { grid-template-columns: 1fr !important; }
          #about .container > div:last-child > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
