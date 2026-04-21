/* TrustSection.tsx — Considered Authority
   Design: Warm white, gold accents, editorial typography
   Layout: 3×2 trust grid + FAQ accordion below
   Strategy: Boss journey step 3 — "Can I trust this person?" */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function TrustSection() {
  const { t } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="trust"
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
          style={{ marginBottom: 72 }}
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
            {t.trust.index}
          </div>
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
            {t.trust.headline}{" "}
            <em style={{ fontStyle: "italic", color: "#8B6914" }}>
              {t.trust.headline_em}
            </em>
          </h2>
        </motion.div>

        {/* Trust items grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            marginBottom: 80,
          }}
        >
          {t.trust.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                padding: "36px 32px",
                background: "#FFFFFF",
                border: "1px solid #E8E4DC",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  marginBottom: 20,
                  lineHeight: 1,
                }}
              >
                {item.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#1A1A1A",
                  margin: "0 0 12px",
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "#666",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* FAQ section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#B8A882",
              }}
            >
              {t.trust.faq_label}
            </div>
            <div style={{ flex: 1, height: 1, background: "#E8E4DC" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {t.trust.faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E8E4DC",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px 32px",
                    background: "none",
                    border: "none",
                    cursor: "none",
                    textAlign: "left",
                    gap: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      color: "#1A1A1A",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 24,
                      height: 24,
                      border: "1px solid #E8E4DC",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <line x1="5" y1="0" x2="5" y2="10" stroke="#1A1A1A" strokeWidth="1" />
                      <line x1="0" y1="5" x2="10" y2="5" stroke="#1A1A1A" strokeWidth="1" />
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 32px 24px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          lineHeight: 1.8,
                          color: "#666",
                          borderTop: "1px solid #F0EDE6",
                          paddingTop: 20,
                        }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
