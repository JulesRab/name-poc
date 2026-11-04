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

## À construire avec leur flow

Carte produit, Carte look, Ligne panier, Récapitulatif, Tissu du moment, Étapes de fabrication, Être prévenu, Infos produit, Infos look, En-tête commande, Fiche pièce, Mosaïque, Point mosaïque, Panneau panier, Guide des tailles, Volet filtres, Volet fabrication, Recherche, Toast, Bandeau d'arrivée, Étape de suivi, Frise de fabrication, Détail d'étape, Savoir-faire, Sliders et carrousels.
