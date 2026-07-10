# Changelog

Journal des changements notables du site FM3C, tenu par jalon de `docs/roadmap.md`. Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) ; pas de versions taguées tant que la V1 n'est pas lancée — les entrées sont datées par jalon.

## [Non publié]

*(rien pour l'instant — prochaine étape : Phase 1, vitrine institutionnelle)*

## Phase 0 — Fondations — 2026-07-10

Jalon atteint : site vide mais navigable dans les 3 langues, en ligne sur https://fm-3-c.vercel.app.

### Ajouté

- Scaffold Nuxt 4 : Nuxt UI, `@nuxtjs/i18n` (FR/EN/RU, sélecteur de langue), collections Nuxt Content (`pages`/`blog` par langue, `clubs`/`competitions` en données) — 6 pages placeholder navigables.
- Module `@nuxtjs/seo` : robots.txt (indexation coupée hors production), sitemaps par locale, suffixe de titre `| FM3C`.
- CI GitHub Actions : lint + typecheck à chaque push.
- Déploiement Vercel branché sur `main` (production auto-déployée).

### Modifié

- Stratégie de routing i18n : `prefix_except_default` — le FR (langue par défaut) vit à la racine (`/`, `/about`, ...), EN/RU restent préfixés. Les anciennes URLs `/fr/**` redirigent en 301.

### Corrigé

- Liens imbriqués + erreur d'hydratation dans le header (`UHeader` : slot `#title` remplacé par les props `title`/`to`).
- Sélecteur de langue inopérant (`UDropdownMenu` : les items checkbox ignorent `to` — navigation via `onSelect`).
- `<title>` figé dans l'ancienne langue après changement de locale côté client (`useSeoMeta` avec getters).
