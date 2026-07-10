---
title: "Site web FMCCC — Fédération Malienne de Combat au Corps à Corps"
status: draft
created: 2026-07-08
updated: 2026-07-09
---

# PRD: Site web FMCCC

*Working title — confirmé.*

## 0. Document Purpose

Ce PRD cadre le site web de la FMCCC pour la personne qui va le construire (toi-même, en solo) et pour le président de la fédération, Alioune Badara Traoré, seul décideur côté validation. Il s'appuie sur le Product Brief `brief-FMCCC-2026-07-08` sans le dupliquer. Le vocabulaire est ancré dans le Glossaire (§3) ; les exigences fonctionnelles (FR) sont regroupées par feature et numérotées globalement ; les hypothèses non confirmées sont marquées `[ASSUMPTION]` inline et indexées en §9. Les choix techniques (framework, hébergement, nom de domaine) ne sont pas traités ici — voir `addendum.md`.

## 1. Vision

La FMCCC existe depuis mars 2026 mais reste invisible en ligne : sa seule trace numérique est un groupe WhatsApp fermé. Ce site devient le premier point de référence officiel et public de la fédération — pour ses clubs, ses athlètes actuels ou futurs, la presse malienne et russe, et les partenaires institutionnels (La Perspective Sahélienne, CNOSM, HSIF). Il ne s'agit pas de rattraper un concurrent : aucune fédération comparable dans cette discipline n'a de présence aboutie, donc être le premier à arriver avec un site sérieux et complet est en soi l'avantage.

En V1, le site donne à la FMCCC une existence publique crédible : qui elle est, ce qu'elle fait, où sont ses clubs, quand ont lieu ses compétitions — en français, anglais et russe. Il ne cherche pas encore à digitaliser les processus internes (inscriptions, paiements) : ceux-ci arrivent en V2, une fois la fédération visible et le site éprouvé. Une couche V1.5 rend ensuite le contenu du site pilotable par des personnes non-techniques à la fédération, sans dépendre indéfiniment du développeur.

À terme, ce site est reconnu par ses clubs, ses athlètes, la presse et les instances sportives internationales comme LA source d'information sur le combat au corps à corps au Mali — un actif qui grandit avec la fédération plutôt qu'une vitrine figée.

## 2. Target User

### 2.1 Jobs To Be Done

- **En tant que curieux/grand public**, comprendre ce qu'est la FMCCC, la discipline, et ses bienfaits — pour se faire une première opinion crédible. *(fonctionnel, informationnel)*
- **En tant qu'athlète potentiel**, trouver un club affilié près de chez moi et savoir comment le rejoindre. *(fonctionnel)*
- **En tant que journaliste**, obtenir une information fiable et citable sur la fédération et ses compétitions, dans ma langue. *(fonctionnel)*
- **En tant que responsable de club affilié**, être visible et légitimé officiellement par la fédération. *(social/émotionnel)*
- **En tant que partenaire institutionnel (HSIF, CNOSM, La Perspective Sahélienne)**, vérifier que la fédération est structurée et active avant de m'engager formellement. *(fonctionnel, confiance)*
- **En tant que fédération elle-même**, exister publiquement en ligne pour asseoir sa légitimité, y compris vis-à-vis de ses partenaires russes. *(organisationnel)*

### 2.2 Non-Users (V1)

- Personnes cherchant à s'inscrire en ligne comme athlète ou club — pas possible en V1 (voir §6.2).
- Personnes cherchant des résultats/classements détaillés de compétition — la V1 ne propose qu'un compte-rendu avec photo, pas de classement structuré.
- Personnes cherchant à acheter des équipements en ligne — la boutique arrive en V2.

### 2.3 Key User Journeys

