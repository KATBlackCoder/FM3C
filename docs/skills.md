# Skills installées — Site web FMCCC

*Skills agent installées globalement (`npx skills add ... -g`) pour ce projet, choisies pour le stack Nuxt/Vue défini dans `architecture.md`. Toutes tournent avec les pleins droits de l'agent — à relire avant usage sur du code sensible.*

| Skill | Source | Utilité pour ce projet |
|---|---|---|
| **nuxt** | `antfu/skills` (Anthony Fu, core team Vue/Nuxt/Vite) | Référence pour tout dev Nuxt 4 : SSR/rendu hybride, routing par fichiers, auto-imports, server routes, `useFetch`, middleware. À utiliser dès le scaffolding du projet et pour toute page/route. |
| **vue** | `antfu/skills` | Composition API, `<script setup>`, `defineProps`/`defineEmits`/`defineModel`, réactivité, `Transition`/`Teleport`/`Suspense`. Complète `nuxt` pour l'écriture des composants (navigation, sélecteur de langue, cartes club/compétition, etc.). |
| **nuxt-ui** | `nuxt/ui` (équipe Nuxt, module officiel) | Seul framework de composants du projet (décision `architecture.md` §1/§7) — 125+ composants accessibles (Reka UI) thémables via Tailwind. À utiliser pour toute UI : navigation, formulaires, cartes club/compétition, layout de page. Ne pas introduire d'autre lib de composants à côté. |
| **nuxt-content** | `onmax/nuxt-skills` | Nuxt Content v3 : collections (`content.config.ts`), `queryCollection`, rendu MDC, intégration Nuxt Studio, patterns i18n. Directement lié au modèle de contenu défini en `architecture.md` §3 (`pages/`, `blog/`, `clubs/`, `competitions/`) — à utiliser pour définir les schémas de collections et les requêtes de contenu. |
| **nuxt-seo** | `onmax/nuxt-skills` | Module Nuxt SEO : sitemap, meta tags, og-image, schema-org. À utiliser en Phase 5 du roadmap (polish avant lancement) et à chaque nouvelle page publique pour garder le SEO multilingue cohérent. |
| **seo** | `addyosmani/web-quality-skills` (Addy Osmani, Chrome team) | Bonnes pratiques SEO génériques (au-delà du module Nuxt) : structure de contenu, indexation, sitemap. Complète `nuxt-seo` pour l'audit plutôt que la config. |
| **accessibility** | `addyosmani/web-quality-skills` | Audit WCAG 2.2 : navigation clavier, contrastes, lecteurs d'écran. À utiliser en Phase 5 (polish) — le site s'adresse aussi à la presse et à des institutions, l'accessibilité fait partie du sérieux institutionnel visé. |
| **playwright-cli** | `microsoft/playwright-cli` | Automatisation et tests de navigateur. Utile pour rejouer les parcours clés (UJ-1 à UJ-5 du PRD) et vérifier visuellement le rendu FR/EN/RU (notamment le cyrillique) avant chaque mise en ligne — pas de CI dédiée en V1, exécution à la demande. |
| **make-interfaces-feel-better** | `jakubkrehel/make-interfaces-feel-better` | Détails de polish UI : animations, hover states, ombres, typographie, micro-interactions, alignement optique. À utiliser en finition de composants, pas en structure — pertinent pour donner au site un rendu "sérieux" plutôt qu'amateur, cohérent avec l'objectif du brief (crédibilité auprès de la presse et des partenaires). |
| **git-commit** | `github/awesome-copilot` (officiel GitHub) | Analyse le diff, propose un message de commit conventionnel (type/scope/description) et un staging cohérent par groupe logique. À utiliser à chaque commit plutôt que rédiger le message à la main. |

## Quand les solliciter

- **Scaffolding / nouvelle feature** → `nuxt` + `vue` en premier réflexe.
- **Toute interface (page, composant, formulaire)** → `nuxt-ui` en priorité avant d'écrire du HTML/CSS à la main.
- **Contenu (vitrine, blog, clubs, calendrier)** → `nuxt-content`.
- **Avant chaque déploiement touchant une page publique** → `seo` + `nuxt-seo`.
- **Phase 5 du roadmap (polish transverse avant lancement)** → `accessibility`, `playwright-cli`, `make-interfaces-feel-better`.
- **À chaque commit** → `git-commit`.

Pas de skill de gestion de projet/agents multiples ici par choix : voir la discussion qui a mené au retrait de BMAD (jugé overkill pour un dev solo à scope fixe) — `docs/architecture.md` et `docs/roadmap.md` remplacent ce rôle de pilotage.
