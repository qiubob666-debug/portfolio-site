/* LanguageSwitcher — Kinetic Precision
   Minimal dropdown: EN / 中文 / 日本語
   Sits in Navbar top-right, before the availability badge. */

import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

const LANGS: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "zh", label: "中文", short: "中" },
  { code: "ja", label: "日本語", short: "日" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === locale) ?? LANGS[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          border: "1px solid #E8E8E8",
          background: "transparent",
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#555",
          cursor: "none",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#0A0A0A"; e.currentTarget.style.color = "#0A0A0A"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E8E8"; e.currentTarget.style.color = "#555"; }}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeWidth="0.8" />
          <path d="M5 0.5 C3.5 2.5 3.5 7.5 5 9.5 M5 0.5 C6.5 2.5 6.5 7.5 5 9.5" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0.5 5 H9.5" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        {current.short}
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
        >
          <path d="M1.5 3L4 5.5L6.5 3" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            background: "#FFFFFF",
            border: "1px solid #E8E8E8",
            minWidth: 110,
            zIndex: 200,
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {LANGS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLocale(lang.code); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "10px 14px",
                background: locale === lang.code ? "#F5F5F5" : "transparent",
                border: "none",
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.08em",
                color: locale === lang.code ? "#0A0A0A" : "#888",
                cursor: "none",
                textAlign: "left",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F5F5F5"; e.currentTarget.style.color = "#0A0A0A"; }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = locale === lang.code ? "#F5F5F5" : "transparent";
                e.currentTarget.style.color = locale === lang.code ? "#0A0A0A" : "#888";
              }}
            >
              <span>{lang.label}</span>
              {locale === lang.code && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3.5 6L6.5 2" stroke="#0057FF" strokeWidth="1" strokeLinecap="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
