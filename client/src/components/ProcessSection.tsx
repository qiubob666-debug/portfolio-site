/* ProcessSection — Kinetic Precision design system
   Shows HOW I think, not just what I built.
   Architecture decisions, tech selection reasoning, system design.
   This replaces screenshots with intellectual proof of capability.
   i18n: reads workflow steps and ADR decisions from translations */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function ProcessSection() {
  const { t } = useI18n();
  const [activeDecision, setActiveDecision] = useState<string | null>(null);

  return (
    <section id="process" style={{ background: "#FFFFFF", padding: "120px 0", borderTop: "1px solid #E8E8E8" }}>
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
              {t.process.index}
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              lineHeight: 1.1,
            }}
          >
            {t.process.headline}<br />
            <em style={{ fontStyle: "italic", color: "#AAAAAA" }}>{t.process.headline_em}</em>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px" }} className="process-grid">

          {/* Left: Workflow steps */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0057FF" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#AAAAAA" }}>
                {t.process.workflow_label}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {t.process.workflow.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: "0 20px",
                    paddingBottom: 32,
                    position: "relative",
                  }}
                >
                  {/* Connector line */}
                  {i < t.process.workflow.length - 1 && (
                    <div style={{
                      position: "absolute",
                      left: 19,
                      top: 24,
                      bottom: 0,
                      width: 1,
                      background: "#E8E8E8",
                    }} />
                  )}

                  {/* Step number */}
                  <div style={{
                    width: 38,
                    height: 38,
                    border: "1px solid #E8E8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FAFAFA",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 1,
                  }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", color: "#AAAAAA" }}>
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 15, color: "#0A0A0A", marginBottom: 6 }}>
                      {step.title}
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.7, color: "#888" }}>
                      {step.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: ADR accordion */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0A0A0A" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#AAAAAA" }}>
                {t.process.adr_label}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {t.process.decisions.map((decision, i) => (
                <motion.div
                  key={decision.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  style={{ borderBottom: "1px solid #E8E8E8" }}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setActiveDecision(activeDecision === decision.id ? null : decision.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "20px 0",
                      background: "none",
                      border: "none",
                      cursor: "none",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 15, color: "#0A0A0A", marginBottom: 6 }}>
                        {decision.title}
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        {decision.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: "'DM Mono', monospace",
                              fontSize: 8,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "#888",
                              border: "1px solid #E8E8E8",
                              padding: "2px 6px",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        border: "1px solid #E8E8E8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                        transition: "transform 0.3s",
                        transform: activeDecision === decision.id ? "rotate(45deg)" : "none",
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <line x1="4" y1="0" x2="4" y2="8" stroke="#0A0A0A" strokeWidth="0.8" />
                        <line x1="0" y1="4" x2="8" y2="4" stroke="#0A0A0A" strokeWidth="0.8" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion body */}
                  <AnimatePresence>
                    {activeDecision === decision.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ paddingBottom: 24 }}>
                          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.7, color: "#555", marginBottom: 16 }}>
                            {decision.summary}
                          </p>
                          <div style={{ marginBottom: 16 }}>
                            {decision.reasoning.map((r, ri) => (
                              <div key={ri} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0057FF", flexShrink: 0, marginTop: 6 }} />
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, lineHeight: 1.6, color: "#666" }}>{r}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{
                            borderLeft: "2px solid #E8E8E8",
                            paddingLeft: 14,
                            fontFamily: "'DM Mono', monospace",
                            fontSize: 10,
                            lineHeight: 1.6,
                            color: "#AAAAAA",
                            fontStyle: "italic",
                          }}>
                            {decision.tradeoff}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr !important; gap: 64px 0 !important; }
        }
      `}</style>
    </section>
  );
}
