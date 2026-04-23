/* CapabilitiesSection v4 — Capability Library
   Design: 4 capability domain cards (2x2 grid) + 1 expansion card
   Each card: domain name, tech stack, live case reference, demo link
   Key: Shows technical differentiation, not just business outcomes
   Mobile: 1-column stack */

import { motion } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

interface CapabilityCard {
  number: string;
  domain: string;
  tagline: string;
  items: string[];
  liveCase: string;
  liveCaseUrl: string;
  demoLabel: string;
}

interface MoreCard {
  label: string;
  items: string[];
  note: string;
}

interface CopySingle {
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: CapabilityCard[];
  more: MoreCard;
}

const COPY: Record<Locale, CopySingle> = {
  zh: {
    eyebrow: "CAPABILITY LIBRARY",
    title: "\u6211\u7684\u80fd\u529b\u5e93",
    subtitle: "4 \u7c7b\u5df2\u5b9e\u6218\u9a8c\u8bc1\u7684\u65b9\u6848\u80fd\u529b\uff0c\u6301\u7eed\u6269\u5c55\u4e2d\u3002\u6bcf\u4e00\u9879\u90fd\u5728 Auraloop \u771f\u5b9e\u8fd0\u884c\u8fc7\u3002",
    cards: [
      {
        number: "01",
        domain: "\u8ba4\u8bc1 + \u793e\u533a",
        tagline: "\u8ba9\u7528\u6237\u767b\u5f55\u3001\u7559\u4e0b\u3001\u4e92\u52a8",
        items: [
          "Google OAuth \u4e00\u952e\u767b\u5f55",
          "Supabase \u793e\u533a\u6570\u636e\u5e93",
          "\u90ae\u4ef6 + \u8be2\u76d8\u7ba1\u7406\u7cfb\u7edf",
          "\u7528\u6237\u6743\u9650\u5206\u7ea7\u63a7\u5236",
        ],
        liveCase: "\u5b9e\u6218\u6848\u4f8b\uff1aAuraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u7acb\u523b\u770b\u6f14\u793a \u2192",
      },
      {
        number: "02",
        domain: "\u54c1\u724c\u77e9\u9635",
        tagline: "\u4e00\u5957\u7cfb\u7edf\uff0c\u591a\u4e2a\u54c1\u724c\u95e8\u6237",
        items: [
          "Headless WooCommerce \u96f6\u6210\u672c\u5e73\u66ff Shopify",
          "Vercel \u591a\u524d\u7f00\u57df\u540d\u54c1\u724c\u77e9\u9635",
          "\u591a\u4ea7\u54c1\u7ebf\u72ec\u7acb\u843d\u5730\u9875",
          "SEO \u77e9\u9635\u5168\u8986\u76d6",
        ],
        liveCase: "\u5b9e\u6218\u6848\u4f8b\uff1aAuraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u7acb\u523b\u770b\u6f14\u793a \u2192",
      },
      {
        number: "03",
        domain: "\u5185\u5bb9\u5de5\u5382",
        tagline: "\u5185\u5bb9\u81ea\u52a8\u751f\u4ea7\u3001\u81ea\u52a8\u5206\u53d1",
        items: [
          "n8n \u5de5\u4f5c\u6d41\u81ea\u52a8\u5316\u7f16\u6392",
          "Sanity CMS \u7ed3\u6784\u5316\u5185\u5bb9\u7ba1\u7406",
          "\u591a\u8bed\u8a00 / \u591a\u5e73\u53f0\u81ea\u52a8\u5206\u53d1",
          "AI \u5185\u5bb9\u751f\u6210 + \u5b9a\u65f6\u53d1\u5e03",
        ],
        liveCase: "\u5b9e\u6218\u6848\u4f8b\uff1aAuraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u7acb\u523b\u770b\u6f14\u793a \u2192",
      },
      {
        number: "04",
        domain: "\u524d\u7aef + CDN",
        tagline: "\u9ad8\u5ba1\u7f8e \u00d7 \u9ad8\u6027\u80fd \u00d7 \u9ad8\u8f6c\u5316",
        items: [
          "\u73b0\u4ee3\u8bbe\u8ba1\u8bed\u8a00\uff08Cormorant / DM Sans\uff09",
          "Cloudflare / Vercel \u5168\u7403 CDN",
          "\u9996\u5c4f < 1.5s\uff0cLighthouse \u2265 90",
          "\u9ad8\u8f6c\u5316\u7387\u843d\u5730\u9875\u4f18\u5316",
        ],
        liveCase: "\u5b9e\u6218\u6848\u4f8b\uff1a\u5168\u90e8\u9879\u76ee",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u7acb\u523b\u770b\u6f14\u793a \u2192",
      },
    ],
    more: {
      label: "+ \u66f4\u591a\u80fd\u529b\u5373\u5c06\u52a0\u5165",
      items: [
        "\u9009\u54c1\u7cfb\u7edf / \u7ade\u54c1\u76d1\u63a7",
        "BI \u6570\u636e\u770b\u677f",
        "AI Agent \u81ea\u52a8\u5ba2\u670d",
        "\u591a\u4ed3\u5e93\u5b58\u7ba1\u7406",
      ],
      note: "\u80fd\u529b\u5e93\u6301\u7eed\u6269\u5c55\u4e2d\uff0c\u6bcf\u9879\u80fd\u529b\u5747\u6709\u5b9e\u6218\u9a8c\u8bc1\u540e\u624d\u52a0\u5165\u3002",
    },
  },
  en: {
    eyebrow: "CAPABILITY LIBRARY",
    title: "My Capability Library",
    subtitle: "4 battle-tested capability domains, continuously expanding. Every item has been live in Auraloop.",
    cards: [
      {
        number: "01",
        domain: "Auth + Community",
        tagline: "Let users log in, stay, and engage",
        items: [
          "Google OAuth one-click login",
          "Supabase community database",
          "Email + inquiry management system",
          "Tiered user permission control",
        ],
        liveCase: "Live Case: Auraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "See live demo \u2192",
      },
      {
        number: "02",
        domain: "Brand Matrix",
        tagline: "One system, multiple brand portals",
        items: [
          "Headless WooCommerce as zero-cost Shopify alternative",
          "Vercel multi-prefix domain brand matrix",
          "Independent landing pages per product line",
          "Full SEO matrix coverage",
        ],
        liveCase: "Live Case: Auraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "See live demo \u2192",
      },
      {
        number: "03",
        domain: "Content Factory",
        tagline: "Auto-produce, auto-distribute content",
        items: [
          "n8n workflow automation orchestration",
          "Sanity CMS structured content management",
          "Multi-language / multi-platform auto-distribution",
          "AI content generation + scheduled publishing",
        ],
        liveCase: "Live Case: Auraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "See live demo \u2192",
      },
      {
        number: "04",
        domain: "Frontend + CDN",
        tagline: "High aesthetics x performance x conversion",
        items: [
          "Modern design language (Cormorant / DM Sans)",
          "Cloudflare / Vercel global CDN",
          "First paint < 1.5s, Lighthouse >= 90",
          "High-conversion landing page optimization",
        ],
        liveCase: "Live Case: All projects",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "See live demo \u2192",
      },
    ],
    more: {
      label: "+ More capabilities coming",
      items: [
        "Product selection / competitor monitoring",
        "BI data dashboards",
        "AI Agent auto customer service",
        "Multi-warehouse inventory management",
      ],
      note: "Capability library continuously expanding — each item is added only after real-world validation.",
    },
  },
  ja: {
    eyebrow: "CAPABILITY LIBRARY",
    title: "\u79c1\u306e\u80fd\u529b\u30e9\u30a4\u30d6\u30e9\u30ea",
    subtitle: "\u5b9f\u6226\u691c\u8a3c\u6e08\u307f\u306e4\u3064\u306e\u80fd\u529b\u30c9\u30e1\u30a4\u30f3\u3001\u7d99\u7d9a\u7684\u306b\u62e1\u5f35\u4e2d\u3002\u3059\u3079\u3066Auraloop\u3067\u5b9f\u969b\u306b\u7a3c\u50cd\u3057\u3066\u3044\u307e\u3059\u3002",
    cards: [
      {
        number: "01",
        domain: "\u8a8d\u8a3c + \u30b3\u30df\u30e5\u30cb\u30c6\u30a3",
        tagline: "\u30e6\u30fc\u30b6\u30fc\u306e\u30ed\u30b0\u30a4\u30f3\u30fb\u5b9a\u7740\u30fb\u4ea4\u6d41\u3092\u5b9f\u73fe",
        items: [
          "Google OAuth\u30ef\u30f3\u30af\u30ea\u30c3\u30af\u30ed\u30b0\u30a4\u30f3",
          "Supabase\u30b3\u30df\u30e5\u30cb\u30c6\u30a3\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9",
          "\u30e1\u30fc\u30eb\uff0b\u554f\u3044\u5408\u308f\u305b\u7ba1\u7406\u30b7\u30b9\u30c6\u30e0",
          "\u30e6\u30fc\u30b6\u30fc\u6a29\u9650\u968e\u5c64\u5236\u5fa1",
        ],
        liveCase: "\u5b9f\u6226\u4e8b\u4f8b\uff1aAuraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u30c7\u30e2\u3092\u898b\u308b \u2192",
      },
      {
        number: "02",
        domain: "\u30d6\u30e9\u30f3\u30c9\u30de\u30c8\u30ea\u30c3\u30af\u30b9",
        tagline: "1\u3064\u306e\u30b7\u30b9\u30c6\u30e0\u3067\u8907\u6570\u306e\u30d6\u30e9\u30f3\u30c9\u30dd\u30fc\u30bf\u30eb",
        items: [
          "Headless WooCommerce\u306b\u3088\u308bShopify\u4ee3\u66ff",
          "Vercel\u30de\u30eb\u30c1\u30d7\u30ec\u30d5\u30a3\u30c3\u30af\u30b9\u30c9\u30e1\u30a4\u30f3",
          "\u88fd\u54c1\u30e9\u30a4\u30f3\u3054\u3068\u306e\u72ec\u7acb\u30e9\u30f3\u30c7\u30a3\u30f3\u30b0\u30da\u30fc\u30b8",
          "SEO\u30de\u30c8\u30ea\u30c3\u30af\u30b9\u5b8c\u5168\u30ab\u30d0\u30fc",
        ],
        liveCase: "\u5b9f\u6226\u4e8b\u4f8b\uff1aAuraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u30c7\u30e2\u3092\u898b\u308b \u2192",
      },
      {
        number: "03",
        domain: "\u30b3\u30f3\u30c6\u30f3\u30c4\u30d5\u30a1\u30af\u30c8\u30ea\u30fc",
        tagline: "\u30b3\u30f3\u30c6\u30f3\u30c4\u306e\u81ea\u52d5\u751f\u7523\u30fb\u81ea\u52d5\u914d\u4fe1",
        items: [
          "n8n\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u81ea\u52d5\u5316\u30aa\u30fc\u30b1\u30b9\u30c8\u30ec\u30fc\u30b7\u30e7\u30f3",
          "Sanity CMS\u69cb\u9020\u5316\u30b3\u30f3\u30c6\u30f3\u30c4\u7ba1\u7406",
          "\u591a\u8a00\u8a9e/\u591a\u30d7\u30e9\u30c3\u30c8\u30d5\u30a9\u30fc\u30e0\u81ea\u52d5\u914d\u4fe1",
          "AI\u30b3\u30f3\u30c6\u30f3\u30c4\u751f\u6210\uff0b\u30b9\u30b1\u30b8\u30e5\u30fc\u30eb\u516c\u958b",
        ],
        liveCase: "\u5b9f\u6226\u4e8b\u4f8b\uff1aAuraloop",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u30c7\u30e2\u3092\u898b\u308b \u2192",
      },
      {
        number: "04",
        domain: "\u30d5\u30ed\u30f3\u30c8\u30a8\u30f3\u30c9 + CDN",
        tagline: "\u9ad8\u5be9\u7f8e \u00d7 \u9ad8\u6027\u80fd \u00d7 \u9ad8\u30b3\u30f3\u30d0\u30fc\u30b8\u30e7\u30f3",
        items: [
          "\u30e2\u30c0\u30f3\u30c7\u30b6\u30a4\u30f3\u8a00\u8a9e\uff08Cormorant / DM Sans\uff09",
          "Cloudflare / Vercel\u30b0\u30ed\u30fc\u30d0\u30ebCDN",
          "\u521d\u56de\u63cf\u753b < 1.5\u79d2\u3001Lighthouse >= 90",
          "\u9ad8\u30b3\u30f3\u30d0\u30fc\u30b8\u30e7\u30f3\u30e9\u30f3\u30c7\u30a3\u30f3\u30b0\u30da\u30fc\u30b8\u6700\u9069\u5316",
        ],
        liveCase: "\u5b9f\u6226\u4e8b\u4f8b\uff1a\u5168\u30d7\u30ed\u30b8\u30a7\u30af\u30c8",
        liveCaseUrl: "https://auraloop.bobqiushao.online",
        demoLabel: "\u30c7\u30e2\u3092\u898b\u308b \u2192",
      },
    ],
    more: {
      label: "+ \u3055\u3089\u306a\u308b\u80fd\u529b\u304c\u8ffd\u52a0\u4e88\u5b9a",
      items: [
        "\u5546\u54c1\u9078\u5b9a/\u7af6\u5408\u30e2\u30cb\u30bf\u30ea\u30f3\u30b0",
        "BI\u30c7\u30fc\u30bf\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9",
        "AI\u30a8\u30fc\u30b8\u30a7\u30f3\u30c8\u81ea\u52d5\u30ab\u30b9\u30bf\u30de\u30fc\u30b5\u30fc\u30d3\u30b9",
        "\u30de\u30eb\u30c1\u5009\u5eab\u5728\u5eab\u7ba1\u7406",
      ],
      note: "\u80fd\u529b\u30e9\u30a4\u30d6\u30e9\u30ea\u306f\u7d99\u7d9a\u7684\u306b\u62e1\u5f35\u4e2d\u2014\u2014\u5404\u9805\u76ee\u306f\u5b9f\u6226\u691c\u8a3c\u5f8c\u306b\u306e\u307f\u8ffd\u52a0\u3055\u308c\u307e\u3059\u3002",
    },
  },
};

