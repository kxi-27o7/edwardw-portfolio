# Edward Wibowo Portfolio — Master Agent Guidelines

## 1. Interaction & Collaboration Protocol (CRITICAL)
- **Do Not Over-Generate:** Never write complete components or full code blocks blindly. Always prompt the user first with 2–3 architectural, tech stack, or design options.
- **Consultative Workflow:** Ask clarifying questions regarding:
  - **Tech Stack & Libraries:** (e.g., Framer Motion vs CSS transitions, Tailwind utilities vs custom hooks).
  - **Design Standards:** (e.g., Emil Kowalski micro-interactions, Impeccable UI spacing, editorial minimalism).
  - **Layout & Structure:** (e.g., Grid vs Flexbox, responsive flow).
- **Step-by-Step Delivery:** Break tasks into phases: Concept Alignment ➔ Design Token Check ➔ Implementation ➔ Refinement. Wait for user sign-off.

## 2. Tech Stack & Architecture
- **Framework:** Next.js 14+ (App Router), React, Tailwind CSS, Lucide React, Framer Motion.
- **Particles:** `tsparticles-slim` for lightweight background particle effects.
- **Structure:** Modular components under `components/` and runtime data in `data/projects.json`.

## 3. Design System & Aesthetics
- **Theme:** Monolithic Dark Mode (`#05070C` to `#0A0E17`).
- **Borders:** Structural 1.5px glassmorphic borders (`border-white/10` or `border-neutral-800`).
- **Hero Entrance:** One-time horizontal gradient line animation on initial load only.
- **Dynamic Accents:** Runtime CSS custom properties (`--accent-color`, `--glow-color`) bound via `projects.json` for project card hover glows.

## 4. Profile & Key Projects Summary
- **Name:** Edward Wibowo | BINUS University (GPA 3.97)
- **Projects:** 
  1. *Collabra* (FastAPI, SQLModel, PostgreSQL, Docker) — Indigo theme (`#6366F1`)
  2. *BankGuard* (Python, Flask, Scikit-Learn, MongoDB) — Emerald theme (`#10B981`)
  3. *SeeFlood* (PyTorch, EfficientNet-B0, Computer Vision) — Sky Blue theme (`#0EA5E9`)

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