- **UJ-1. Ibrahim tombe sur le site en cherchant "FMCCC" par curiosité.**
  - **Persona + contexte :** Ibrahim, Malien curieux du sport, entend parler d'une nouvelle fédération et la cherche sur un moteur de recherche.
  - **Entrée :** non authentifié, arrive depuis un moteur de recherche.
  - **Parcours :** le site apparaît en premier résultat → il consulte les actualités (avant/après des événements), les compétitions passées et médailles gagnées → il repère les contacts → il pose des questions à une chatbox IA sur la FMCCC.
  - **Climax :** la chatbox répond de façon claire — il comprend ce qu'est la discipline et ce qu'elle lui apporte.
  - **Résolution :** il repart avec une image positive et crédible de la fédération. *("c'est très intéressant")*
  - **Note :** la chatbox IA est une idée V2, exploratoire (voir §6.2) — ce parcours n'est réalisable dans sa forme complète qu'une fois la chatbox construite.

- **UJ-2. Moussa cherche un club près de chez lui pour s'entraîner.**
  - **Persona + contexte :** Moussa, 22 ans, vit à Sikasso `[ASSUMPTION: ville — non confirmée]`, veut essayer la discipline.
  - **Entrée :** non authentifié, arrive sur l'annuaire des clubs.
  - **Parcours :** il ouvre l'annuaire → il filtre par région (Sikasso) → il trouve un club affilié avec nom, localisation et contact → il consulte le calendrier pour voir si une compétition ou séance approche.
  - **Climax :** il voit qu'un club existe réellement près de chez lui, avec un moyen concret de le contacter.
  - **Résolution :** il contacte le club hors-site (téléphone/WhatsApp) — pas d'inscription en ligne en V1.
  - **Cas limite :** si aucun club n'existe dans sa région, un message encourageant l'invite à contacter directement la fédération pour plus d'infos.

- **UJ-3. Elena, journaliste russe, vérifie les résultats de la dernière compétition pour son article.**
  - **Persona + contexte :** Elena `[ASSUMPTION: nationalité/média précis — non confirmés]`, couvre la coopération sportive Mali-Russie.
  - **Entrée :** non authentifiée, arrive via un lien partagé ou une recherche.
  - **Parcours :** elle bascule le site en russe → elle consulte la vitrine institutionnelle (mission, lien Mali-Russie) → elle va sur le blog pour trouver le compte-rendu de la dernière compétition → elle cherche un contact presse.
  - **Climax :** elle trouve un compte-rendu fiable en russe, avec une photo des résultats et assez de contexte pour citer la FMCCC.
  - **Résolution :** elle contacte la fédération ou cite directement le site comme source.
  - **Règle :** un compte-rendu de compétition peut inclure une photo des résultats pour animer le contenu, mais ce n'est pas obligatoire (voir FR-5).

- **UJ-4. Le club de Fatoumata apparaît enfin dans l'annuaire officiel.**
  - **Persona + contexte :** Fatoumata dirige un club affilié à Kayes `[ASSUMPTION: ville — non confirmée]`, affiliation faite hors-ligne.
  - **Entrée :** elle a transmis les infos de son club (nom, ville, contact) à la fédération via WhatsApp.
  - **Parcours :** la fédération ajoute le club dans l'annuaire → Fatoumata consulte le site, filtre par sa région, retrouve son club listé.
  - **Climax :** elle voit son club officiellement visible et reconnu.
  - **Résolution :** elle se sent légitimée, partage le lien de la fiche club.
  - **Cas limite :** si une info est incorrecte, elle envoie un message WhatsApp signalant l'erreur — pas de correction en libre-service en V1. En V2 (avec authentification), chaque responsable de club pourra gérer/corriger les infos de son propre club directement sur le site.

