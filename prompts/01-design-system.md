# Prompt 01 — Design system

> À coller dans Claude Code, en **mode plan**, après la validation du prompt 00.

---

Cette session construit le design system du POC : les jetons, les composants de base et les éléments communs à toutes les pages. Aucun écran des maquettes n'est construit ici.

## Règles de la session

- Lis le Figma avec le serveur MCP, **un nœud à la fois**, à partir des identifiants ci-dessous. Ne lis jamais une page entière.
- Les maquettes sont en desktop. Le UI kit contient déjà les variantes mobiles de l'en-tête, du pied de page et du menu : utilise-les, et construis mobile d'abord.
- Ne reprends pas les composants génériques de l'ancienne page DA (Tag, Rating, Switch, Textarea, Select, Menu) : seule la page « UI kit » fait foi.
- Exceptionnellement, tu peux écrire dans `design/composants.md` (étape 4).

## Étape 1 — Les jetons

1. Lis les variables de la page DA [0:1](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=0-1) et du UI kit [81:205](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=81-205) : couleurs, typographie, espacements, rayons, et leurs modes Desktop / Mobile.
2. Écris-les dans `site/css/tokens.css` sous forme de propriétés CSS (`--couleur-fond`, `--titre-l`…), avec les noms Figma en commentaire. Les valeurs du mode Mobile s'appliquent par défaut ; celles du mode Desktop dans une media query à partir de 1024 px.
3. Charge Playfair Display SC et Didact Gothic depuis Google Fonts, avec `font-display: swap`.

Présente-moi le fichier avant de passer à l'étape 2.

## Étape 2 — Atomes et molécules

Construis chaque composant en HTML + CSS, avec tous ses états, en utilisant uniquement les jetons.

| Composant | Nœud Figma |
| --- | --- |
| Logo (Noir, Blanc) | [82:131](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=82-131) |
| Pictogramme N (Noir, Blanc) | [82:134](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=82-134) |
| Button — Principal / Secondaire / Texte × M / L × Défaut / Survol / Pressé / Désactivé | [82:255](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=82-255) |
| Lien (Défaut, Survol) | [82:260](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=82-260) |
| Mention (Contour, Plein, Texte) | [82:267](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=82-267) |
| Flèche (gauche, droite) | [162:6861](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=162-6861) |
| Visuel (bloc gris) | [82:268](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=82-268) |
| Séparateur | [82:270](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=82-270) |
| Champ — Texte / Liste × Défaut / Focus / Rempli / Erreur / Désactivé | [83:209](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-209) |
| Option (Non sélectionnée, Sélectionnée) | [83:223](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-223) |
| Case à cocher | [83:233](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-233) |
| Taille (Défaut, Survol, Sélectionnée, Indisponible, Erreur) | [83:245](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-245) |
| Onglet (Actif, Inactif, Survol) | [83:253](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-253) |
| Accordéon (Fermé, Ouvert) | [83:267](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-267) |
| Quantité | [83:269](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-269) |
| Point (Défaut, Actif) | [83:283](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-283) |
| Étape du tunnel (Terminée, En cours, À venir) | [83:298](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-298) |
| Lien de navigation (Défaut, Survol, Actif) | [83:306](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-306) |

- Chaque composant interactif doit être utilisable au clavier, avec un focus visible et une zone tactile de 44 px minimum.
- Les états Survol / Pressé deviennent `:hover` / `:active` ; les états Erreur et Désactivé, des classes ou attributs (`aria-invalid`, `disabled`).

## Étape 3 — Éléments communs à toutes les pages

| Composant | Nœud Figma |
| --- | --- |
| En-tête (Desktop, Mobile) | [85:191](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=85-191) |
| Menu mobile | [208:952](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=208-952) |
| Pied de page (Desktop, Mobile) | [85:231](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=85-231) |
| Délai de fabrication | [85:233](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=85-233) |

- En-tête : logo vers l'accueil, liens Signature, Collection, La marque, loupe (la recherche viendra au flow 4), « Mon panier (n) » relié au compteur du panier. Sur mobile, le menu s'ouvre en plein écran.
- Pied de page : liens Informations, Suivre Name., Légal. Tous mènent à `indisponible.html` sauf Instagram.
- Délai de fabrication : composant réutilisable, texte tiré de `data/catalogue.json` (clé `delai`).
- Injecte l'en-tête et le pied de page sur toutes les pages par un module JS commun, pour ne les écrire qu'une fois.

## Étape 4 — Vérification et documentation

1. Crée `site/styleguide.html` : une page qui affiche chaque jeton et chaque composant avec tous ses états, en mobile et en desktop. Elle sert à vérifier le design system, pas aux testeurs.
2. Compare la page au UI kit, composant par composant. Liste les écarts restants.
3. Remplis `design/composants.md` : nom Figma, identifiant du nœud, fichier et classe CSS, états couverts.
4. Passe la partie Accessibilité de `docs/recette.md` sur la page styleguide.
5. Ajoute l'entrée de `docs/journal.md` et propose le commit.

## Hors de cette session

Les organismes propres à un flow (carte produit, infos produit, guide des tailles, panneau panier, recherche, volets, carte look, frise de fabrication…) seront construits avec leur flow.
