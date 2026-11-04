# Composants

Correspondance composant Figma (page « UI kit ») → composant de code. Ne pas utiliser Tag ni Rating.
Mis à jour le 04/11/2026 (prompt 01). Vérification visuelle : `site/styleguide.html`.

CSS : `site/css/styles.css` (jetons dans `site/css/tokens.css`). Icônes : SVG Figma dans `assets/icones/`, utilisés en masque CSS (`.icone .icone--nom`) pour suivre `currentColor`.

## Atomes et molécules

| Composant Figma | Nœud | Code | États couverts |
| --- | --- | --- | --- |
| Logo (Noir, Blanc) | 82:131 | `assets/logo/logo-{noir,blanc}(-hd).png` | Noir, Blanc (PNG : pas de vectoriel dans Figma) |
| Pictogramme N (Noir, Blanc) | 82:134 | `assets/logo/picto-n-{noir,blanc}(-hd).png` | Noir, Blanc ; noir utilisé en favicon |
| Button | 82:255 | `.bouton` + `--secondaire` / `--texte` + `--l` (+ `--pleine-largeur`) ; icône `.icone--fleche-16/20` | Principal, Secondaire, Texte × M, L × Défaut, Survol (`:hover`), Pressé (`:active`), Désactivé (`:disabled`, `[aria-disabled]`) |
| Lien | 82:260 | `.lien` | Défaut, Survol |
| Mention | 82:267 | `.mention` + `--plein` / `--texte` | Contour, Plein, Texte |
| Flèche | 162:6861 | `button.fleche` + `.icone--fleche-gauche/droite` | Gauche, Droite ; Survol et Désactivé ajoutés |
| Visuel (bloc gris) | 82:268 | `.visuel` (`--visuel-ratio`, défaut 4/5) + `.visuel__packshot` | Simple, Packshot. « Packshot dos » non repris (voir écarts) |
| Séparateur | 82:270 | `hr.separateur` | — |
| Champ | 83:209 | `.champ` > `.champ__libelle` + `.champ__zone` > `.champ__saisie` (`input` / `select`) + `.champ__chevron` ; `.champ__message(--erreur)` | Texte, Liste × Défaut, Focus (`:focus`), Rempli, Erreur (`[aria-invalid="true"]` + icône + message), Désactivé (`:disabled`, `.champ--desactive`) |
| Option | 83:223 | `label.option` > `input.radio` + `.option__contenu` (`__titre`, `__description`) + `.option__valeur` | Non sélectionnée, Sélectionnée (`:has(:checked)`) |
| Case à cocher | 83:233 | `label.case` > `input.case__entree` | Non cochée, Cochée |
| Taille | 83:245 | `fieldset.tailles` > `label.taille` > `input[type=radio].visuellement-cache` | Défaut, Survol, Sélectionnée (`:checked`), Indisponible (`:disabled`, pièces uniques seulement), Erreur (`.tailles[aria-invalid]` ou `.taille--erreur`) |
| Onglet | 83:253 | `[role=tablist].onglets` > `button.onglet[role=tab]` + `.onglet-panneau[role=tabpanel]` ; JS `js/onglets.js` | Actif (`aria-selected`), Inactif, Survol ; clavier ← → Début Fin |
| Accordéon | 83:267 | `details.accordeon` > `summary.accordeon__titre` + `.accordeon__contenu` | Fermé, Ouvert (natif, sans JS) |
| Quantité | 83:269 | `.quantite[data-quantite]` > `button.quantite__bouton[data-moins/plus]` + `output.quantite__valeur` ; JS `js/quantite.js` (événement `quantite`) | Valeur, bornes min/max (bouton désactivé) |
| Point | 83:283 | `button.point` | Défaut, Actif (`aria-expanded="true"`) ; zone tactile 44 par `::before` |
| Étape du tunnel | 83:298 | `ol.etapes` > `li.etape` (+ `--a-venir`) > `.etape__pastille` | Terminée (icône check), En cours (`aria-current="step"`), À venir |
| Lien de navigation | 83:306 | `a.lien-nav` | Défaut, Survol, Actif (`aria-current="page"`) |

## Éléments communs

| Composant Figma | Nœud | Code | États couverts |
| --- | --- | --- | --- |
| En-tête (Desktop, Mobile) | 85:191 | `js/layout.js` → `header.en-tete` (injecté dans `[data-layout="en-tete"]`) | Mobile : menu, recherche, logo centré, panier « (n) ». Desktop ≥ 1024 px : logo, navigation, recherche, « Mon panier (n) ». Fixe (`sticky`). Compteur : `majCompteurPanier()` |
| Menu mobile | 208:952 | `dialog#menu-mobile.menu-mobile` ; JS `js/menu-mobile.js` | Ouvert, Fermé ; focus piégé et Échap natifs (`showModal`), retour du focus sur le bouton Menu |
| Pied de page (Desktop, Mobile) | 85:231 | `js/layout.js` → `footer.pied.sur-fond-sombre` | Mobile empilé, Desktop en ligne ; grand logo blanc (`srcset` 410 / 1637 px) |
| Délai de fabrication | 85:233 | `[data-delai]` → `.delai` ; JS `js/delai.js` (texte = `catalogue.delai`) | — |

