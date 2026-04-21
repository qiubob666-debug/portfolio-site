/* ProcessSection — Considered Authority
   Design: Warm ivory (#F5F0E8) background, charcoal + gold accent
   Layout: Large numbered expandable steps
   Strategy: Boss journey step 3 — "How does working with you actually work?" */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function ProcessSection() {
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = t.process.steps;

  return (
    <section
      id="process"
      style={{
        padding: "120px 0",
        background: "#F5F0E8",
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
          {t.process.index}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 80 }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#1A1A1A",
              margin: "0 0 20px",
            }}
          >
            {t.process.headline}{" "}
            <em style={{ fontStyle: "italic", color: "#8B6914" }}>
              {t.process.headline_em}
            </em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              lineHeight: 1.8,
              color: "#777",
              maxWidth: 480,
              margin: 0,
            }}
          >
            {t.process.sub}
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr 40px",
                alignItems: "center",
                gap: "0 40px",
                padding: "36px 40px",
                background: activeStep === i ? "#FFFFFF" : "#EDE8DF",
                border: "1px solid",
                borderColor: activeStep === i ? "#D4C49A" : "#E0DAD0",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 64,
                  fontWeight: 700,
                  color: activeStep === i ? "#D4C49A" : "#D8D0C4",
                  lineHeight: 1,
                  transition: "color 0.3s",
                  userSelect: "none",
                }}
              >
                {step.step}
              </div>

              {/* Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#1A1A1A",
                    margin: "0 0 8px",
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <AnimatePresence>
                  {activeStep === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        lineHeight: 1.8,
                        color: "#666",
                        margin: 0,
                        overflow: "hidden",
                      }}
                    >
                      {step.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
                {activeStep !== i && (
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#AAA",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 480,
                    }}
                  >
                    {step.desc}
                  </p>
                )}
              </div>

              {/* Expand indicator */}
              <motion.div
                animate={{ rotate: activeStep === i ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: 32,
                  height: 32,
                  border: "1px solid",
                  borderColor: activeStep === i ? "#D4C49A" : "#CCC8C0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: activeStep === i ? "#8B6914" : "#AAA",
                  fontSize: 20,
                  fontWeight: 300,
                  lineHeight: 1,
                  transition: "border-color 0.3s, color 0.3s",
                }}
              >
                +
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid #E0DAD0",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 32, height: 1, background: "#D4C49A" }} />
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: "#AAA",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {t.process.steps.length} steps · click to expand
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #process [style*="grid-template-columns: 100px"] {
            grid-template-columns: 60px 1fr 32px !important;
            gap: 0 20px !important;
            padding: 24px 20px !important;
          }
          #process [style*="font-size: 64px"] {
            font-size: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
