/* StackSection — Kinetic Precision design system
   Interactive Canvas tech constellation (TechGraph) as centerpiece.
   Below: categorized tech tags with hover states.
   No screenshots — the graph IS the portfolio.
   i18n: reads categories and labels from translations */

import { motion } from "framer-motion";
import TechGraph from "./TechGraph";
import { useI18n } from "@/contexts/I18nContext";

const CATEGORY_COLORS = ["#0057FF", "#111111", "#555555", "#888888", "#0057FF"];

export default function StackSection() {
  const { t } = useI18n();

  return (
    <section id="stack" style={{ background: "#FAFAFA", padding: "120px 0" }}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: "#0057FF" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#AAAAAA" }}>
              {t.stack.index}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              lineHeight: 1.1,
              maxWidth: 480,
            }}
          >
            {t.stack.headline}<br />
            <em style={{ fontStyle: "italic", color: "#AAAAAA" }}>{t.stack.headline_em}</em>
          </h2>
        </motion.div>

        {/* Instruction */}
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0057FF" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA" }}>
            {t.stack.graph_hint}
          </span>
        </div>

        {/* Interactive graph */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ border: "1px solid #E8E8E8", marginBottom: 80, background: "#FFFFFF" }}
        >
          <TechGraph />
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: "#E8E8E8", marginBottom: 64 }} />

        {/* Tech categories grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "48px 64px",
          }}
        >
          {t.stack.categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: CATEGORY_COLORS[ci % CATEGORY_COLORS.length] }} />
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#0A0A0A",
                  }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map((item) => (
                  <span key={item} className="tech-tag">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
