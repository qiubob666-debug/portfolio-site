/* I18nContext — Kinetic Precision
   Auto-detects device language (navigator.language).
   Supports: en, zh, ja. Falls back to 'en'.
   Persists user choice in localStorage. */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Locale, type Translations, translations } from "@/i18n/translations";

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectLocale(): Locale {
  // Check localStorage first (user preference)
  const stored = localStorage.getItem("portfolio-locale") as Locale | null;
  if (stored && ["en", "zh", "ja"].includes(stored)) return stored;

  // Auto-detect from browser/device language
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("zh")) return "zh";
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("portfolio-locale", newLocale);
    // Update html lang attribute for accessibility
    document.documentElement.lang = newLocale === "zh" ? "zh-CN" : newLocale === "ja" ? "ja" : "en";
  };

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale === "ja" ? "ja" : "en";
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
