/* GEOMETRIC SILENCE — Skills: numbered grid, tags, no bars, no decoration */
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

const domains = [
  {
    n: "01",
    title: "Frontend",
    tags: ["React", "Next.js", "TypeScript", "Vite", "Astro", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    note: "Component-driven UI, SSR/SSG, animation",
  },
  {
    n: "02",
    title: "Backend",
    tags: ["Python", "FastAPI", "Node.js", "Express", "PHP", "WordPress", "tRPC", "REST API"],
    note: "Serverless functions, typed APIs, CMS integration",
  },
  {
    n: "03",
    title: "Data & Storage",
    tags: ["PostgreSQL", "Supabase", "Sanity CMS", "SQLite", "Redis", "Vercel Blob", "WooCommerce"],
    note: "Three-layer architecture: PGC / UGC / Commerce",
  },
  {
    n: "04",
    title: "Infrastructure",
    tags: ["Docker", "Docker Compose", "n8n", "GitHub Actions", "Vercel", "Railway", "Linux", "Hostinger"],
    note: "CI/CD pipelines, workflow automation, container ops",
  },
];

export default function SkillsSection() {
  const { ref, vis } = useReveal();

  return (
    <section id="skills" className="gs-section-alt" ref={ref}>
      <div className="gs-container">
        {/* Header row */}
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
          <h2 className="gs-headline">Technical Domains</h2>
          <p className="gs-label" style={{ flexShrink: 0 }}>02 / Skills</p>
        </div>

        <div className="gs-rule" style={{ marginBottom: 0 }} />

        {/* Domain rows */}
        {domains.map((d, i) => (
          <div
            key={d.n}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 2fr",
              gap: "0 48px",
              padding: "48px 0",
              borderBottom: "1px solid #E0E0E0",
              alignItems: "start",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(16px)",
              transition: `opacity 0.7s ${0.08 * i}s ease, transform 0.7s ${0.08 * i}s ease`,
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 13,
                color: "#BCBCBC",
                letterSpacing: "0.04em",
                paddingTop: 3,
              }}
            >
              {d.n}
            </span>

            {/* Title + note */}
            <div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  color: "#111111",
                  marginBottom: 8,
                }}
              >
                {d.title}
              </p>
              <p className="gs-caption">{d.note}</p>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.tags.map((t) => (
                <span key={t} className="gs-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}

        {/* Architecture callout */}
        <div
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
            background: "#E0E0E0",
            opacity: vis ? 1 : 0,
            transition: "opacity 0.7s 0.4s ease",
          }}
        >
          {[
            { layer: "PGC Layer", tech: "Sanity CMS", desc: "Structured editorial content" },
            { layer: "Commerce Layer", tech: "WooCommerce", desc: "Products, payments, inventory" },
            { layer: "UGC Layer", tech: "Supabase", desc: "Auth, community, relational data" },
            { layer: "Automation Layer", tech: "n8n Workflows", desc: "Cross-system orchestration" },
          ].map((item) => (
            <div
              key={item.layer}
              style={{ background: "#F2F2F2", padding: "32px 36px" }}
            >
              <p className="gs-label" style={{ marginBottom: 10 }}>{item.layer}</p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 18, letterSpacing: "-0.03em", color: "#111111", marginBottom: 6 }}>
                {item.tech}
              </p>
              <p className="gs-caption">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
