---
name: fmccc-verify
description: In-browser verification of the FMCCC site via Playwright MCP. Run after any change touching rendered pages, content, i18n, or SEO meta — covers the three locales (FR/EN/RU), client-side locale switching, Cyrillic rendering, and screenshot proof.
---

# FMCCC in-browser verification

Detailed procedure backing step 5 ("Verify") of the work cycle in `CLAUDE.md`. All of it goes through the **Playwright MCP** — never `curl`/`wget`/`fetch` for anything rendered (CLAUDE.md § Verification). If the Playwright MCP tools are not available in the session, say so and ask for a session restart instead of approximating.

## Prerequisites

- Dev server on http://localhost:3000 — usually already running; check before starting another (`pnpm dev`). The Nuxt CLI locks the dir; a second diagnostic instance needs `NUXT_IGNORE_LOCK=1 PORT=3001`.
- A plain HTTP poll (curl) to *wait for the server to come up* is fine — verification itself is not.

## Procedure

1. **Routes × locales.** For every affected route, visit all three URLs: FR at the root (`/about`), EN (`/en/about`), RU (`/ru/about`). A route is "affected" also when a shared component (header, footer, nav) changed — then test at least one route per locale.
2. **Snapshot + screenshot.** Take the accessibility snapshot (structure, headings, links) *and* a screenshot, and actually read the screenshot. Watch for:
   - Cyrillic rendering on RU pages (Oswald headings / Inter body — no fallback tofu);
   - prose rendering on content pages: headings, lists, bold, links — not just the hero/title (heading text may appear empty in the a11y snapshot when nested in anchor links; the screenshot is authoritative).
3. **Client-side locale switch.** On at least one affected page, switch locale through the language menu (not by URL): URL prefix, `<title>`, and page content must all update without a reload. Known traps (see memory `nuxt-ui-gotchas`): `useSeoMeta` values must be getters; `UDropdownMenu` checkbox items ignore `to` — navigation happens in `onSelect`.
4. **Content pages.** When Nuxt Content documents changed, confirm the rendered body matches the Markdown (ContentRenderer output), and that locales without a translation show the `translationPending` fallback, not an error or empty page.
5. **SEO-affecting changes.** Check `<title>`/description per locale. For `robots.txt`/sitemap checks, append a cache-busting query (`?v=2`) — responses are cached per `max-age`; and diagnose non-HTML endpoints (XML) with curl instead: Firefox/Playwright hangs on XML+XSL navigations (memory `playwright-verification-notes`).
6. **Report and clean up.** Screenshots are the proof of done — reference them in the report. Playwright writes them into the repo root / `.playwright-mcp/`; move them to the session scratchpad, never commit them.

## Key user journeys (pre-deploy regression)

Before a deploy that touches navigation or a whole section, replay the affected UJ from PRD §2.3 (UJ-1 to UJ-5) in at least FR + RU. The president-facing milestone check is visual: it must *look* right, not just return 200.
