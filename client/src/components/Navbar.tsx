/* Navbar — Considered Authority design system
   Fixed top, warm ivory backdrop on scroll, Cormorant logo
   Gold availability dot, DM Mono nav links, inline lang switcher */

import { useState, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const LANGS: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "zh", label: "中" },
  { code: "ja", label: "日" },
];

export default function Navbar() {
  const { t, locale: lang, setLocale: setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV_LINKS = [
    { label: (t.nav as any).services ?? "Services", href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "oklch(0.985 0.008 80 / 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.88 0.008 80)" : "1px solid transparent",
        transition: "all 0.35s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 3rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "1.2rem",
            fontWeight: 600,
            color: "var(--charcoal)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Bob Qiushao
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 400,
                color: "var(--charcoal-mid)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--charcoal)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--charcoal-mid)")}
            >
              {link.label}
            </a>
          ))}

          {/* Available indicator */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              color: "oklch(0.45 0.14 145)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            <span className="green-pulse" />
            {t.nav.available}
          </span>

          {/* Language switcher */}
          <div style={{ display: "flex", gap: "0.2rem" }}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  padding: "0.2rem 0.45rem",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                  border: "1px solid",
                  borderColor: lang === l.code ? "var(--gold)" : "transparent",
                  color: lang === l.code ? "var(--gold)" : "var(--charcoal-mid)",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  borderRadius: 0,
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", padding: "0.5rem", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: "var(--charcoal)",
                  transition: "all 0.25s ease",
                  transform:
                    open && i === 0 ? "rotate(45deg) translate(4px, 4px)" :
                    open && i === 2 ? "rotate(-45deg) translate(4px, -4px)" :
                    open && i === 1 ? "scaleX(0)" : "none",
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "var(--ivory)",
            borderTop: "1px solid var(--rule)",
            padding: "1rem 3rem 2rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "0.875rem 0",
                borderBottom: "1px solid var(--rule)",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1rem",
                color: "var(--charcoal)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                style={{
                  padding: "0.375rem 0.75rem",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  border: "1px solid",
                  borderColor: lang === l.code ? "var(--gold)" : "var(--rule)",
                  color: lang === l.code ? "var(--gold)" : "var(--charcoal-mid)",
                  background: "transparent",
                  cursor: "pointer",
                  borderRadius: 0,
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .green-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: oklch(0.62 0.18 145);
          display: inline-block;
          animation: gp 2.5s infinite;
        }
        @keyframes gp {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.8); }
        }
        .desktop-nav { display: flex; }
        .mobile-toggle { display: none; }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
