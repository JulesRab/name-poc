# Journal des itérations

Une entrée par itération : date, prompt, résultat, corrections.

## 04/11/2026 — Prompt 00 : cadrage

**Demande** : lire les sources, vérifier le MCP Figma, résumer, lister les incohérences, proposer l'arborescence, puis poser la structure de `site/` sans construire d'écran.

**Fait**
- Lecture de `CLAUDE.md`, des fichiers référencés, de `protocole-test.pdf` et de `personas.pdf`. MCP Figma vérifié sur la frame « Lisez-moi » (97:3575).
- Git initialisé, `.gitignore` créé (`ressources/` exclu, gardé en local pour plus tard).
- Logo et pictogramme N exportés depuis Figma (82:131, 82:134) dans `assets/logo/` : `logo-{noir,blanc}.png`, `picto-n-{noir,blanc}.png` et leurs versions `-hd`. Figma ne contient que des PNG, pas de vectoriel : le SVG reste à obtenir.
- `site/` : `index.html` (coquille provisoire avec contrôle du catalogue), `indisponible.html`, `css/tokens.css` (vide, commenté), `css/styles.css` (base minimale), `js/catalogue.js` (chargement unique de `data/catalogue.json`, helpers produit, look et prix), `js/session.js` (lecture du panier en `sessionStorage`), `js/layout.js` (en-tête et pied de page injectés).
- Vérifié avec Chrome headless sur `http://localhost:8000/site/` : aucune erreur console, catalogue chargé (11 pièces Signature, 6 disponibles, 5 looks), toutes les ressources en 200.

**Décisions prises sur les écarts entre sources**
- Délai : texte de `CLAUDE.md` / catalogue (« Fabriquée à la commande · chez vous sous 1 à 2 semaines »), pas celui du PRD.
- Tissus et contenu du Chapitre I : le catalogue et les maquettes font foi (Pull, Blouson en cuir, Chemise ; pas de Mackintosh).
- Largeur mobile : 393 px (Figma), pas 375 px (PRD).
- Valeur du filtre type : `pantalons` (catalogue), pas `pantalon` (exemple de `routes.md`).

