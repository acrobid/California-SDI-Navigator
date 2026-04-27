# AGENTS.md — California-SDI-Navigator

## Project
Nuxt 4 static site (Nuxt Content v3) for FedEx pilots navigating California SDI claims.
Private by design (`robots: noindex, nofollow`).

## Stack
- Nuxt 4.4, Vue 3, TypeScript (strict)
- Tailwind CSS v4, @nuxt/ui v4.7, @nuxt/image
- @nuxt/content v3 — Markdown content in `/content/`
- better-sqlite3 (Nuxt Content v3 dependency)

## Commands
| Command | Purpose |
|---------|---------|
| `npm install` | Install deps (Node, not pnpm/yarn) |
| `npm run dev` | Dev server on `localhost:3000` |
| `npm run generate` | **Static build** (likely the deploy target) |
| `npm run build` | SSR production build |
| `npm run preview` | Preview production build |

**No test runner, no lint script, no typecheck script** are defined in `package.json`.

## Content Architecture
- `/content/guide/**/*.md` — Guide articles. Frontmatter: `title`, `description`, `icon`, `lastUpdated`, `order` (number, used for nav sorting).
- `/content/*.md` — Root pages (e.g. `index.md`, `about.md`).
- `/data/*.json` — Static data: `contacts.json`, `tax-rates.json`, `checklist-items.json`, `timeline-defaults.json`.
- `app/content.config.ts` defines the `guide` collection schema. **There is also a duplicate `content.config.ts` at repo root with identical content.** Keep them in sync if editing.

## Page Routing
- `app/pages/guide/[...slug].vue` — Catch-all for guide articles. Hardcodes section buckets (`overview`, `preparation`, `filing`, `post-filing`, `hartford`, `in-person`, `special`). If you add a new top-level guide folder, update the `sectionMap` there.
- `app/pages/[...slug].vue` — Fallback for non-guide content pages.
- `app/pages/index.vue` — Home page.
- Other top-level pages: `calculator.vue`, `checklist.vue`, `contacts.vue`, `timeline.vue`, `templates.vue`, `about.vue`.

## Domain Logic
- Benefit calculations, CBA constants, and CA SDI rates live in `app/utils/constants.ts` and `app/utils/calculations.ts`.
- Types are centralized in `app/types/index.ts`.
- Do not invent new CBA references or SDI rates without verifying against current contract/CA EDD docs.

## Toolchain Quirks
- **Tailwind v4**: Uses `@import "tailwindcss"` and `@theme` in `app/assets/css/main.css`.
- **ESLint**: Config imports from `.nuxt/eslint.config.mjs`. You must run `npm install` (and possibly `nuxt prepare`) before linting works in editors.
- **ESLint override**: `vue/html-self-closing` is explicitly `off`.
- **tsconfig.json** delegates to `.nuxt/tsconfig.*.json` files — do not hand-edit those.
- `.npmrc` sets `engine-strict=false`.

## Python
- `.venv/` and `extract_pdfs.py` exist for one-off PDF text extraction (pypdf). Not part of the build.

## Deployment Notes
- `nuxt.config.ts` prerenders all major routes (`/`, `/guide/**`, `/calculator`, etc.).
- `generate` is the probable deploy command for a static host.