## Écarts volontaires avec Figma

| Composant | Figma | Code | Raison |
| --- | --- | --- | --- |
| Champ, Option, Taille, Quantité | Contour `bordure/defaut` #C2C2C2 (1,6:1) | `--couleur-bordure-champ` = #6B6B6B (4,8:1) | AA : 3:1 minimum pour un composant d'interface (validé le 04/11) |
| Visuel | Texte `texte/secondaire` (4,1:1 sur fond/image) | `texte/principal` (8,1:1) | AA texte 4,5:1 |
| Button M, Quantité | 40 px de haut | 44 px | Zone tactile 44 px (CLAUDE.md) |
| Lien de navigation | 3 états identiques | Survol et Actif soulignés | Rendre l'état visible |
| Lien | Survol = couleur seule | Survol = couleur + soulignement | AA : pas la couleur seule |
| Liens du pied de page (mobile), du menu mobile | Interligne serré | 44 px de haut chacun | Zone tactile 44 px |
| Visuel | Calque « Packshot dos » visible au survol de la carte | Non repris | CLAUDE.md : ne pas changer l'image au survol |
| Focus | Absent | Contour 2 px, décalé de 2 px | Focus visible (validé le 04/11) |
| Titres du menu mobile | 36 px (mode Desktop affiché dans la maquette) | `--titre-l` = 28 px en mobile | Mode Mobile des variables |

## Flow 4 — accueil, liste Signature, recherche (prompt 02)

| Composant Figma | Nœud | Code | États couverts |
| --- | --- | --- | --- |
| Carte produit (Disponible, À venir) | 85:296 | `js/carte-produit.js` → `carteProduit()` ; `.carte-produit` (`__media`, `__visuel`, `__fleche`, `__compte`, `__infos`, `__lien`) | Disponible, À venir (mention « À venir · août 2027 »), flèches + compteur « 1 / 2 ». Carte entière cliquable |
| Carte look (Disponible, Vendu) | 85:316 | `carteLook()` ; `.carte-look` | Disponible, Vendu. Utilisée dans la recherche uniquement (la liste Signature ne montre pas de looks) |
| Être prévenu (Défaut, Envoyé, Erreur, Mobile) | 86:346 | `[data-etre-prevenu]` + `js/etre-prevenu.js` ; `.etre-prevenu` | Défaut, Erreur (`aria-invalid` + message), Envoyé (focus sur la confirmation). Mobile : bouton pleine largeur sous le champ |
| Volet filtres | 89:402 | `dialog.volet` + `js/volet.js` (générique) + `js/filtres.js` | Ouvert, compteur « Voir n résultat(s) », Effacer, Échap / voile / croix (annule les changements non validés) |
| Barre de filtres | 98:3500 · 94:2194 | `.barre-filtres` (dans `js/signature.js`) | Sans filtre (compteur), avec filtres (« Filtrer (n) », puces supprimables, « Tout effacer ») |
| Recherche (Suggestions, Résultats, Aucun résultat) | 89:617 | `dialog#recherche.recherche` + `js/recherche.js` | Suggestions, Résultats (produits + looks, prix), Aucun résultat (retours Signature / Collection) |
| Entrées Signature / Collection | 90:155 | `.entrees > a.entree` | Bloc gris + dégradé sombre + libellé blanc |
| Bandeau Outlaws | 90:226 | `.bandeau` ; bouton `.bouton--sur-sombre` | — |
| Engagements | 90:239 | `.engagements > .engagement` | — |

### Écarts du flow 4