- **UJ-5. Un responsable de la HSIF vérifie le sérieux de la FMCCC avant une reconnaissance officielle.**
  - **Persona + contexte :** Sergueï `[ASSUMPTION: nom/rôle précis — non confirmés]`, responsable HSIF, reçoit une demande de reconnaissance de la FMCCC.
  - **Entrée :** non authentifié, arrive via un lien transmis par la FMCCC ou La Perspective Sahélienne.
  - **Parcours :** il consulte la vitrine (mission, structure, historique) → il regarde le calendrier et le blog pour vérifier une activité réelle → il consulte l'annuaire des clubs pour évaluer l'ampleur de la fédération → il cherche un contact officiel.
  - **Climax :** il constate une fédération structurée et active, avec du contenu en russe.
  - **Résolution :** il engage une correspondance officielle avec une crédibilité déjà établie.
  - **Cas limite :** le nombre de clubs/compétitions est amené à croître dans le temps (ex. 10 aujourd'hui, 50 demain) — le site présente l'état réel et actuel ; la croissance progressive fait partie du récit normal d'une jeune fédération, elle n'a pas besoin d'être camouflée.

## 3. Glossary

- **FMCCC** — Fédération Malienne de Combat au Corps à Corps, fondée mars 2026 à Bamako.
- **Combat au corps à corps** — la discipline sportive représentée par la FMCCC, équivalent du Rukopashny Boy russe.
- **HSIF** — fédération internationale de référence pour la discipline ; interlocuteur pour la reconnaissance internationale de la FMCCC.
- **CNOSM** — instance sportive nationale malienne, liée à la FMCCC via son directeur technique.
- **La Perspective Sahélienne** — association portant la coopération sportive Mali-Russie à l'origine de la FMCCC.
- **Club affilié** — club local reconnu par la FMCCC, listé dans l'Annuaire des clubs. L'affiliation elle-même se fait hors-ligne (contact WhatsApp) en V1.
- **Annuaire des clubs** — page du site listant les Clubs affiliés, filtrable par région.
- **Compétition** — événement sportif organisé ou reconnu par la FMCCC, apparaissant au Calendrier des compétitions et, une fois passé, dans un Compte-rendu de compétition sur le Blog.
- **Calendrier des compétitions** — page listant les Compétitions à venir (et passées).
- **Blog / Actualités** — flux de publications de la FMCCC : annonces, communiqués, Comptes-rendus de compétition.
- **Compte-rendu de compétition** — publication du Blog documentant une Compétition passée ; peut inclure une photo des résultats, à titre optionnel (FR-5).
- **Vitrine institutionnelle** — ensemble des pages présentant la FMCCC (mission, histoire, structure, coopération Mali-Russie, contacts).
- **Éditeur de contenu** — rôle non-développeur, introduit en V1.5, pouvant créer des publications de Blog via une interface d'administration.
- **Chatbox IA** — assistant conversationnel capable de répondre aux questions sur la FMCCC ; idée V2 exploratoire, non-obligatoire (un "plus" facultatif, pas une exigence de la V2), hors scope V1.
- **Compte utilisateur** — identité authentifiée sur le site, introduite en V2 ; ouverte aux Athlètes, Clubs, et au grand public (compte limité).

## 4. Features

*V1 uniquement — le détail des FR ci-dessous couvre la V1 (lancement). La V1.5 et la V2 sont décrites en §6.2 (Out of Scope for MVP) sans FR détaillées, ces phases n'étant pas encore en construction.*

### 4.1 Vitrine institutionnelle

**Description :** Pages statiques présentant la FMCCC — mission, histoire, structure, coopération Mali-Russie, contacts officiels. Réalise UJ-1, UJ-3, UJ-5. Le lien avec le partenaire russe doit être présenté comme un partenariat sportif, traité avec soin, sans excès de mise en avant `[ASSUMPTION: ton exact à valider avec le président — voir Aesthetic and Tone]`.

**Functional Requirements :**

#### FR-1: Présentation de la fédération

Un visiteur peut consulter la mission, l'histoire et la structure de la FMCCC. Réalise UJ-1, UJ-5.

**Consequences (testable):**
- La page présente au minimum : date de fondation, mission, structure organisationnelle, lien avec la coopération Mali-Russie.
- La page est accessible sans authentification.

#### FR-2: Contacts officiels

Un visiteur peut trouver un moyen de contacter officiellement la fédération (téléphone, email, ou autre). Réalise UJ-3, UJ-5.

**Consequences (testable):**
- Au moins un contact officiel est visible sur la page vitrine et/ou dans un pied de page global.

### 4.2 Blog / Actualités

**Description :** Flux chronologique de publications — annonces, communiqués, comptes-rendus de compétition. Réalise UJ-1, UJ-3. Un compte-rendu de compétition peut inclure une photo des résultats, à titre optionnel.

**Functional Requirements :**

#### FR-3: Liste des actualités

Un visiteur peut parcourir la liste des publications du Blog, triées du plus récent au plus ancien.

**Consequences (testable):**
- Chaque entrée de la liste affiche au minimum : titre, date, extrait ou image de couverture.

#### FR-4: Lecture d'une actualité

Un visiteur peut ouvrir une publication du Blog et en lire le contenu complet (texte, images).

#### FR-5: Photo optionnelle sur les comptes-rendus de compétition

Un compte-rendu de compétition publié sur le Blog peut inclure une ou plusieurs photos montrant les résultats de la compétition, pour animer le contenu. Une photo n'est pas requise : un compte-rendu peut être un simple message texte. Réalise UJ-3.

**Consequences (testable):**
- Un compte-rendu de compétition sans photo reste valide et publiable.
- Quand une photo est présente, elle s'affiche dans la publication.

**Out of Scope :**
- Résultats/classements détaillés structurés (liste de médailles par athlète, etc.) — non demandés en V1.

### 4.3 Annuaire des clubs affiliés

**Description :** Répertoire des clubs affiliés à la FMCCC, filtrable par région. Réalise UJ-2, UJ-4, UJ-5.

**Functional Requirements :**

#### FR-6: Liste des clubs affiliés

Un visiteur peut parcourir la liste des clubs affiliés à la FMCCC, chacun affichant nom, région/localisation et contact. Réalise UJ-4, UJ-5.

#### FR-7: Recherche par région

Un visiteur peut filtrer l'annuaire par région pour trouver les clubs affiliés proches de lui. Réalise UJ-2.

**Consequences (testable):**
- Le filtre s'appuie sur un découpage par région (pas de filtre plus fin — commune, quartier — en V1).
- `[NOTE FOR PM: filtre plus fin par commune/quartier envisagé pour une phase future, une fois le nombre de clubs par région suffisant pour le justifier.]`

#### FR-8: Message si aucun club dans la région

Si aucun club affilié n'existe dans la région sélectionnée, le système affiche un message encourageant invitant le visiteur à contacter directement la fédération. Réalise UJ-2.

**Consequences (testable):**
- Le message inclut ou renvoie vers les Contacts officiels (FR-2).

### 4.4 Calendrier des compétitions

**Description :** Page listant les compétitions à venir (et passées) organisées ou reconnues par la FMCCC. Réalise UJ-2, UJ-5.

**Functional Requirements :**

#### FR-9: Compétitions à venir

Un visiteur peut consulter la liste des compétitions à venir, avec date et lieu. Une compétition sur plusieurs jours (ex. du 08/08/2026 au 12/08/2026) est marquée sur toute sa durée dans le calendrier, pas juste à sa date de début. Réalise UJ-2, UJ-5.

#### FR-10: Historique des compétitions passées

Un visiteur peut consulter, dans une section dédiée du Calendrier, la liste des compétitions passées avec leurs dates. Quand un Compte-rendu de compétition correspondant existe sur le Blog, l'entrée du Calendrier renvoie (lien) vers cette publication pour plus de détail. Réalise UJ-5.

**Consequences (testable):**
- L'entrée du Calendrier affiche toujours au minimum les dates et le lieu de la compétition passée, que le compte-rendu existe ou non.
- Le lien vers le Compte-rendu du Blog n'apparaît que si une publication correspondante existe — pas de lien mort.

### 4.5 Multilinguisme (FR/EN/RU)

**Description :** L'ensemble du site public est disponible en français, anglais et russe. Réalise UJ-3.

**Functional Requirements :**

#### FR-11: Changement de langue

Un visiteur peut basculer la langue d'affichage du site entre français, anglais et russe à tout moment, depuis n'importe quelle page.

#### FR-12: Contenu traduit dans les trois langues

Le contenu public (Vitrine, Blog, Annuaire, Calendrier) est disponible en français, anglais et russe.

**Consequences (testable):**
- Aucune page publique ne s'affiche uniquement en français sans équivalent EN/RU disponible ou en cours.
- Les traductions EN/RU sont produites par le développeur lui-même (au moins en V1).

**Feature-specific NFRs :**
- Le rendu du russe (caractères cyrilliques) doit être correct sur toutes les polices et mises en page utilisées.

## 5. Non-Goals (Explicit)

- La FMCCC ne devient pas, en V1, une plateforme d'inscription ou de gestion d'athlètes/clubs — c'est le rôle de la V2.
- La FMCCC ne publie pas, en V1, de classements ou résultats détaillés compétition par compétition — seul un compte-rendu avec photo est prévu.
- Le site n'est pas, en V1, une boutique en ligne — la vente d'équipements est V2.
- Le site ne dépend pas d'un compte utilisateur pour consulter son contenu public en V1 — tout est accessible sans authentification.

## 6. MVP Scope

### 6.1 In Scope

- Vitrine institutionnelle (FR-1, FR-2)
- Blog / Actualités avec comptes-rendus de compétition, photo optionnelle (FR-3 à FR-5)
- Annuaire des clubs affiliés, filtrable par région (FR-6 à FR-8)
- Calendrier des compétitions (FR-9, FR-10)
- Site multilingue FR/EN/RU (FR-11, FR-12)

### 6.2 Out of Scope for MVP

- **Résultats/classements détaillés de compétition** — remplacés par le compte-rendu, photo optionnelle (FR-5). À réévaluer avec l'authentification (V2).
- **Page "Compétitions" dédiée (V2)** — page distincte du Blog regroupant les résumés de compétitions (passées, en cours, à venir), avec indication du pays vainqueur pour chaque compétition — sans détailler le classement individuel des athlètes. Remplacerait à terme le Calendrier + les comptes-rendus du Blog pour cet usage.
- **Interface d'administration / Éditeur de contenu (V1.5)** — permettra à des personnes non-développeuses de créer du contenu Blog une fois le site en ligne et stable. `[NOTE FOR PM: l'architecture V1 doit être conçue pour absorber cette extension sans refonte majeure — contrainte à porter en architecture, pas en FR V1.]`
- **Authentification et comptes utilisateurs (V2)** — ouverte aux athlètes, aux clubs (gestion/correction de leurs propres infos), et au grand public via un compte limité donnant accès à : notifications sur les compétitions, commentaires sur les actualités. *(L'achat en ligne a été retiré des bénéfices du compte limité tant que le paiement en ligne — hors scope V2, voir brief — n'est pas cadré.)*
- **Boutique e-commerce (V2+, sans calendrier fixe)** — vente d'équipements officiels, liée aux Comptes utilisateur. Construite quand le besoin réel de vendre se fera sentir, pas systématiquement au même moment que l'authentification.
- **Chatbox IA (V2, exploratoire, facultative)** — assistant conversationnel répondant aux questions sur la FMCCC ; un "plus" non-obligatoire, pas une exigence de la V2. `[NOTE FOR PM: idée volontairement mise de côté, pas encore engagée — à réévaluer selon les priorités post-lancement.]`

## 7. Success Metrics

Aucune métrique chiffrée n'est fixée à ce stade (décision du brief). Le critère retenu pour la V1 est qualitatif :

- **SM-1** : Le site est en ligne, fonctionne correctement dans les trois langues, et reflète fidèlement l'identité de la FMCCC — validé par la satisfaction d'Alioune Badara Traoré. Valide l'ensemble des FR de la V1.

Des métriques plus mesurables (visibilité, adhésions de clubs, reprises presse) pourront être définies après la mise en ligne et un premier retour d'usage — voir Open Questions.

## 8. Open Questions

1. Budget non chiffré côté fédération — à clarifier avant les décisions d'hébergement/outillage qui ont un coût récurrent.
2. Logo de la fédération pas encore transmis — bloquant pour l'intégration visuelle finale.
3. Absence de jalon/deadline formel ("quand ce sera prêt") — un jalon informel pourrait éviter que la V1 s'étire indéfiniment en solo (signalé dans le brief).
4. Contenu (photos/vidéos) de la première compétition (mars 2026) pas encore en possession du développeur — utile si tu veux les inclure dans le compte-rendu correspondant, mais plus bloquant vu que la photo est désormais optionnelle (FR-5).
5. Boutique e-commerce (V2+) sans paiement en ligne cadré (hérité du brief) : la vente d'équipements devra, à un moment, adresser cette tension.

## 9. Assumptions Index

- §2.3 UJ-2 — ville de Moussa (Sikasso) non confirmée, utilisée à titre d'exemple.
- §2.3 UJ-3 — nationalité/média précis d'Elena non confirmés, utilisés à titre d'exemple.
- §2.3 UJ-4 — ville de Fatoumata (Kayes) non confirmée, utilisée à titre d'exemple.
- §2.3 UJ-5 — nom/rôle précis du représentant HSIF non confirmés, utilisés à titre d'exemple.
- §4.1 FR-1 — ton exact de présentation du partenariat Mali-Russie à valider avec le président.

## Information Architecture

- **Accueil** — entrée principale, sélecteur de langue visible, met en avant actualités récentes et prochaine compétition.
- **Vitrine / À propos** — mission, histoire, structure, coopération Mali-Russie, contacts.
- **Actualités / Blog** — liste + pages de détail.
- **Clubs** — annuaire filtrable par région.
- **Compétitions** — calendrier à venir / passées.
- **Contact** — coordonnées officielles (peut être fusionné avec la Vitrine ou un pied de page global).

`[ASSUMPTION: arborescence à plat, sans sous-menus profonds — cohérent avec un site vitrine de 5 sections ; à valider une fois les maquettes UX disponibles.]`

## Aesthetic and Tone

- Ton institutionnel et crédible, adapté à un public incluant la presse et des partenaires internationaux (HSIF, CNOSM).
- La coopération Mali-Russie et le rôle du partenaire russe (maître de sport, juge à la première compétition) sont présentés comme un partenariat sportif réel, sans le surexposer ni le minimiser `[ASSUMPTION: équilibre exact à valider avec Alioune Badara Traoré].`
- Le contenu valorise les bénéfices santé et le rayonnement sportif de la discipline (relevé dans UJ-1), sans ton promotionnel excessif.

## Platform

- Site web responsive, accessible sur mobile et desktop. `[ASSUMPTION: usage mobile probablement dominant au Mali — à confirmer, impacte les priorités de performance/UX mobile.]`
- Pas d'application native prévue à ce stade (V1 ou V2).

## Monetization

- Aucune monétisation en V1 (site vitrine, gratuit).
- La boutique e-commerce (équipements officiels) n'est pas engagée sur un calendrier fixe : elle sera construite quand le besoin réel de vendre des articles se fera sentir, pas nécessairement dès la V2. Détails de paiement non encore spécifiés (hors scope, voir brief).

## Stakeholders and Approvals

- **Décideur unique** : Alioune Badara Traoré, président de la FMCCC. Toute validation de design, fonctionnalités ou contenu passe par lui.
- **Développement** : porté en solo par l'utilisateur, sans équipe design ou contenu séparée en V1.

## Constraints and Guardrails

- **Cost** : budget existant côté fédération mais non chiffré — contrainte sur les choix d'hébergement/outillage récurrents (voir Open Questions §8.1).
- **Privacy** *(V2)* : les Comptes utilisateur introduiront des données personnelles (athlètes, clubs, grand public) — la conception de la gestion de ces données est différée à la V2, mais à anticiper en architecture si l'Éditeur de contenu (V1.5) ou l'authentification (V2) partagent une base commune.
