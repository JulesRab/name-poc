# Prompt 03 — Flow 1 : fiche produit vers panier

> À coller dans Claude Code, en **mode plan**, après la validation du prompt 02.

---

Cette session construit la fiche produit et l'ajout au panier. C'est le cœur de la mission 1 du protocole, jouée sur le **Bombers**. Le guide des tailles complet (onglet « Ma référence », taille recommandée, comparaison) est la feature star : il vient au prompt 04. Ici, seul l'onglet « Tableau des mesures » est construit.

## Règles de la session

- Réutilise les jetons et composants des prompts 01 et 02. Tout nouveau composant va dans `site/styleguide.html` et `design/composants.md`.
- Lis le Figma **un nœud à la fois**. Mobile d'abord : utilise le carrousel mobile du Bombers pour les photos.
- Une seule page `produit.html?p=<slug>` sert tous les produits, à partir de `data/catalogue.json`. Les maquettes ne détaillent que le Bombers : construis le gabarit sur lui.
- Contenus éditoriaux (textes des onglets, volet fabrication, arguments) : lis-les dans les maquettes du Bombers et **propose-moi** de les ajouter au catalogue, dans un champ `contenu` du produit. N'écris dans `data/` qu'après mon accord. Pour les autres produits, affiche « [À définir] » là où un texte manque.

## Étape 1 — La fiche produit

Écrans : 04.1 état initial [98:3530](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=98-3530) · 04.2 taille choisie [204:4757](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-4757) · 04.3 erreur, taille non choisie [204:4877](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-4877)

Composants :

| Composant | Nœud |
| --- | --- |
| Infos produit (Initial, Taille choisie, Erreur, À venir) | [87:387](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=87-387) |
| Slider — Bombers (desktop) | [201:742](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=201-742) |
| Carrousel mobile — Bombers | [208:832](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=208-832) |
| Onglets de la fiche | [115:4925](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=115-4925) |
| Mosaïque | [130:10321](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=130-10321) |
| Point mosaïque | [142:10461](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=142-10461) |

Contenu, dans l'ordre des maquettes :

1. Packshot à gauche, photo d'ambiance à droite avec flèches et la mention « Inspiration · Outlaws. — L'Homme de Main ». Les photos restent séparées des informations.
2. Bloc d'achat : « Signature. — Chapitre I », nom, prix, « Tissu du moment : … » avec « En savoir plus » (ouvre l'onglet Tissu du moment), tailles XS à XL, lien « Guide des tailles », mention « Coupe unisexe. Entre deux tailles : prenez la plus petite pour un tombé ajusté. », délai de fabrication (ouvre le volet fabrication), bouton, « Livraison offerte en France · Conditions de retour ».
3. Les 4 arguments : Un tissu, un seul lot · Coupée à votre taille · Cousue à l'atelier de Roubaix · Chaque étape en photo.
4. Les onglets : Vision produit, Tissu du moment, Détails produit, Informations de livraison.
5. La mosaïque d'ambiance, avec ses points cliquables (Bombers 700 €, Pantalon wide 330 €) qui mènent aux fiches.
6. « Autres pièces du Chapitre I », avec le lien « Voir toute la ligne Signature ».

Comportement du bouton :

- Sans taille, il affiche « Choisir ma taille ». Un clic sans taille affiche l'état Erreur 04.3, place le focus sur les tailles et annonce le message aux lecteurs d'écran. Le bouton ne se désactive jamais.
- Une taille choisie : « Taille : M » à côté du libellé, la taille passe en Sélectionnée, le bouton devient « Ajouter au panier ».
- Un produit du Chapitre II affiche l'état À venir : prix indicatif, bloc « Être prévenu », aucun bouton d'achat.

Montre-moi la fiche du Bombers en mobile et en desktop avant l'étape 2.

## Étape 2 — Volets de la fiche

| Volet | Écran | Composant |
| --- | --- | --- |
| Guide des tailles, onglet Tableau des mesures | 04.4 [204:5008](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-5008) | [113:749](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=113-749) (vue Tableau seulement) |
| Fabrication | 04.8 [98:3569](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=98-3569) | [89:506](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=89-506) |

- Le tableau du guide lit `guidesTailles.bombers` dans le catalogue. Un produit sans guide affiche « Guide en préparation ».
- L'onglet « Ma référence » apparaît mais reste vide : il sera construit au prompt 04.
- Les volets s'ouvrent à droite en desktop et en plein écran sur mobile. Échap, la croix et un clic hors du volet les ferment. Le focus reste piégé dans le volet ouvert, puis revient au lien d'origine.

## Étape 3 — Ajout au panier

Écran : 06.1 Panneau panier — après ajout [204:5685](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-5685)

| Composant | Nœud |
| --- | --- |
| Panneau panier | [89:299](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=89-299) |
| Ligne panier (Signature) | [86:217](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=86-217) |
| Quantité | [83:269](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-269) |

- « Ajouter au panier » enregistre la pièce (slug, taille, quantité) en `sessionStorage`, ouvre le panneau et met à jour « Mon panier (n) » dans l'en-tête.
- Panneau : « Panier (n) », « Ajouté à votre panier. », la ligne (photo, nom, prix, « Taille M · Sergé de coton bleu marine », délai, quantité, « Retirer »), sous-total, « Livraison offerte en France. Total calculé à l'étape suivante, sans frais cachés. », « Commander » et « Continuer mes achats ».
- La même pièce dans la même taille ajoutée deux fois augmente la quantité au lieu de créer une ligne.
- « Mon panier (n) » ouvre le panneau depuis n'importe quelle page.
- « Commander » pointe vers `indisponible.html` jusqu'au prompt 05.
- Rebranche vers `produit.html` les liens temporaires notés dans le journal au prompt 02.

## Étape 4 — Arrivée directe

Écran : 04.9 arrivée directe (QR / Instagram) [204:5597](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-5597) · composant Bandeau d'arrivée [113:972](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=113-972)

- Avec `?src=qr` ou `?src=instagram`, la fiche affiche sous l'en-tête le bandeau « Vous découvrez Name. » avec la phrase de marque et les liens Signature et Collection.
- Une fois fermé, il ne réapparaît plus pendant la session.

## Étape 5 — Vérification

| Action | Résultat attendu |
| --- | --- |
| Depuis l'accueil, atteindre la fiche du Bombers | 3 actions maximum |
| Clic sur « Choisir ma taille » sans taille | État Erreur 04.3, focus sur les tailles |
| Choisir M | « Taille : M », bouton « Ajouter au panier » |
| Ajouter au panier | Panneau « Panier (1) », compteur de l'en-tête à 1, ligne Bombers · Taille M · 700 € |
| Quantité + | Quantité 2, sous-total 1 400 € |
| Retirer | Panneau vide, compteur à 0 |
| Recharger la page | Le panier est conservé |
| Ouvrir le site dans un nouvel onglet | Panier vide |
| `produit.html?p=bombers&src=qr` | Bandeau d'arrivée visible |
| `produit.html?p=hoodie` | État À venir, sans bouton d'achat |
| `produit.html?p=inconnu` | Redirection vers `indisponible.html` |

Puis la partie Mission 1 (sauf les lignes « Ma référence ») et Accessibilité de `docs/recette.md`, l'entrée du journal et la proposition de commit.

## Questions à me poser avant de coder

- Où mène « Commander » une fois le tunnel construit : la page panier 06.3 ou directement les coordonnées ?
- Que fait « Voir toute la ligne Signature » si des filtres sont actifs dans la session ?
