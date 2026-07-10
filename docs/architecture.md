# Architecture — Site web FM3C

*Complète `product/prd.md` et `product/addendum.md`. Ce document tranche les hypothèses techniques laissées ouvertes par le brief (§ Hypothèses techniques de départ) et sert de référence pendant le développement solo.*

## 1. Stack retenue

| Domaine | Choix | Pourquoi |
|---|---|---|
| Langage | **TypeScript** (partout — composants, `server/`, config, scripts) | Priorité du projet. Solo dev sans relecteur : le typage remplace en partie la revue de code (erreurs props/API attrapées à la compilation plutôt qu'en prod). `nuxt.config.ts`, composables et schémas Nuxt Content en TS dès le scaffold, pas de `.js` toléré dans le code applicatif. |
| Framework | **Nuxt 4** (Vue 3) | Confirmé dès le brief. SSG/hybride, écosystème modules riche (content, i18n, seo), un seul dev peut être productif rapidement. |
| UI | **Nuxt UI** (seul framework de composants du projet) | Module Nuxt de premier parti → zéro friction avec le reste du stack (Content, i18n, SEO). Entièrement typé TS. Construit sur Reka UI (accessibilité clavier/ARIA native), ce qui sert directement l'objectif WCAG 2.2 (§1 ligne Accessibilité) sans le réimplémenter à la main. Basé sur Tailwind → thémable dès réception du logo/charte (actuellement bloquant, cf. §9). Couvre nav/formulaires/cartes/pagination/modales, suffisant pour vitrine + blog + annuaire + calendrier sans ajouter une deuxième lib. Alternative sérieuse écartée : shadcn-vue (même base Reka UI + Tailwind, mais copy-paste composant par composant — plus lent pour un solo dev à couverture équivalente). |
| Contenu | **Nuxt Content v3** (collections Markdown/YAML, versionnées en git) | Pas de backend/DB à gérer en V1 — coût récurrent nul, cohérent avec "budget non chiffré" (brief §Risques). Le contenu (pages vitrine, articles de blog, clubs, compétitions) vit comme fichiers dans `content/`, requêtable via `queryCollection`. |
| Édition non-technique (V1.5) | **Nuxt Studio** (branché sur Nuxt Content) | Répond directement à la contrainte de l'addendum : *"l'architecture V1 doit être conçue pour absorber [l'éditeur de contenu] sans refonte majeure"*. Nuxt Studio donne une interface d'édition visuelle par-dessus les mêmes collections Nuxt Content — pas d'admin custom à construire, pas de migration de modèle de données entre V1 et V1.5. |
| i18n | **@nuxtjs/i18n** — FR (défaut), EN, RU | Couvre FR-11/FR-12. Vérifier le rendu cyrillique sur la police retenue (NFR explicite du PRD §4.5). |
| Hébergement | **Vercel** | Confirmé dès le brief. Rendu statique pour les pages vitrine/contenu (ISR si le blog doit se mettre à jour sans rebuild manuel), coût prévisible aligné avec la contrainte budget. |
| Nom de domaine | **.ml (Mali)** — à réserver | Confirmé dans le brief ; dépendance externe, pas bloquante pour le dev. |
| QA / tests | **Playwright** | Parcours clés (UJ-1 à UJ-5) et QA visuelle dans les 3 langues avant chaque mise en ligne — pas de CI lourde nécessaire en V1, exécution manuelle/à la demande suffit pour un solo dev. |
| SEO | **Nuxt SEO** (sitemap, meta, og-image, schema-org) | Le site doit être trouvable en premier (voir brief — "arriver en premier" est l'avantage concurrentiel). |
| Accessibilité | WCAG 2.2 AA visé | Public incluant presse et institutions internationales — un site institutionnel sérieux doit être accessible. |

## 2. Pourquoi pas de base de données en V1

Aucune des features V1 (vitrine, blog, annuaire de clubs, calendrier) n'a besoin d'écriture utilisateur : tout le contenu est produit par le développeur seul (PRD §4.5 : "les traductions EN/RU sont produites par le développeur lui-même"). Un modèle **fichiers versionnés en git** :
- élimine un coût d'infra récurrent (contrainte budget non chiffrée),
- donne un historique gratuit (git log) là où le PRD demande de la traçabilité,
- se migre naturellement vers Nuxt Studio pour la V1.5,
- n'empêche pas d'introduire une vraie base de données en V2 quand l'authentification (comptes athlètes/clubs) l'exigera — ce sera un nouveau sous-système, pas une réécriture du contenu V1.

## 3. Modèle de contenu (`content/`)

Collections Nuxt Content, chacune avec un schéma (`content.config.ts`) pour garder les FR du PRD "testables" :

```
content/
  pages/            # Vitrine institutionnelle (FR-1, FR-2)
    fr/about.md, en/about.md, ru/about.md
    fr/contact.md, ...
  blog/              # Actualités + comptes-rendus de compétition (FR-3 à FR-5)
    fr/2026-03-yyy.md  (frontmatter: title, date, excerpt, cover?, competitionRef?)
    ...
  clubs/             # Annuaire (FR-6 à FR-8)
    club-slug.yml     (name, region, city, contact — noms propres, pas de traduction ; le libellé du filtre région et le message "aucun club" (FR-8) sont eux trilingues, gérés côté UI/i18n)
  competitions/       # Calendrier (FR-9, FR-10)
    competition-slug.yml (title trilingue FR/EN/RU — FR-12 ; dateStart, dateEnd, location en valeur unique ; status, blogRef?)
```

**Une collection Nuxt Content par langue pour `pages` et `blog`** (`pages_fr`/`pages_en`/`pages_ru`, `blog_fr`/`blog_en`/`blog_ru`) — et non une seule collection avec des sous-dossiers `fr/en/ru` comme premier brouillon de ce document. C'est le pattern i18n actuellement recommandé par Nuxt Content v3 pour du contenu routable (`type: 'page'`) : chaque collection source son propre sous-dossier (`source.include: 'pages/fr/**'`, etc.) avec `prefix: ''` pour laisser `@nuxtjs/i18n` gérer le préfixe de route. Les composants interrogent `queryCollection(`pages_${locale}`)` de façon dynamique. `clubs` et `competitions` restent des collections uniques de type `data` (non routables), donc pas concernées par ce découpage — leur trilinguisme se gère par champ (`title` objet `{fr, en, ru}`), pas par collection.

Points d'attention issus du PRD :
- **FR-5** (photo optionnelle) : le schéma `blog` doit accepter `cover` comme champ optionnel, jamais requis.
- **FR-8** (aucun club dans une région) : logique côté composant, pas côté contenu — pas de fichier "vide" à prévoir.
- **FR-10** (lien calendrier → compte-rendu) : `competitions/*.yml` référence l'article blog correspondant par slug (`blogRef`), résolu au rendu ; si absent, pas de lien affiché (pas de lien mort, cf. Consequences testables du PRD).
- **FR-12 s'applique aussi à l'Annuaire et au Calendrier** — pas seulement aux pages/blog. La distinction à faire n'est pas "traduit vs pas traduit" mais **nom propre vs prose** :
  - Champs "nom propre" — nom du club, ville, lieu de compétition — restent en une seule forme, pas de variante par langue (ce sont des données, pas du contenu éditorial).
  - Champs "prose"/UI couverts par FR-12 — titre de la compétition, une éventuelle description, les libellés du filtre région, et le message "aucun club dans cette région" (FR-8) — **doivent** exister en FR/EN/RU, comme tout le reste du contenu public.
  - Concrètement : `title` dans `competitions/*.yml` est un objet/champ par langue (ex. `title: { fr: ..., en: ..., ru: ... }` ou 3 fichiers comme pour `blog/`) ; `location`/`region` restent des valeurs uniques.

## 4. Photos et vidéos

**Photos : locales, co-localisées avec le contenu, pas de service cloud — y compris avec Nuxt Studio.**
- Stockage : dans le repo (`public/images/`), versionnées en git — même principe que "pas de DB en V1" (§2) appliqué aux médias.
- Optimisation/responsive : **Nuxt Image** avec son provider intégré **IPX** (redimensionnement, conversion WebP/AVIF à la volée, servi par Vercel) — pas de CDN image tiers nécessaire au volume attendu en V1 (compte-rendus FR-5, logos de clubs, vitrine).
- **Avec Nuxt Studio (V1.5)** : le comportement par défaut de Studio est justement de committer les médias uploadés dans `/public` au moment de la publication (brouillon local dans le navigateur → publish → commit GitHub → redeploy Vercel automatique). L'éditeur non-technique obtient le même résultat (photo versionnée en git) via une interface glisser-déposer, sans avoir à connaître git.
- **Seuil de bascule** (à réévaluer plus tard, pas maintenant) : si le volume grossit fortement, Nuxt Studio supporte nativement un stockage externe — **Vercel Blob** en priorité puisqu'on est déjà sur Vercel — sans changer d'outil ni de plateforme.

**Vidéo : hors scope V1, reportée à une mise à jour future.**
- Décision : pas d'intégration vidéo (YouTube ou autre) en V1. Un compte/chaîne dédié à la fédération demande une création (compte Google, chaîne, identité visuelle de la chaîne) et un minimum de gestion dans la durée (uploads, modération, accès partagé avec la fédération) — une charge en plus jugée disproportionnée pour un dev solo au lancement, alors que FR-5 (photo optionnelle) couvre déjà le besoin minimal de compte-rendu de compétition.
- Recherche de comparables (fédérations HSIF et FIAS-Sambo, déjà identifiées dans le brief) : HSIF, la fédération de référence directe pour cette discipline, n'a même pas de section vidéo sur son site et s'appuie sur Instagram ; FIAS (plus établie) a une chaîne YouTube dédiée et une page "Vidéo" sur son site qui agrège ces vidéos. Ce sont deux étapes de maturité différentes, ce qui confirme que l'intégration vidéo est un ajout logique une fois la fédération et le site plus établis, pas un prérequis de lancement.
- **Quand ce sera repris** : chaîne YouTube officielle FM3C (compte dédié à la fédération, pas personnel — voir `roadmap.md`), champ optionnel `videoId`/`videoUrl` dans le frontmatter `blog/*.md`, résolu en embed au rendu, même logique que `cover` (FR-5). Pas de travail d'architecture supplémentaire requis le moment venu — c'est un ajout de champ optionnel au schéma existant, pas une refonte.

## 5. i18n — points d'implémentation

- Langue par défaut : FR. Détection navigateur en fallback, sélecteur explicite toujours visible (FR-11).
- Structure de routing Nuxt i18n : préfixe de langue (`/fr/...`, `/en/...`, `/ru/...`) pour un SEO propre par langue (indexation distincte FR/EN/RU).
- Vérifier tôt (dès la maquette) que la police choisie couvre le cyrillique — sinon fallback système pour le RU (NFR PRD §4.5).
- Process de traduction : le développeur traduit lui-même (contrainte du PRD) — prévoir un flux simple (ex. un article FR + ses deux traductions dans le même PR) plutôt qu'un outil de traduction séparé, pas justifié pour ce volume de contenu.

## 6. Ce qui est volontairement hors architecture V1

Cohérent avec les Non-Goals du PRD (§5) et le scope V1.5/V2 (§6.2) :
- Pas d'authentification, pas de table utilisateurs — arrivera en V2 avec un vrai besoin de stockage (probablement une DB légère, ex. Postgres via un provider géré, à trancher le moment venu).
- Pas de panier / paiement — la boutique V2 n'est pas engagée sur un calendrier fixe (brief, Monetization).
- Pas de chatbox IA — idée V2 exploratoire, non engagée.
- Pas de classement/résultats structurés — remplacé par le compte-rendu texte + photo optionnelle (FR-5).

Ces éléments n'imposent aucune contrainte sur l'architecture V1 telle que définie ci-dessus : ajouter une DB et une auth en V2 est un nouveau sous-système à côté du contenu Nuxt Content existant, pas une migration de celui-ci.

## 7. Déploiement

- Repo git unique, déploiement continu sur Vercel (push sur `main` → prod ; branches/PR → preview deployments, utile pour montrer une preview au président avant validation — cf. PRD "décideur unique").
- Pas de CI dédiée en V1 : `playwright-cli` exécuté manuellement avant un déploiement qui touche un parcours clé (UJ-1 à UJ-5) ou une nouvelle langue.

## 8. Conventions de code

- **TypeScript strict partout** — pas de fichier `.js` dans le code applicatif (`app/`, `server/`, `content.config.ts`, scripts) ; `strict: true` dans `tsconfig.json`.
- **Nuxt UI est le seul framework de composants** — ne pas mélanger avec une autre lib de composants (Vuetify, PrimeVue, Element Plus, etc.), même ponctuellement pour un besoin spécifique. Si un composant manque dans Nuxt UI, le construire au-dessus de Reka UI (déjà une dépendance transitive) plutôt que d'introduire une nouvelle lib.

## 9. Risques techniques à surveiller

- **Logo et contenu media manquants** (brief §Risques) : ne bloque pas le dev de la structure, mais bloque l'intégration visuelle finale — prévoir des placeholders explicites dans les composants concernés.
- **Rendu cyrillique** : à valider visuellement dès la première page RU, pas en fin de projet.
- **Absence de jalon** (brief §Risques) : voir `roadmap.md` — un jalon informel par phase est proposé pour éviter que la V1 s'étire indéfiniment.
