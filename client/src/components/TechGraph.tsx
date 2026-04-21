/* TechGraph — Kinetic Precision design system
   Interactive Canvas-based technology constellation.
   Nodes represent tech skills, edges show relationships.
   Mouse proximity causes nodes to repel/attract.
   Click a node to see depth info. */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Node {
  id: string;
  label: string;
  category: "frontend" | "backend" | "infra" | "automation" | "data";
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: string;
}

interface Edge {
  from: string;
  to: string;
}

const NODES_DATA: Omit<Node, "x" | "y" | "vx" | "vy">[] = [
  // Frontend
  { id: "react", label: "React", category: "frontend", radius: 10, depth: "Production-grade SPA architecture, custom hooks, context, performance optimization" },
  { id: "typescript", label: "TypeScript", category: "frontend", radius: 9, depth: "Strict mode, generics, utility types, declaration files" },
  { id: "vite", label: "Vite", category: "frontend", radius: 7, depth: "Custom plugins, SSR config, build optimization" },
  { id: "tailwind", label: "Tailwind", category: "frontend", radius: 7, depth: "Design tokens, custom themes, v4 OKLCH palette" },
  { id: "framer", label: "Framer Motion", category: "frontend", radius: 6, depth: "Gesture animations, layout transitions, scroll-driven effects" },
  // Backend
  { id: "python", label: "Python", category: "backend", radius: 10, depth: "FastAPI services, data pipelines, automation scripts" },
  { id: "fastapi", label: "FastAPI", category: "backend", radius: 8, depth: "REST + async endpoints, Pydantic validation, JWT auth" },
  { id: "nodejs", label: "Node.js", category: "backend", radius: 8, depth: "Express APIs, serverless functions, CLI tools" },
  { id: "php", label: "PHP/WP", category: "backend", radius: 6, depth: "WordPress custom plugins, REST API extensions" },
  // Infra
  { id: "docker", label: "Docker", category: "infra", radius: 9, depth: "Multi-service Compose stacks, custom images, networking" },
  { id: "vercel", label: "Vercel", category: "infra", radius: 7, depth: "Edge functions, CI/CD pipelines, domain management" },
  { id: "nginx", label: "Nginx", category: "infra", radius: 6, depth: "Reverse proxy, SSL termination, load balancing config" },
  { id: "github", label: "GitHub Actions", category: "infra", radius: 7, depth: "CI/CD workflows, automated testing, deployment pipelines" },
  // Automation
  { id: "n8n", label: "n8n", category: "automation", radius: 9, depth: "300+ node workflows, webhook integrations, scheduled automation" },
  { id: "sanity", label: "Sanity CMS", category: "automation", radius: 7, depth: "Custom schemas, GROQ queries, real-time content sync" },
  // Data
  { id: "supabase", label: "Supabase", category: "data", radius: 8, depth: "PostgreSQL, Row Level Security, real-time subscriptions" },
  { id: "postgresql", label: "PostgreSQL", category: "data", radius: 7, depth: "Schema design, indexing, query optimization" },
];

const EDGES: Edge[] = [
  { from: "react", to: "typescript" },
  { from: "react", to: "vite" },
  { from: "react", to: "tailwind" },
  { from: "react", to: "framer" },
  { from: "typescript", to: "nodejs" },
  { from: "fastapi", to: "python" },
  { from: "python", to: "n8n" },
  { from: "nodejs", to: "vercel" },
  { from: "docker", to: "nginx" },
  { from: "docker", to: "fastapi" },
  { from: "github", to: "vercel" },
  { from: "github", to: "docker" },
  { from: "n8n", to: "sanity" },
  { from: "supabase", to: "postgresql" },
  { from: "supabase", to: "fastapi" },
  { from: "sanity", to: "react" },
];

const CATEGORY_COLORS: Record<Node["category"], string> = {
  frontend: "#0057FF",
  backend: "#111111",
  infra: "#555555",
  automation: "#0057FF",
  data: "#888888",
};