**Liens temporaires vers `indisponible.html`** (à rebrancher)
- En-tête : Signature. (prompt 02), Collection. (pas de prompt), La marque (pas d'écran), Rechercher (prompt 02), Mon panier (prompt 05).
- Pied de page : Livraison, Retours, Paiement, Contact, Mentions légales, Conditions générales de vente, Confidentialité (définitifs : pas d'écran prévu).

**Reste à faire / à valider**
- Libellés du pied de page et texte de `indisponible.html` : provisoires, à aligner sur le UI kit (85:231) au prompt 01 et sur `docs/microcopy.md` (vide).
- Recette : non applicable à cette itération (aucun écran). Déjà en place : lien d'évitement, textes alternatifs du logo, lien Instagram signalé « nouvel onglet ».
- Questions ouvertes : quel look est « vendu » (frame 05.4) ; guide des tailles des pièces autres que le Bombers (`[À définir]`) ; hypothèse H4 citée dans le protocole mais non définie ; pages Collection, look et suivi sans prompt ; prompts 03 à 05 vides.
- Prochaine étape : prompt 01, design system.

## 04/11/2026 — Prompt 01 : design system

**Demande** : jetons, atomes et molécules, éléments communs (en-tête, menu mobile, pied de page, délai), styleguide, documentation.

**Fait**
- Variables Figma lues par l'API (collections Palette, Couleurs, Typographie, Espacements ; modes Desktop / Mobile), puis 20 nœuds du UI kit lus un par un : 82:255, 82:260, 82:267, 162:6861, 82:268, 82:270, 83:209, 83:223, 83:233, 83:245, 83:253, 83:267, 83:269, 83:283, 83:298, 83:306, 85:191, 208:952, 85:231, 85:233.
- `site/css/tokens.css` : palette, 23 rôles de couleur, typographie, espacements, dimensions des composants ; Mobile par défaut, Desktop ≥ 1024 px ; animations neutralisées si `prefers-reduced-motion`.
- Polices Google Fonts (`display=swap`, `preconnect`) dans le `<head>` de chaque page.
- `site/css/styles.css` : 18 composants avec tous leurs états, en-tête, menu mobile, pied de page, page indisponible.
- 16 icônes SVG exportées de Figma dans `assets/icones/`, utilisées en masque CSS (couleur = `currentColor`, fichiers non modifiés).
- JS : `layout.js` (en-tête, menu, pied de page), `menu-mobile.js` (`<dialog>`), `onglets.js` (clavier), `quantite.js`, `delai.js` (texte du catalogue).
- `site/styleguide.html` : tous les jetons et états. `design/composants.md` rempli (correspondances, états, écarts).

**Vérifications (Playwright, 393 et 1440 px)**
- Comparaison capture par capture avec le UI kit : boutons, champs, menu mobile, en-tête et pied de page conformes, aux écarts listés près.
- Menu mobile : ouverture, Échap, retour du focus. Onglets : flèche → change d'onglet et de panneau. Quantité, tailles : OK. Console : aucune erreur.
- Aucune couleur ni taille en dur hors de `tokens.css` (hors seuil 1024 px des media queries et `1px` de la technique de masquage).

**Recette — Accessibilité (styleguide)**
- [x] Contraste AA : toutes les paires texte/fond ≥ 4,5:1 (texte secondaire 4,84 ; erreur 7,63 ; inverse-secondaire 10,6). Contours de champs 4,84:1. Seul le texte des blocs Visuel échouait (4,1:1) : corrigé.
- [x] Zones tactiles ≥ 44 px : audit automatique ; onglets (43) et lien du logo mobile (36) corrigés. Points : 32 px visibles, 44 px cliquables.
- [x] Libellés visibles sur tous les champs.
- [x] Clavier et focus visible : contour 2 px sur tous les éléments, menu en `<dialog>` modal.
- [x] Textes alternatifs : logos, pictogrammes ; icônes décoratives en `aria-hidden` avec libellé caché.
- [ ] Plugin d'accessibilité du cours : [à installer].

**Écarts volontaires avec Figma** : voir `design/composants.md` (contour des champs, texte des Visuels, hauteur 44 px du bouton M, état des liens de navigation, « Packshot dos » non repris).

**Reste à faire / à valider**
- Le calque « Packshot dos » de Visuel (survol de la Carte produit) contredit CLAUDE.md : non repris, à confirmer avec l'équipe.
- Libellés de `indisponible.html` toujours provisoires (`docs/microcopy.md` vide).
- Prochaine étape : prompt 02, flow 4 (accueil, liste Signature, filtres, recherche).

## 04/11/2026 — Prompt 02 : flow 4 (accueil, liste Signature, filtres, recherche)

**Demande** : accueil 01.1, liste Signature 03.1 à 03.3 avec filtres, calque de recherche 02.1 à 02.3, Être prévenu.

**Décisions validées avant de coder**
- Pas de facette « Offre » : la liste Signature ne montre jamais de looks (segmentation Signature / Collection renforcée). La page Collection aura ses propres cartes et sa mise en page.
- Cartes produit : deux visuels gris (face, dos) que les flèches font défiler ; flèches masquées s'il n'y a qu'un visuel.
- Savoir-faire : réservé à la fiche produit (prompt 03).

**Fait**
- Frames et nœuds lus : 90:128 (structure), 90:153, 90:155, 90:181, 90:226, 90:239, 98:3495 (structure), 98:3497, 98:3500, 94:1970 et 94:2174 (structure), 94:2192, 94:2194, 94:2216, 183:7325 (structure), 85:296, 85:316, 86:346, 89:402, 89:617, 200:3782.
- `index.html` (01.1), `signature.html` (03.1–03.3).
- JS : `liens.js` (table unique des liens), `carte-produit.js`, `etre-prevenu.js`, `volet.js` (volet générique en `<dialog>`), `filtres.js`, `signature.js`, `accueil.js`, `recherche.js` (calque sur toutes les pages via `layout.js`).
- CSS et jetons du flow 4 ; icônes chevron gauche/droite exportées de Figma.
- Styleguide et `design/composants.md` complétés.

**Vérifications (Playwright, 393 et 1440 px)**
| Cas du prompt | Résultat |
| --- | --- |
| Pantalons + M + Moins de 300 € | 1 résultat : Pantalon regular, 280 € ; URL `?type=pantalons&taille=M&prix=moins-300` ; 3 puces, « Filtrer (3) » |
| Disponibilité : À venir | 5 résultats, tous du Chapitre II |
| Recherche « laine » | Pull, Pantalon wide, Pantalon regular, Crewneck |
| Recherche « parrain » | Le Parrain |
| Recherche « denim » | Écran aucun résultat |
| « test@ » dans Être prévenu | État Erreur ; adresse valide : état Envoyé, rien en storage |

- Recherche sans accents (« debardeur » → Débardeur). Échap ferme la recherche et le volet, focus rendu au déclencheur ; un filtre coché puis abandonné n'est pas appliqué.
- Console : aucune erreur. Audit zones tactiles (accueil, Signature, 393 px) : aucune sous 44 px.

**Recette**
- Mission 0 : [x] les entrées Signature et Collection sont visibles sans défiler sur mobile. [ ] Phrase de marque : sur mobile elle tombe sous les deux entrées, donc hors du premier écran : risque pour le test des 5 secondes (H1), à trancher. [ ] Chargement < 3 s sur le téléphone de test : à mesurer sur l'appareil (aucune image, une seule police par famille).
- Accessibilité : [x] contraste (textes blancs sur dégradé ≥ 14:1), [x] zones 44 px, [x] libellés visibles, [x] clavier et focus (volet, recherche, cartes), [x] textes alternatifs des blocs gris. [ ] Plugin du cours.
- Premium : [x] aucun badge coloré, aucune promo, aucune note.

**Liens temporaires vers `indisponible.html`** (centralisés dans `js/liens.js`, à basculer avec `pret: true`)
- Fiches produit (cartes, suggestions de recherche) → prompt 03.
- Collection (en-tête, menu, entrée Collection, bandeau Outlaws, « Voir la Collection », suggestion « Outlaws. — les looks ») et pages look (cartes look de la recherche) → sans prompt.
- Panier (en-tête, menu) → prompt 05.

**Reste à faire / à valider**
- Photos des maquettes (entrées, bandeau Outlaws) : à exporter de Figma dans `assets/images/` si l'équipe le souhaite.
- Place de la phrase de marque sur mobile (H1).
- Prochaine étape : prompt 03, flow 1 (fiche produit vers panier) — le fichier de prompt est encore vide.

### 04/11/2026 — Complément prompt 02 : photos de l'accueil

- Décisions : phrase de marque laissée sous les entrées pour l'instant ; performance optimisée plus tard ; **photos des maquettes exportées de Figma dès qu'elles existent** (organisation de `assets/` plus tard).
- Exportées de Figma (nœuds 90:157, 90:170, 90:227), recompressées (q70) : `assets/images/accueil-{signature,collection,outlaws}.jpg` + versions `-mobile`. 113 à 625 Ko ; bandeau en `loading="lazy"`, entrée Signature en `fetchpriority="high"`.
- Dégradé adouci (plein sombre aux trois quarts) pour laisser voir les photos ; texte blanc lisible vérifié en 393 et 1440 px.

## 04/11/2026 — Prompt 03 : flow 1 (fiche produit vers panier)

**Demande** : fiche produit et ajout au panier. Le fichier `prompts/03-flow-1.md` étant vide, plan construit depuis CLAUDE.md, routes, recette (mission 1), PRD et maquettes, validé avant de coder.

**Décisions validées**
- Guide des tailles construit dès maintenant avec la vue « Tableau des mesures » (04.4) ; « Ma référence », recommandation et comparaison au prompt 04.
- Volet fabrication (04.8) au prompt 04 ; en attendant, le lien du tissu ouvre l'onglet « Tissu du moment ».
- Bandeau d'arrivée `?src=qr` (04.9) intégré.

**Fait**
- Nœuds lus : 98:3530 et 204:5685 (structure), 87:387, 201:742, 208:832, 98:3534, 115:4925, 130:10321, 203:4764, 203:4770, 98:3561, 89:299, 113:749 (structure) puis 89:349, 113:972.
- Photos exportées de Figma (`assets/images/`) : `bombers-face.png`, `bombers-dos.png`, `bombers-contexte-1..3.jpg`, `bombers-mosaique-1..5.jpg`, `tissu-precedent-{tweed,drap,velours}.jpg`. Icônes : couches, ciseaux 24, repère, appareil photo, info, courriel.
- `produit.html` + `js/produit.js` (une page pour toutes les pièces), `js/contenus-produit.js` (textes du Bombers transcrits de Figma, hors catalogue), `js/panier.js`, `js/guide-tailles.js` ; `js/session.js` (écriture du panier), `js/liens.js` (route produit branchée, route commande ajoutée), `js/carte-produit.js` (packshots du Bombers), jetons et styles.

**Vérifications (Playwright, 393 et 1440 px)**
- [x] Accueil → fiche du Bombers en 1 action (carte de l'accueil).
- [x] La fiche affiche nom, prix, tissu du moment, tailles XS à XL, délai, livraison et retours.
- [x] « Choisir ma taille » sans taille : erreur 04.3 (tailles en erreur, message, focus sur XS), sans blocage.
- [x] Choix de M : « Taille : M », bouton « Ajouter au panier — 700 € ».
- [x] Ajout : panneau 06.1 ouvert, compteur de l'en-tête à 1, `sessionStorage` = `[{bombers, M, 1}]`. Quantité + : 2, 1 400 €, compteur à 2.
- [x] Guide en volet (depuis le bas en mobile) avec les valeurs du catalogue. [ ] Onglet « Ma référence », recommandation M et écarts : prompt 04.
- [x] Chapitre II (Hoodie) : variante À venir, pas de tailles, « Être prévenu de la sortie » amène au formulaire.
- [x] `?src=qr` : bandeau affiché, fermé une fois par visite, focus rendu au nom du produit.
- [x] Slug inconnu → `indisponible.html`, sans erreur console. Aucune zone tactile < 44 px (393 px). Console propre.

**Liens temporaires vers `indisponible.html`**
- « Commander » du panneau panier et « Mon panier » → prompt 05. « Conditions de retour », « Entre deux tailles ? Écrire à l'atelier » → pas d'écran prévu.
- Les fiches produit sont désormais branchées partout (cartes, suggestions de recherche, points de la mosaïque).

**Reste à faire / à valider**
- « Encore réalisables » laissé [À définir] : chiffre réel à confirmer par Noé.
- Textes éditoriaux (vision, détails, tissu) des pièces autres que le Bombers : [À définir].
- Contenus éditoriaux dans `js/contenus-produit.js` : à migrer dans `data/catalogue.json` si l'équipe le valide.
- Styleguide : composants du flow 1 à y ajouter.
- Prochaine étape : prompt 04, flow 3 (guide « Ma référence », recommandation, comparaison, volet fabrication) — fichier de prompt vide.

## 04/11/2026 — Prompt 04 : flow 3 (guide des tailles « Ma référence »)

**Demande** : saisie de la référence (04.5), recommandation et comparaison (04.7), état Taille recommandée sur la fiche (04.6), logique isolée et testée. Volet fabrication (04.8) ajouté à la demande.

**Décisions validées avant de coder**
- Case « Mémoriser ma référence » retirée (référence en `sessionStorage`, effacée à la fermeture de l'onglet).
- Phrase de la fiche : « 4 cm plus ample à la poitrine », « 2 cm plus étroit aux épaules », « 2 cm plus court », « 1 cm plus long aux manches », suivie de « que votre référence ». Égalité d'écarts : le premier dans l'ordre du catalogue (poitrine, longueur, épaules, manche).
- Volet fabrication construit dans cette itération.

**Fait**
- Nœuds lus : 113:528, 113:639, 89:506 (87:387 et 83:209 déjà lus au prompt 03).
- `site/js/taille.js` (logique pure, sans DOM) et `tests/taille.test.js` (`node tests/taille.test.js`, aucune dépendance).
- `js/guide-tailles.js` : vues Ma référence et Comparaison, schéma SVG à l'échelle (largeur = poitrine, hauteur = longueur), plein écran en mobile.
- `js/fabrication.js` : volet 04.8 et gabarit des étapes partagé avec l'onglet de la fiche.
- `js/session.js` : profil de taille ; événements panier et profil séparés. `js/produit.js` : état 04.6, recommandation directe si un profil compatible existe.

**Tests (Node)** : 12 / 12. Les 6 cas du prompt : (56, 70, 48, 62) → M « 4 cm plus ample à la poitrine » · (55, 67, 48, 62) → S (égalité S / M) · (59, 67, 47, 62) → M · (64, 69, 51, 63) → L · (70, 76, 56, 66) → XL + « plus ample que notre XL » · (50, 60, 40, 58) → XS + « plus ajustée ». Contrôle CLAUDE.md : la référence d'exemple du catalogue donne M.

**Vérifications navigateur (Playwright, 393 et 1440 px)**
| Action | Résultat |
| --- | --- |
| « Voir ma taille » champs vides | Erreur sous chaque champ, focus sur Poitrine |
| « 56,5 » | Accepté |
| 300 | « Vérifiez cette mesure : elle se prend à plat, en centimètres. », focus dessus |
| Comparer en L après M | Schéma (63 × 70) et tableau mis à jour, bouton « Choisir la taille L » |
| « Choisir la taille M » | Volet fermé, « Taille : M », phrase de recommandation, « Ajouter au panier — 700 € » |
| Recharger la page | Recommandation et M conservés |
| Nouvel onglet | Plus de profil ni de panier |
| Fiche Pull (sans guide) avec profil | Rien ne change ; Ma référence en [À définir] |
| « Voir les étapes de fabrication » | Volet 04.8, 6 étapes, délai du catalogue |

**Recette — Mission 1 (desktop et mobile)**
- [x] Depuis l'accueil, fiche du Bombers en 1 action.
- [x] La fiche affiche nom, prix, tissu du moment, tailles XS à XL, délai, livraison et retours.
- [x] Clic sur le bouton sans taille : erreur 04.3, sans blocage (bouton libellé « Choisir ma taille » dans la maquette).
- [x] Le guide s'ouvre en volet, avec « Tableau des mesures » et « Ma référence ».
- [x] Le tableau reprend les valeurs du catalogue.
- [x] Référence 56 / 70 / 48 / 62 : M recommandé, écarts affichés.
- [x] « Choisir la taille M » sélectionne M sur la fiche et ferme le volet.
- [x] L'ajout ouvre le panneau panier, compteur de l'en-tête à 1.
- Accessibilité : zones tactiles ≥ 44 px (guide saisie et comparaison), libellés visibles, erreurs avec icône et texte, focus géré à chaque changement de vue, console propre.

**Reste à faire / à valider**
- Le protocole de test doit être réécrit sur le Bombers (cartes de mesures) — hors code.
- Styleguide : composants des flows 1 et 3 à y ajouter.
- Prochaine étape : prompt 05, flow 2 (panier, commande, confirmation).

## 04/11/2026 — Vercel

- Cause des images manquantes : Root Directory du projet Vercel réglé sur `site`, alors que `assets/` et `data/` sont à la racine (404, catalogue compris). Correctif : Root Directory vidé (fait par Jules) + `vercel.json` qui redirige `/` vers `/site/`. Vérifié : pages, images, icônes et `data/catalogue.json` en 200 sur name-poc.vercel.app.

## 04/11/2026 — Prompt 05 : flow 2 (panier, commande, confirmation)

**Décisions validées** : identité fictive du paiement express Camille Martin (camille.martin@exemple.fr, 12 rue de l’Espérance, 59100 Roubaix) ; « Payer en 3 fois » avec les champs carte ; Apple Pay / Google Pay à l'étape 4 = chargement puis confirmation.

**Fait**
- Nœuds lus : 94:2790, 86:219, 95:2478, 95:2608, 95:2675 (07.1), 95:2978 (structure) et 95:3005, 95:3088 (07.4), 95:3222 (08.1) ; 95:2661 et 95:3203 en structure au plan.
- Exportés de Figma : packshot du Pantalon wide (`assets/images/pantalon-wide-face.png`), icône cadenas.
- Pages : `panier.html`, `commande.html`, `confirmation.html`. JS : `paiement.js` (logique pure, testée), `recapitulatif.js`, `page-panier.js`, `commande.js`, `confirmation.js` ; `session.js` (commande en cours, dernière commande, sans données de carte), `panier.js` (lecture seule, « Voir le panier », ouverture depuis l'en-tête), `layout.js` (« Mon panier (n) » ouvre le panneau), `liens.js` (panier, commande, confirmation branchés).
- Prix : espace fine insécable remplacée par une espace insécable (U+202F absente de Didact Gothic : « 1030 € » devenait illisible).

**Tests (Node)** : `tests/paiement.test.js` 8 / 8 ; `tests/taille.test.js` 12 / 12.

**Vérifications navigateur (Playwright, 393 et 1440 px)**
| Action | Résultat |
| --- | --- |
| Panier Bombers M + Pantalon wide M | Sous-total 1 030 €, total TTC 1 030 € |
| `commande.html` panier vide | Redirection vers le panier vide |
| Continuer sans e-mail | Erreurs sous E-mail, Prénom, Nom, Adresse ; focus sur E-mail |
| E-mail « camille@ » | Erreur de format |
| « 12 r » dans l'adresse | 3 suggestions ; un clic remplit l'adresse |
| Modifier à l'étape Livraison | Retour aux coordonnées, valeurs gardées |
| `?etape=paiement` sans coordonnées | Étape Coordonnées (sans livraison validée : étape Livraison) |
| Clic dans Numéro de carte | 4242 4242 4242 4242 ; nom pré-rempli |
| Payer en 3 fois | 3 × 343,33 € pour 1 030 € ; 700 € → 233,33 + 233,33 + 233,34 (test Node) |
| Payer avec champs vides | Erreurs visibles, focus sur le premier (sans remplissage automatique) |
| Payer 1 030 € | Confirmation NA-xxxx, « entre le 11 et le 18 novembre 2026 », compteur à 0, panier vidé, aucune donnée de carte en session |
| Retour arrière | Panier vide, aucune nouvelle commande |
| Apple Pay à l'étape 1 | « Validation en cours… » puis confirmation (camille.martin@exemple.fr) |

**Recette**
- Mission 2 : [x] panier avec article, taille, prix, frais, total et délai · [x] 3 étapes avec indicateur · [x] erreur 07.2 · [x] champs de paiement remplis au clic · [x] aucune case pré-cochée, aucun coût ajouté (livraison offerte affichée dès le panier) · [x] confirmation avec numéro, récapitulatif et délai.
- Perception premium : [x] aucun lorem ipsum ni libellé générique ; [x] polices chargées sur toutes les pages (y compris le tunnel) ; [x] aucun badge coloré, aucune note, aucune promo.
- Accessibilité : [x] zones tactiles ≥ 44 px (corrigé : nom du produit dans la ligne panier, « Modifier », « Retirer ») ; [x] libellés visibles ; [x] erreurs avec icône et texte ; [x] suggestions d'adresse au clavier ; [x] focus déplacé sur le titre de la confirmation et du panier vide ; [ ] plugin du cours.

**Reste à faire / à valider**
- Suivi de fabrication (08.2 à 08.6) et Collection Outlaws (05.1 à 05.4) : hors périmètre testé.
- Styleguide : composants des flows 1, 2 et 3 à y ajouter.
