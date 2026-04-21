/* ServicesSection.tsx — Considered Authority
   Design: Warm white + charcoal + gold accent
   Layout: 2×2 card grid, featured card elevated
   Strategy: Boss journey step 1 — "What can you do for me?" */

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function ServicesSection() {
  const { t } = useI18n();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 },
    }),
  };

  return (
    <section
      id="services"
      style={{
        padding: "120px 0",
        background: "#FAFAF8",
        borderTop: "1px solid #E8E4DC",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#B8A882",
              marginBottom: 20,
            }}
          >
            {t.services.index}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 600,
                lineHeight: 1.1,
                color: "#1A1A1A",
                margin: 0,
              }}
            >
              {t.services.headline}{" "}
              <em style={{ fontStyle: "italic", color: "#8B6914" }}>{t.services.headline_em}</em>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#666",
                maxWidth: 380,
                margin: 0,
              }}
            >
              {t.services.sub}
            </p>
          </div>
        </motion.div>

        {/* Services grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 2,
          }}
        >
          {t.services.items.map((service, i) => (
            <motion.div
              key={service.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: "relative",
                background: service.featured
                  ? "#1A1A1A"
                  : hoveredId === service.id
                  ? "#F5F0E8"
                  : "#FFFFFF",
                padding: "40px 36px",
                cursor: "none",
                transition: "background 0.3s ease",
                border: service.featured ? "none" : "1px solid #E8E4DC",
              }}
            >
              {/* Tag */}
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: service.featured ? "#B8A882" : "#8B6914",
                  border: `1px solid ${service.featured ? "#444" : "#D4C49A"}`,
                  padding: "4px 10px",
                  marginBottom: 24,
                }}
              >
                {service.tag}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 28,
                  fontWeight: 600,
                  color: service.featured ? "#FAFAF8" : "#1A1A1A",
                  margin: "0 0 12px",
                  lineHeight: 1.2,
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: service.featured ? "#999" : "#666",
                  margin: "0 0 32px",
                }}
              >
                {service.desc}
              </p>

              {/* Price */}
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 32,
                    fontWeight: 700,
                    color: service.featured ? "#D4C49A" : "#8B6914",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {service.price}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: service.featured ? "#666" : "#AAA",
                    letterSpacing: "0.05em",
                  }}
                >
                  {service.priceNote}
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: service.featured ? "#333" : "#E8E4DC",
                  marginBottom: 24,
                }}
              />

              {/* Features */}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px" }}>
                {service.features.map((f, fi) => (
                  <li
                    key={fi}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: 10,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: service.featured ? "#CCC" : "#555",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: service.featured ? "#D4C49A" : "#8B6914",
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.button
                whileHover={{ x: 4 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: service.featured ? "#D4C49A" : "#1A1A1A",
                  background: "none",
                  border: "none",
                  cursor: "none",
                  padding: 0,
                }}
              >
                {service.cta}
                <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                  <line x1="0" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="0.8" />
                  <polyline points="10,1 14,4 10,7" stroke="currentColor" strokeWidth="0.8" fill="none" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#AAA",
            textAlign: "center",
            marginTop: 32,
            letterSpacing: "0.05em",
          }}
        >
          {t.services.note}
        </motion.p>
      </div>
    </section>
  );
}
