# Roadmap — Site web FMCCC

*Découpage en jalons informels (le brief signale explicitement le risque qu'une V1 sans deadline "s'étire indéfiniment en solo" — ce roadmap sert de garde-fou, pas d'engagement rigide). Voir `architecture.md` pour les choix techniques et `product/prd.md` pour le détail des FR.*

## Phase 0 — Fondations (avant tout contenu réel)

- [x] Init projet Nuxt 4 + modules (`@nuxt/content`, `@nuxtjs/i18n`, `@nuxtjs/seo`)
- [x] Config i18n (FR/EN/RU, `prefix_except_default` — FR à la racine, cf. architecture.md §5 — sélecteur de langue)
- [x] Schémas de collections Nuxt Content (`pages`, `blog`, `clubs`, `competitions`) — cf. architecture.md §3
- [x] Layout global + navigation (Accueil, Vitrine, Actualités, Clubs, Compétitions, Contact — cf. PRD Information Architecture)
- [x] Déploiement Vercel branché sur le repo (preview deployments actifs dès ce stade, pour montrer l'avancement au président)

**Jalon : ✅ atteint le 2026-07-10** — site vide mais navigable dans les 3 langues, en ligne sur https://fm-3-c.vercel.app (production auto-déployée depuis `main`).

## Phase 1 — Vitrine institutionnelle (FR-1, FR-2)

- [x] Page À propos : mission, histoire, structure, coopération Mali-Russie (rédigée en FR — ton à valider avec le président — `[ASSUMPTION]` PRD §9)
- [x] Contacts officiels visibles (page + footer global) — coordonnées réelles (téléphone/email) à fournir par le président, placeholders explicites en attendant
- [ ] Contenu FR rédigé, EN + RU traduits (EN/RU après validation du FR par le président)

**Jalon** : le président peut visiter le site et se reconnaître dans la présentation de la fédération.

## Phase 2 — Blog / Actualités (FR-3 à FR-5)

- [ ] Liste des articles (tri antéchronologique, titre/date/extrait ou image)
- [ ] Page de détail d'un article
- [ ] Support compte-rendu de compétition avec photo optionnelle (FR-5)
- [ ] Au moins 1 article réel publié (ex. compte-rendu de la compétition de mars 2026, si les photos sont récupérées — sinon version texte, cf. addendum §Historique)

**Jalon** : un premier article réel est visible en ligne dans les 3 langues.

## Phase 3 — Annuaire des clubs (FR-6 à FR-8)

- [ ] Liste des clubs (nom, région, contact)
- [ ] Filtre par région
- [ ] Message encourageant si aucune région ne matche, avec renvoi vers Contacts (FR-8)
- [ ] Données des clubs affiliés actuels saisies (dépend des infos transmises par la fédération via WhatsApp, cf. PRD UJ-4)

**Jalon** : les clubs affiliés existants sont visibles et trouvables par région.

## Phase 4 — Calendrier des compétitions (FR-9, FR-10)

- [ ] Compétitions à venir (dates + lieu, gestion des compétitions multi-jours)
- [ ] Historique des compétitions passées
- [ ] Lien vers le compte-rendu blog correspondant quand il existe (pas de lien mort)

**Jalon** : la compétition de mars 2026 apparaît dans l'historique, la prochaine compétition apparaît dans les "à venir".

## Phase 5 — Polish transverse avant lancement

- [ ] Passage `accessibility` (WCAG 2.2 — navigation clavier, contrastes, alt text)
- [ ] Passage `seo` (meta, sitemap, og-image par langue, schema-org)
- [ ] Vérification rendu cyrillique sur toutes les pages (cf. architecture.md §7)
- [ ] Parcours clés UJ-1 à UJ-5 rejoués manuellement (et si possible via `playwright-cli`) dans les 3 langues
- [ ] Intégration du logo officiel + médias reçus de la fédération (dépendances externes, cf. PRD Open Questions)
- [ ] Revue finale avec Alioune Badara Traoré (seul critère de succès formel — PRD SM-1)

**Jalon = Lancement V1** : domaine .ml branché, site en ligne, validé par le président.

## Phase 6 — V1.5 (post-lancement, sans refonte)

- [ ] Activer Nuxt Studio sur les collections existantes (aucune migration de données requise — cf. architecture.md §1)
- [ ] Former le/la responsable contenu côté fédération à la publication d'articles

## Backlog V2 (non engagé, pas de date)

Cf. PRD §6.2 — à re-scoper le moment venu, pas à planifier maintenant :
- Authentification + comptes athlètes/clubs (gestion autonome de leurs fiches)
- Page "Compétitions" dédiée (remplace calendrier + comptes-rendus)
- Boutique e-commerce (équipements) — pas de paiement en ligne cadré à ce stade
- Chatbox IA — exploratoire, facultatif

## Reporté — pas dans le PRD, décision d'implémentation

- **Intégration vidéo (YouTube)** — volontairement hors V1 : nécessite un compte/chaîne YouTube dédié à la fédération (à créer, pas le compte personnel du développeur) plus une gestion dans la durée (upload, accès partagé) — jugé disproportionné pour un lancement solo. FR-5 (photo optionnelle) couvre le besoin minimal de compte-rendu. À reprendre une fois le site lancé et la charge de contenu stabilisée. Voir `architecture.md` §4 pour le modèle de données déjà prévu (champ optionnel, pas de refonte requise le moment venu).

## Notes de pilotage

- Pas de sprint/vélocité formels : un solo dev sans deadline n'a pas besoin de cérémonie d'équipe. Ce roadmap se coche au fil de l'eau.
- Les jalons de phase servent de points de check-in naturels avec le président (via preview Vercel), pas de dates fixes.
- Dépendances externes à relancer régulièrement (elles ne bloquent pas le dev, seulement la mise en ligne finale) : logo, budget chiffré, photos de la première compétition, infos précises des clubs affiliés. Les vidéos de la première compétition ne sont plus une dépendance V1 (intégration vidéo reportée, voir "Reporté" ci-dessus).
