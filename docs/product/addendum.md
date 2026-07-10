# Addendum — Site web FM3C

*Contenu qui appuie le PRD (`prd.md`) sans y avoir sa place : hypothèses techniques, contexte concurrentiel, détails destinés à l'architecture plutôt qu'aux exigences produit.*

## Hypothèses techniques de départ (non tranchées)

Issues du Product Brief — intentions de départ, pas des décisions fermes. À trancher en phase architecture :

- Nom de domaine réservé au Mali.
- Hébergement envisagé : Vercel.
- Framework envisagé : Nuxt.js.

## Contexte concurrentiel

Recherche menée pendant le Product Brief : aucune présence indépendante (web ou réseaux sociaux) n'existe pour la FM3C à ce jour. Les sites de fédérations comparables dans des disciplines proches (FIAS-sambo, HSIF) restent eux-mêmes sommaires — il n'existe pas de modèle "vitrine + boutique + compte membre" abouti dans cette discipline à copier. La FM3C n'a donc pas de référence directe à égaler ou dépasser ; l'avantage vient d'arriver en premier avec un site sérieux et complet, pas d'une différenciation technique.

## Contrainte V1.5 sur l'architecture

La V1.5 (interface d'administration / Éditeur de contenu, voir PRD §6.2) n'est pas construite en V1, mais l'architecture de contenu (modèle de données du Blog notamment) doit être pensée dès la V1 pour absorber cette extension sans refonte majeure — en particulier la structure des publications et des comptes-rendus de compétition (photo optionnelle, FR-5).

## Historique — première compétition (mars 2026)

La première compétition (22-24 mars 2026, Acropole de Bamako, ~70 athlètes) n'a pas encore de photos/vidéos en possession du développeur au moment de ce PRD — utile si elles sont incluses dans le compte-rendu correspondant sur le Blog, mais plus bloquant vu que la photo y est désormais optionnelle (voir PRD, Open Questions §8.4).

## Idée V2 — Page "Compétitions" dédiée

Évoquée pendant la revue du PRD : une page distincte du Blog, regroupant les résumés de compétitions (passées, en cours, à venir) avec indication du pays vainqueur pour chaque compétition, sans détail de classement individuel. Remplacerait à terme le Calendrier + les comptes-rendus du Blog pour cet usage. Reportée en V2 (voir PRD §6.2) — pas engagée pour la V1.
