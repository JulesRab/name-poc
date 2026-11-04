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
