# PRD — Maquettes site NAME. (v0.2)

> **Note (04/11/2026)** : ce PRD date d'avant le protocole de test. En cas d'écart, `docs/protocole-test.pdf` fait foi pour les flows et les missions testés. Écart principal : le protocole fait du flow 3 (Signature) un **guide des tailles avec saisie des mesures et taille recommandée**, et non le « tissu du moment ».


3 novembre 2026 · Jules Rabaud

## Mode d'emploi

Ce PRD sert à concevoir les maquettes du site NAME. à partir de nos wireframes et de notre DA. Les maquettes serviront ensuite de référence au prototype vibe codé, testé le 4 novembre 2026 au laboratoire des Gobelins.

**Consignes pour la personne ou l'IA qui maquette**

- Conçois d'abord en mobile, puis décline en desktop.
- Respecte les règles marquées « doit » et « ne doit pas » : elles ne se discutent pas.
- Les 4 flows de la section Flows sont obligatoires. Tu peux ajouter des écrans s'ils servent un flow et un besoin de persona : signale-les comme ajouts.
- Quand une information manque, ne l'invente pas : pose « \[À définir\] » de façon visible.
- Les wireframes priment pour la structure des écrans existants. Ce document prime pour les règles de marque, les contenus et les parcours.

**Statut des informations**

| Étiquette     | Sens                                       |
|---------------|--------------------------------------------|
| \[NOÉ\]       | Dit ou validé par le créateur de la marque |
| \[ÉQUIPE\]    | Choix de conception de notre groupe        |
| \[HYPOTHÈSE\] | Non validé, à observer pendant les tests   |

\[PERSONA\] : besoin tiré des proto-personas de l'équipe (Sacha, Camille, Alex). \[PROPOSITION\] : piste suggérée pour compléter le document, à valider par l'équipe.

## Contexte et objectif du prototype

Les maquettes simulent le futur site e-commerce de NAME., un label textile en matières naturelles issues de deadstocks. Elles couvrent 4 flows demandés par le professeur, testés ensuite avec 3 participants.

- **La marque** : NAME. (Name Atelier) construit ses récits à travers le vêtement. Elle tend vers le luxe sans le revendiquer, et le créateur reste en retrait. \[NOÉ\]
- **Le site réel** : lancement visé début 2027, avec le Chapitre I de Signature en février 2027. \[NOÉ\]
- **L'exercice** : un module des Gobelins, mené par 5 UX designers. Les maquettes respectent le brief de la marque, mais ignorent volontairement les contraintes techniques de Shopify. \[ÉQUIPE, accord de Noé du 03/11\]
- **Ce qu'on attend des tests** : une première analyse d'utilisabilité, réutilisable ensuite dans le projet client. Les résultats seront exploratoires.

## Problème

Le site doit vendre une ligne de bases intemporelles tout en mettant en scène des collections narratives, sans que l'une brouille l'autre.

- **Deux offres de nature différente** : Signature, des pièces produites à la commande, et Collection, des looks en pièces uniques racontés par personnages. Le visiteur doit comprendre ce qu'il achète dans chaque cas. \[NOÉ\]
- **Une promesse inhabituelle** : pas de stock, une fabrication à la commande et une livraison en 1 à 2 semaines. Le tissu deadstock change selon les arrivages. Sans explication, ce délai peut décourager l'achat. \[NOÉ\]
- **Un prix élevé à justifier** : de 180 € (pull) à 1 100 € (trench) pour Signature, et jusqu'à 2 400 € un look Outlaws. Le récit et la matière doivent porter cette valeur. \[NOÉ\]
- **Une arrivée sans contexte** : la plupart des visiteurs viendront d'Instagram ou d'un QR code sur une affiche, depuis leur téléphone. Ils doivent comprendre la marque en quelques secondes. \[NOÉ\]
- **Un écueil à éviter** : un site qui ressemble à un modèle e-commerce générique ferait perdre la perception premium. \[NOÉ\]

## Cibles : 3 proto-personas

Les maquettes s'appuient sur 3 proto-personas construits par l'équipe : Sacha pour Signature, Camille pour la découverte, Alex pour la Collection. Ce sont des hypothèses fondées sur les statistiques Instagram de la marque et des études de marché, pas des personas validés. \[PERSONA\]

