/* GEOMETRIC SILENCE — Nav: thin, flat, no decoration. 1px rule on scroll only. */
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Résumé", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`gs-nav${scrolled ? " scrolled" : ""}`}
      style={{ fontFamily: "inherit" }}
    >
      <div
        className="gs-container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
      >
        {/* Wordmark */}
        <a
          href="#about"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: "-0.03em",
            color: "#111111",
          }}
        >
          Portfolio
        </a>

        {/* Desktop links */}
        <nav
          style={{ display: "flex", gap: 40 }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#767676",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#767676")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* GitHub */}
        <a
          href="https://github.com/qiubob666-debug"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2"
          style={{
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "#767676",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#111111")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#767676")}
        >
          GitHub ↗
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", padding: 4, color: "#111111" }}
          aria-label="Menu"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#111111" strokeWidth="1" style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
            <line x1="0" y1="7" x2="20" y2="7" stroke="#111111" strokeWidth="1" />
            <line x1="0" y1="13" x2="20" y2="13" stroke="#111111" strokeWidth="1" style={{ opacity: open ? 0 : 1, transition: "opacity 0.2s" }} />
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
            borderBottom: "1px solid #E0E0E0",
            padding: "8px 48px 24px",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                fontSize: 15,
                color: "#111111",
                borderBottom: "1px solid #E0E0E0",
                letterSpacing: "-0.01em",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