| Élément | Figma | Code | Raison |
| --- | --- | --- | --- |
| Volet filtres | Facette « Offre » (Signature, Collection) | Retirée | Décision du 04/11 : segmentation stricte, pas de looks dans la liste Signature |
| Filtre Taille | Une taille sélectionnée | Plusieurs tailles possibles (cases) | Règle du prompt : plusieurs valeurs d'une facette = OU |
| Entrées et bandeau de l'accueil | Photos | Photos exportées de Figma (`assets/images/accueil-*.jpg`, versions desktop et mobile) | Décision du 04/11 : exporter les images Figma dès qu'elles existent |
| Dégradé des entrées et du bandeau | Dégradé radial | Dégradé linéaire, plein sombre aux trois quarts | Texte blanc lisible sur toutes les zones de la photo |
| Entrées en mobile | Pas de maquette | Chaque entrée = moitié de l'écran sous l'en-tête | Recette mission 0 : les deux entrées visibles sans défiler |
| Carte produit | Vue de dos au survol | Pas de changement au survol ; flèches au survol (souris) ou toujours (toucher) | CLAUDE.md |
| Carte look | Citation du personnage | Non affichée | Absente du catalogue (pas d'invention) |
| Savoir-faire | 200:3782, 213:7767 | Non utilisé sur l'accueil | Bloc de la fiche produit (description Figma) : prompt 03 |

## Flow 1 — fiche produit vers panier (prompt 03)

| Composant Figma | Nœud | Code | États couverts |
| --- | --- | --- | --- |
| Infos produit | 87:387 | `js/produit.js` → `.infos` (`__entete`, `__tissu`, `__variation`, `__choix`, `__achat`, `__conditions`) | Initial (« Choisir ma taille »), Taille choisie (« Taille : M », « Ajouter au panier — 700 € »), Erreur (tailles en erreur + message, sans blocage), À venir (Chapitre II : mention, « Tissu prévu », « Être prévenu de la sortie »). Taille recommandée : prompt 04 |
| Slider — Bombers | 201:742 | `.galerie__slider` (flèches, compteur, mention « Inspiration ») | 4 photos ; blocs gris pour les autres pièces |
| Carrousel mobile — Bombers | 208:832 | `.carrousel` (défilement natif, `scroll-snap`, points) | Face, dos, puis visuels en contexte |
| Visuel packshot (colonne gauche) | 98:3534 | `.galerie__gauche` | Packshot face sur fond image |
| Savoir-faire | 200:3782 · 213:7767 | `section#fabrication.savoir-faire` | 4 colonnes desktop, empilé en mobile ; ancre « fabrication » |
| Onglets (fiche) | 115:4925 | `.panneaux-produit` : onglets ARIA en desktop, `<details>` en mobile | Vision produit, Tissu du moment, Détails produit, Informations de livraison |
| Tissu du moment | 86:241 | `.carte-blanche.tissu` | Matière, origine, fabrication, encore réalisables (À définir), tissus précédents |
| Étapes de fabrication | 86:273 | `.etapes-fabrication` | 6 étapes + statut e-mail |
| Mosaïque + points | 130:10321 · 142:10461 · 04.1 Hotspots | `.mosaique`, `a.mosaique__point` | 5 photos ; points 1 et 2 vers Bombers et Pantalon wide |
| Panneau panier | 89:299 | `js/panier.js` → `dialog#panneau-panier.volet.volet--large` | Après ajout (annonce, ligne, sous-total, Commander, Continuer) ; quantité, retrait ; plein écran mobile |
| Ligne panier (Signature) | 86:217 | `ligneProduit()` → `li.ligne-panier` | Taille, tissu, délai, quantité, retirer |
| Guide des tailles — Tableau | 89:349 | `js/guide-tailles.js` → `dialog#guide-tailles.volet--large.volet--bas` | Tableau des mesures (catalogue) ; onglet Ma référence en attente (prompt 04) ; monte du bas en mobile |
| Bandeau d'arrivée | 113:972 | `.bandeau-arrivee` (`?src=qr` ou `instagram`) | Affiché une fois par visite (`sessionStorage`), fermable |

### Écarts du flow 1

| Élément | Figma | Code | Raison |
| --- | --- | --- | --- |
| Tissu du moment de la fiche | « laine bouillie anthracite » | Catalogue : « sergé de coton bleu marine » | Le catalogue fait foi pour les données |
| Délai de la ligne panier | « Fabriqué à la commande · reçu sous… » | Texte du catalogue (« Fabriquée… chez vous sous… ») | CLAUDE.md |
| « Encore réalisables » | « 12 pièces dans ce tissu » | [À définir] | Chiffre non confirmé (PRD) : fausse rareté interdite (CLAUDE.md) |
| Lien « En savoir plus » (tissu) | Volet fabrication 04.8 | Ouvre l'onglet « Tissu du moment » | Volet fabrication au prompt 04 |
| « Trouver ma taille » | Vue Ma référence | Ouvre le guide sur l'onglet Ma référence, contenu [À définir] | Prompt 04 |
| Titre des étapes | Playfair Display SC italique | Romain | Une seule graisse/style chargé (jetons) |
| Cartes des onglets | Fond blanc en dur | `--couleur-fond-carte` (#FFFFFF, ajouté aux jetons) | Pas de variable Figma |
| Carte produit du Bombers | Bloc gris | Packshots face / dos exportés | Décision : photos Figma dès qu'elles existent |
| Mosaïque mobile | Pas de maquette | Grille 2 colonnes, points listés sous la mosaïque | Lisibilité au toucher |

## À construire avec leur flow

Récapitulatif, Infos look, En-tête commande, Fiche pièce, Guide des tailles (Ma référence, Comparaison), Volet fabrication, Toast, Étape de suivi, Frise de fabrication, Détail d'étape, Slider et carrousel Le Conseiller.
