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
