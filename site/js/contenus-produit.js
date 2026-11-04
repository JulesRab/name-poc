// Contenus éditoriaux des fiches produit, transcrits du Figma (04.1, Onglets 115:4925,
// Slider 201:742, Carrousel 208:832, Mosaïque 130:10321) le 04/11/2026.
// Ils ne sont pas dans data/catalogue.json (à y migrer avec l'accord de l'équipe).
// Seul le Bombers est maquetté : les autres pièces affichent « [À définir] ».
// Les noms, prix et tissus restent lus dans le catalogue.

const IMG = '../assets/images/';

export const CONTENUS = {
  bombers: {
    // Onglet « L'histoire de la pièce » (note Figma 196:10635, 04/11)
    vision: 'Un bomber pensé comme un compagnon de route : il se marque avec le temps et devient la mémoire de celle ou celui qui le porte. Coupé à votre taille, dans un seul lot de tissu.',

    tissu: {
      // Note Figma 196:10637 (04/11) : remplace le compteur de pièces réalisables par « Série en cours »
      texte: 'La coupe reste. Le tissu change. Nous utilisons des tissus de fin de série, disponibles en quantités limitées. Une fois épuisés, ils laissent place à d’autres matières, textures et teintes. Chaque pièce a donc sa propre histoire et peut légèrement différer de la photo.',
      matiere: 'Sergé de coton, bleu marine',
      origine: 'Fin de série d’une filature des Vosges',
      atelier: 'Roubaix',
      serie: 'Série en cours.',
      precedents: [
        { nom: 'Tweed gris', image: `${IMG}tissu-precedent-tweed.jpg`, position: '62% 54%' },
        { nom: 'Drap de laine noir', image: `${IMG}tissu-precedent-drap.jpg`, position: '35% 41%' },
        { nom: 'Velours côtelé', image: `${IMG}tissu-precedent-velours.jpg`, position: '24% 48%' },
      ],
    },

    details: [
      'Sergé de coton bleu marine, issu d’un lot de deadstock',
      'Coupe ample, épaules tombantes, longueur à la taille',
      'Manches bouffantes resserrées par des bords-côtes',
      'Fermeture zippée en métal',
      'Poche zippée sur la manche gauche',
      'Doublure en twill de coton',
      'Coupé et assemblé à la main à l’atelier de Roubaix',
    ],
    composition: [
      'Matière principale : 100 % coton',
      'Doublure : 100 % coton',
      'Bords-côtes : 95 % laine, 5 % élasthanne',
    ],
    // Onglet « Entretien » (note Figma 196:10639, 04/11)
    entretien: {
      intro: 'Cette pièce est faite pour durer et mérite donc d’être entretenue.',
      consignes: [
        ['Lavage', 'à la main ou cycle délicat à 30 °C, du côté envers, avec une lessive douce.'],
        ['Séchage', 'à plat ou sur cintre large, à l’abri du soleil. Pas de sèche-linge.'],
        ['Repassage', 'fer doux, à l’envers.'],
        ['Rangement', 'sur cintre large, dans un endroit aéré.'],
      ],
      fin: 'Elle se patine, c’est voulu : les premiers plis font partie de son histoire. Une retouche, une réparation ? L’atelier s’en occupe.',
    },
    reference: 'SIG-I-BMB',

    // Carte produit (liste, accueil, recherche) : packshots face / dos
    vignettes: [
      { src: `${IMG}bombers-face.png`, alt: 'Bombers bleu marine, vue de face, sur fond neutre', packshot: true },
      { src: `${IMG}bombers-dos.png`, alt: 'Bombers bleu marine, vue de dos, sur fond neutre', packshot: true },
    ],

    // Galerie desktop : grand packshot à gauche + slider (201:742)
    packshot: { src: `${IMG}bombers-face.png`, alt: 'Bombers bleu marine, vue de face, sur fond neutre' },
    slider: [
      { src: `${IMG}bombers-contexte-1.jpg`, alt: 'Bombers porté, de loin, devant une cabane en bois à la nuit tombante', position: '50% 50%', contexte: true },
      { src: `${IMG}bombers-contexte-2.jpg`, alt: 'Bombers porté avec un pantalon gris, devant des caisses empilées', position: '50% 45%', contexte: true },
      { src: `${IMG}bombers-contexte-3.jpg`, alt: 'Bombers porté, assis sur une caisse rouge devant un mur blanc', position: '50% 60%', contexte: true },
      { src: `${IMG}bombers-dos.png`, alt: 'Bombers bleu marine, vue de dos, sur fond neutre', packshot: true },
    ],
    // Carrousel mobile (208:832) : face, dos, puis visuels en contexte
    carrousel: [
      { src: `${IMG}bombers-face.png`, alt: 'Bombers bleu marine, vue de face, sur fond neutre', packshot: true },
      { src: `${IMG}bombers-dos.png`, alt: 'Bombers bleu marine, vue de dos, sur fond neutre', packshot: true },
      { src: `${IMG}bombers-contexte-2.jpg`, alt: 'Bombers porté avec un pantalon gris, devant des caisses empilées', position: '50% 45%', contexte: true },
      { src: `${IMG}bombers-contexte-1.jpg`, alt: 'Bombers porté, de loin, devant une cabane en bois à la nuit tombante', position: '40% 50%', contexte: true },
    ],

    // Mosaïque (130:10321) et ses deux points (04.1 : Hotspot 1 et 2)
    mosaique: [
      { src: `${IMG}bombers-mosaique-1.jpg`, alt: 'Détail du sergé de coton bleu marine', position: '50% 50%' },
      { src: `${IMG}bombers-mosaique-2.jpg`, alt: 'Verre de whisky sur une table en marbre', position: '50% 56%' },
      { src: `${IMG}bombers-mosaique-3.jpg`, alt: 'Manteau rayé ceinturé et mallette noire, Outlaws.', position: '50% 100%' },
      { src: `${IMG}bombers-mosaique-4.jpg`, alt: 'Salon feutré aux fauteuils de cuir', position: '50% 72%' },
      { src: `${IMG}bombers-mosaique-5.jpg`, alt: 'Veste rayée sur chemise bleu ciel, Outlaws.', position: '50% 73%' },
    ],
    points: [
      { slug: 'bombers', gauche: '45.9%', haut: '40.6%' },
      { slug: 'pantalon-wide', gauche: '46.6%', haut: '77.3%' },
    ],
  },
};

