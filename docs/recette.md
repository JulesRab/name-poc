# Recette

Checklist à passer avant chaque test et après chaque itération. Une mission n'est terminée que si toutes ses cases sont cochées, sur mobile **et** sur desktop (le protocole prévoit les deux).

## Mission 0 — Accueil (H1 : comprendre en moins de 5 secondes ce que vend le site et à qui il s'adresse)

- [ ] L'accueil charge en moins de 3 secondes sur le téléphone de test
- [ ] Les entrées Signature et Collection sont visibles sans défiler
- [ ] La phrase de marque est lisible : « Name. est un label de création textile qui construit ses récits à travers le vêtement. Matières naturelles, issues de deadstocks. »
- [ ] Sur mobile, vérifier où tombe la phrase de marque : sous les deux visuels, elle risque de ne pas être vue en 5 secondes

## Mission 1 — De l'accueil au panier, sur le Bombers (H2 : choisir la bonne taille seul)

> Le protocole sera réécrit sur le Bombers. Ignorer la version pantalon et les cartes de mesures actuelles.

- [ ] Depuis l'accueil, on atteint la fiche du Bombers en 3 actions maximum
- [ ] La fiche affiche nom, prix, tissu du moment, tailles XS à XL, délai, livraison et retours
- [ ] Cliquer sur « Ajouter au panier » sans taille affiche l'erreur 04.3, sans bloquer
- [ ] Le guide s'ouvre en volet, avec les onglets « Tableau des mesures » et « Ma référence »
- [ ] Le tableau reprend les valeurs du catalogue (poitrine, longueur, épaules, manche)
- [ ] Avec la référence d'exemple (poitrine 56, longueur 70, épaules 48, manche 62), le guide recommande **M** et affiche les écarts
- [ ] « Choisir la taille M » sélectionne la taille sur la fiche et ferme le volet
- [ ] L'ajout ouvre le panneau panier et le compteur de l'en-tête passe à 1

## Mission 2 — Checkout et paiement (H3 : le tunnel est fluide)

- [ ] Le panier affiche article, taille, prix, frais, total et délai
- [ ] Les 3 étapes se suivent avec un indicateur d'étape
- [ ] Un champ vide ou mal rempli affiche l'erreur 07.2
- [ ] Les champs du paiement se remplissent au clic avec des valeurs factices
- [ ] Aucune case pré-cochée, aucun coût ajouté à la dernière étape
- [ ] La confirmation affiche numéro de commande, récapitulatif et délai

## Perception premium (H5)

- [ ] Aucun lorem ipsum, aucun texte en anglais par défaut, aucun libellé générique
- [ ] Polices Playfair Display SC et Didact Gothic chargées sur tous les écrans
- [ ] Aucun badge coloré, aucune note en étoiles, aucune promo

## Accessibilité

- [ ] Contraste du texte au niveau AA
- [ ] Zones cliquables de 44 px minimum sur mobile
- [ ] Tous les champs ont un libellé visible
- [ ] Navigation au clavier possible (volets compris) et focus visible
- [ ] Images avec texte alternatif
- [ ] Plugin d'accessibilité du cours : [à installer]

## Avant chaque testeur

- [ ] Fermer l'onglet et rouvrir le site : panier vide, aucun profil de taille enregistré
- [ ] Enregistrement écran et audio lancé, consentement signé
