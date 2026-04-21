# Geometric Silence — Design Philosophy

**Aesthetic Movement:** Geometric Silence  
**Inspired by:** canvas-design SKILL · Swiss International Style · Brutalist Material Honesty

---

## The Philosophy

Structure communicates before words do. Every element placed on the canvas earns its position through necessity alone — nothing decorative, nothing redundant. The grid is not a constraint but a liberation: when the underlying order is absolute, the eye finds rest in the spaces between.

Color is used with surgical restraint. Near-white (#FAFAFA) and near-black (#111111) anchor the palette. A single accent — reserved for the most essential call-to-action — appears no more than once per section, like a single word spoken in a silent room. The result is chromatic tension achieved through absence, not abundance.

Scale and rhythm are the primary expressive tools. A headline at 80px beside a label at 11px creates a visual interval that communicates hierarchy without decoration. Thin rules (1px) divide space with the precision of a draftsman's line. Generous padding — never less than 80px between sections — allows each element to breathe as a discrete object, not part of a crowded composition.

Composition follows asymmetric balance: content anchored left, negative space allowed to accumulate on the right. This is not emptiness but active silence — the same silence a master typographer uses to let a word resonate. Every margin, every gap, every whitespace zone is a deliberate design decision, the product of painstaking refinement.

Typography is sparse and essential. Thin weights (300–400) for body copy. Bold (700) only for primary headlines. Letter-spacing tightened on display type, loosened on uppercase labels. Fonts serve the composition as visual objects, not merely carriers of information. Text never explains what form already shows.

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#FAFAFA` | Page background |
| `--bg-section` | `#F2F2F2` | Alternate section background |
| `--ink` | `#111111` | Primary text, borders |
| `--ink-muted` | `#767676` | Secondary text, labels |
| `--ink-faint` | `#BCBCBC` | Dividers, placeholders |
| `--accent` | `#111111` | CTA buttons (inverted) |
| `--rule` | `1px solid #E0E0E0` | Section dividers |
| `--font-display` | `'Editorial New', Georgia, serif` | Headlines |
| `--font-body` | `system-ui, -apple-system, sans-serif` | Body copy |
| `--font-mono` | `'SF Mono', 'Fira Code', monospace` | Labels, tags |
| `--space-section` | `120px 0` | Section vertical padding |
| `--max-width` | `1080px` | Content container |

---

## Core Principles (applied to every component)

1. **90% visual, 10% text** — if a section needs more than 3 lines of copy, redesign it
2. **One rule per section** — a single thin horizontal line is the only permitted decoration
3. **No shadows, no gradients, no rounded corners** — geometry is absolute
4. **Stagger reveals** — elements enter with 60ms delay between siblings, translateY(16px) → 0
5. **Hover = opacity shift only** — no scale, no color change, just 0.6 → 1 opacity
