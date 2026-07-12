# Benchmark design — grandes fédérations et ligues sportives

*Complète `docs/design-references.md` (qui couvre les fédérations "comparables en maturité" : IJF, FIAS, HSIF, CNOSM). Ce document couvre un second ensemble de sites — fédérations mondiales à gros volume et ligues de combat professionnelles — analysés élément par élément (calendrier, puis navigation/structure/menus au fur et à mesure) pour identifier ce qui est réutilisable pour FMCCC **maintenant** vs **quand le site aura grandi** (plus de compétitions, plus de contenu, plus de trafic). Document vivant, mis à jour à chaque nouvelle analyse.*

## Sites analysés

| Site | Type | Pourquoi ce choix |
|---|---|---|
| [FIFA](https://www.fifa.com/) | Fédération mondiale, portefeuille multi-compétitions | Référence du "plafond" absolu — pour voir l'échelle à ne pas viser, pas à copier |
| [UEFA](https://www.uefa.com/) | Confédération continentale, multi-compétitions | Même famille que FIFA, structure "grille de compétitions" |
| [World Athletics](https://worldathletics.org/) | Fédération mondiale, discipline unique mais très haut volume | Déjà dans `design-references.md` — recroisé ici sur le calendrier spécifiquement |
| [FIBA](https://www.fiba.basketball/) | Fédération mondiale, sport d'équipe | Pattern calendrier accordéon par mois — bon compromis lisibilité/volume |
| [IJF](https://www.ijf.org/) (Judo) | Fédération mondiale, sport de combat | Déjà dans `design-references.md` — recroisé ici sur le calendrier spécifiquement |
| [United World Wrestling](https://uww.org/) | Fédération mondiale, sport de combat | Tableau calendrier groupé par mois, filtres multi-dimensions |
| [World Taekwondo](https://www.worldtaekwondo.org/) | Fédération mondiale, sport de combat | Sous-nav calendrier séparant compétitions et développement |
| [IBJJF](https://ibjjf.com/) (Jiu-Jitsu Brésilien) | Fédération internationale, sport de combat | Échelle plus proche de FMCCC parmi les fédérations de combat |
| [UFC](https://www.ufc.com/) | Ligue professionnelle (pas une fédération) | Référence de ton éditorial/visuel "combat", à filtrer : c'est une ligue commerciale, pas une fédération associative |
| [ONE Championship](https://www.onefc.com/) | Ligue professionnelle (pas une fédération) | Idem UFC — pattern de grille d'événements à cartes-affiches |

## Calendrier / Compétitions à venir (FR-9, FR-10)

Décisions retenues consignées dans `architecture.md` §3 ("Affichage du Calendrier"). Détail du comparatif :

### Ce qui revient chez les fédérations "de combat" (IJF, UWW, World Taekwondo, IBJJF) — le groupe le plus comparable

- **Ligne d'événement compacte** : plage de dates (`27 fév. - 1 mars`), titre, lieu (drapeau + ville/pays), lien conditionnel.
- **IJF** : toggle "Show previous events" — une seule liste, bascule à-venir/passées. Le lien sur événement passé va vers "Results/Draw" (résultats structurés) — **à ne pas reproduire**, hors-scope FMCCC.
- **UWW** : tableau groupé par mois, filtres Type/Style/Age/Tournament/Year + recherche — **filtres à ne pas reproduire** (volume FMCCC trop faible), mais le regroupement par mois est un bon pattern de croissance.
- **IBJJF** : onglets mois (JAN-DEC) + liste, filtres Championship type/Region + recherche — même verdict que UWW (regroupement oui, filtres non).
- **World Taekwondo** : sous-nav "WT Calendar" séparant "Event Calendar" et "Development Calendar" — idée à garder en tête si FMCCC distingue un jour compétitions officielles vs événements de développement de club, mais aucun signal du PRD ne le demande aujourd'hui.

### Ce qui est hors d'échelle (FIFA, UEFA, World Athletics, FIBA)

- **World Athletics** : tableau trié/filtrable à 6+ dimensions (date, région, discipline, catégorie de classement, permis, groupe de compétition) — calendrier mondial agrégeant des centaines de fédérations nationales. Aucune pertinence au volume FMCCC.
- **FIFA / UEFA** : portail "grille de compétitions" (Coupe du Monde, Ligue des Champions, Europa League...) — FMCCC gère une seule discipline, pas un portefeuille de compétitions. Non transposable.
- **FIBA** : accordéon par mois avec compteur (`July 2026 (23)`), carte par événement avec logo/lien externe — **seul élément retenu comme pattern de croissance** (regroupement par mois), le reste (volume, filtres implicites) ne s'applique pas.

### Ce qui est un piège malgré son attrait visuel (UFC, ONE Championship)

- **UFC** : hero plein écran sur le seul **prochain** événement, pas de liste par défaut — sous-informatif pour FR-9 qui demande explicitement *la liste* des compétitions à venir, pas juste la prochaine.
- **ONE Championship** : grille de cartes-affiches (photo pro par événement, titre, date, lieu, CTA billet) — visuellement fort mais suppose une banque de visuels promotionnels par compétition que FMCCC n'a pas (le PRD ne prévoit qu'un `cover` optionnel sur le *compte-rendu après coup*, pas une affiche avant l'événement). À ne pas viser tant que ce contenu n'existe pas.
- Ce sont des **ligues commerciales**, pas des fédérations associatives — leur budget photo/vidéo et leur fréquence d'événements (hebdomadaire) n'ont pas d'équivalent réaliste pour FMCCC.

### Verdict retenu (voir `architecture.md` §3 pour le détail schéma)

1. **Maintenant (V1)** : liste simple, plage de dates compacte, séparation à-venir/passées sur la même page, lien conditionnel vers le compte-rendu blog uniquement.
2. **Quand le calendrier grandira** (~8-10 compétitions/an ou plus) : regroupement par mois façon FIBA/IBJJF — pur ajout d'affichage, pas de changement de schéma de contenu.
3. **Jamais** (contredit le scope FMCCC, pas juste "pas encore") : filtres multi-dimensions, résultats/classements structurés, portail multi-compétitions.

## Navigation, structure de page, menus, positions

### Ce qui a été observé

| Site | Position logo | Nombre d'entrées nav (niveau 1) | Étages de nav | Thème |
|---|---|---|---|---|
| UEFA | Gauche | ~7 | 1 (bandeau compétitions au-dessus, hors nav) | Clair, accent bleu |
| World Athletics | Gauche | 9 + CTA | 2 (barre utilitaire + nav principale), méga-menus profonds | Clair, accent orange/vert |
| FIFA | Gauche (+ hamburger séparé) | 7 | 2 (barre utilitaire + nav), méga-menus profonds | Clair, accent bleu |
| FIBA | Centré (icône+label) | 6 (dont un "More" fourre-tout) | 1 | **Sombre** |
| IJF | Gauche | 9, la plupart avec sous-menu | 1 (+ mini-bandeau partenaires au-dessus) | Clair, accent violet |
| UWW | Gauche | 6 + 2 CTA ("Get Your Pass", "Log in") | 2 (bandeau ticker + nav) | Clair, accent bordeaux |
| World Taekwondo | **Centré, sur sa propre ligne** | 9 | 2 (ligne logo+réseaux sociaux, puis ligne nav) | **Sombre** |
| IBJJF | Gauche | 8 | 1 | Clair, accent bleu marine |
| UFC | **Centré**, nav scindée en deux groupes de part et d'autre | 8 | 1 | **Sombre** |
| ONE Championship | Gauche | 9, plusieurs avec sous-menu | 2 (bandeau promo + nav) | **Sombre** |

### Constats

1. **Logo à gauche = norme institutionnelle.** 8 des 10 sites gardent le logo à gauche. Les deux exceptions — UFC (logo centré, nav scindée) et World Taekwondo (logo centré sur sa propre ligne) — sont aussi les deux sites au ton le plus "spectacle/événementiel". Confirme le constat déjà posé dans `design-references.md` (§"design institutionnel mais pas austère") : un logo centré est une signature de marque commerciale/de ligue, pas de fédération institutionnelle. **Pour FMCCC : logo à gauche, sans hésitation.**
2. **Thème sombre = signature "combat spectacle", pas "fédération officielle".** Les 4 sites en thème sombre (FIBA, World Taekwondo, UFC, ONE) sont soit des ligues commerciales (UFC, ONE) soit des sites au ton très orienté "show" (FIBA, World Taekwondo — beaucoup de vidéo/highlights en hero). Les fédérations les plus "sérieuses" dans l'échantillon (UEFA, World Athletics, FIFA, IJF, UWW, IBJJF) restent en thème clair. Confirme et renforce la décision déjà actée : FMCCC doit rester en thème clair (ton "crédible, pas promotionnel" du PRD).
3. **Nombre d'entrées de nav de niveau 1 : jamais au-dessus de 9, même à l'échelle FIFA.** Conforme au constat déjà dans `design-references.md` ("5-8 entrées max") — les organisations qui montent à 9 (World Athletics, IJF, World Taekwondo, ONE) compensent par une **profondeur en sous-menus**, jamais en largeur de barre de nav. FMCCC avec 6 entrées V1 au plus (Accueil, À propos, Blog, Clubs, Calendrier, Contact) reste largement sous le seuil, pas besoin de dropdown du tout au lancement.
4. **Nav multi-étages (barre utilitaire + nav principale) apparaît uniquement chez les sites avec compte utilisateur, boutique ou sponsors à exposer** (World Athletics, FIFA, UWW, ONE — comptes/pass/store/partenaires). FMCCC n'a ni auth, ni boutique, ni sponsor à afficher en V1 (§6 architecture.md) — un nav à un seul étage suffit et évite une charge visuelle non justifiée par le contenu réel.
5. **Structure de homepage : deux familles distinctes.**
   - **"Vitrine éditoriale"** (IJF, UWW à y regarder de près) : mélange fil d'actu + widgets denses (classements mondiaux, scores de combats en direct, bibliothèque vidéo "358612 videos"). C'est une structure de **fédération mature avec beaucoup de données en temps réel** (résultats, rankings) — non transposable tel quel, FMCCC n'a pas ces données (pas de classements structurés, hors-scope V1/V2 — architecture.md §6).
   - **"Vitrine + prochain événement"** (UFC, ONE, et dans une moindre mesure FIBA) : hero centré sur le prochain événement/actualité + une liste/grille en dessous. Plus proche de ce que FMCCC peut réellement soutenir avec son volume de contenu — déjà la structure retenue dans le PRD (accueil = vitrine + fil d'actualités + prochain événement), donc confirmée plutôt que remise en cause.
6. **Footer** : pas de nouvelle information par rapport à `design-references.md` — les pages consultées ici (IJF, UWW) sont des homepages à défilement infini de widgets (rankings, vidéos, résultats en direct), le footer classique n'est jamais atteint avant plusieurs écrans de contenu. Ça confirme indirectement que ces sites n'ont pas besoin d'un footer riche en information — l'essentiel (réseaux sociaux, mentions légales) suffit, cohérent avec la recommandation déjà actée.

### Verdict retenu

1. **Maintenant (V1)** : logo à gauche, thème clair, nav à un seul étage, 6 entrées max sans dropdown (Accueil/À propos/Blog/Clubs/Calendrier/Contact) — déjà ce que prévoit le PRD, confirmé plutôt que changé par ce comparatif.
2. **Quand le site grandira** : si une section supplémentaire apparaît (ex. Presse, Boutique V2), envisager un sous-menu plutôt que d'élargir la barre à plat — aucun des 10 sites, même à l'échelle FIFA, ne dépasse 9 entrées de niveau 1.
3. **À ne jamais faire** : logo centré, thème sombre par défaut, ou nav multi-étages — ce sont des signatures de ligues commerciales/de fédérations à très haut volume de données, pas du ton institutionnel que vise FMCCC (PRD, Aesthetic and Tone).

## Listes de contenu — actualités et annuaire (FR-3 à FR-8)

### Cartes d'actualités (IJF "Top Stories", UWW "News")

- Pattern identique chez les deux : image pleine largeur, **tag de catégorie superposé ou juste au-dessus du titre** (`PARA JUDO`, `#WrestleBudapest`), titre en gras — **pas de date visible sur la carte elle-même**, ni chez IJF ni chez UWW. La date n'apparaît qu'une fois l'article ouvert.
- Nuance par rapport à `design-references.md` (qui notait "image de couverture + tag/catégorie + **date**" comme motif universel, sur la base d'IJF déjà) : en y regardant de plus près sur la page listing (pas juste la home), la date n'est pas sur la carte. **Ça ne remet pas en cause FR-3** (déjà tranché par le PRD, pas renégociable sur la base d'un comparatif concurrentiel) — mais si le tri antéchronologique suffit à l'usage, afficher la date sur la carte reste un ajout d'information utile pour FMCCC, pas une contrainte à retirer.

### Annuaire de fédérations/membres (comparable à FR-6/FR-7/FR-8)

- **UEFA "National associations"** : liste plate alphabétique, texte seul (pas de logo, pas de filtre visible), groupée visuellement en grille. Minimal — fonctionne bien pour ~55 entrées.
- **IJF "Members"** : pattern plus riche — carte du monde cliquable en haut (filtre par continent), onglets Africa/Asia/Europe/Oceania/Panamerica/Other + "All", champ de recherche par nom, liste à deux colonnes (pays + code + nom de la fédération) groupée par continent sélectionné. Gère ~205 membres.
- **Verdict pour FMCCC** : le volume (annuaire de clubs à l'échelle du Mali, quelques dizaines d'entrées au plus) est bien plus proche d'UEFA (55 entrées, liste plate) que d'IJF (205 entrées, carte interactive). **La carte cliquable façon IJF est disproportionnée** — FMCCC a déjà tranché pour un filtre par région (FR-6/FR-7), l'équivalent UI est l'onglet/dropdown de région d'IJF (Africa/Asia/...) appliqué aux régions maliennes, pas la carte du monde. Une simple liste texte (nom du club, région, ville, contact — déjà le schéma `clubs/*.yml` retenu dans `architecture.md` §3) suffit, sans logo ni photo par club nécessaire au lancement.
- Le champ de recherche par nom (IJF) est une amélioration peu coûteuse à garder en tête une fois le filtre région en place, mais pas dans le scope FR-6/FR-7/FR-8 actuel — à ne pas ajouter sans qu'un besoin réel (volume de clubs élevé) ne se manifeste.

## Page "À propos" et formulaire de contact (FR-1, FR-2)

### Structure de la page "À propos" / institutionnelle

- **UEFA "About"** : page-hub, pas une page de contenu — sections "Who we are" / "What we do" / etc., chacune avec un court texte d'accroche et un bouton "Learn more" qui renvoie vers une sous-page dédiée. Logique à l'échelle UEFA (gouvernance, finances, développement, durabilité sont chacun un vrai sujet). **Disproportionné pour FMCCC.**
- **ONE Championship "About Us"** : à l'opposé, une seule page, un seul scroll, 4 paragraphes de texte de mission/positionnement (pas d'organigramme, pas de contact, pas de structure). Le format (page unique, pas de hub) est le plus proche de ce que fait déjà FMCCC — même si le contenu (storytelling de marque commerciale) n'est pas transposable.
- **IJF "Organisation"** (sous "About IJF") : la référence la plus directement comparable — liste du Comité Exécutif (nom, rôle, pays, icônes téléphone/email/bio par personne), avec une page "Addresses" séparée pour les adresses postales par département. C'est la version "grande fédération mature" de ce que fait déjà la section "Notre structure" de `content/pages/fr/about.md` (président nommé + mention que la composition complète du bureau sera publiée une fois la fédération constituée).
- **Verdict** : le format actuel de FMCCC — une page "À propos" unique en un seul scroll (mission, histoire, discipline, coopération Mali-Russie, structure, renvoi vers Contact) — est déjà le bon calibre, plus proche du pattern ONE (page unique) que du hub UEFA. Pas de changement structurel à faire ; **confirmé, pas remis en cause**.

### Formulaire de contact — aucun des sites analysés n'en expose un

C'est le constat le plus net de cette comparaison : sur les 4 sites vérifiés en détail (IJF, UWW, ONE, UEFA), **aucun n'a de formulaire de contact général/presse en accès direct** :

- **IJF** : le lien "Contact" en pied de page mène à une page de mentions légales (nom légal, siège social, numéro d'enregistrement, hébergeurs de données) où le seul point de contact réel est **un simple lien email** (`gs@ijf.org`) noyé dans le texte légal. La page "Addresses" (sous About IJF) ne donne que des adresses postales, sans email ni téléphone.
- **UWW** : `/contact` redirige vers un centre d'aide ("Need Help?") structuré en FAQ Login/Payments/Content — c'est le support client de leur **abonnement streaming payant UWW+**, pas un contact fédération. Sans objet pour FMCCC, qui n'a pas de produit commercial équivalent.
- **ONE Championship** : la page "About Us" ne contient aucune information de contact ; le pied de page ne propose que des liens légaux (Privacy/Editorial Policy/Terms) et les réseaux sociaux.
- **UEFA** : pas de formulaire trouvé dans la navigation "About" — le contact presse/institutionnel passe par les réseaux sociaux et les contacts listés par national association.

**Ce constat valide directement l'implémentation actuelle** (`app/pages/contact.vue` : hero + 3 `UPageCard` — adresse, téléphone, email — sans formulaire) et FR-2 tel qu'écrit dans le PRD ("un visiteur peut **trouver** un moyen de contacter... téléphone, email, ou autre" — pas d'exigence de formulaire de soumission). Même à l'échelle d'IJF ou UEFA, l'affichage d'un contact direct (souvent un simple email) suffit — **pas besoin de construire un formulaire pour FMCCC**, ni maintenant ni comme amélioration future évidente.

### Verdict retenu

1. **Maintenant (V1)** : conserver le format actuel — page "À propos" en un seul scroll, page Contact en cartes d'info sans formulaire. Les deux sont déjà conformes à FR-1/FR-2 et confirmées par ce comparatif.
2. **Quand le bureau sera officiellement constitué** : ajouter une liste simple façon IJF "Organisation" (nom, rôle, éventuellement un contact) à la section "Notre structure" — pas de refonte, un ajout de contenu dans la page existante.
3. **À ne jamais faire (sauf signal contraire du président)** : éclater "À propos" en page-hub multi-sous-pages (UEFA) ou construire un formulaire de contact avec ticketing — aucun des comparables ne le justifie à l'échelle FMCCC, et FR-2 ne le demande pas.

## Page article, fiche club, footer, sélecteur de langue

### Page article de blog individuel (IJF "The Art of Guiding")

- Structure : titre → ligne méta ("Written by [auteur] on [date]", "Photographs by [auteur]") → rangée de partage (Facebook/Twitter/Email/lien/Telegram) → corps de texte en colonne centrale plus étroite que la largeur de page → bloc "See also" (articles liés) en colonne latérale.
- **La date apparaît sur la page article, pas sur la carte listing** — confirme et complète la nuance déjà notée plus haut (§Listes de contenu) : IJF affiche la date une fois l'article ouvert, jamais sur la vignette.
- Directement transposable à FMCCC (FR-3/FR-4/FR-5) : titre, date, auteur (facultatif si toujours le même), corps de texte, `cover` optionnel (déjà dans le schéma `blog/*.md`). **Pas besoin des boutons de partage social multiples** — un lien de partage générique suffit si souhaité, non demandé par le PRD. Le bloc "See also"/articles liés est une amélioration simple à garder pour plus tard (tri par date récente, pas de recommandation algorithmique).

### Fiche club/membre individuelle (IJF, fiche pays "Afghanistan")

- Très riche : bloc d'en-tête (nom fédération, adresse, ville, téléphone, email, drapeau, photo + nom du président) puis **9 sous-onglets** (Overview/Wrl/Results/Photos/Contests/Ippons/Medal ceremony/News/Committee) avec classement mondial, statistiques de participation, palmarès de médailles depuis 2009.
- **Très disproportionné pour FMCCC.** Le schéma `clubs/*.yml` déjà retenu (`name`, `region`, `city`, `contact`) ne couvre — et n'a besoin de couvrir — que l'équivalent du bloc d'en-tête d'IJF, pas les onglets de statistiques/résultats/médailles (hors-scope V1 et V2-à-réévaluer, cf. architecture.md §6 : pas de classement structuré). Un club affilié FMCCC n'est pas une fédération nationale avec des décennies de résultats à afficher — une fiche club minimale (nom, région, ville, contact) reste la bonne cible, sans page dédiée par club nécessairement : une ligne dans l'annuaire peut suffire tant que le volume reste faible.

### Footer

- **IBJJF et ONE Championship** : footer minimal confirmé — logo + icônes réseaux sociaux (Instagram/Facebook pour IBJJF ; Facebook/X/Instagram/YouTube/Weibo pour ONE) + mentions légales en une ligne (copyright, Privacy/Terms). Aucune colonne de liens riche, aucun plan de site dans le footer.
- Ça confirme sans nuance nouvelle ce que `design-references.md` avait déjà établi ("Réseaux sociaux en footer, jamais en widget embarqué lourd") — le footer FMCCC actuel (`app/app.vue` : tagline à gauche, copyright au centre, lien Contact à droite, pas de colonnes de liens) est déjà minimal et aligné avec le comparable le plus proche en échelle (IBJJF). Seul ajout cohérent avec ce comparatif : les icônes réseaux sociaux prévues dans `social-media.md` n'y figurent pas encore — à ajouter au même niveau de sobriété (icônes seules, pas de widget de flux).

### Sélecteur de langue — position

- **FIBA** : icône globe + code "EN ▾" dans la nav principale, coin supérieur droit, à côté du bouton Login.
- **ONE Championship** : "ENGLISH ▾" en toutes lettres, coin supérieur droit, à côté de la recherche.
- **FIFA** : "Français ▾" dans la barre utilitaire (au-dessus de la nav principale), coin supérieur droit.
- **IJF, World Athletics, World Taekwondo** : **aucun sélecteur de langue visible** — ces sites sont en anglais uniquement, sans version localisée. Signal notable : même de grandes fédérations internationales ne se donnent pas la peine du multilingue sur leur site principal.
- **Constat** : quand un sélecteur de langue existe, il est **toujours en haut à droite**, jamais ailleurs — confirme ce que `design-references.md` avait déjà noté sur CNOSM/FIAS. Le fait qu'IJF/World Athletics n'en aient pas du tout est un rappel que le trilinguisme FR/EN/RU de FMCCC (FR-11/FR-12) est une exigence plus ambitieuse que celle de la plupart des comparables à cette échelle — pas une raison de le remettre en cause (c'est une contrainte métier du PRD, liée à la coopération Mali-Russie), juste un constat qu'aucun pattern "à copier" n'existe chez les plus grandes fédérations sur ce point précis ; l'inspiration reste CNOSM/FIAS (déjà dans `design-references.md`).

### Verdict retenu

1. **Maintenant (V1)** : page article = titre/date/auteur/corps/`cover` optionnel, sans boutons de partage multiples ; fiche club = ligne simple dans l'annuaire (pas de page dédiée par club nécessaire au lancement) ; footer = réseaux sociaux + mentions légales, pas de plan de site ; sélecteur de langue en haut à droite (déjà la position retenue par FR-11).
2. **Quand le volume de clubs grandira** : envisager une page dédiée par club (façon fiche pays IJF, très allégée) seulement si l'annuaire devient trop dense pour une simple liste — pas un besoin actuel.
3. **À ne jamais faire** : onglets de statistiques/résultats par club, boutons de partage social multiples sur les articles — aucun besoin PRD ne les justifie.

## Sources

- [FIFA](https://www.fifa.com/)
- [UEFA](https://www.uefa.com/)
- [World Athletics](https://worldathletics.org/)
- [FIBA](https://www.fiba.basketball/)
- [International Judo Federation (IJF)](https://www.ijf.org/)
- [United World Wrestling (UWW)](https://uww.org/)
- [World Taekwondo](https://www.worldtaekwondo.org/)
- [IBJJF](https://ibjjf.com/)
- [UFC](https://www.ufc.com/)
- [ONE Championship](https://www.onefc.com/)