|                     | Sacha, 24 ans                                                                                                                                                                      | Camille, 21 ans                                                                                                                                                                                                              | Alex, 31 ans                                                                                                                                                                                                              |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Profil              | Graphiste junior, Lille. Le connaisseur de jeunes labels                                                                                                                           | Étudiante en arts appliqués, Roubaix. La passante curieuse                                                                                                                                                                   | Directeur artistique, Paris. Le collectionneur de pièces fortes                                                                                                                                                           |
| Rôle pour NAME.     | Cible principale de Signature                                                                                                                                                      | Future cliente et ambassadrice                                                                                                                                                                                               | Acheteur rare de looks Outlaws (1 050 à 2 400 €)                                                                                                                                                                          |
| Arrivée sur le site | Mobile, le soir, entre 18 h et 21 h                                                                                                                                                | Par un QR code vu dans la rue                                                                                                                                                                                                | Sur le site de la marque, pour s'informer                                                                                                                                                                                 |
| Budget vêtements    | 1 500 à 2 000 € par an                                                                                                                                                             | 600 à 900 € par an                                                                                                                                                                                                           | 5 000 à 8 000 € par an                                                                                                                                                                                                    |
| Citation            | « Je préfère une belle pièce par saison que dix trucs que je ne porterai plus. Mais à ce prix-là, je veux savoir exactement ce que j'achète. »                                     | « J'ai scanné par curiosité. Je veux juste comprendre en deux secondes ce que c'est, et si c'est pour moi. »                                                                                                                 | « Je n'achète pas un vêtement, j'achète un personnage. Mais à ce prix-là, je veux voir la matière et être sûr qu'il n'y en aura pas d'autre. »                                                                            |
| Freins              | Le prix, une marque sans boutique, la taille unisexe sans repère, l'absence de soldes, le délai                                                                                    | Le prix, une page lente, ne pas comprendre la marque ni ce qui s'achète, rien d'accessible au lancement                                                                                                                      | Ne pas voir ni essayer la pièce, une taille unique par look, l'achat du look entier obligatoire, les bijoux inclus ou non                                                                                                 |
| Besoins sur le site | Délai visible avant le panier · guide des tailles unisexe avec mesures à plat · origine du tissu et lieu de fabrication · retours clairs · process de fabrication · contact direct | Page d'arrivée légère et rapide · la marque comprise en une phrase dès le premier écran · Signature et Collection clairement distinctes · prix visibles tout de suite · lien Instagram et inscription aux prochaines sorties | Une page par look, avec récit et photos de détail · le contenu exact du look · mesures précises de chaque pièce · preuve d'unicité (numérotation ou certificat) · contact direct ou prise de rendez-vous · retours clairs |
| Flows concernés     | 1, 2, 3                                                                                                                                                                            | 4                                                                                                                                                                                                                            | 1, 2 (variante pièce unique)                                                                                                                                                                                              |

**Point d'attention** : au lancement, rien n'est sous 260 €. Les t-shirts à 40–55 € n'arrivent qu'en août 2027. Pour Camille, le site doit d'abord créer un lien avec la marque plutôt que vendre. \[PERSONA\]

## Périmètre des maquettes

Les maquettes couvrent les 4 flows demandés, de l'arrivée sur le site jusqu'à la confirmation de commande. Le reste ne doit pas être maquetté.

**Inclus**

- Accueil et premier écran d'arrivée (onboarding)
- Recherche et filtres
- Catalogue Signature, organisé par chapitres
- Fiche produit Signature, avec guide des tailles
- Panier
- Tunnel de commande et de paiement, jusqu'à la confirmation
- Navigation principale et pied de page

