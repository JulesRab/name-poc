# NAME. — POC du site e-commerce

Prototype fonctionnel du futur site de NAME. (Name Atelier), label textile en matières naturelles issues de deadstocks. Il sert à des tests utilisateurs modérés aux Gobelins, sur mobile et desktop. Ce n'est pas le site de production : aucun vrai paiement, aucune donnée réelle collectée, Shopify volontairement ignoré.

## Sources, par ordre d'autorité

1. Ce fichier.
2. Les maquettes Figma (page « Maquettes ») : structure, textes, contenus, états. Liens frame par frame : @design/liens-figma.md
3. Les données : @data/catalogue.json
4. Les règles de site : @docs/routes.md · @docs/glossaire.md · @docs/recette.md · @docs/microcopy.md
5. Le contexte : @docs/PRD-complet.md · docs/protocole-test.pdf · docs/personas.pdf

En cas d'écart, la source la plus haute l'emporte. Si une information manque partout, ne l'invente pas : affiche « [À définir] » de façon visible et signale-le.

**Protocole de test** : ignore la mission 1 telle qu'écrite (pantalon et cartes de mesures de Sacha et Alex). Elle sera réécrite sur le Bombers. Le guide des tailles se construit d'après les frames 04.4 à 04.7.

## Stack

- HTML, CSS et JavaScript natifs. Aucun framework, aucun outil de build, aucune dépendance npm.
- Le site vit dans `site/` : une page `.html` par route (voir docs/routes.md), `site/css/tokens.css` (variables du design system), `site/css/styles.css`, `site/js/` (un module par composant : en-tête, recherche, panier, guide des tailles…).
- Les données sont lues depuis `data/catalogue.json`. Servir le projet depuis la racine pour que le chargement fonctionne : `python3 -m http.server 8000`, puis ouvrir `http://localhost:8000/site/`.
- Polices : Playfair Display SC (titres, boutons) et Didact Gothic (texte, prix, formulaires), via Google Fonts.

## Design

- Lis les maquettes avec le serveur MCP de Figma, **une frame à la fois**, jamais la page entière.
- Les jetons (couleurs, typographie, espacements) viennent des variables Figma de la page DA et du UI kit. Ne code aucune couleur ou taille en dur hors de `tokens.css`.
- Les maquettes sont en desktop 1440 px. Construis **mobile d'abord** (393 px de large), puis élargis jusqu'au desktop fidèle aux maquettes.
- Les blocs gris des maquettes sont des visuels à produire : garde un bloc gris avec son texte descriptif, n'utilise jamais d'image générée ou trouvée en ligne.

## Règles de marque

Doit :
- afficher « Fabriquée à la commande · chez vous sous 1 à 2 semaines » sur chaque fiche Signature, dans le panier, à la livraison et à la confirmation ;
- séparer les photos des informations produit ;
- écrire NAME. / Name., Signature., Outlaws. avec le point final (voir glossaire).

Ne doit pas :
- proposer d'ajout rapide au panier depuis une vignette, ni changer l'image au survol ;
- afficher « rupture de stock », « stock », « homme », « femme », « promo », « Nouveau », un compte à rebours ou toute fausse urgence ;
- pré-cocher une case, ou ajouter un coût à la dernière étape du tunnel ;
- utiliser de badge coloré ni de note en étoiles.

## Comportements

- **Panier et profil de taille** : en `sessionStorage`. Fermer l'onglet remet le prototype à zéro pour le testeur suivant.
- **Guide des tailles** : onglet « Ma référence ». La personne saisit les mesures à plat d'un vêtement qu'elle aime. Pour chaque taille, calcule la somme des écarts absolus avec le tableau du produit ; recommande la taille au plus petit total. En cas d'égalité, la plus petite taille. Affiche ensuite l'écart mesure par mesure (frame 04.7). Contrôle : la référence d'exemple du catalogue doit donner M.
- **Paiement fictif** : chaque champ se remplit au clic avec une valeur factice. Aucune donnée saisie n'est envoyée.
- **Liens sans écran** : vers `site/indisponible.html`, jamais de lien cassé.

## Accessibilité

Contraste AA, zones tactiles de 44 px minimum, libellés visibles sur tous les champs, navigation clavier dans les volets, focus visible, textes alternatifs.

## Méthode de travail

- Un flow par itération, dans l'ordre des fichiers de `prompts/`. Ne touche pas aux écrans d'un autre flow sans le demander.
- Commence chaque itération en mode plan : liste les frames lues, les fichiers créés ou modifiés, les questions ouvertes. Attends la validation avant de coder.
- À la fin de chaque itération : passe la checklist de @docs/recette.md, ajoute une entrée dans `docs/journal.md` (date, demande, ce qui a été fait, ce qui reste), puis propose un commit Git.
- Ne modifie pas les fichiers de `docs/`, `design/` et `data/` sans le demander.
