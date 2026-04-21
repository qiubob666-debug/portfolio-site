/* StackSection — Kinetic Precision
   Interactive Canvas tech constellation (TechGraph) as centerpiece.
   Below: categorized tech tags with hover states.
   No screenshots — the graph IS the portfolio. */

import { motion } from "framer-motion";
import TechGraph from "./TechGraph";

const STACK_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#0057FF",
    items: ["React 19", "TypeScript", "Vite", "Tailwind CSS v4", "Framer Motion", "Wouter", "shadcn/ui", "Recharts"],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#111111",
    items: ["Python 3.11", "FastAPI", "Node.js", "Express", "PHP", "WordPress REST API", "Pydantic", "JWT Auth"],
  },
  {
    id: "infra",
    label: "Infrastructure",
    color: "#555555",
    items: ["Docker Compose", "Nginx", "Vercel", "Railway", "Hostinger VPS", "GitHub Actions", "SSL/TLS", "Reverse Proxy"],
  },
  {
    id: "data",
    label: "Data & Storage",
    color: "#888888",
    items: ["PostgreSQL", "Supabase", "MySQL", "Row Level Security", "GROQ Queries", "Real-time Subscriptions"],
  },
  {
    id: "automation",
    label: "Automation & CMS",
    color: "#0057FF",
    items: ["n8n Workflows", "Sanity CMS", "Webhook Integrations", "Scheduled Pipelines", "Content Sync", "Custom Schemas"],
  },
];

export default function StackSection() {
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
              02 — Technology Stack
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
            The constellation<br />
            <em style={{ fontStyle: "italic", color: "#AAAAAA" }}>of tools I build with</em>
          </h2>
        </motion.div>

        {/* Instruction */}
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0057FF" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#AAAAAA" }}>
            Click any node to see depth — drag to explore
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
          {STACK_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color }} />
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
                  <span key={item} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
