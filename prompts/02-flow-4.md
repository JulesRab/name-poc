# Prompt 02 — Flow 4 : accueil et onboarding, recherche et filtres

> À coller dans Claude Code, en **mode plan**, après la validation du prompt 01.

---

Cette session construit le flow 4 : l'accueil, la liste des produits Signature avec ses filtres, et la recherche. C'est la porte d'entrée de tous les testeurs, et la base de la mission 0 du protocole (test des 5 secondes, hypothèse H1).

## Règles de la session

- Réutilise les jetons et composants du prompt 01. Si un composant manque, construis-le dans le même style et ajoute-le à `site/styleguide.html` et à `design/composants.md`.
- Lis le Figma **un nœud à la fois**, avec les identifiants ci-dessous. Les maquettes sont en desktop : construis mobile d'abord (393 px), puis élargis.
- Toutes les données viennent de `data/catalogue.json`. Aucun nom, prix ou tissu écrit en dur dans le HTML.
- Visuels : tant que `assets/images/` est vide, garde les blocs gris du composant Visuel avec leur texte descriptif.
- Liens vers des pages pas encore construites (fiche produit, Collection, page look, panier) : fais-les pointer vers `indisponible.html` pour l'instant, et liste-les dans le journal pour les rebrancher plus tard.

## Étape 1 — Accueil

Écran : 01.1 Accueil [90:128](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=90-128)

Composants à construire :

| Composant | Nœud |
| --- | --- |
| Carte produit (Disponible, À venir, avec flèches de défilement) | [85:296](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=85-296) |
| Savoir-faire (desktop) | [200:3782](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=200-3782) |
| Savoir-faire mobile | [213:7767](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=213-7767) |
| Être prévenu (Défaut, Envoyé, Erreur, mobile) | [86:346](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=86-346) |

Contenu de la page, dans l'ordre des maquettes :

1. Deux entrées pleine image : Signature. et Collection., avec leur phrase et leur lien. Sur mobile, elles s'empilent.
2. La phrase de marque : « Name. est un label de création textile qui construit ses récits à travers le vêtement. Matières naturelles, issues de deadstocks. » Garde sa place actuelle, sous les deux entrées.
3. Signature. — Chapitre I : les 4 premiers produits du Chapitre I et le lien « Voir toute la ligne ».
4. Le bandeau Outlaws. avec son lien « Découvrir les 5 personnages ».
5. Les 3 arguments Deadstock, À la commande, Unisexe.
6. Le bloc « Être prévenu des prochaines sorties » : un e-mail invalide affiche l'état Erreur, un e-mail valide l'état Envoyé. Rien n'est envoyé ni enregistré. Aucune case pré-cochée.

Règles :

- Carte produit : les flèches font défiler les photos de la vignette. Pas de changement d'image au survol, pas d'ajout rapide au panier.
- L'accueil doit s'afficher en moins de 3 secondes sur mobile : images optimisées et chargées en différé sous la ligne de flottaison.

Montre-moi l'accueil en mobile et en desktop avant de passer à l'étape 2.

## Étape 2 — Liste produits Signature

Écran : 03.1 Liste produits — Signature [98:3495](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=98-3495)

- Titre Signature., intro, bouton « Filtrer » et compteur « 11 pièces · 6 disponibles, 5 à venir », calculé depuis le catalogue.
- Un bloc par chapitre, avec son titre et son sous-titre.
- Chapitre II : cartes au statut « À venir · août 2027 », prix indicatifs visibles, non achetables.
- Le bloc « Être prévenu » sous les chapitres.

## Étape 3 — Filtres

Écrans : 03.2 filtres ouverts [94:1970](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=94-1970) · 03.3 résultats filtrés [94:2174](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=94-2174) · composant Volet filtres [89:402](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=89-402)

Le volet s'ouvre depuis « Filtrer ». Facettes, en accordéons :

| Facette | Valeurs | Règle |
| --- | --- | --- |
| Offre | Signature, Collection | Collection affiche les 5 looks Outlaws (carte look simple : personnage, prix du look) |
| Type de pièce | Vestes et manteaux, Pantalons, Hauts | Correspond au champ `type` du catalogue (`vestes`, `pantalons`, `hauts`) |
| Taille | XS, S, M, L, XL | Toutes les pièces Signature existent dans toutes les tailles. Ne s'applique pas aux looks |
| Prix | Moins de 300 €, 300 à 700 €, Plus de 700 € | 300 à 700 € bornes comprises |
| Disponibilité | Disponible, À venir (Chapitre II) | |

- Plusieurs valeurs d'une même facette s'additionnent (OU), les facettes se combinent entre elles (ET).
- Le bouton du bas affiche le nombre de résultats en direct : « Voir 1 résultat », « Voir 4 résultats ». « Effacer » remet tout à zéro.
- Les filtres actifs se reflètent dans l'URL (`signature.html?type=pantalons&prix=moins-300`) et restent visibles au-dessus des résultats, chacun supprimable.
- Sur mobile, le volet s'ouvre en plein écran.

## Étape 4 — Recherche

Écrans : 02.1 suggestions [183:7325](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=183-7325) · 02.2 résultats [183:7397](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=183-7397) · 02.3 aucun résultat [183:7481](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=183-7481) · composant Recherche [89:617](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=89-617)

- La loupe de l'en-tête ouvre le calque sur toutes les pages. Champ : « Rechercher une pièce, un tissu… ». Échap et la croix le ferment.
- Suggestions à l'ouverture : Pantalon wide, Bombers, Pull, Outlaws. — les looks.
- La recherche porte sur le nom, le tissu, le type de pièce et les personnages, sans tenir compte des accents ni des majuscules. Les résultats montrent produits et looks, avec leur prix.
- Aucun résultat : message de la maquette 02.3, avec un retour vers Signature et Collection.

## Étape 5 — Vérification

Passe ces cas, puis la partie Mission 0 et Accessibilité de `docs/recette.md` :

| Action | Résultat attendu |
| --- | --- |
| Filtres Signature + Pantalons + M + Moins de 300 € | 1 résultat : Pantalon regular, 280 € |
| Filtre Disponibilité : À venir | 5 résultats, tous du Chapitre II |
| Recherche « laine » | Pull, Pantalon wide, Pantalon regular, Crewneck |
| Recherche « parrain » | Le look Le Parrain |
| Recherche « denim » | Écran aucun résultat |
| E-mail « test@ » dans Être prévenu | État Erreur |

Ensuite : entrée dans `docs/journal.md` (avec la liste des liens temporaires vers `indisponible.html`), puis proposition de commit.

## Questions à me poser avant de coder

Si un de ces points n'est pas clair dans les maquettes, demande-moi plutôt que de choisir :

- l'affichage exact des looks quand le filtre Offre : Collection est coché ;
- le comportement des flèches de la carte produit quand il n'y a qu'un seul visuel.
