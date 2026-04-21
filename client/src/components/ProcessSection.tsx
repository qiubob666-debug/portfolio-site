/* ProcessSection — Kinetic Precision
   Shows HOW I think, not just what I built.
   Architecture decisions, tech selection reasoning, system design.
   This replaces screenshots with intellectual proof of capability. */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DECISIONS = [
  {
    id: "adr-001",
    title: "Why Sanity over Contentful",
    category: "Architecture Decision",
    tags: ["CMS", "TypeScript", "GROQ"],
    summary: "Chose Sanity for its schema-as-code approach and GROQ query language, enabling type-safe content modeling and real-time sync with React frontends.",
    reasoning: [
      "Schema defined in TypeScript — version-controlled, reviewable, testable",
      "GROQ queries co-locate data requirements with components",
      "Real-time listener API enables live content preview without polling",
      "Studio customization allows client-specific editorial workflows",
    ],
    tradeoff: "Higher learning curve than Contentful, but full ownership of content model structure.",
  },
  {
    id: "adr-002",
    title: "Docker Compose over Kubernetes",
    category: "Infrastructure Decision",
    tags: ["Docker", "DevOps", "Scalability"],
    summary: "For current project scale (1–3 services), Compose provides 90% of K8s benefits with 10% of the operational complexity.",
    reasoning: [
      "Single-host deployments don't need orchestration overhead",
      "Compose files serve as executable infrastructure documentation",
      "Nginx reverse proxy handles routing and SSL termination cleanly",
      "Migration path to K8s is clear when horizontal scaling is needed",
    ],
    tradeoff: "No auto-scaling or self-healing. Acceptable for current traffic profiles.",
  },
  {
    id: "adr-003",
    title: "n8n for Automation over Custom Scripts",
    category: "Automation Decision",
    tags: ["n8n", "Automation", "Workflows"],
    summary: "Visual workflow builder reduces time-to-automation by 70% for integration tasks, while still allowing custom code nodes for complex logic.",
    reasoning: [
      "300+ built-in integrations eliminate boilerplate HTTP clients",
      "Visual debugger makes workflow state inspection intuitive",
      "Self-hosted on Docker — full data sovereignty",
      "Webhook triggers enable event-driven architecture without polling",
    ],
    tradeoff: "Not suitable for high-throughput data processing. Python scripts handle those cases.",
  },
  {
    id: "adr-004",
    title: "Supabase over Firebase",
    category: "Database Decision",
    tags: ["PostgreSQL", "Auth", "RLS"],
    summary: "PostgreSQL's relational model and Row Level Security provide stronger data integrity guarantees than Firebase's document model for structured data.",
    reasoning: [
      "SQL joins eliminate denormalization complexity",
      "Row Level Security enforces access control at database level",
      "Open-source — self-hostable, no vendor lock-in",
      "PostgREST auto-generates REST API from schema",
    ],
    tradeoff: "Cold start latency on free tier. Mitigated with connection pooling.",
  },
];

const WORKFLOW_STEPS = [
  { step: "01", title: "Requirement Analysis", desc: "Break down user needs into data models and API contracts before writing any code." },
  { step: "02", title: "Architecture Decision", desc: "Document tech choices with explicit tradeoffs. ADRs live in the repository." },
  { step: "03", title: "Infrastructure First", desc: "Docker Compose stack defined before application code. Environment parity from day one." },
  { step: "04", title: "API Contract", desc: "OpenAPI spec or TypeScript interfaces defined before implementation begins." },
  { step: "05", title: "Build & Iterate", desc: "Feature branches, PR reviews, automated deployment on merge to main." },
  { step: "06", title: "Monitor & Automate", desc: "n8n workflows handle recurring tasks. Logs and alerts configured from launch." },
];

export default function ProcessSection() {
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
              03 — Engineering Process
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              lineHeight: 1.1,
              maxWidth: 520,
            }}
          >
            How I think,<br />
            <em style={{ fontStyle: "italic", color: "#AAAAAA" }}>not just what I built</em>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          {/* Left: Workflow steps */}
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: 32 }}>
              Development Workflow
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {WORKFLOW_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: 20,
                    padding: "20px 0",
                    borderBottom: "1px solid #F0F0F0",
                  }}
                >
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#CCCCCC", paddingTop: 2 }}>
                    {step.step}
                  </span>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#0A0A0A", marginBottom: 4, letterSpacing: "0.02em" }}>
                      {step.title}
                    </div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#888", lineHeight: 1.6 }}>
                      {step.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Architecture decisions */}
          <div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#AAAAAA", marginBottom: 32 }}>
              Architecture Decisions (ADR)
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {DECISIONS.map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  {/* Decision header */}
                  <button
                    onClick={() => setActiveDecision(activeDecision === d.id ? null : d.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      background: "none",
                      border: "none",
                      borderBottom: "1px solid #F0F0F0",
                      cursor: "none",
                      textAlign: "left",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0057FF", marginBottom: 4 }}>
                        {d.category}
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#0A0A0A", letterSpacing: "0.01em" }}>
                        {d.title}
                      </div>
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#CCCCCC", flexShrink: 0, marginTop: 8 }}>
                      {activeDecision === d.id ? "−" : "+"}
                    </span>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {activeDecision === d.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ padding: "16px 0 20px", borderBottom: "1px solid #F0F0F0" }}>
                          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>
                            {d.summary}
                          </p>
                          <div style={{ marginBottom: 12 }}>
                            {d.reasoning.map((r, ri) => (
                              <div key={ri} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                                <span style={{ color: "#0057FF", fontSize: 10, flexShrink: 0, marginTop: 2 }}>→</span>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#666", lineHeight: 1.6 }}>{r}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#AAAAAA", flexShrink: 0, marginTop: 1 }}>
                              Tradeoff:
                            </span>
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#888", lineHeight: 1.6 }}>
                              {d.tradeoff}
                            </span>
                          </div>
                          <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                            {d.tags.map((tag) => (
                              <span key={tag} className="tech-tag">{tag}</span>
                            ))}
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

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          #process .container > div:last-child { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
