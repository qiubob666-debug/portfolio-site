/* ContactSection — Considered Authority
   Design: Dark charcoal background, gold accent, editorial typography
   Layout: Two-column — form left, info right
   Strategy: Boss journey final step — "How do I reach this person?" */

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function ContactSection() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire to Formspree or EmailJS
    setSubmitted(true);
  };

  return (
    <>
      <section
        id="contact"
        style={{
          padding: "120px 0",
          background: "#111111",
          borderTop: "1px solid #222",
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
            {t.contact.index}
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            {/* Left: form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  color: "#FAFAF8",
                  margin: "0 0 16px",
                }}
              >
                {t.contact.headline}
                <br />
                <em style={{ fontStyle: "italic", color: "#D4C49A" }}>
                  {t.contact.headline_em}
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
                {t.contact.description}
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "32px",
                    border: "1px solid #2A2A2A",
                    background: "#1A1A1A",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    color: "#D4C49A",
                    lineHeight: 1.6,
                  }}
                >
                  ✓ {t.contact.form_success}
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Name + Email row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#666",
                          marginBottom: 8,
                        }}
                      >
                        {t.contact.form_name}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.contact.form_name_ph}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={{
                          width: "100%",
                          background: "#1A1A1A",
                          border: "1px solid #2A2A2A",
                          color: "#FAFAF8",
                          padding: "14px 16px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#D4C49A")}
                        onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#666",
                          marginBottom: 8,
                        }}
                      >
                        {t.contact.form_email}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t.contact.form_email_ph}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={{
                          width: "100%",
                          background: "#1A1A1A",
                          border: "1px solid #2A2A2A",
                          color: "#FAFAF8",
                          padding: "14px 16px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#D4C49A")}
                        onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                      />
                    </div>
                  </div>

                  {/* Budget select */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#666",
                        marginBottom: 8,
                      }}
                    >
                      {t.contact.form_budget}
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      style={{
                        width: "100%",
                        background: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        color: form.budget ? "#FAFAF8" : "#555",
                        padding: "14px 16px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        outline: "none",
                        boxSizing: "border-box",
                        cursor: "none",
                        appearance: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#D4C49A")}
                      onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                    >
                      <option value="" disabled>—</option>
                      {t.contact.budget_options.map((opt) => (
                        <option key={opt} value={opt} style={{ background: "#1A1A1A" }}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#666",
                        marginBottom: 8,
                      }}
                    >
                      {t.contact.form_message}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={t.contact.form_message_ph}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{
                        width: "100%",
                        background: "#1A1A1A",
                        border: "1px solid #2A2A2A",
                        color: "#FAFAF8",
                        padding: "14px 16px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        outline: "none",
                        boxSizing: "border-box",
                        resize: "vertical",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#D4C49A")}
                      onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      background: "#D4C49A",
                      color: "#1A1A1A",
                      border: "none",
                      padding: "16px 32px",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "none",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#C8B480")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#D4C49A")}
                  >
                    {t.contact.form_submit}
                    <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
                      <line x1="0" y1="3.5" x2="12" y2="3.5" stroke="currentColor" strokeWidth="0.8" />
                      <polyline points="8,1 12,3.5 8,6" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    </svg>
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Right: info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ paddingTop: 120 }}
            >
              {/* Direct email */}
              <div style={{ marginBottom: 48 }}>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#555",
                    marginBottom: 12,
                  }}
                >
                  Direct
                </div>
                <a
                  href={`mailto:${t.contact.cta}`}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 22,
                    color: "#D4C49A",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FAFAF8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#D4C49A")}
                >
                  {t.contact.cta}
                  <span style={{ fontSize: 14 }}>↗</span>
                </a>
              </div>

              {/* Response time */}
              <div
                style={{
                  padding: "24px 28px",
                  background: "#1A1A1A",
                  border: "1px solid #2A2A2A",
                  marginBottom: 32,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#4CAF50",
                      display: "inline-block",
                      boxShadow: "0 0 0 3px rgba(76,175,80,0.18)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#4CAF50",
                    }}
                  >
                    {t.nav.available}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "#777",
                    margin: 0,
                  }}
                >
                  Typical response within 24 hours. Based in China, working globally.
                </p>
              </div>

              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {t.contact.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 20px",
                      background: "#1A1A1A",
                      border: "1px solid #2A2A2A",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      color: "#888",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#222";
                      e.currentTarget.style.color = "#D4C49A";
                      e.currentTarget.style.borderColor = "#3A3A3A";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#1A1A1A";
                      e.currentTarget.style.color = "#888";
                      e.currentTarget.style.borderColor = "#2A2A2A";
                    }}
                  >
                    {link.label}
                    <span>{link.external ? "↗" : "→"}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#0A0A0A",
          borderTop: "1px solid #1A1A1A",
          padding: "24px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#333",
            }}
          >
            {t.contact.footer_built}
          </span>
          <a
            href="https://github.com/qiubob666-debug/portfolio-site"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#333",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D4C49A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            {t.contact.footer_source}
          </a>
        </div>
      </footer>
    </>
  );
}
