/* GEOMETRIC SILENCE — Contact + Footer: minimal, text-forward, no decoration */
import { useEffect, useRef, useState } from "react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

export default function ContactSection() {
  const { ref, vis } = useReveal();

  return (
    <>
      {/* Contact */}
      <section id="contact" className="gs-section" ref={ref}>
        <div className="gs-container">
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 64,
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(16px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <h2 className="gs-headline">Get in Touch</h2>
            <p className="gs-label">05 / Contact</p>
          </div>

          <div className="gs-rule" style={{ marginBottom: 80 }} />

          {/* Large CTA text */}
          <div
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(20px)",
              transition: "opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease",
            }}
          >
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: "#111111",
                lineHeight: 1.1,
                maxWidth: 700,
                marginBottom: 48,
              }}
            >
              Open to freelance projects,<br />
              collaborations &amp; full-time roles.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 80 }}>
              <a
                href="mailto:contact@example.com"
                className="gs-btn"
              >
                Send an Email ↗
              </a>
              <a
                href="https://github.com/qiubob666-debug"
                target="_blank"
                rel="noopener noreferrer"
                className="gs-btn-outline"
              >
                GitHub Profile ↗
              </a>
            </div>
          </div>

          {/* Contact grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 1,
              background: "#E0E0E0",
              opacity: vis ? 1 : 0,
              transition: "opacity 0.7s 0.3s ease",
            }}
          >
            {[
              { label: "Email", value: "contact@example.com", href: "mailto:contact@example.com" },
              { label: "GitHub", value: "qiubob666-debug", href: "https://github.com/qiubob666-debug" },
              { label: "Location", value: "Remote / Global", href: null },
              { label: "Availability", value: "Open to Work", href: null },
            ].map((item) => (
              <div key={item.label} style={{ background: "#FAFAFA", padding: "32px 36px" }}>
                <p className="gs-label" style={{ marginBottom: 10 }}>{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 16,
                      color: "#111111",
                      letterSpacing: "-0.02em",
                      textDecoration: "none",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {item.value} ↗
                  </a>
                ) : (
                  <p style={{ fontFamily: "Georgia, serif", fontSize: 16, color: "#111111", letterSpacing: "-0.02em" }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E0E0E0", padding: "40px 0", background: "#FAFAFA" }}>
        <div
          className="gs-container"
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}
        >
          <p className="gs-caption">
            © 2024 — Built with React + TypeScript · Deployed on Vercel
          </p>
          <div style={{ display: "flex", gap: 32 }}>
            {[
              { l: "GitHub", h: "https://github.com/qiubob666-debug" },
              { l: "Resume", h: "https://github.com/qiubob666-debug/personal-portfolio-resume" },
            ].map((item) => (
              <a
                key={item.l}
                href={item.h}
                target="_blank"
                rel="noopener noreferrer"
                className="gs-caption"
                style={{ transition: "color 0.15s", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#BCBCBC")}
              >
                {item.l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
