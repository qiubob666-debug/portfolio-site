/* ROISection — Boss Wallet Logic
   Design: Dark charcoal bg, gold accent, stark contrast
   Layout: 3-column comparison table + animated cost counter
   Strategy: Boss journey step 1 — "Show me the math"
   Key message: Hiring a team costs ¥30k+/month. I cost a fraction. Here's the proof. */

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";
import type { Locale } from "@/i18n/translations";

// ─── Copy ────────────────────────────────────────────────────────────────────

const COPY: Record<Locale, {
  eyebrow: string;
  title: string;
  subtitle: string;
  colHeaders: [string, string, string];
  rows: { label: string; agency: string; team: string; me: string; highlight?: boolean }[];
  savingsLabel: string;
  savingsValue: string;
  savingsNote: string;
  timelineTitle: string;
  timelineRows: { phase: string; agency: string; me: string }[];
}> = {
  en: {
    eyebrow: "THE MATH",
    title: "What you're actually paying for",
    subtitle: "Compare the real cost of building and running a cross-border e-commerce store — agency, in-house team, or working with me.",
    colHeaders: ["Agency / Outsource", "In-House Team", "Work with Bob"],
    rows: [
      { label: "Brand website", agency: "¥15,000–50,000", team: "¥30,000+", me: "¥3,800", highlight: true },
      { label: "Full e-commerce store", agency: "¥30,000–120,000", team: "¥80,000+", me: "¥8,800", highlight: true },
      { label: "Monthly maintenance", agency: "¥2,000–8,000/mo", team: "¥15,000/mo (salary)", me: "¥800/mo" },
      { label: "SEO setup", agency: "¥5,000–20,000", team: "Extra hire needed", me: "Included" },
      { label: "Order automation", agency: "Not included", team: "Dev time required", me: "Included" },
      { label: "Social media auto-post", agency: "Not included", team: "Extra hire needed", me: "Included" },
      { label: "CMS + content dashboard", agency: "¥5,000–15,000", team: "Dev time required", me: "Included" },
      { label: "Delivery timeline", agency: "60–90 days", team: "3–6 months", me: "7–21 days", highlight: true },
    ],
    savingsLabel: "Your estimated annual savings vs. in-house team",
    savingsValue: "¥278,000",
    savingsNote: "Based on avg. Shenzhen salary data from Boss直聘 (2024): Shopify dev ¥15k/mo, content ops ¥8k/mo, designer ¥10k/mo",
    timelineTitle: "Delivery speed comparison",
    timelineRows: [
      { phase: "Brand website", agency: "60 days", me: "7 days" },
      { phase: "E-commerce store", agency: "90 days", me: "21 days" },
      { phase: "Automation setup", agency: "Not offered", me: "3 days" },
      { phase: "First revision", agency: "7–14 days", me: "24 hours" },
    ],
  },
  zh: {
    eyebrow: "成本算法",
    title: "你实际在为什么付费？",
    subtitle: "对比搭建和运营跨境电商独立站的真实成本——外包机构、自建团队，还是找我合作。",
    colHeaders: ["外包机构", "自建团队", "找 Bob 合作"],
    rows: [
      { label: "品牌官网", agency: "¥15,000–50,000", team: "¥30,000+", me: "¥3,800", highlight: true },
      { label: "完整电商独立站", agency: "¥30,000–120,000", team: "¥80,000+", me: "¥8,800", highlight: true },
      { label: "月度维护", agency: "¥2,000–8,000/月", team: "¥15,000/月（工资）", me: "¥800/月" },
      { label: "SEO 优化", agency: "¥5,000–20,000", team: "需额外招人", me: "已包含" },
      { label: "订单自动化", agency: "不包含", team: "需开发时间", me: "已包含" },
      { label: "社媒自动发布", agency: "不包含", team: "需额外招人", me: "已包含" },
      { label: "CMS 内容管理后台", agency: "¥5,000–15,000", team: "需开发时间", me: "已包含" },
      { label: "交付周期", agency: "60–90 天", team: "3–6 个月", me: "7–21 天", highlight: true },
    ],
    savingsLabel: "对比自建团队，你的预估年节省金额",
    savingsValue: "¥278,000",
    savingsNote: "数据来源：Boss直聘 2024 年深圳薪资数据：Shopify 开发 ¥15k/月、内容运营 ¥8k/月、设计师 ¥10k/月",
    timelineTitle: "交付速度对比",
    timelineRows: [
      { phase: "品牌官网", agency: "60 天", me: "7 天" },
      { phase: "电商独立站", agency: "90 天", me: "21 天" },
      { phase: "自动化搭建", agency: "不提供", me: "3 天" },
      { phase: "首次修改", agency: "7–14 天", me: "24 小时" },
    ],
  },
  ja: {
    eyebrow: "コスト計算",
    title: "実際に何にお金を払っているか",
    subtitle: "越境EC独立サイトの構築・運営にかかる本当のコストを比較 — 外注、社内チーム、Bob との協業。",
    colHeaders: ["外注エージェンシー", "社内チーム", "Bobと協業"],
    rows: [
      { label: "ブランドサイト", agency: "¥15,000–50,000", team: "¥30,000以上", me: "¥3,800", highlight: true },
      { label: "完全ECストア", agency: "¥30,000–120,000", team: "¥80,000以上", me: "¥8,800", highlight: true },
      { label: "月次メンテナンス", agency: "¥2,000–8,000/月", team: "¥15,000/月（給与）", me: "¥800/月" },
      { label: "SEO設定", agency: "¥5,000–20,000", team: "追加採用が必要", me: "含む" },
      { label: "注文自動化", agency: "含まない", team: "開発時間が必要", me: "含む" },
      { label: "SNS自動投稿", agency: "含まない", team: "追加採用が必要", me: "含む" },
      { label: "CMSダッシュボード", agency: "¥5,000–15,000", team: "開発時間が必要", me: "含む" },
      { label: "納期", agency: "60〜90日", team: "3〜6ヶ月", me: "7〜21日", highlight: true },
    ],
    savingsLabel: "社内チーム比 年間推定節約額",
    savingsValue: "¥278,000",
    savingsNote: "出典：Boss直聘 2024年深セン給与データ：Shopify開発 ¥15k/月、コンテンツ運用 ¥8k/月、デザイナー ¥10k/月",
    timelineTitle: "納期比較",
    timelineRows: [
      { phase: "ブランドサイト", agency: "60日", me: "7日" },
      { phase: "ECストア", agency: "90日", me: "21日" },
      { phase: "自動化設定", agency: "提供なし", me: "3日" },
      { phase: "初回修正", agency: "7〜14日", me: "24時間" },
    ],
  },
};

