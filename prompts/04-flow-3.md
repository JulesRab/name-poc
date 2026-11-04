# Prompt 04 — Flow 3 : guide des tailles, la feature star

> À coller dans Claude Code, en **mode plan**, après la validation du prompt 03.

---

Cette session construit la fonctionnalité phare du flow Signature : trouver sa taille à partir d'un vêtement qu'on aime porter. Elle porte l'hypothèse H2 du protocole (« le guide des tailles unisexe permet de choisir la bonne taille seul »), testée sur le Bombers.

## Règles de la session

- Tu complètes le volet Guide des tailles construit au prompt 03 : ne refais pas l'onglet Tableau des mesures.
- Lis le Figma **un nœud à la fois**. Le volet passe en plein écran sur mobile.
- Toutes les mesures viennent de `guidesTailles` dans `data/catalogue.json`. Rien en dur.
- La logique de recommandation est décrite dans `CLAUDE.md` (somme des écarts absolus, la plus petite taille en cas d'égalité). Isole-la dans un module JS à part, `site/js/taille.js`, sans aucun accès au DOM, pour pouvoir la tester seule.

## Écrans et composants

| Élément | Nœud |
| --- | --- |
| 04.5 Guide des tailles — saisie de la référence | [204:5149](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-5149) |
| 04.6 Fiche produit — taille recommandée | [204:5284](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-5284) |
| 04.7 Guide des tailles — comparaison | [204:5408](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=204-5408) |
| Guide des tailles, vues Ma référence et Comparaison | [113:749](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=113-749) |
| Infos produit, état Taille recommandée | [87:387](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=87-387) |
| Champ (Texte, Liste, avec états Erreur) | [83:209](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-209) |

## Étape 1 — Saisie de la référence (04.5)

- On y arrive par l'onglet « Ma référence », ou par le bouton « Trouver ma taille avec un vêtement que j'aime porter » de l'onglet Tableau.
- Titre « Trouvez votre taille en 1 minute », texte d'explication, mention « Valeurs grisées = exemple. Saisissez les mesures de votre vêtement. »
- Liste « Votre vêtement de référence » : « Veste ou manteau » pour le Bombers.
- 4 champs numériques en cm : Poitrine, Longueur, Épaules, Manche. Les valeurs d'exemple du catalogue (56, 70, 48, 62) sont des **placeholders** grisés, jamais des valeurs pré-remplies.
- Le schéma « où mesurer, pièce posée à plat » reste un bloc Visuel gris avec son texte.
- Bouton « Voir ma taille », mention « Sans compte. Vos mesures restent sur cet appareil. »
- Sur mobile, les champs ouvrent le clavier numérique.

Validation, au clic sur « Voir ma taille » :

- un champ vide ou non numérique passe en état Erreur avec un message sous le champ, et le focus va au premier champ en erreur ;
- une valeur hors de 20 à 150 cm est refusée avec le message « Vérifiez cette mesure : elle se prend à plat, en centimètres. » ;
- les virgules sont acceptées comme séparateur décimal.

## Étape 2 — Recommandation et comparaison (04.7)

Une fois les mesures valides :

- « Votre taille : M » et le sous-titre « Bombers comparé à votre vêtement de référence ».
- « Comparer en » : la taille recommandée et ses deux voisines (S, M, L pour M ; XS, S pour XS). Cliquer sur une autre taille met à jour le schéma et le tableau.
- Schéma des silhouettes à plat superposées : deux rectangles en SVG, l'un pour la pièce, l'autre en pointillés pour la référence. Largeur = poitrine, hauteur = longueur, à la même échelle. Légende « Bombers, taille M » et « Votre référence ».
- Tableau Mesure · Bombers M · Référence · Écart. Formulation des écarts :

| Mesure | Écart positif | Écart négatif | Écart nul |
| --- | --- | --- | --- |
| Poitrine, Épaules | « +4 cm, plus ample » | « −2 cm, plus étroit » | « identique » |
| Longueur, Manche | « +2 cm, plus long » | « −2 cm, plus court » | « identique » |

- Bouton « Choisir la taille M » et lien « Modifier ma référence », qui revient à la saisie avec les valeurs gardées.
- Si la taille recommandée est XL et que la référence dépasse le XL sur au moins 2 mesures, ajoute : « Votre référence est plus ample que notre XL. Écrivez à l'atelier pour en parler. » Même règle en miroir pour le XS, avec « plus ajustée ». Le lien mène à `indisponible.html`.

## Étape 3 — Retour sur la fiche (04.6)

« Choisir la taille M » ferme le volet et met la fiche dans l'état Taille recommandée :

- la taille M est sélectionnée, avec « Taille : M » ;
- sous les tailles : « Taille M recommandée · 4 cm plus ample à la poitrine que votre référence · Voir la comparaison ». La phrase reprend l'écart **le plus grand** en valeur absolue ; si tous les écarts sont nuls, « identique à votre référence ». « Voir la comparaison » rouvre le volet sur la vue Comparaison ;
- le bouton devient « Ajouter au panier — 700 € ».

Profil de taille :

- La référence est gardée en `sessionStorage`, comme le panier. Elle s'efface à la fermeture de l'onglet.
- Sur une autre fiche qui a un guide avec le même type de référence, la recommandation s'affiche directement. Sur une fiche sans guide, rien ne change.
- Choisir une autre taille à la main reste toujours possible : le message de recommandation reste affiché, la taille choisie prime.

## Étape 4 — Vérification

Écris d'abord un petit fichier de test pour `taille.js` (lancé avec Node, sans dépendance), avec ces cas :

| Référence (poitrine, longueur, épaules, manche) | Taille attendue | Phrase sur la fiche |
| --- | --- | --- |
| 56, 70, 48, 62 | M | 4 cm plus ample à la poitrine |
| 55, 67, 48, 62 | S (égalité S / M, la plus petite) | — |
| 59, 67, 47, 62 | M | — |
| 64, 69, 51, 63 | L | — |
| 70, 76, 56, 66 | XL + message « plus ample que notre XL » | — |
| 50, 60, 40, 58 | XS + message « plus ajustée » | — |

Puis dans le navigateur :

| Action | Résultat attendu |
| --- | --- |
| « Voir ma taille » avec un champ vide | Erreur sous le champ, focus dessus |
| Saisir « 56,5 » | Accepté |
| Saisir 300 | Message « Vérifiez cette mesure… » |
| Comparer en L après une recommandation M | Schéma et tableau mis à jour |
| « Choisir la taille M » | Volet fermé, état 04.6, bouton « Ajouter au panier — 700 € » |
| Fermer l'onglet, rouvrir le site | Plus de profil de taille |

Ensuite la partie Mission 1 complète de `docs/recette.md`, l'entrée du journal et la proposition de commit.

## Écart avec la maquette

La maquette écrit « que votre veste en laine ». La saisie ne demande pas la matière : utilise « que votre référence ». Si je veux garder la matière, j'ajouterai un champ plus tard.