export default function TechGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [selected, setSelected] = useState<Node | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    const initNodes = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      nodesRef.current = NODES_DATA.map((n) => ({
        ...n,
        x: 80 + Math.random() * (W - 160),
        y: 60 + Math.random() * (H - 120),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Physics: repulsion between nodes + mouse repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = nodes[i].radius + nodes[j].radius + 60;
          if (dist < minDist) {
            const force = (minDist - dist) / minDist * 0.015;
            nodes[i].vx -= dx * force;
            nodes[i].vy -= dy * force;
            nodes[j].vx += dx * force;
            nodes[j].vy += dy * force;
          }
        }
        // Mouse repulsion
        const mdx = nodes[i].x - mx;
        const mdy = nodes[i].y - my;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy) || 1;
        if (mdist < 100) {
          const force = (100 - mdist) / 100 * 0.08;
          nodes[i].vx += mdx * force;
          nodes[i].vy += mdy * force;
        }
        // Center gravity
        nodes[i].vx += (W / 2 - nodes[i].x) * 0.0002;
        nodes[i].vy += (H / 2 - nodes[i].y) * 0.0002;
        // Damping
        nodes[i].vx *= 0.96;
        nodes[i].vy *= 0.96;
        // Move
        nodes[i].x += nodes[i].vx;
        nodes[i].y += nodes[i].vy;
        // Bounds
        nodes[i].x = Math.max(nodes[i].radius + 20, Math.min(W - nodes[i].radius - 20, nodes[i].x));
        nodes[i].y = Math.max(nodes[i].radius + 20, Math.min(H - nodes[i].radius - 20, nodes[i].y));
      }

      // Draw edges
      EDGES.forEach(({ from, to }) => {
        const a = nodes.find((n) => n.id === from);
        const b = nodes.find((n) => n.id === to);
        if (!a || !b) return;
        const isHighlighted = hovered === from || hovered === to;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isHighlighted ? "rgba(0,87,255,0.35)" : "rgba(0,0,0,0.08)";
        ctx.lineWidth = isHighlighted ? 1.5 : 0.75;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isHov = hovered === node.id;
        const isSel = selected?.id === node.id;
        const color = CATEGORY_COLORS[node.category];

        // Outer ring for hovered/selected
        if (isHov || isSel) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isSel ? color : isHov ? color : color;
        ctx.globalAlpha = isSel ? 1 : isHov ? 0.9 : 0.65;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Label
        ctx.font = `${isHov || isSel ? "500" : "400"} 9px 'DM Mono', monospace`;
        ctx.fillStyle = isHov || isSel ? "#0A0A0A" : "#555555";
        ctx.textAlign = "center";
        ctx.fillText(node.label.toUpperCase(), node.x, node.y + node.radius + 14);
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [hovered, selected]);

  const getNodeAt = (x: number, y: number): Node | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const cx = x - rect.left;
    const cy = y - rect.top;
    for (const node of nodesRef.current) {
      const dx = node.x - cx;
      const dy = node.y - cy;
      if (Math.sqrt(dx * dx + dy * dy) < node.radius + 12) return node;
    }
    return null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const node = getNodeAt(e.clientX, e.clientY);
    setHovered(node?.id ?? null);
  };

  const handleClick = (e: React.MouseEvent) => {
    const node = getNodeAt(e.clientX, e.clientY);
    setSelected(node?.id === selected?.id ? null : node);
  };

  return (
    <div className="relative w-full" style={{ height: "480px" }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: hovered ? "none" : "none" }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={() => { mouseRef.current = { x: -999, y: -999 }; setHovered(null); }}
      />

      {/* Node detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 bg-white border border-[#E8E8E8] p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="font-mono-label text-[10px] tracking-widest uppercase" style={{ color: CATEGORY_COLORS[selected.category] }}>
                {selected.category}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="text-[#AAAAAA] hover:text-[#111] text-xs font-mono-label"
              >
                ✕
              </button>
            </div>
            <p className="font-display text-lg text-[#0A0A0A] mb-2">{selected.label}</p>
            <p className="text-xs text-[#666] leading-relaxed" style={{ fontFamily: "'DM Mono', monospace" }}>
              {selected.depth}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5">
        {(Object.entries(CATEGORY_COLORS) as [Node["category"], string][]).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: 0.7 }} />
            <span className="font-mono-label text-[9px] text-[#AAAAAA]">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
