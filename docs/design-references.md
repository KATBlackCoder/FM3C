# Références design — sites de fédérations

*Analyse comparative de sites de fédérations existants, pour servir d'exemple concret sur le design, la structure et les fonctions du site FMCCC — pas une contrainte, une base de comparaison. À utiliser au moment des maquettes et du choix des composants Nuxt UI. Complète `product/prd.md` (Information Architecture, Aesthetic and Tone) sans le remplacer.*

## Sites analysés

| Site | Type | Pourquoi ce choix |
|---|---|---|
| [World Athletics](https://worldathletics.org/) | Fédération internationale, très grande échelle | Référence du "plafond" en design — pour voir ce qui se fait de mieux, pas pour copier tel quel à l'échelle de FMCCC |
| [IJF](https://www.ijf.org/) (Judo) | Fédération internationale, sport de combat | Comparable en nature de contenu (compétitions, membres, actualités) |
| [FIAS](https://sambo.sport/en/) (Sambo) | Fédération internationale, discipline proche | Déjà identifiée comme comparable dans le Product Brief |
| [HSIF](https://hsif.world/) (Combat au corps à corps) | Fédération internationale de référence directe pour la discipline de FMCCC | La plus proche en maturité — sert de repère "jeune fédération" |
| [CNOSM](https://cnosm.org/) (Comité Olympique du Mali) | Comité national, Bamako | Le plus pertinent de tous : basé à Bamako, bilingue FR/EN, organisme pour lequel le président de la FMCCC travaille comme directeur technique |
| `femafoot.ml` (Fédération Malienne de Football) | Fédération nationale malienne | Tentative de comparaison locale — **domaine mort, ne résout plus** (voir Risques) |

## Ce qui revient systématiquement (peu importe l'échelle)

1. **Navigation à plat, 5-8 entrées max** : Accueil, À propos/Structure, Actualités, Calendrier/Compétitions, Fédérations/Membres, Contact/Presse. Même World Athletics (échelle FIFA) garde un menu principal court, la profondeur va en sous-menus, pas en largeur. Confirme l'Information Architecture déjà posée dans le PRD.
2. **Homepage = vitrine + fil d'actualités**, jamais un mur de texte institutionnel. Le contenu institutionnel (mission, histoire) va sur une page "À propos" séparée ; la home met en avant l'actualité récente + le prochain événement. Confirme la description de l'Accueil déjà dans le PRD.
3. **Articles avec image de couverture + tag/catégorie + date**, triés antéchronologique — correspond à FR-3.
4. **Sélecteur de langue toujours visible en haut** (CNOSM : FR/EN ; FIAS : RU/EN) — confirme FR-11.
5. **Réseaux sociaux en footer, jamais en widget embarqué lourd sur la home.** Aucun des sites analysés n'affiche de flux Instagram/Facebook live — juste des liens. Confirme la décision déjà prise dans `social-media.md`.
6. **Design "institutionnel mais pas austère"** : fond clair, photos de compétition en grand format plutôt que de l'illustration, une seule couleur d'accent forte liée à l'identité visuelle (bleu IJF, couleurs nationales pour CNOSM). Cohérent avec le ton "crédible, pas promotionnel" du PRD (Aesthetic and Tone).

## Petites fédérations vs grandes — ce qui distingue HSIF

- **Pas de flux d'actualités structuré** : HSIF publie des galeries d'images par événement (KO2026, MO2026...) sans texte d'accompagnement, pas d'articles au sens propre. FMCCC fait déjà mieux par construction : FR-3/FR-4 imposent un vrai flux d'actualités avec texte, pas juste des photos.
- **Vidéo renvoyée vers une plateforme externe dédiée** ("H2HFIGHT.TV") plutôt qu'intégrée au site — cohérent avec la décision déjà prise de reporter l'intégration vidéo (voir `architecture.md` §4) plutôt que de la bricoler à moitié.
- **Réseaux sociaux réels de HSIF : VK + Telegram**, pas Instagram/Facebook (logique, HSIF est basée à Moscou). Confirme concrètement la recommandation de `social-media.md` : pour le public russe/HSIF, VK/Telegram sont les réseaux pertinents.

## Directement réutilisable pour FMCCC (V1, sans changer l'architecture déjà décidée)

- **Annuaire des clubs façon "Members/Federations"** (IJF, CNOSM) : liste avec logo/nom/région, filtrable — correspond à FR-6/FR-7 tel que déjà modélisé dans `architecture.md` §3.
- **Calendrier avec statut visuel** (à venir / en cours / passé) et renvoi croisé vers le compte-rendu correspondant (IJF sépare Calendar et Results, avec lien entre les deux) — confirme FR-9/FR-10.
- **Piste d'amélioration mineure, pas dans le PRD actuel** : une page/contact "Presse" distinct du contact général (CNOSM a un "Espace Presse" séparé). La presse est un persona explicite du PRD (UJ-3, UJ-5) — à évaluer avec le président si ça vaut la peine d'un contact dédié, sans complexifier l'IA à plat déjà retenue.

## Risques identifiés pendant cette recherche

- **Domaine `.ml` non fiable dans la durée** : `femafoot.ml`, le domaine d'une fédération nationale malienne de football, ne résout plus (DNS mort). Signal concret, pas juste théorique, à garder en tête pour le choix/la gestion du nom de domaine FMCCC (déjà noté comme dépendance externe non tranchée dans `roadmap.md`).

## Sources

- [World Athletics](https://worldathletics.org/)
- [International Judo Federation (IJF)](https://www.ijf.org/)
- [International SAMBO Federation (FIAS)](https://sambo.sport/en/)
- [Hand-to-Hand Fighting Sport International Federation (HSIF)](https://hsif.world/)
- [Comité National Olympique et Sportif du Mali (CNOSM)](https://cnosm.org/)
