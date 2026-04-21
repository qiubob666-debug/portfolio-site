/* CapabilitiesSection.tsx — Considered Authority
   Design: Dark charcoal background, gold accents
   Layout: Asymmetric — large headline left, category grid right
   Strategy: Boss journey step 2 — "Can you handle my tech needs?" */

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function CapabilitiesSection() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section
      id="capabilities"
      style={{
        padding: "120px 0",
        background: "#1A1A1A",
        borderTop: "1px solid #2A2A2A",
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
          {t.capabilities.index}
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 80,
            alignItems: "start",
          }}
        >
          {/* Left: headline + description */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: "sticky", top: 120 }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(36px, 4vw, 52px)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#FAFAF8",
                margin: "0 0 24px",
              }}
            >
              {t.capabilities.headline}
              <br />
              <em style={{ fontStyle: "italic", color: "#D4C49A" }}>
                {t.capabilities.headline_em}
              </em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                lineHeight: 1.8,
                color: "#888",
                margin: "0 0 48px",
              }}
            >
              {t.capabilities.sub}
            </p>

            {/* Decorative line */}
            <div
              style={{
                width: 48,
                height: 1,
                background: "#D4C49A",
                marginBottom: 24,
              }}
            />
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#555",
                letterSpacing: "0.1em",
                lineHeight: 1.8,
              }}
            >
              {t.capabilities.categories.length} domains
              <br />
              {t.capabilities.categories.reduce((acc, c) => acc + c.items.length, 0)}+ technologies
            </div>
          </motion.div>

          {/* Right: category grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {t.capabilities.categories.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
                onMouseEnter={() => setActiveCategory(ci)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{
                  padding: "28px 32px",
                  background: activeCategory === ci ? "#242424" : "#1E1E1E",
                  border: "1px solid",
                  borderColor: activeCategory === ci ? "#3A3A3A" : "#252525",
                  cursor: "none",
                  transition: "all 0.25s ease",
                }}
              >
                {/* Category label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: activeCategory === ci ? "#D4C49A" : "#666",
                      transition: "color 0.25s",
                    }}
                  >
                    {cat.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9,
                      color: "#444",
                    }}
                  >
                    {cat.items.length}
                  </span>
                </div>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {cat.items.map((item, ii) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.08 + ii * 0.04 }}
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 11,
                        color: activeCategory === ci ? "#CCCCCC" : "#777",
                        background: activeCategory === ci ? "#2A2A2A" : "transparent",
                        border: "1px solid",
                        borderColor: activeCategory === ci ? "#3A3A3A" : "#2A2A2A",
                        padding: "4px 10px",
                        transition: "all 0.25s ease",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
