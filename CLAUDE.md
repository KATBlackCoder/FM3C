# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

Phase 0 (Fondations) of `docs/roadmap.md` is **complete** (2026-07-10): the Nuxt 4 app is scaffolded, navigable in all three languages, and deployed at https://fm-3-c.vercel.app (auto-deploy from `main` via the Vercel git integration — every push to `main` goes to production). Next up is Phase 1 (institutional pages with real content). Pages are placeholders and `content/` has no files yet; collections are defined in `content.config.ts`.

Commands (pnpm, not npm):
- `pnpm dev` — dev server on http://localhost:3000 (usually already running; check before starting another — the Nuxt CLI locks the dir, bypass with `NUXT_IGNORE_LOCK=1 PORT=3001` for a second diagnostic instance)
- `pnpm lint` / `pnpm typecheck` — both run in CI on every push; run them before committing
- `pnpm build` / `pnpm preview` — production build / preview

See `CHANGELOG.md` for what changed at each milestone.

## What this project is

A multilingual (FR/EN/RU) institutional website for the **FMCCC** (Fédération Malienne de Combat au Corps à Corps), a Malian sports federation founded March 2026. Solo-developer project, single stakeholder validation (the federation's president), no fixed deadline.

Full product context lives in `docs/`:
- `docs/product/brief.md` — product brief (problem, solution, stakeholders, risks)
- `docs/product/prd.md` — functional requirements (FR-1 to FR-12), user journeys, glossary, scope
- `docs/product/addendum.md` — technical assumptions and background not in the PRD
- `docs/architecture.md` — **the technical decisions** (stack, content model, i18n, hosting) — read this before implementing anything
- `docs/roadmap.md` — phased build plan with informal milestones

## Architecture summary (see `docs/architecture.md` for full detail)

- **Language**: TypeScript everywhere (components, `server/`, config, scripts) — no `.js` in application code. This is a project priority, not a nice-to-have.
- **Framework**: Nuxt 4 (Vue 3), hosted on Vercel.
- **UI**: Nuxt UI is the *only* component framework for this project — do not introduce a second UI library (Vuetify, PrimeVue, etc.), even for a one-off need. Built on Reka UI + Tailwind, fully typed, chosen for accessibility-by-default and zero-friction integration with the rest of the Nuxt stack (see architecture.md §1).
- **Content**: Nuxt Content v3 — all content (vitrine pages, blog/actualités, club directory, competition calendar) lives as Markdown/YAML files under `content/`, versioned in git. No database, no CMS backend in V1.
- **V1.5 plan**: Nuxt Studio will be layered on top of the same Nuxt Content collections for non-technical editing — this is why the content schema must stay clean from the start (see architecture.md §3 for the collection shapes: `pages/`, `blog/`, `clubs/`, `competitions/`).
- **i18n**: `@nuxtjs/i18n`, FR (default) / EN / RU, `prefix_except_default` routing — FR at the root (`/`, `/about`, ...), EN/RU prefixed (`/en/...`, `/ru/...`). Proper nouns (club name, city, competition location) are stored once, not per-language; prose/UI text (competition titles, region-filter labels, empty-state messages) must exist in all three languages per FR-12 — see `docs/architecture.md` §3.
- **V1 scope** (see PRD §6.1): institutional showcase, blog/news, club directory filterable by region, competition calendar. No auth, no e-commerce, no structured competition results — those are V2 (PRD §6.2), not to be built prematurely.

## Work cycle (per task)

For any non-trivial change (new page, component, content, config), work through these phases in order:

1. **Analyze** — read the relevant product docs (`docs/architecture.md`, PRD) and the existing code before implementing.
2. **Plan** — state explicit acceptance criteria before coding: what will be verified at the end, and how.
3. **Execute** — implement following the conventions in this file and `docs/skills.md`.
4. **Validate** — `pnpm lint` + `pnpm typecheck` must pass.
5. **Verify** — in-browser via Playwright MCP (see Verification below); the detailed procedure is the project skill `fmccc-verify` (`.claude/skills/fmccc-verify/`). Screenshots are the proof of done.
6. **Examine** — run `/code-review` on the diff before committing; fix or explicitly defer each finding.

Trivial changes (typo, single i18n key, docs-only edit) may skip 2 and 6 — but never 4–5 when a rendered page is touched. Do not push to `main` without explicit approval: every push auto-deploys to production.

## Verification

All verification of the running site (dev server routes, locale switching, rendering, key user journeys) must use the **Playwright MCP** (`playwright` server, added via `claude mcp add playwright npx @playwright/mcp@latest`) — not `curl`/`wget`/`node -e "fetch(...)"` workarounds. This matters especially for checking Cyrillic (RU) rendering and actual visual/interactive behavior, which a raw HTTP status check can't verify. If the Playwright MCP tools aren't available in a session (not yet loaded), say so explicitly rather than falling back to HTTP-only checks — ask for a session restart instead of approximating.

## Working conventions for this project

- See `docs/skills.md` for the agent skills installed for this project and when to use each.
- Follow `docs/roadmap.md` phase order (Fondations → Vitrine → Blog → Clubs → Calendrier → Polish) rather than jumping ahead to V1.5/V2 features.
- Translations (EN/RU) are produced by the developer, not an external translation pipeline — keep FR/EN/RU content changes together when adding or editing a page/article.
- Several product decisions are still open (see PRD §8 "Open Questions" and §9 "Assumptions Index") — notably the federation's logo, exact Mali-Russia partnership tone, and club data — treat content in those areas as placeholder until confirmed by the president.
