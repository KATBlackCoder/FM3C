# Changelog

Journal des changements notables du site FMCCC, tenu par jalon de `docs/roadmap.md`. Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) ; pas de versions taguées tant que la V1 n'est pas lancée — les entrées sont datées par jalon.

## [Non publié]

### Ajouté

- **Page « À propos »** : mission, la discipline (Combat / Autodéfense, terminologie officielle HSIF), histoire (première compétition à l'Acropole de Bamako), coopération Mali-Russie (ton neutre, à valider), structure, contact — rendue depuis `content/pages/{fr,en,ru}/about.md` via Nuxt Content, traduite dans les 3 langues le 2026-07-12 après validation du texte FR par le président.
- **Compte-rendu de la première compétition nationale** traduit en EN/RU (`content/blog/{en,ru}/2026-03-premiere-competition-nationale.md`), même lot que la page À propos.
- **Page « Contact »** : cartes siège (Bamako) / téléphone-WhatsApp / email — coordonnées « à confirmer » en attendant celles du président (FR-2).
- **Footer global** enrichi : nom complet de la fédération + Bamako, lien « Nous contacter », dans les 3 langues.
- **Accueil** : boutons d'appel à l'action vers À propos et Contact.
- Documents sources de la fédération archivés dans `docs/sources/` (présentation HSIF FR 73 p., règlement HSIF 2023 EN, règlement FR à nettoyer, système de ceintures, sets d'autodéfense, logo) avec README de provenance.
- Identité visuelle tirée du logo officiel (badge « Combat Corps à Corps / Mali ») : logo détouré en cercle (`public/logo.png`) intégré au header et au hero de l'accueil, favicon + apple-touch-icon régénérés depuis le badge.
- Charte graphique : `primary` = or de l'anneau (`#D69318`, échelle `gold`), `secondary` = vert du drapeau (`#18B339`), neutre `stone` (gris chaud), liseré tricolore vert-jaune-rouge sous le header.
- Polices : Oswald (titres, condensée athlétique) + Inter (corps) — les deux couvrent le cyrillique, contrairement à Public Sans qu'Inter remplace ; sous-ensembles `cyrillic` chargés via `@nuxt/fonts`.

### Modifié

- Renommage du sigle de la fédération : **FM3C → FMCCC** (Fédération Malienne de Combat au Corps à Corps), partout dans le code, les traductions et la documentation. En russe, l'ancienne translittération « ФМ3К » est remplacée par le sigle latin « FMCCC » (à valider avec le président).
- **URL de production : `fmccc.vercel.app`** (projet Vercel renommé le 2026-07-11 ; l'ancienne URL `fm-3-c.vercel.app` ne répond plus).

### Corrigé

- **Statut juridique de la FMCCC** : le contenu affirmait que la fédération était déjà fondée en mars 2026 ; le président a corrigé le 2026-07-11 — ce qui existe légalement aujourd'hui est l'association fondatrice (même nom FMCCC conservé), la fédération est en cours de constitution. Wording ajusté sur la page À propos et l'article de blog, dans les 3 langues.
- Requêtes Nuxt Content en erreur 500 sur Vercel (bindings natifs `better-sqlite3` incompatibles avec les fonctions Node 22/24, `nuxt/content#3689`) : bascule sur le connecteur `node:sqlite` natif — la page À propos affichait silencieusement son repli au lieu du contenu.

## Phase 0 — Fondations — 2026-07-10

Jalon atteint : site vide mais navigable dans les 3 langues, en ligne sur https://fm-3-c.vercel.app.

### Ajouté

- Scaffold Nuxt 4 : Nuxt UI, `@nuxtjs/i18n` (FR/EN/RU, sélecteur de langue), collections Nuxt Content (`pages`/`blog` par langue, `clubs`/`competitions` en données) — 6 pages placeholder navigables.
- Module `@nuxtjs/seo` : robots.txt (indexation coupée hors production), sitemaps par locale, suffixe de titre `| FMCCC`.
- CI GitHub Actions : lint + typecheck à chaque push.
- Déploiement Vercel branché sur `main` (production auto-déployée).

### Modifié

- Stratégie de routing i18n : `prefix_except_default` — le FR (langue par défaut) vit à la racine (`/`, `/about`, ...), EN/RU restent préfixés. Les anciennes URLs `/fr/**` redirigent en 301.

### Corrigé

- Liens imbriqués + erreur d'hydratation dans le header (`UHeader` : slot `#title` remplacé par les props `title`/`to`).
- Sélecteur de langue inopérant (`UDropdownMenu` : les items checkbox ignorent `to` — navigation via `onSelect`).
- `<title>` figé dans l'ancienne langue après changement de locale côté client (`useSeoMeta` avec getters).
