# Routes

Site en **HTML simple, multipage**. Chaque page est un fichier `.html`. Les variantes (produit, look, étape) passent par un paramètre d'URL.
Source : page Maquettes du Figma (04/11/2026). Liens des frames : `design/liens-figma.md`.

| URL | Écrans Figma | Mission du protocole | Flow | Notes |
| --- | --- | --- | --- | --- |
| `/index.html` | 01.1 | Mission 0 (H1). Point de départ de la mission 1 | 4 | En-tête fixe : logo, Signature, Collection, La marque, recherche, « Mon panier (n) » |
| Calque de recherche (sur toutes les pages) | 02.1, 02.2, 02.3 | Non testé | 4 | Composant ouvert depuis l'icône loupe, pas une page |
| `/signature.html` | 03.1, 03.2, 03.3 | Mission 1 (passage) | 3, 4 | Filtres dans un volet. Filtres actifs reflétés dans l'URL (`?type=pantalon`) |
| `/produit.html?p=<slug>` | 04.1 à 04.8 | Mission 1 (H2) | 1, 3 | Guide des tailles et fabrication = volets latéraux sur la même page |
| `/produit.html?p=<slug>&src=qr` | 04.9 | Non testé | 4 | Arrivée directe depuis un QR code ou Instagram |
| `/collection.html` | 05.1 | Non testé | Ajout | Outlaws, 5 personnages |
| `/look.html?l=<slug>` | 05.2, 05.3, 05.4 | Non testé | Ajout | Fiche pièce = volet. Un look vendu affiche l'état 05.4 |
| Panneau panier (sur toutes les pages) | 06.1 | Mission 1 (fin) | 1 | S'ouvre après « Ajouter au panier » |
| `/panier.html` | 06.3, 06.4 | Mission 2 (départ) | 2 | État vide si panier vide |
| `/commande.html?etape=coordonnees` | 07.1, 07.2 | Mission 2 (H3) | 2 | Commande sans compte |
| `/commande.html?etape=livraison` | 07.3 | Mission 2 (H3) | 2 | |
| `/commande.html?etape=paiement` | 07.4 | Mission 2 (H3) | 2 | Paiement fictif : chaque champ se remplit au clic avec une valeur factice |
| `/confirmation.html` | 08.1 | Mission 2 (fin) | 2 | Écran de réussite de la mission 2 |
| `/suivi.html?etape=<recue\|tissu\|coupe\|assemblage\|finitions>` | 08.2 à 08.6 | Non testé | Ajout | Suivi de fabrication en photos |
| `/indisponible.html` | Aucun | — | — | Cible de tous les liens sans maquette : La marque, Livraison, Retours, Paiement, Contact, pages légales. Message sobre + retour |

## Slugs

- Produits Signature, Chapitre I : `bombers`, `pull`, `pantalon-wide`, `pantalon-regular`, `blouson-cuir`, `chemise`.
- Produits Signature, Chapitre II (à venir, non achetables) : `zip-up`, `hoodie`, `crewneck`, `debardeur`, `t-shirt`.
- Looks Outlaws : `le-parrain`, `le-bras-droit`, `le-conseiller`, `le-baron`, `l-homme-de-main`.

## Règles de navigation

- Aucun lien cassé : tout lien sans écran mène à `/indisponible.html`.
- Le panier et le profil de taille sont gardés pendant la session de navigation, et effacés à la fermeture de l'onglet, pour repartir à zéro entre deux testeurs.
