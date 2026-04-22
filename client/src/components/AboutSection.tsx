/* AboutSection — Considered Authority
   Design: Warm white (#FAFAF8) background, charcoal + gold accent
   Layout: Asymmetric — large headline + bio left, values grid right
   Strategy: Boss journey step 5 — "Who am I actually hiring?" */

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function AboutSection() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      style={{
        padding: "120px 0",
        background: "#FAFAF8",
        borderTop: "1px solid #E8E4DC",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#B8A882",
            marginBottom: 64,
          }}
        >
          {t.about.index}
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 80px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: headline + bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#1A1A1A",
                margin: "0 0 32px",
              }}
            >
              {t.about.headline}
              <br />
              <em style={{ fontStyle: "italic", color: "#8B6914" }}>
                {t.about.headline_em}
              </em>
            </h2>

            {/* Gold rule */}
            <div
              style={{
                width: 48,
                height: 1,
                background: "#D4C49A",
                marginBottom: 32,
              }}
            />

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                lineHeight: 1.9,
                color: "#444",
                margin: "0 0 20px",
              }}
            >
              {t.about.bio1}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.9,
                color: "#666",
                margin: 0,
              }}
            >
              {t.about.bio2}
            </p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginTop: 40,
                padding: "12px 20px",
                border: "1px solid #D4C49A",
                background: "#FFFDF8",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4CAF50",
                  boxShadow: "0 0 0 2px rgba(76,175,80,0.25)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8B6914",
                }}
              >
                {t.nav.available}
              </span>
            </motion.div>
          </motion.div>

          {/* Right: values grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              {t.about.values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  style={{
                    padding: "28px 24px",
                    background: i % 2 === 0 ? "#F0EBE1" : "#FFFFFF",
                    border: "1px solid #E8E4DC",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "#1A1A1A",
                      marginBottom: 10,
                      lineHeight: 1.2,
                    }}
                  >
                    {v.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      lineHeight: 1.7,
                      color: "#777",
                    }}
                  >
                    {v.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                marginTop: 2,
                padding: "20px 24px",
                background: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: "#666",
                  letterSpacing: "0.08em",
                  lineHeight: 1.8,
                }}
              >
                React · TypeScript · Python · Docker · n8n
              </div>
              <a
                href="#contact"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#D4C49A",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                联系我 →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 60px 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
