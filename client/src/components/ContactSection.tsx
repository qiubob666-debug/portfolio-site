/* ContactSection + Footer — Kinetic Precision
   Dark background section. Email CTA, social links, footer. */

import { motion } from "framer-motion";

const LINKS = [
  { label: "GitHub", href: "https://github.com/qiubob666-debug", external: true },
  { label: "Email", href: "mailto:contact@bobqiushao.online", external: false },
  { label: "Portfolio Repo", href: "https://github.com/qiubob666-debug/portfolio-site", external: true },
];

export default function ContactSection() {
  return (
    <>
      <section id="contact" style={{ background: "#0A0A0A", padding: "120px 0" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ maxWidth: 640 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 28, height: 1, background: "#0057FF" }} />
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555" }}>
                05 — Contact
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(2.5rem, 4.5vw, 4rem)",
                letterSpacing: "-0.03em",
                color: "#FAFAFA",
                lineHeight: 1.05,
                marginBottom: 24,
              }}
            >
              Let's build<br />
              <em style={{ fontStyle: "italic", color: "#444" }}>something together</em>
            </h2>

            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.85, color: "#666", marginBottom: 48, maxWidth: 400 }}>
              Available for freelance projects, technical consulting, and full-time opportunities.
              Response within 24 hours.
            </p>

            <a
              href="mailto:contact@bobqiushao.online"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                border: "1px solid #333", color: "#FAFAFA",
                padding: "14px 32px",
                fontFamily: "'DM Mono', monospace", fontSize: 10,
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", marginBottom: 48,
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FAFAFA"; e.currentTarget.style.color = "#0A0A0A"; e.currentTarget.style.borderColor = "#FAFAFA"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#FAFAFA"; e.currentTarget.style.borderColor = "#333"; }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C853", display: "inline-block" }} />
              contact@bobqiushao.online
            </a>

            <div style={{ display: "flex", gap: 32, borderTop: "1px solid #1A1A1A", paddingTop: 32, flexWrap: "wrap" }}>
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 10,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#444", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAFA")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#444")}
                >
                  {link.label} {link.external && "↗"}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer style={{ background: "#0A0A0A", borderTop: "1px solid #1A1A1A", padding: "24px 0" }}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2A2A2A" }}>
            © 2025 Bob Qiushao
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2A2A2A" }}>
            React · TypeScript · Vite · Vercel
          </span>
          <a
            href="https://github.com/qiubob666-debug/portfolio-site"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#2A2A2A", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#2A2A2A")}
          >
            View Source ↗
          </a>
        </div>
      </footer>
    </>
  );
}
