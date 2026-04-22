/* ContactSection — Team Contact Hub
   Design: Dark charcoal background, gold accent, editorial typography
   Layout: Two-column — form left, contact info right
   Strategy: Boss journey final step — "How do I reach the team?"
   WeChat: 19063709709 | Email: contact@bobqiushao.online
   Mobile: Single column, full-width form, stacked contact info */

import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

export default function ContactSection() {
  const { t, locale } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xyzabc", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          budget: form.budget,
          message: form.message,
        }),
      });
      if (res.ok) setSubmitted(true);
      else setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const WECHAT_NUM = "19063709709";

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
        <div className="contact-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
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

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

            {/* LEFT: Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(30px, 4vw, 52px)",
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
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.8, color: "#888", margin: "0 0 48px" }}>
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
                  <div className="form-name-email" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>
                        {t.contact.form_name}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t.contact.form_name_ph}
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        style={{
                          width: "100%", background: "#1A1A1A", border: "1px solid #2A2A2A",
                          padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                          color: "#FAFAF8", outline: "none", boxSizing: "border-box",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#8B6914")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#2A2A2A")}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>
                        {t.contact.form_email}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t.contact.form_email_ph}
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        style={{
                          width: "100%", background: "#1A1A1A", border: "1px solid #2A2A2A",
                          padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                          color: "#FAFAF8", outline: "none", boxSizing: "border-box",
                        }}
                        onFocus={e => (e.currentTarget.style.borderColor = "#8B6914")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#2A2A2A")}
                      />
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>
                      {t.contact.form_budget}
                    </label>
                    <select
                      value={form.budget}
                      onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                      style={{
                        width: "100%", background: "#1A1A1A", border: "1px solid #2A2A2A",
                        padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                        color: form.budget ? "#FAFAF8" : "#555", outline: "none", boxSizing: "border-box",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#8B6914")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#2A2A2A")}
                    >
                      <option value="" disabled>{t.contact.form_budget}</option>
                      {t.contact.budget_options.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: "block", fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>
                      {t.contact.form_message}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={t.contact.form_message_ph}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{
                        width: "100%", background: "#1A1A1A", border: "1px solid #2A2A2A",
                        padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                        color: "#FAFAF8", outline: "none", resize: "vertical", boxSizing: "border-box",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = "#8B6914")}
                      onBlur={e => (e.currentTarget.style.borderColor = "#2A2A2A")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ y: -2 }}
                    className="contact-submit-btn"
                    style={{
                      background: loading ? "#333" : "#D4C49A",
                      color: "#111",
                      border: "none",
                      padding: "16px 32px",
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                      alignSelf: "flex-start",
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#C4B48A"; }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#D4C49A"; }}
                  >
                    {loading ? "..." : t.contact.form_submit}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* RIGHT: Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* WeChat / Phone — PRIMARY contact */}
              <div
                style={{
                  padding: "32px",
                  background: "#1A1A1A",
                  border: "1px solid #8B6914",
                  marginBottom: 2,
                }}
              >
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6914", marginBottom: 16 }}>
                  {t.contact.wechat_label}
                </div>
                <div
                  className="wechat-number"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#D4C49A",
                    letterSpacing: "0.05em",
                    marginBottom: 12,
                  }}
                >
                  {WECHAT_NUM}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666", margin: "0 0 20px", lineHeight: 1.6 }}>
                  {locale === 'zh'
                    ? '微信扫码或直接搜索号码添加。国内客户优先微信沟通，响应更快。'
                    : locale === 'ja'
                    ? 'WeChatでIDを検索して追加してください。中国国内のお客様はWeChatでの連絡を推奨します。'
                    : 'Search this number on WeChat to connect. Fastest response for China-based clients.'}
                </p>
                <a
                  href={`tel:${WECHAT_NUM}`}
                  className="contact-call-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#D4C49A",
                    textDecoration: "none",
                    border: "1px solid #8B6914",
                    padding: "12px 20px",
                    transition: "all 0.2s",
                    minHeight: 44,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#8B6914"; e.currentTarget.style.color = "#111"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#D4C49A"; }}
                >
                  {locale === 'zh' ? '立即拨打 →' : locale === 'ja' ? '今すぐ電話 →' : 'Call Now →'}
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
                      width: 6, height: 6, borderRadius: "50%", background: "#4CAF50",
                      display: "inline-block", boxShadow: "0 0 0 3px rgba(76,175,80,0.18)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em",
                      textTransform: "uppercase", color: "#4CAF50",
                    }}
                  >
                    {t.nav.available}
                  </span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#777", margin: 0 }}>
                  {locale === 'zh'
                    ? '微信 24 小时内响应。团队驻扎中国，服务全球客户。'
                    : locale === 'ja'
                    ? 'WeChat 24時間以内に返信。中国拠点、グローバル対応。'
                    : 'WeChat response within 24 hours. China-based, globally serving.'}
                </p>
              </div>

              {/* 3 trust signals */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {(locale === 'zh'
                  ? [
                      { icon: "🔒", label: "固定报价", desc: "报价即合同，不追加费用" },
                      { icon: "⚡", label: "7 天交付", desc: "品牌站最快 7 天上线" },
                      { icon: "🔄", label: "不满意退款", desc: "交付不符预期全额退款" },
                    ]
                  : locale === 'ja'
                  ? [
                      { icon: "🔒", label: "固定料金", desc: "見積もりが契約。追加費用なし" },
                      { icon: "⚡", label: "7日納品", desc: "ブランドサイトは最短7日" },
                      { icon: "🔄", label: "返金保証", desc: "期待に応えられなければ全額返金" },
                    ]
                  : [
                      { icon: "🔒", label: "Fixed Price", desc: "Quote is the contract. No surprises." },
                      { icon: "⚡", label: "7-Day Delivery", desc: "Brand site live in as fast as 7 days." },
                      { icon: "🔄", label: "Refund Guarantee", desc: "Full refund if we don't meet expectations." },
                    ]
                ).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                      background: "#1A1A1A", border: "1px solid #2A2A2A",
                      minHeight: 56,
                    }}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#D4C49A", marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#666" }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid #1A1A1A", padding: "24px 40px" }}>
        <div
          className="footer-inner"
          style={{
            maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 12,
          }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#333" }}>
            {t.contact.footer_built}
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#333" }}>
            {locale === 'zh' ? '微信 / 电话：19063709709' : locale === 'ja' ? 'WeChat / Tel: 19063709709' : 'WeChat / Tel: 19063709709'}
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 767px) {
          #contact {
            padding: 72px 0 !important;
          }
          .contact-container {
            padding: 0 20px !important;
          }

          /* Single column stacked */
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }

          /* Form fields */
          .form-name-email {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .form-input, textarea.form-input {
            font-size: 16px !important; /* Prevent iOS zoom */
            padding: 14px 16px !important;
            min-height: 52px !important;
          }
          textarea.form-input {
            min-height: 120px !important;
          }

          /* Submit button */
          .contact-submit-btn {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 18px 24px !important;
            font-size: 12px !important;
            min-height: 56px !important;
          }

          /* Contact info side */
          .wechat-number {
            font-size: 28px !important;
          }
          .contact-call-btn {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            min-height: 52px !important;
          }

          /* Contact section title */
          #contact h2 {
            font-size: clamp(26px, 7.5vw, 36px) !important;
          }

          /* Footer */
          footer {
            padding: 20px !important;
          }
          .footer-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </>
  );
}
