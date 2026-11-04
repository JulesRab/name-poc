# Prompt 05 — Flow 2 : panier, commande et paiement

> À coller dans Claude Code, en **mode plan**, après la validation du prompt 04.

---

Cette session construit la page panier, le tunnel de commande en 3 étapes et la confirmation. C'est la mission 2 du protocole (« Vous êtes décidé, finalisez votre commande »), qui porte l'hypothèse H3 : le tunnel panier → paiement est fluide.

## Règles de la session

- Réutilise les jetons et composants existants, notamment la Ligne panier et le Panneau panier du prompt 03.
- Lis le Figma **un nœud à la fois**. Mobile d'abord : sur mobile, le récapitulatif passe au-dessus du formulaire, replié par défaut avec le total visible.
- Le paiement est **fictif** : aucune donnée saisie n'est envoyée ni enregistrée au-delà de la session. Aucune requête réseau.
- Règles de `CLAUDE.md` à respecter strictement ici : aucune case pré-cochée, aucun coût ajouté en cours de tunnel, aucune urgence.
- Le tunnel utilise l'En-tête commande (« Retour au panier », logo, « Paiement sécurisé ») à la place de l'en-tête du site, et n'affiche pas le pied de page.

## Écrans et composants

| Élément | Nœud |
| --- | --- |
| 06.3 Panier | [95:2478](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=95-2478) |
| 06.4 Panier vide | [95:2608](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=95-2608) |
| 07.1 Commande — coordonnées | [95:2661](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=95-2661) |
| 07.2 Commande — erreur de saisie | [95:2814](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=95-2814) |
| 07.3 Commande — livraison | [95:2978](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=95-2978) |
| 07.4 Commande — paiement | [95:3077](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=95-3077) |
| 08.1 Confirmation de commande | [95:3203](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=95-3203) |
| Récapitulatif | [86:219](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=86-219) |
| En-tête commande | [94:2790](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=94-2790) |
| Étape du tunnel (Terminée, En cours, À venir) | [83:298](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-298) |
| Option (Non sélectionnée, Sélectionnée) | [83:223](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-223) |
| Case à cocher | [83:233](https://www.figma.com/design/aVW6R6dt3l7a7Hu5dSyr0j/20261103_NAME.ATELIER_?node-id=83-233) |

## Parcours

- « Mon panier (n) » dans l'en-tête ouvre le panneau panier (prompt 03).
- « Commander » dans le panneau et sur la page panier mène à `commande.html?etape=coordonnees`.
- La page panier s'ouvre depuis « Retour au panier » dans le tunnel, et depuis un lien « Voir le panier » à ajouter dans le panneau.
- `commande.html` avec un panier vide redirige vers la page panier (état vide). Une étape à laquelle on n'a pas encore droit (le paiement sans coordonnées) renvoie à la première étape incomplète.

## Étape 1 — Page panier (06.3, 06.4)

- Les lignes du panier avec quantité et « Retirer », puis le Récapitulatif : Sous-total, Livraison en France « Offerte », Total TTC, délai de fabrication, « Retours sous 14 jours · Paiement sécurisé ».
- Bouton « Commander », puis : « Paiement par carte, Apple Pay, Google Pay ou en 3 fois sans frais. Sans création de compte. », « Une question ? contact@name-atelier.com », « Conditions de retour ».
- Panier vide : état 06.4.

## Étape 2 — Coordonnées (07.1, 07.2)

- Indicateur d'étapes : 1 Coordonnées, 2 Livraison, 3 Paiement. Une étape terminée prend une coche et reste cliquable.
- Paiement express : boutons Apple Pay et Google Pay, puis « ou remplissez vos coordonnées ». Un clic simule la validation (un court état de chargement) et mène directement à la confirmation, avec des coordonnées fictives.
- Champs : E-mail (avec « Pas besoin de créer un compte. Le suivi de commande arrive par e-mail. »), Prénom, Nom, Adresse de livraison, Téléphone (facultatif).
- Adresse : dès 3 caractères, 3 suggestions fictives s'affichent (12 rue de l'Espérance, 59100 Roubaix · 12 rue de l'Espérance, 75013 Paris · 12 rue de l'Espoir, 59000 Lille). Le lien « Saisir l'adresse manuellement » affiche les champs Adresse, Code postal, Ville.
- Case « M'informer des prochaines sorties (facultatif) », **non cochée**.
- « Continuer vers la livraison » valide les champs : un champ obligatoire vide ou un e-mail mal formé passe en état Erreur (07.2), avec un message sous le champ et le focus sur la première erreur.

