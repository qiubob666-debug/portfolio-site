/* TechGraph — Kinetic Precision design system
   Interactive Canvas-based technology constellation.
   Nodes represent tech skills, edges show relationships.
   Mouse proximity causes nodes to repel/attract.
   Click a node to see depth info.
   i18n: node depth descriptions and category labels from translations */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/contexts/I18nContext";

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

// Static node structure (labels and depth descriptions are i18n-overridden below)
const NODES_BASE: Omit<Node, "x" | "y" | "vx" | "vy" | "depth">[] = [
  { id: "react",      label: "React",          category: "frontend",   radius: 10 },
  { id: "typescript", label: "TypeScript",     category: "frontend",   radius: 9  },
  { id: "vite",       label: "Vite",           category: "frontend",   radius: 7  },
  { id: "tailwind",   label: "Tailwind",       category: "frontend",   radius: 7  },
  { id: "framer",     label: "Framer Motion",  category: "frontend",   radius: 6  },
  { id: "python",     label: "Python",         category: "backend",    radius: 10 },
  { id: "fastapi",    label: "FastAPI",        category: "backend",    radius: 8  },
  { id: "nodejs",     label: "Node.js",        category: "backend",    radius: 8  },
  { id: "php",        label: "PHP/WP",         category: "backend",    radius: 6  },
  { id: "docker",     label: "Docker",         category: "infra",      radius: 9  },
  { id: "vercel",     label: "Vercel",         category: "infra",      radius: 7  },
  { id: "nginx",      label: "Nginx",          category: "infra",      radius: 6  },
  { id: "github",     label: "GitHub Actions", category: "infra",      radius: 7  },
  { id: "n8n",        label: "n8n",            category: "automation", radius: 9  },
  { id: "sanity",     label: "Sanity CMS",     category: "automation", radius: 7  },
  { id: "supabase",   label: "Supabase",       category: "data",       radius: 8  },
  { id: "postgresql", label: "PostgreSQL",     category: "data",       radius: 7  },
];

const EDGES: Edge[] = [
  { from: "react",      to: "typescript" },
  { from: "react",      to: "vite"       },
  { from: "react",      to: "tailwind"   },
  { from: "react",      to: "framer"     },
  { from: "typescript", to: "nodejs"     },
  { from: "fastapi",    to: "python"     },
  { from: "python",     to: "n8n"        },
  { from: "nodejs",     to: "vercel"     },
  { from: "docker",     to: "nginx"      },
  { from: "docker",     to: "fastapi"    },
  { from: "github",     to: "vercel"     },
  { from: "github",     to: "docker"     },
  { from: "n8n",        to: "sanity"     },
  { from: "supabase",   to: "postgresql" },
  { from: "supabase",   to: "fastapi"    },
  { from: "sanity",     to: "react"      },
];

const CATEGORY_COLORS: Record<Node["category"], string> = {
  frontend:   "#0057FF",
  backend:    "#111111",
  infra:      "#555555",
  automation: "#0057FF",
  data:       "#888888",
};

export default function TechGraph() {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [selected, setSelected] = useState<Node | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Build i18n-aware node depth descriptions from translations
  const nodeDepths: Record<string, string> = {
    react:      t.graph.react,
    typescript: t.graph.typescript,
    vite:       t.graph.vite,
    tailwind:   t.graph.tailwind,
    framer:     t.graph.framer,
    python:     t.graph.python,
    fastapi:    t.graph.fastapi,
    nodejs:     t.graph.nodejs,
    php:        t.graph.php,
    docker:     t.graph.docker,
    vercel:     t.graph.vercel,
    nginx:      t.graph.nginx,
    github:     t.graph.github,
    n8n:        t.graph.n8n,
    sanity:     t.graph.sanity,
    supabase:   t.graph.supabase,
    postgresql: t.graph.postgresql,
  };

  // Category labels from translations
  const categoryLabels: Record<Node["category"], string> = {
    frontend:   t.stack.categories[0]?.label ?? "Frontend",
    backend:    t.stack.categories[1]?.label ?? "Backend",
    infra:      t.stack.categories[2]?.label ?? "Infrastructure",
    data:       t.stack.categories[3]?.label ?? "Data & Storage",
    automation: t.stack.categories[4]?.label ?? "Automation & CMS",
  };

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
      nodesRef.current = NODES_BASE.map((n) => ({
        ...n,
        depth: nodeDepths[n.id] ?? "",
        x: W * 0.1 + Math.random() * W * 0.8,
        y: H * 0.1 + Math.random() * H * 0.8,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
    };

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Physics
      nodes.forEach((node) => {
        // Mouse repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100;
          node.vx += (dx / dist) * force * 0.8;
          node.vy += (dy / dist) * force * 0.8;
        }

        // Node-node repulsion
        nodes.forEach((other) => {
          if (other.id === node.id) return;
          const ddx = node.x - other.x;
          const ddy = node.y - other.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          const minDist = node.radius + other.radius + 40;
          if (d < minDist && d > 0) {
            const force = (minDist - d) / minDist;
            node.vx += (ddx / d) * force * 0.3;
            node.vy += (ddy / d) * force * 0.3;
          }
        });

        // Center gravity
        node.vx += (W / 2 - node.x) * 0.0002;
        node.vy += (H / 2 - node.y) * 0.0002;

        // Damping
        node.vx *= 0.92;
        node.vy *= 0.92;

        // Clamp speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 3) { node.vx = (node.vx / speed) * 3; node.vy = (node.vy / speed) * 3; }

        node.x = Math.max(node.radius + 20, Math.min(W - node.radius - 20, node.x + node.vx));
        node.y = Math.max(node.radius + 20, Math.min(H - node.radius - 20, node.y + node.vy));
      });

      // Draw edges
      EDGES.forEach((edge) => {
        const from = nodes.find((n) => n.id === edge.from);
        const to = nodes.find((n) => n.id === edge.to);
        if (!from || !to) return;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = "#E8E8E8";
        ctx.lineWidth = 0.8;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // Draw nodes
      nodes.forEach((node) => {
        const color = CATEGORY_COLORS[node.category];
        const isHov = hovered === node.id;
        const isSel = selected?.id === node.id;

        if (isHov || isSel) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.3;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = isSel ? 1 : isHov ? 0.9 : 0.65;
        ctx.fill();
        ctx.globalAlpha = 1;

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
  }, [hovered, selected, nodeDepths]);

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
        style={{ cursor: "none" }}
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
                {categoryLabels[selected.category]}
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
              {nodeDepths[selected.id]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5">
        {(Object.entries(CATEGORY_COLORS) as [Node["category"], string][]).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: 0.7 }} />
            <span className="font-mono-label text-[9px] text-[#AAAAAA]">{categoryLabels[cat]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
