/* GEOMETRIC SILENCE — Projects: numbered list, dark card accent, minimal text */
import { useEffect, useRef, useState } from "react";

const PROJ_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663570298308/AKiE4EqLYzAGppheoaN4cE/gs-project-YbpiBVBNBcs4aE92see7pr.webp";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

const projects = [
  {
    n: "01",
    name: "AuraLoop",
    type: "Full-Stack Platform",
    stack: ["Next.js", "Sanity", "Supabase", "WooCommerce", "n8n"],
    desc: "三层架构的综合内容与电商平台。PGC 内容管理、UGC 社区互动、电商订单系统通过 n8n 自动化编排协同运作。",
    status: "In Progress — 65%",
    url: "https://github.com/qiubob666-debug",
  },
  {
    n: "02",
    name: "Terra Sigil",
    type: "Astro + API Service",
    stack: ["Astro", "Python", "FastAPI", "Railway"],
    desc: "基于 Astro 构建的静态优先内容站点，配合 Python FastAPI 后端服务，部署于 Railway 平台。",
    status: "Production",
    url: "https://github.com/qiubob666-debug",
  },
  {
    n: "03",
    name: "Auraloop Infra",
    type: "Docker Compose Stack",
    stack: ["Docker", "Compose", "n8n", "Hostinger VPS"],
    desc: "完整的容器化基础设施方案，包含 n8n 工作流自动化、反向代理配置与 VPS 部署脚本。",
    status: "Production",
    url: "https://github.com/qiubob666-debug/auraloop-infra-compose",
  },
  {
    n: "04",
    name: "Personal Knowledge Base",
    type: "Documentation System",
    stack: ["Markdown", "Git", "GitHub Actions"],
    desc: "结构化的个人知识管理系统，记录架构决策（ADR）、项目进展与技术模式，通过 GitHub 版本控制维护。",
    status: "Active",
    url: "https://github.com/qiubob666-debug/personal-knowledge-base",
  },
];

export default function ProjectsSection() {
  const { ref, vis } = useReveal();

  return (
    <section id="projects" className="gs-section" ref={ref}>
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
          <h2 className="gs-headline">Selected Work</h2>
          <p className="gs-label">03 / Projects</p>
        </div>

        <div className="gs-rule" style={{ marginBottom: 0 }} />

        {/* Project list */}
        {projects.map((p, i) => (
          <a
            key={p.n}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr auto",
              gap: "0 48px",
              padding: "48px 0",
              borderBottom: "1px solid #E0E0E0",
              alignItems: "start",
              textDecoration: "none",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(16px)",
              transition: `opacity 0.7s ${0.08 * i}s ease, transform 0.7s ${0.08 * i}s ease`,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {/* Number */}
            <span style={{ fontFamily: "Georgia, serif", fontSize: 13, color: "#BCBCBC", letterSpacing: "0.04em", paddingTop: 4 }}>
              {p.n}
            </span>

            {/* Info */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 12 }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, letterSpacing: "-0.03em", color: "#111111" }}>
                  {p.name}
                </p>
                <span className="gs-label">{p.type}</span>
              </div>
              <p className="gs-body" style={{ maxWidth: 520, marginBottom: 16 }}>{p.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.stack.map((t) => <span key={t} className="gs-tag">{t}</span>)}
              </div>
            </div>

            {/* Status + arrow */}
            <div style={{ textAlign: "right", paddingTop: 4, flexShrink: 0 }}>
              <p className="gs-caption" style={{ marginBottom: 8 }}>{p.status}</p>
              <span style={{ fontSize: 18, color: "#BCBCBC" }}>↗</span>
            </div>
          </a>
        ))}

        {/* Visual callout — dark card */}
        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            opacity: vis ? 1 : 0,
            transition: "opacity 0.7s 0.4s ease",
          }}
        >
          {/* Dark text panel */}
          <div className="gs-card-dark" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 320 }}>
            <div>
              <p className="gs-label" style={{ color: "#767676", marginBottom: 24 }}>Open Source</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, letterSpacing: "-0.04em", color: "#FAFAFA", lineHeight: 1.2, marginBottom: 16 }}>
                All work is<br />version-controlled<br />& documented.
              </p>
              <p style={{ fontSize: 14, color: "#767676", lineHeight: 1.6 }}>
                每个项目均附有架构决策记录（ADR）和完整的 README 文档。
              </p>
            </div>
            <a
              href="https://github.com/qiubob666-debug"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 32,
                fontSize: 13,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#FAFAFA",
                borderTop: "1px solid #333",
                paddingTop: 20,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View GitHub ↗
            </a>
          </div>

          {/* Image panel */}
          <div style={{ overflow: "hidden", background: "#111111" }}>
            <img
              src={PROJ_IMG}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