## Étape 3 — Livraison (07.3)

- Rappel des coordonnées avec « Modifier », qui revient à l'étape 1 en gardant les valeurs.
- Une seule option, déjà choisie : « Livraison à domicile en France », « Offerte », « Expédiée après fabrication · reçue sous 1 à 2 semaines après la commande ».
- Le texte : « Votre pièce est fabriquée à la commande : comptez environ une semaine d'atelier, puis l'expédition. Un e-mail vous prévient à chaque étape. », le délai, puis « Continuer vers le paiement ».

## Étape 4 — Paiement (07.4)

- Trois options : Carte bancaire (Visa, Mastercard, CB), Apple Pay / Google Pay (« Validation sur votre téléphone »), Payer en 3 fois.
- Carte bancaire : Numéro de carte, Date d'expiration, Code de sécurité, Nom sur la carte (pré-rempli avec le prénom et le nom de l'étape 1). **Chaque champ vide se remplit au clic** avec une valeur factice : 4242 4242 4242 4242, 12 / 28, 123.
- Payer en 3 fois : « 3 × 233,33 €, sans frais », calculé depuis le total. Les deux premières échéances sont arrondies au centime inférieur, la dernière corrige l'écart.
- Mention : « En validant, vous acceptez les conditions générales de vente. Droit de rétractation de 14 jours. Aucune option payante n'est pré-cochée. »
- Bouton « Payer 700 € », avec le total réel. Si la carte est choisie et qu'un champ est vide, état Erreur sur ce champ.

## Étape 5 — Confirmation (08.1)

- « Commande n° NA-1027 » : un numéro fictif en NA- suivi de 4 chiffres, généré à chaque commande.
- « Merci. Votre pièce part à l'atelier. » et « Un e-mail de confirmation vient d'être envoyé à [e-mail saisi]. Vous serez prévenu·e à l'expédition. »
- « Réception estimée : entre le [date du jour + 7 jours] et le [date du jour + 14 jours] », en toutes lettres (« entre le 11 et le 18 novembre 2026 »).
- « Ce qui se passe maintenant » : les 6 étapes Reçue, Tissu, Coupe, Assemblage, Finitions, Expédition, avec leur phrase.
- Boutons « Suivre la fabrication de ma pièce » (vers `indisponible.html` : le suivi n'est pas dans le POC), « Continuer la visite » (vers l'accueil), « Suivre @name.ateliers ».
- Le récapitulatif de la commande reste affiché à droite. Le panier est vidé : le compteur de l'en-tête repasse à 0. Revenir en arrière ne recrée pas de commande.

## Étape 6 — Vérification

| Action | Résultat attendu |
| --- | --- |
| Panier avec Bombers M et Pantalon wide M | Sous-total 1 030 €, Total TTC 1 030 € |
| Ouvrir `commande.html` avec un panier vide | Redirection vers le panier vide |
| « Continuer vers la livraison » sans e-mail | Erreur sous E-mail, focus dessus |
| E-mail « camille@ » | Erreur de format |
| Taper « 12 r » dans l'adresse | 3 suggestions ; un clic remplit l'adresse |
| « Modifier » à l'étape Livraison | Retour aux coordonnées, valeurs gardées |
| Ouvrir `commande.html?etape=paiement` sans coordonnées | Retour à l'étape Coordonnées |
| Clic dans Numéro de carte vide | 4242 4242 4242 4242 |
| Payer en 3 fois avec 700 € de total | « 3 × 233,33 € » ; échéances 233,33 + 233,33 + 233,34 |
| « Payer 700 € » | Confirmation, numéro NA-xxxx, dates à +7 et +14 jours, compteur à 0 |
| Retour arrière depuis la confirmation | Pas de nouvelle commande, panier vide |
| Apple Pay à l'étape 1 | Chargement court, puis confirmation |

Puis la partie Mission 2, Perception premium et Accessibilité de `docs/recette.md`, l'entrée du journal et la proposition de commit.

## Hors de cette session

- Le suivi de fabrication (08.2 à 08.6) et la Collection Outlaws (05.1 à 05.4) ne sont pas testés : ils viendront après, si le temps le permet.
- Les lignes panier de type Look : à brancher avec la Collection.
