/* Navbar — Kinetic Precision design system
   Fixed top bar, hairline border on scroll, left-anchored identity,
   right nav links with animated underline, availability indicator */

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Stack", href: "#stack" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(250,250,250,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #E8E8E8" : "1px solid transparent",
        transition: "border-color 0.3s",
      }}
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}
      >
        {/* Identity mark */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 18,
              height: 18,
              border: "1px solid #0A0A0A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 7, height: 7, background: "#0057FF" }} />
          </div>
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0A0A0A",
            }}
          >
            Bob Qiushao
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ gap: 36, alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#555",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Availability CTA */}
        <a
          href="mailto:contact@bobqiushao.online"
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: 8,
            border: "1px solid #0A0A0A",
            padding: "7px 16px",
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#0A0A0A",
            textDecoration: "none",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0A0A0A";
            e.currentTarget.style.color = "#FAFAFA";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#0A0A0A";
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00C853",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
          Available
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", padding: 4, cursor: "none" }}
          aria-label="Menu"
        >
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#111" strokeWidth="1" />
            <line x1="0" y1="6" x2="20" y2="6" stroke="#111" strokeWidth="1" />
            <line x1="0" y1="11.5" x2="20" y2="11.5" stroke="#111" strokeWidth="1" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 0,
            right: 0,
            background: "#FAFAFA",
            borderBottom: "1px solid #E8E8E8",
            padding: "8px 24px 24px",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#0A0A0A",
                borderBottom: "1px solid #E8E8E8",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