export default function CapabilitiesSection() {
  const { locale } = useI18n();
  const c = COPY[locale];

  return (
    <section id="capabilities" className="cap-section">
      <div className="cap-container">
        <motion.div
          className="cap-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cap-eyebrow">{c.eyebrow}</div>
          <h2 className="cap-title">{c.title}</h2>
          <p className="cap-subtitle">{c.subtitle}</p>
        </motion.div>

        <div className="cap-grid">
          {c.cards.map((card, i) => (
            <motion.div
              key={card.number}
              className="cap-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="cap-card-number">{card.number}</div>
              <div className="cap-card-domain">{card.domain}</div>
              <div className="cap-card-tagline">{card.tagline}</div>
              <ul className="cap-card-list">
                {card.items.map((item) => (
                  <li key={item} className="cap-card-item">
                    <span className="cap-card-dot">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="cap-card-footer">
                <div className="cap-card-live">
                  <span className="cap-live-dot" />
                  {card.liveCase}
                </div>
                <a
                  href={card.liveCaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cap-card-demo"
                >
                  {card.demoLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="cap-more"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="cap-more-label">{c.more.label}</div>
          <div className="cap-more-items">
            {c.more.items.map((item) => (
              <span key={item} className="cap-more-item">{item}</span>
            ))}
          </div>
          <p className="cap-more-note">{c.more.note}</p>
        </motion.div>
      </div>

      <style>{`
        .cap-section {
          background: #FAFAF8;
          padding: 120px 0;
        }
        .cap-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }
        .cap-header { margin-bottom: 64px; }
        .cap-eyebrow {
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8B6914;
          margin-bottom: 20px;
        }
        .cap-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 600;
          color: #111111;
          margin: 0 0 12px;
          line-height: 1.1;
        }
        .cap-subtitle {
          font-family: "DM Sans", sans-serif;
          font-size: 15px;
          color: #666;
          max-width: 560px;
          line-height: 1.7;
          margin: 0;
        }
        .cap-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
          margin-bottom: 2px;
        }
        .cap-card {
          background: #111111;
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-height: 360px;
          transition: background 0.2s;
        }
        .cap-card:hover { background: #161616; }
        .cap-card-number {
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.2);
          margin-bottom: 20px;
        }
        .cap-card-domain {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 600;
          color: #FAFAF8;
          letter-spacing: -0.01em;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .cap-card-tagline {
          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 28px;
          line-height: 1.5;
        }
        .cap-card-list {
          list-style: none;
          padding: 0;
          margin: 0 0 auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cap-card-item {
          font-family: "DM Sans", sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.5;
        }
        .cap-card-dot {
          color: #8B6914;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .cap-card-footer {
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .cap-card-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: "DM Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
        }
        .cap-live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2ECC71;
          flex-shrink: 0;
          animation: cap-pulse 2s ease-in-out infinite;
        }
        @keyframes cap-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .cap-card-demo {
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #D4C49A;
          text-decoration: none;
          transition: opacity 0.2s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .cap-card-demo:hover { opacity: 0.6; }
        .cap-more {
          background: #F0EDE6;
          padding: 40px 44px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cap-more-label {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 500;
          color: #111111;
        }
        .cap-more-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cap-more-item {
          font-family: "DM Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #666;
          background: rgba(0,0,0,0.06);
          padding: 6px 12px;
          border-radius: 2px;
        }
        .cap-more-note {
          font-family: "DM Sans", sans-serif;
          font-size: 12px;
          color: #999;
          margin: 0;
          line-height: 1.6;
        }
        @media (max-width: 767px) {
          .cap-container { padding: 0 20px; }
          .cap-section { padding: 80px 0; }
          .cap-grid { grid-template-columns: 1fr; }
          .cap-card { padding: 36px 28px; min-height: auto; }
          .cap-more { padding: 32px 28px; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .cap-card { padding: 36px 32px; }
        }
      `}</style>
    </section>
  );
}
