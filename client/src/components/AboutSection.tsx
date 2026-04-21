/* AboutSection — Kinetic Precision design system
   Personal bio, values, and the orbital skill diagram.
   Left: text. Right: orbit image.
   i18n: reads bio, values, labels from translations */

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function AboutSection() {
  const { t } = useI18n();

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
              {t.about.index}
            </span>
          </div>
        </motion.div>

        {/* Two-column */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="about-grid">
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
              {t.about.headline}<br />
              <em style={{ fontStyle: "italic", color: "#AAAAAA" }}>{t.about.headline_em}</em>
            </h2>

            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.85, color: "#666", marginBottom: 16 }}>
              {t.about.bio1}
            </p>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.85, color: "#888", marginBottom: 48 }}>
              {t.about.bio2}
            </p>

            {/* Values grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px" }}>
              {t.about.values.map((v, i) => (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 13, color: "#0A0A0A", marginBottom: 6 }}>
                    {v.label}
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, lineHeight: 1.7, color: "#AAAAAA" }}>
                    {v.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: orbital image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ position: "relative" }}
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663570298308/AKiE4EqLYzAGppheoaN4cE/tech-orbit-gMqjGEBHBUCxBrJqZEELSm.webp"
              alt="Skill orbit diagram"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -20,
                left: 0,
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#CCCCCC",
              }}
            >
              {t.about.orbit_label}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