**Ajouts possibles** (s'ils servent un flow et un persona)

- Page Collection Outlaws et page look (Alex)
- Fiche pièce unique (Alex)
- Bloc « Être prévenu des prochaines sorties » (Camille)
- Pages Retours et Contact (Sacha, Alex)
- Page ou section sur la fabrication (Sacha)

**Hors périmètre (ne doit pas être maquetté)**

- Sur-mesure, Préludes (Zima, Fuyu), Collection II Army, accessoires
- Compte client, connexion, inscription
- Avis clients et notes en étoiles
- Pop-up et chat
- Version anglaise
- Pages légales complètes : des liens dans le pied de page suffisent

## Flows

Le professeur demande 4 flows minimum. Chacun est décrit par son persona, ses étapes, les écrans à maquetter et les règles à respecter.

### Flow 1 : fiche produit vers panier

Sacha doit pouvoir ajouter une pièce Signature au panier en sachant exactement ce qu'il achète : taille, matière, délai, retours.

**Persona** : Sacha. Variante pièce unique : Alex.

**Étapes**

1.  Sacha arrive sur la fiche d'un pantalon Signature, depuis le catalogue ou la recherche.
2.  Il voit les photos produit, le nom, le prix et le tissu du moment.
3.  Il consulte l'origine du tissu et le lieu de fabrication.
4.  Il ouvre le guide des tailles et compare les mesures à plat.
5.  Il choisit sa taille.
6.  Il lit le délai, placé juste au-dessus du bouton.
7.  Il clique sur « Acheter » : le panneau panier s'ouvre.
8.  Il continue ses achats ou passe commande.

**Écrans à maquetter**

- Fiche produit, état initial (aucune taille choisie)
- Guide des tailles, en volet qui monte du bas sur mobile
- Fiche produit, taille choisie
- Fiche produit, message « Choisissez votre taille » si on clique sans taille
- Panneau panier ouvert après l'ajout
- Variante pièce unique : fiche avec « Pièce unique · 1 exemplaire », taille unique, mesures précises, preuve d'unicité \[PERSONA\]

**Règles**

- Doit afficher « Fabriqué à la commande · reçu sous 1 à 2 semaines » avant le bouton \[NOÉ + PERSONA\]
- Doit proposer un guide des tailles unisexe, avec les mesures de la pièce à plat \[PERSONA\]
- Doit montrer, sous le bouton, un lien vers les conditions de retour \[PERSONA\]
- Doit séparer les photos des informations produit \[NOÉ\]
- Ne doit pas proposer d'ajout rapide au panier depuis une vignette \[NOÉ\]
- Ne doit jamais afficher « rupture de stock » pour Signature \[NOÉ\]

### Flow 2 : checkout et paiement

Le tunnel doit rassurer avant tout : nos clients paient de 180 à 2 400 € à une marque jeune, sans boutique, pour une pièce reçue en 1 à 2 semaines.

**Analyse de la clientèle**

| Ce que disent les personas                                                                                           | Ce que le tunnel doit faire                                                                                          |
|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| Sacha veut savoir exactement ce qu'il achète, et une pièce Signature pèse de 9 à 73 % de son budget vêtements annuel | Récapitulatif complet à chaque étape (pièce, taille, tissu, prix, délai). Paiement en plusieurs fois \[PROPOSITION\] |
| Alex dépense 1 050 à 2 400 € en une fois et préfère acheter en boutique                                              | Contact direct visible pendant le paiement, conditions de retour rappelées, preuve d'unicité dans le récapitulatif   |
| Tous arrivent sur mobile                                                                                             | Paiement express (Apple Pay, Google Pay) et commande sans création de compte \[PROPOSITION\]                         |
| Camille n'achète pas au lancement                                                                                    | Pas concernée par ce flow                                                                                            |

**Faut-il des dark patterns ?** Notre recommandation : non. \[PROPOSITION\]

- Ils contredisent le positionnement : les 3 personas demandent de la transparence pour accepter un prix élevé. Un faux compte à rebours ou une case pré-cochée détruit la confiance que le tunnel doit construire.
- Plusieurs sont encadrés par le droit de la consommation (fausse urgence, frais révélés à la fin, options pré-cochées). À vérifier auprès d'une source juridique si le sujet est développé.
- Les leviers honnêtes restent permis : la rareté réelle (« Pièce unique · 1 exemplaire »), le rappel du délai, le récapitulatif clair.
- Si l'équipe veut étudier le sujet pour le cours : maquetter une variante B avec un seul dark pattern, clairement nommée, et comparer la confiance perçue. Jamais pour le site réel. \[À TRANCHER\]

**Étapes**

1.  Depuis le panier, le client clique sur « Commander ».
2.  Coordonnées : e-mail, nom, adresse. Pas de création de compte.
3.  Livraison : livraison à domicile en France, délai rappelé.
4.  Paiement : carte, paiement express ou paiement en plusieurs fois.
5.  Récapitulatif et validation.
6.  Confirmation : numéro de commande, récapitulatif, délai estimé, ce qui se passe ensuite (fabrication puis expédition).

**Écrans à maquetter**

- Panier plein
- Coordonnées, livraison, paiement : un écran par étape, avec un indicateur d'étape
- Erreur de saisie dans un champ
- Page de confirmation

**Règles**

- Doit afficher le prix total et les frais dès le panier, sans surprise à la dernière étape
- Doit rappeler le délai de fabrication à la livraison et à la confirmation \[NOÉ\]
- Doit garder un lien vers le contact et les retours visible à chaque étape \[PERSONA\]
- Ne doit pas pré-cocher d'option payante ni d'inscription à une newsletter

### Flow 3 : flow Signature, la feature star

Ce flow montre ce qui rend Signature unique : une coupe qui revient, dans le tissu deadstock du moment, fabriquée à la commande.

**Concept et feature star** : \[À DÉFINIR par l'équipe\]. Piste proposée : le « tissu du moment », rendu visible et traçable. \[PROPOSITION\]

- Chaque pièce Signature affiche son tissu actuel : matière, origine du deadstock, lieu de fabrication.
- Le site indique combien de pièces ce tissu permet encore de fabriquer. C'est une rareté réelle, pas un dark pattern. Elle dépend d'une réponse de Noé : les quantités sont-elles limitées par le tissu ? \[À CONFIRMER\]
- Quand le tissu change, la coupe reste : le site montre les tissus passés de la même pièce.
- Elle répond à deux besoins de Sacha : l'origine du tissu et le process de fabrication. \[PERSONA\]

**Persona** : Sacha.

**Étapes**

1.  Depuis l'accueil, Sacha choisit Signature.
2.  Il lit l'intro et parcourt le Chapitre I.
3.  Sur une vignette, il voit le tissu du moment.
4.  Il ouvre la fiche produit.
5.  Il découvre le bloc « Tissu du moment » : matière, origine, pièces encore réalisables, tissus précédents.
6.  Il consulte les étapes de fabrication, de la commande à l'expédition.
7.  Il rejoint le flow 1 pour ajouter la pièce au panier.

**Écrans à maquetter**

- Catalogue Signature, Chapitre I et Chapitre II
- Fiche produit avec le bloc « Tissu du moment »
- Volet « Fabrication » : les étapes de la commande à l'expédition

**Règles**

- Doit faire comprendre que la coupe est permanente et que le tissu change \[NOÉ\]
- Doit rester sobre : pas d'infographie chargée ni de couleur propre à Signature \[NOÉ\]
- Ne doit pas créer de fausse urgence : le nombre de pièces affiché doit être réel

### Flow 4 : accueil et onboarding vers recherche et filtres

Camille arrive par un QR code. Elle doit comprendre la marque en deux secondes, voir ce qui est à sa portée, et garder un lien si rien ne l'est encore.

**Persona** : Camille.

**Étapes**

1.  Camille scanne un QR code sur une affiche et arrive sur l'accueil.
2.  Le premier écran explique NAME. en une phrase et montre deux entrées : Signature et Collection.
3.  Elle ouvre la recherche depuis l'en-tête, ou les filtres depuis le catalogue.
4.  Elle filtre par prix, puis par type de pièce.
5.  Elle parcourt les résultats, prix visibles, et ouvre une fiche.
6.  Si rien ne lui est accessible, elle s'inscrit pour être prévenue des prochaines sorties, ou rejoint l'Instagram de la marque.

**Filtres proposés** \[PROPOSITION\]

- Offre : Signature, Collection
- Type de pièce : vestes et manteaux, pantalons, hauts
- Taille : XS à XL
- Prix : par tranches
- Disponibilité : disponible, à venir (Chapitre II)
- Aucun filtre homme / femme : la marque est entièrement unisexe \[NOÉ\]

**Écrans à maquetter**

- Accueil, premier écran sur mobile
- Recherche ouverte, avec suggestions
- Catalogue avec le volet des filtres ouvert
- Résultats filtrés
- Recherche sans résultat, avec un retour vers Signature et Collection
- Bloc « Être prévenu des prochaines sorties »

**Règles**

- Doit expliquer la marque en une phrase sur le premier écran mobile, sans scroller \[PERSONA\]
- Doit afficher les prix dès les vignettes \[PERSONA\]
- Doit rester léger : pas de pop-up, pas de vidéo lourde à l'arrivée \[PERSONA\]
- L'inscription aux sorties doit être un bloc dans la page, jamais une fenêtre qui s'impose

**Point de vigilance** : le catalogue réel comptera 9 produits Signature en 2027. Recherche et filtres y ont peu d'utilité, et Noé refuse les fonctionnalités « au cas où ». On les maquette parce que le cours les demande : le test dira s'ils servent. \[PROPOSITION\]

## Fonctionnalités

Les maquettes comptent 15 fonctionnalités : les 11 indispensables couvrent les 4 flows, les 4 souhaitables répondent aux besoins d'Alex et de Camille.

| \#  | Fonctionnalité              | Ce que la maquette doit montrer                                                                                                                                                               | Flow         | Priorité      |
|-----|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|---------------|
| F1  | Accueil et onboarding       | La marque en une phrase, deux entrées Signature et Collection, tout sur le premier écran mobile                                                                                               | 4            | Indispensable |
| F2  | Navigation                  | En-tête fixe : logo NAME., Signature, Collection, recherche, panier avec compteur. Menu plein écran sur mobile                                                                                | Tous         | Indispensable |
| F3  | Recherche                   | Champ dans l'en-tête, suggestions, résultats avec prix, état sans résultat                                                                                                                    | 4            | Indispensable |
| F4  | Filtres                     | Volet de filtres (offre, type, taille, prix, disponibilité). Aucun filtre homme / femme                                                                                                       | 4            | Indispensable |
| F5  | Catalogue Signature         | Un bloc par chapitre. Vignette : photo, nom, prix, tissu du moment, flèches pour faire défiler les photos. Pas d'ajout rapide. Chapitre II affiché « à venir », prix visibles \[PROPOSITION\] | 3, 4         | Indispensable |
| F6  | Fiche produit               | Photos séparées des infos, nom, prix, choix de taille, onglets Vision produit, Détails produit, Informations de livraison                                                                     | 1            | Indispensable |
| F7  | Guide des tailles           | Volet avec les mesures de la pièce à plat, repères unisexes                                                                                                                                   | 1            | Indispensable |
| F8  | Délai affiché               | « Fabriqué à la commande · reçu sous 1 à 2 semaines » avant le bouton, dans le panier, à la livraison et à la confirmation                                                                    | 1, 2         | Indispensable |
| F9  | Tissu du moment             | Bloc sur la fiche : matière, origine, lieu de fabrication, pièces encore réalisables, tissus précédents, étapes de fabrication                                                                | 3            | Indispensable |
| F10 | Panier                      | Panneau après l'ajout, puis panier complet : articles, taille, prix, frais, total, délai, bouton « Commander », état vide                                                                     | 1, 2         | Indispensable |
| F11 | Checkout et paiement        | 3 étapes avec indicateur, sans compte, paiement express et en plusieurs fois, récapitulatif, confirmation                                                                                     | 2            | Indispensable |
| F12 | Collection Outlaws          | Un bloc par personnage, points cliquables sur le look, prix du look, « Acheter le look complet »                                                                                              | Ajout        | Souhaitable   |
| F13 | Preuve d'unicité et contact | Numérotation ou certificat sur la fiche pièce unique, contact direct ou prise de rendez-vous                                                                                                  | 1 (variante) | Souhaitable   |
| F14 | Prochaines sorties          | Bloc d'inscription dans la page et lien vers l'Instagram @name.ateliers                                                                                                                       | 4            | Souhaitable   |
| F15 | Pied de page                | Grand logo NAME., liens Livraison, Retours, Contact (contact@name-atelier.com), Instagram, liens légaux                                                                                       | Tous         | Souhaitable   |

## Écrans et structure

Signature et Collection mènent au même panier, puis au même tunnel de commande. Les wireframes Figma existent en desktop (1440 px) pour l'accueil, les catalogues et la fiche produit : il faut les décliner en mobile.

**Plan du site** (l'en-tête donne accès à Signature, Collection, la recherche et le panier depuis chaque page) :

- Accueil → Catalogue Signature (chapitres I et II, filtres) → Fiche produit Signature (taille, délai de 1 à 2 semaines) → Panier
- Accueil → Collection Outlaws (5 personnages, points cliquables) → Fiche pièce unique (1 exemplaire, taille unique) → Panier
- Collection Outlaws → « Acheter le look complet » → Panier
- Panier → Commande en 3 étapes (coordonnées, livraison, paiement) → Confirmation (n° de commande, récapitulatif, délai)

Un look Outlaws peut s'acheter en entier depuis la page Collection, ou pièce par pièce via les points cliquables.

| Écran                      | Flows | Wireframe existant                                                   | À corriger ou à ajouter                                                                                          |
|----------------------------|-------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| Accueil                    | 4     | Deux images côte à côte, Signature et Collection                     | Empiler sur mobile. Ajouter la phrase de marque et l'accès à la recherche                                        |
| Recherche et filtres       | 4     | Aucun                                                                | À créer : recherche ouverte, volet de filtres, résultats, état vide                                              |
| Catalogue Signature        | 3, 4  | Intro, Chapitre 1 et Chapitre 2, grilles de vignettes                | Prix réels (le bombers est affiché à 350 €). Flèches sur les vignettes. Chapitre II « à venir »                  |
| Fiche produit              | 1, 3  | Visuel, image d'ambiance, nom, bouton « Acheter », onglets, mosaïque | Ajouter prix, taille, guide des tailles, délai, lien retours, bloc « Tissu du moment ». Remplacer le lorem ipsum |
| Panier                     | 1, 2  | Aucun                                                                | À créer : panneau après l'ajout, panier complet, état vide                                                       |
| Commande                   | 2     | Cadre vide                                                           | À créer : coordonnées, livraison, paiement, erreur de saisie                                                     |
| Confirmation               | 2     | Aucun                                                                | À créer                                                                                                          |
| Collection Outlaws (ajout) | —     | Intro, un visuel par personnage avec points cliquables               | Ajouter L'Homme de Main, le prix du look et « Acheter le look complet »                                          |

## Direction artistique

Luxe discret et minimaliste : fond blanc cassé, texte gris anthracite, boutons noirs. La couleur vient uniquement des photos. Source : page DA du fichier Figma. \[ÉQUIPE\]

**Couleurs**

| Jeton                | Valeur   | Usage                                       |
|----------------------|----------|---------------------------------------------|
| Background           | \#F5F4F0 | Fond de toutes les pages                    |
| Text primary / dark  | \#3F3F3F | Texte courant sur fond clair                |
| Accent               | \#111111 | Boutons principaux, en-tête, aplats sombres |
| Text primary / light | \#F5F5F5 | Texte sur fond sombre ou sur photo          |
| Gray 50              | \#C2C2C2 | Bordures, séparateurs, états désactivés     |
| Gray 90              | \#424242 | Texte secondaire                            |
| Gray 100             | \#0A0A0A | Noir le plus profond                        |

**Typographie** (Google Fonts)

| Style                            | Police              | Tailles (px) |
|----------------------------------|---------------------|--------------|
| Titres                           | Playfair Display SC | 36 / 28 / 20 |
| Boutons                          | Playfair Display SC | 16 / 14      |
| Texte courant, prix, formulaires | Didact Gothic       | 16 / 14 / 12 |

**Règles**

- L'interface doit rester la même pour Signature et Collection : aucune couleur propre à une collection \[NOÉ\]. Collection peut se distinguer par plus d'espace et de texte, sur le modèle de l'onglet couture de Balenciaga \[NOÉ\].
- Photos produit en packshot, ghost ou à plat, jamais sur cintre \[NOÉ\].
- Ambiance du moodboard : noir et blanc, clair-obscur, cinéma (Le Parrain).
- Animations discrètes uniquement, comme chez Saint Laurent \[NOÉ\].
- Ne doit pas utiliser les composants Tag (Danger, Success, Warning) ni Rating de la page DA : badges colorés et étoiles cassent la perception premium.
- Ne doit pas ressembler à un modèle Shopify générique : pas de bandeau promo, de badge « Nouveau » ni de compte à rebours \[NOÉ\].

**Écarts avec les pistes de Noé** (à observer pendant les tests)

- Noé envisage une interface plus sombre, en nuances de gris. Notre DA est claire. \[HYPOTHÈSE\]
- Noé aime une typographie machine à écrire. Notre DA utilise Playfair Display SC. \[HYPOTHÈSE\]
- Playfair Display SC en petites capitales sur les boutons et les prix : à vérifier en lisibilité sur mobile.

## Contenu et données fictives

Le prototype utilise les vrais noms de produits et la vraie grille de prix transmise par Noé. Aucun lorem ipsum ne doit apparaître devant les participants.

**Signature** : prix choisis dans les fourchettes de Noé. Le prix exact de chaque pièce n'est pas fixé. \[HYPOTHÈSE\]

| Chapitre | Produit          | Prix    | Tissu du moment (fictif)     |
|----------|------------------|---------|------------------------------|
| I        | Bombers          | 700 €   | Laine bouillie anthracite    |
| I        | Mackintosh       | 1 100 € | Coton selvedge bleu nuit     |
| I        | Pantalon wide    | 330 €   | Laine mérinos gris béton     |
| I        | Pantalon regular | 280 €   | Popeline de coton noire      |
| II       | Zip-up           | 210 €   | Molleton de coton gris chiné |
| II       | Hoodie           | 200 €   | Molleton de coton noir       |
| II       | Crewneck         | 180 €   | Jersey de laine écru         |
| II       | Débardeur (tank) | 40 €    | Jersey de coton blanc        |
| II       | T-shirt (sleeve) | 55 €    | Jersey de coton bleu nuit    |

- Le wireframe affiche « Bomber 350 » : ce prix est hors de la fourchette des grosses pièces (700 à 1 100 €). Utiliser la grille ci-dessus.
- Tailles unisexes XS, S, M, L, XL. \[HYPOTHÈSE : Noé n'a pas défini les tailles\]

<!-- -->

- Chapitre II : affiché « À venir · août 2027 », prix visibles, bouton « Être prévenu » à la place de « Acheter ». Cela suit le calendrier réel et répond au besoin de Camille. \[PROPOSITION\]
- Guide des tailles : mesures à plat de chaque pièce \[À définir\]. Utiliser des valeurs fictives marquées comme telles.

**Collection Outlaws** : 5 looks en pièces uniques, dans l'ordre hiérarchique. \[NOÉ\]

| Rang | Personnage      | Prix du look | Pièces                                            |
|------|-----------------|--------------|---------------------------------------------------|
| 1    | Le Parrain      | 2 400 €      | Tailleur 1 480 € · chemise 320 € · pantalon 600 € |
| 2    | Le Bras-Droit   | 2 300 €      | Fourrure 1 260 € · veston 490 € · pantalon 550 €  |
| 3    | Le Conseiller   | 1 750 €      | Manteau 1 050 € · chemise 280 € · pantalon 420 €  |
| 4    | Le Baron        | 1 700 €      | Trench 970 € · pull 400 € · pantalon 330 €        |
| 5    | L'Homme de Main | 1 050 €      | Bombers 720 € · débardeur 30 € · pantalon 300 €   |

- Le wireframe Collection ne montre que 4 personnages : L'Homme de Main doit être ajouté.
- Les bijoux (MOR Joaillerie) sont cités dans le texte du look, mais ne sont pas achetables dans le prototype. \[ÉQUIPE\]
- Chaque pièce unique existe en une seule taille, affichée sur la fiche. La taille exacte est \[À définir\].

**Textes**

- Intro Signature (wireframe) : « Les compagnons de route : des coupes qui reviennent, dans le tissu deadstock du moment. Fabriquées à la commande, reçues en une à deux semaines. »
- Intro Outlaws (wireframe) : « Inspirée du cinéma et de l'imagerie des jeux vidéo autour du crime organisé. Cinq personnages, chacun une facette du pouvoir, de la loyauté et de la violence. »
- Personnages : partir des qualificatifs de la note d'intention (le brutal Homme de Main, le silencieux Baron, le méticuleux Conseiller, l'ostentatoire Bras-Droit, le Parrain, figure ultime de respect et de crainte). Une citation courte par personnage, sur le modèle : « On ne naît pas légende, on la taille à la main, fil après fil. »
- Ton : phrases courtes, sobres, adressage neutre (« celles et ceux »). Le nom de la marque et des chapitres prend un point final : Name., Outlaws., Signature.

**Images**

- Collection : visuels du compte Instagram @name.ateliers (usage autorisé par Noé).
- Signature : aucun packshot n'existe. Visuels provisoires façon packshot, identifiés « Visuel provisoire » en petit.
- Logo NAME. et pictogramme N : fichiers PNG transmis par Noé.

**Informations pratiques (valeurs fictives pour le test)**

- Livraison à domicile en France, offerte.
- Retours sous 14 jours.
- Contact : contact@name-atelier.com

## Contraintes de conception

Des maquettes mobiles d'abord, construites avec les composants de la page DA, avec les états qui comptent pour le test.

- **Formats** : mobile en 375 × 812 px pour les 4 flows, en priorité. Desktop en 1440 px pour l'accueil, le catalogue et la fiche produit, à partir des wireframes. \[PROPOSITION\]
- **Composants** : utiliser les jetons de couleur, les styles de texte et les composants de la page DA (Button, Select, Accordion, Tab, Textarea). Ne pas utiliser Tag ni Rating.
- **États à maquetter** : taille non choisie, erreur de saisie, panier vide, recherche sans résultat, Chapitre II à venir.
- **Organisation Figma** : une section par flow, écrans numérotés dans l'ordre du parcours (exemple : F1-01, F1-02). Les ajouts sont signalés comme tels.
- **Contenu** : textes et prix réels (voir Contenu et données fictives). Aucun lorem ipsum.
- **Accessibilité** : contraste du texte au niveau AA, zones tactiles de 44 px minimum, libellés visibles sur les champs.
- **Passage au prototype** : les maquettes servent de référence au prototype vibe codé. Chaque interaction doit donc être lisible dans la maquette : ce qui est cliquable, ce qui s'ouvre.
- **Shopify** : ignoré volontairement. Les choix seront confrontés plus tard aux possibilités du thème. \[ÉQUIPE\]

## Critères de succès

Il y a deux niveaux : les maquettes sont prêtes quand la liste ci-dessous est cochée, et chaque flow réussit selon ses propres critères.

**Les maquettes sont prêtes si :**

- [ ] Les 4 flows sont maquettés en mobile, de bout en bout, avec leurs états

- [ ] Le délai de 1 à 2 semaines apparaît sur la fiche, dans le panier, à la livraison et à la confirmation

- [ ] Les prix réels sont utilisés, aucun lorem ipsum ne reste

- [ ] Chaque besoin des personas cité dans un flow a son élément visible

- [ ] Les composants et jetons de la page DA sont utilisés partout

**Critères par flow** (à valider dans le protocole) \[PROPOSITION\]

| Flow                          | Le flow réussit si le participant…                                                                                     |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------|
| 1\. Fiche produit vers panier | choisit sa taille avec le guide et ajoute la pièce au panier sans aide, en citant le délai                             |
| 2\. Checkout et paiement      | va jusqu'à la confirmation sans aide, n'est surpris par aucun coût ni délai, et dit avoir confiance                    |
| 3\. Flow Signature            | explique avec ses mots ce qu'est le tissu du moment et la fabrication à la commande                                    |
| 4\. Accueil vers recherche    | explique ce qu'est NAME. après le premier écran, distingue Signature et Collection, et trouve une pièce avec un filtre |

## À compléter

Il reste 2 choses à faire : trancher quelques points en équipe, puis écrire le protocole de test.

**Hypothèses à tester** (non validées, à lister dans le protocole)

- La séparation Signature / Collection dès l'accueil est comprise.
- Le délai de 1 à 2 semaines ne freine pas l'achat quand il est expliqué.
- Le « tissu du moment » est compris comme une qualité, pas comme une incertitude.
- Le guide des tailles suffit à choisir une taille unisexe sans essayer.
- Recherche et filtres servent sur un si petit catalogue.
- L'interface claire et la typographie Playfair Display SC servent la perception premium.

**Questions pour l'équipe**

- [ ] Quel est notre concept pour le flow Signature ? Garde-t-on le « tissu du moment » comme feature star ?

- [ ] Dark patterns : aucun, ou une variante B à comparer pour le cours ?

- [ ] Le Chapitre II est-il « à venir » avec « Être prévenu », ou achetable pour le test ?

- [ ] Le bouton « Acheter » ajoute-t-il au panier, ou mène-t-il directement au paiement ? (ce PRD suppose l'ajout au panier)

- [ ] Maquette-t-on la Collection Outlaws en plus des 4 flows ?

- [ ] Sur quel téléphone se déroule le test ?

**Pour Noé** (non bloquant pour les maquettes)

- Les quantités de chaque pièce Signature sont-elles limitées par le tissu ?
- Les tailles unisexes et les mesures de chaque pièce
