/* GEOMETRIC SILENCE — Resume: timeline grid, downloadable CV link */
import { useEffect, useRef, useState } from "react";

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

const experience = [
  {
    period: "2023 — Present",
    role: "Full-Stack Developer",
    org: "Independent / Freelance",
    desc: "独立承接全栈开发项目，涵盖 React/Next.js 前端、Python FastAPI 后端、WordPress/WooCommerce 电商系统及 Docker 容器化部署。",
  },
  {
    period: "2023",
    role: "AuraLoop Platform",
    org: "Personal Project",
    desc: "设计并实现三层架构内容与电商平台，整合 Sanity CMS、Supabase、WooCommerce，通过 n8n 实现跨系统自动化编排。",
  },
  {
    period: "2022 — 2023",
    role: "Infrastructure & Automation",
    org: "Self-Directed Learning",
    desc: "系统学习 Docker Compose 容器编排、GitHub Actions CI/CD、n8n 工作流自动化，完成多个生产级部署实践。",
  },
];

const education = [
  {
    period: "Ongoing",
    title: "Self-Directed Technical Education",
    org: "Online Platforms & Open Source",
    desc: "持续学习前沿技术栈，通过构建实际项目验证技术能力，维护个人知识库记录学习轨迹。",
  },
];

const certifications = [
  "Docker Certified Associate (In Progress)",
  "GitHub Actions Fundamentals",
  "Supabase Developer Certification",
  "n8n Workflow Automation",
];

export default function ResumeSection() {
  const { ref, vis } = useReveal();

  return (
    <section id="resume" className="gs-section-alt" ref={ref}>
      <div className="gs-container" ref={ref}>
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
          <h2 className="gs-headline">Résumé</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <p className="gs-label">04 / Resume</p>
            <a
              href="https://github.com/qiubob666-debug/personal-portfolio-resume"
              target="_blank"
              rel="noopener noreferrer"
              className="gs-btn"
              style={{ fontSize: 11 }}
            >
              Download CV ↗
            </a>
          </div>
        </div>

        <div className="gs-rule" style={{ marginBottom: 0 }} />

        {/* Experience */}
        <div
          style={{
            padding: "48px 0",
            borderBottom: "1px solid #E0E0E0",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.7s 0.08s ease",
          }}
        >
          <p className="gs-label" style={{ marginBottom: 32 }}>Experience</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {experience.map((e, i) => (
              <div
                key={e.role}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 1fr",
                  gap: "0 48px",
                  padding: "28px 0",
                  borderTop: i > 0 ? "1px solid #E0E0E0" : "none",
                }}
              >
                <div>
                  <p className="gs-caption" style={{ marginBottom: 4 }}>{e.period}</p>
                  <p className="gs-caption">{e.org}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: "-0.025em", color: "#111111", marginBottom: 8 }}>
                    {e.role}
                  </p>
                  <p className="gs-body" style={{ fontSize: 14 }}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div
          style={{
            padding: "48px 0",
            borderBottom: "1px solid #E0E0E0",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.7s 0.16s ease",
          }}
        >
          <p className="gs-label" style={{ marginBottom: 32 }}>Education</p>
          {education.map((e) => (
            <div
              key={e.title}
              style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "0 48px" }}
            >
              <div>
                <p className="gs-caption" style={{ marginBottom: 4 }}>{e.period}</p>
                <p className="gs-caption">{e.org}</p>
              </div>
              <div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: "-0.025em", color: "#111111", marginBottom: 8 }}>
                  {e.title}
                </p>
                <p className="gs-body" style={{ fontSize: 14 }}>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div
          style={{
            padding: "48px 0",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.7s 0.24s ease",
          }}
        >
          <p className="gs-label" style={{ marginBottom: 32 }}>Certifications & Learning</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {certifications.map((c) => (
              <span key={c} className="gs-tag">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