// Autres pièces : packshots face / dos transmis par Noé (ressources/, 04/11).
// Aucun visuel pour zip-up, hoodie, crewneck et débardeur : blocs gris conservés.
function packshots(slug, description) {
  const face = { src: `${IMG}${slug}-face.png`, alt: `${description}, vue de face, sur fond neutre`, packshot: true };
  const dos = { src: `${IMG}${slug}-dos.png`, alt: `${description}, vue de dos, sur fond neutre`, packshot: true };
  return {
    vignettes: [face, dos],
    packshot: face,
    slider: [dos, face],
    carrousel: [face, dos],
  };
}

const PACKSHOTS = {
  pull: 'Pull bleu nuit',
  'pantalon-wide': 'Pantalon wide gris béton',
  'pantalon-regular': 'Pantalon regular noir',
  'blouson-cuir': 'Blouson en cuir noir',
  chemise: 'Chemise blanche',
  't-shirt': 'T-shirt',
};
for (const [slug, description] of Object.entries(PACKSHOTS)) {
  CONTENUS[slug] = packshots(slug, description);
}

// Étapes de fabrication (86:273) : communes à toutes les pièces Signature
export const ETAPES_FABRICATION = [
  { titre: 'Reçue', texte: 'Votre commande arrive à l’atelier. La pièce n’existe pas encore.' },
  { titre: 'Tissu', texte: 'Le tissu du moment est choisi et préparé pour votre pièce.' },
  { titre: 'Coupe', texte: 'La pièce est coupée à votre taille.' },
  { titre: 'Assemblage', texte: 'Elle est cousue à l’atelier.' },
  { titre: 'Finitions', texte: 'Ourlets, boutons, repassage, contrôle.' },
  { titre: 'Expédition', texte: 'Elle part chez vous, 1 à 2 semaines après la commande.' },
];

// Entretien des autres pièces, selon la matière du tissu du moment.
// Textes rédigés pour le POC à la demande de l'équipe (04/11), à valider par Noé.
const FIN_ENTRETIEN = 'Une retouche, une réparation ? L’atelier s’en occupe.';
const ENTRETIEN_MATIERE = [
  { si: /cuir/, entretien: {
    intro: 'Le cuir vit avec vous : il s’assouplit et se patine au fil des saisons.',
    consignes: [
      ['Nettoyage', 'ne pas laver. Dépoussiérer avec un chiffon doux et sec ; pour une tache, consulter un spécialiste du cuir.'],
      ['Soin', 'nourrir deux fois par an avec un baume neutre, appliqué en fine couche.'],
      ['Pluie', 'laisser sécher à température ambiante, loin d’une source de chaleur.'],
      ['Rangement', 'sur cintre large, dans une housse en coton, jamais sous plastique.'],
    ],
    fin: `Les marques et la patine font partie de son histoire. ${FIN_ENTRETIEN}`,
  } },
  { si: /laine|maille/, entretien: {
    intro: 'La laine se lave peu : elle s’aère et se défroisse d’elle-même.',
    consignes: [
      ['Lavage', 'à la main à l’eau froide ou cycle laine à 30 °C, avec une lessive spéciale laine. Nettoyage à sec possible.'],
      ['Séchage', 'à plat sur une serviette, sans essorer ni tordre. Pas de sèche-linge.'],
      ['Repassage', 'à la vapeur, fer doux, avec une pattemouille.'],
      ['Rangement', 'aéré après chaque port ; plié pour une maille, sur cintre pour un pantalon.'],
    ],
    fin: `Un léger boulochage peut apparaître : il s’enlève au peigne à laine. ${FIN_ENTRETIEN}`,
  } },
  { si: /coton|molleton|jersey|popeline/, entretien: {
    intro: 'Cette pièce est faite pour durer et mérite donc d’être entretenue.',
    consignes: [
      ['Lavage', 'cycle délicat à 30 °C, du côté envers, avec des couleurs proches.'],
      ['Séchage', 'à plat ou sur cintre, à l’abri du soleil. Pas de sèche-linge.'],
      ['Repassage', 'fer moyen, à l’envers.'],
      ['Rangement', 'plié ou sur cintre, dans un endroit aéré.'],
    ],
    fin: `Le coton s’adoucit au fil des lavages. ${FIN_ENTRETIEN}`,
  } },
];

export function entretienPour(produit) {
  return CONTENUS[produit.slug]?.entretien
    ?? ENTRETIEN_MATIERE.find((m) => m.si.test(produit.tissu))?.entretien
    ?? null;
}

export function contenu(slug) {
  return CONTENUS[slug] ?? null;
}
