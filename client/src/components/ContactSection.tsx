/* ContactSection — Kinetic Precision design system
   Dark background section. Email CTA, social links, footer.
   i18n: reads all text from translations */

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function ContactSection() {
  const { t } = useI18n();

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
                {t.contact.index}
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
              {t.contact.headline}<br />
              <em style={{ fontStyle: "italic", color: "#444" }}>{t.contact.headline_em}</em>
            </h2>

            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.85, color: "#666", marginBottom: 48, maxWidth: 400 }}>
              {t.contact.description}
            </p>

            <a
              href={`mailto:${t.contact.cta}`}
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
              {t.contact.cta}
            </a>

            <div style={{ display: "flex", gap: 32, borderTop: "1px solid #1A1A1A", paddingTop: 32, flexWrap: "wrap" }}>
              {t.contact.links.map((link) => (
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
                  {link.label} {link.external ? "↗" : ""}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#050505", borderTop: "1px solid #111", padding: "24px 0" }}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#333" }}>
            {t.contact.footer_built}
          </span>
          <a
            href="https://github.com/qiubob666-debug/portfolio-site"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#333", textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            {t.contact.footer_source}
          </a>
        </div>
      </footer>
    </>
  );
}
