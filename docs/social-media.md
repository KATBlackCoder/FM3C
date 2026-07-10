# Réseaux sociaux — Site web FM3C

*Ce document ne fait pas partie du PRD ni de l'architecture technique : c'est une note de suivi sur une dépendance externe (comme le logo ou le budget, cf. `roadmap.md`) et sur comment l'intégrer une fois disponible. Rien ici n'est bloquant pour le lancement V1.*

## Constat actuel

La FM3C ne possède **aucun compte de réseau social officiel** à ce jour — sa seule présence numérique reste le groupe WhatsApp fermé mentionné dans le brief. Il n'y a donc rien à intégrer au site pour l'instant.

## Pourquoi ça reste important

- **Diffusion** : le site est le point de référence, mais les réseaux sociaux sont ce qui ramène du monde vers le site (partage d'un compte-rendu de compétition, annonce d'un événement). Sans ça, le site reste aussi invisible que le groupe WhatsApp actuel — juste dans un autre canal fermé.
- **Crédibilité** : une présence sociale active, cohérente avec le site, renforce le sérieux recherché auprès de la presse et des partenaires (HSIF, CNOSM, La Perspective Sahélienne) — les fédérations comparables étudiées dans le brief (FIAS, HSIF) s'appuient toutes sur au moins un réseau social en complément de leur site.
- **Usage déjà existant** : WhatsApp est déjà le canal réel de fonctionnement de la fédération (contact clubs, signalement d'erreurs — PRD UJ-4). Toute intégration devrait d'abord prolonger cet usage existant plutôt qu'en imposer un nouveau.

## Approche : ajout progressif, pas un chantier d'un coup

Comme les comptes n'existent pas encore, l'intégration se fera **au fil de l'eau**, réseau par réseau, dès que la fédération en crée un — pas comme un chantier V1.5/V2 à part entière. Chaque ajout doit rester une modification mineure et indépendante, jamais une refonte :

1. **WhatsApp** — priorité dès que possible, car déjà utilisé par la fédération. Un lien "click-to-chat" (`wa.me/<numéro>`) sur la page Contact, et dans le message encourageant de l'Annuaire quand aucun club n'existe dans une région (FR-8). Ne nécessite aucun compte "réseau social" à proprement parler, juste un numéro dédié à la fédération.
2. **Réseau(x) de diffusion publique** (à créer par la fédération) — icônes de lien dans le footer et la page Contact dès qu'un compte existe. Simple lien `<a>`, aucune dépendance technique.
3. **Boutons de partage sur les articles du blog** — une fois qu'il y a un intérêt réel à partager (premiers articles publiés), ajouter des liens d'intention de partage (WhatsApp, Facebook, X...), sans SDK tiers.
4. **Open Graph** — déjà couvert par le choix de `nuxt-seo` (voir `architecture.md`) : dès qu'un article ou une page est partagé, il s'affiche correctement (titre, image, extrait) où qu'il soit posté. Rien à faire de spécifique par réseau, c'est une fondation commune.

**Volontairement écarté pour l'instant** : les widgets de flux social embarqués (fil Instagram/Facebook live sur le site). Ça demande de charger un SDK tiers, ça pèse sur la performance mobile (usage mobile probablement dominant au Mali, cf. PRD Platform) et ajoute une dépendance externe de plus à maintenir seul — pas cohérent avec le principe "zéro service tiers superflu" déjà suivi pour le contenu et les médias. À reconsidérer seulement si un vrai besoin apparaît, pas par défaut.

## Quel(s) réseau(x), pour qui

Le site a un double public (Mali + Russie), et les réseaux dominants ne sont pas les mêmes des deux côtés — à valider avec le président plutôt qu'à décider seul :
- **Public malien / grand public** : Facebook et WhatsApp sont les plus utilisés en Afrique de l'Ouest.
- **Public russe / presse russe** (coopération Mali-Russie, HSIF) : Instagram et Facebook sont moins pertinents ; VKontakte ou Telegram sont plus proches des usages réels côté russe.

## Ce qui n'est pas décidé

- Aucun réseau n'est choisi ni créé à ce jour — dépendance externe côté fédération.
- Le numéro WhatsApp dédié à utiliser sur le site (celui du groupe actuel, ou un nouveau) reste à confirmer.
- Rien de tout ça ne bloque le lancement V1 : le site peut sortir sans aucun lien social, et les ajouter un par un ensuite est une modification mineure, pas un jalon de roadmap à part entière.