// ─── Animated counter ────────────────────────────────────────────────────────

function AnimatedNumber({ target, prefix = "" }: { target: number; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}</span>;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ROISection() {
  const { locale } = useI18n();
  const c = COPY[locale];

  return (
    <section
      id="roi"
      style={{
        background: "#111111",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "60px 60px", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 72 }}
        >
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.25em",
            textTransform: "uppercase", color: "#8B6914", marginBottom: 20,
          }}>
            {c.eyebrow}
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 600,
            color: "#FAFAF8", margin: "0 0 20px", lineHeight: 1.1,
          }}>
            {c.title}
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: "rgba(255,255,255,0.45)", maxWidth: 600, lineHeight: 1.75,
          }}>
            {c.subtitle}
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{ marginBottom: 80, overflowX: "auto" }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
                  padding: "0 0 20px", textAlign: "left", fontWeight: 400,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}>
                  {locale === "zh" ? "服务项目" : locale === "ja" ? "サービス項目" : "Service"}
                </th>
                {c.colHeaders.map((h, i) => (
                  <th key={i} style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.15em",
                    textTransform: "uppercase", padding: "0 0 20px 24px", textAlign: "right",
                    fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.08)",
                    color: i === 2 ? "#D4C49A" : "rgba(255,255,255,0.3)",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: row.highlight ? "rgba(139,105,20,0.06)" : "transparent",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = row.highlight ? "rgba(139,105,20,0.06)" : "transparent")}
                >
                  <td style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    color: "rgba(255,255,255,0.7)", padding: "16px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    {row.highlight && (
                      <span style={{ width: 3, height: 14, background: "#8B6914", borderRadius: 2, flexShrink: 0 }} />
                    )}
                    {row.label}
                  </td>
                  <td style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 12,
                    color: "rgba(255,255,255,0.35)", padding: "16px 0 16px 24px",
                    textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    {row.agency}
                  </td>
                  <td style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 12,
                    color: "rgba(255,255,255,0.35)", padding: "16px 0 16px 24px",
                    textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    {row.team}
                  </td>
                  <td style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 12,
                    color: "#D4C49A", padding: "16px 0 16px 24px",
                    textAlign: "right", borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontWeight: 600,
                  }}>
                    {row.me}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Bottom: Savings counter + Timeline */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>

          {/* Savings counter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: "rgba(139,105,20,0.08)",
              border: "1px solid rgba(139,105,20,0.25)",
              padding: "48px 40px",
            }}
          >
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#8B6914", marginBottom: 20,
            }}>
              {c.savingsLabel}
            </div>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 700,
              color: "#D4C49A", lineHeight: 1, marginBottom: 20,
            }}>
              <AnimatedNumber target={278000} prefix="¥" />
            </div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 11,
              color: "rgba(255,255,255,0.3)", lineHeight: 1.6,
            }}>
              {c.savingsNote}
            </div>
          </motion.div>

          {/* Timeline comparison */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "48px 40px",
            }}
          >
            <div style={{
              fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 32,
            }}>
              {c.timelineTitle}
            </div>
            {c.timelineRows.map((row, i) => (
              <div key={i} style={{ marginBottom: i < c.timelineRows.length - 1 ? 24 : 0 }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 12,
                  color: "rgba(255,255,255,0.5)", marginBottom: 8,
                }}>
                  {row.phase}
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {/* Agency bar */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: 6, background: "rgba(255,255,255,0.08)",
                      borderRadius: 3, overflow: "hidden",
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 * i }}
                        style={{ height: "100%", background: "rgba(255,255,255,0.15)", borderRadius: 3 }}
                      />
                    </div>
                    <div style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 9,
                      color: "rgba(255,255,255,0.25)", marginTop: 4,
                    }}>
                      {row.agency}
                    </div>
                  </div>
                  {/* My bar */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: 6, background: "rgba(139,105,20,0.15)",
                      borderRadius: 3, overflow: "hidden",
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "25%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 * i + 0.2 }}
                        style={{ height: "100%", background: "#8B6914", borderRadius: 3 }}
                      />
                    </div>
                    <div style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 9,
                      color: "#D4C49A", marginTop: 4,
                    }}>
                      {row.me}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
