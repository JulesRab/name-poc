// Contenus éditoriaux des fiches produit, transcrits du Figma (04.1, Onglets 115:4925,
// Slider 201:742, Carrousel 208:832, Mosaïque 130:10321) le 04/11/2026.
// Ils ne sont pas dans data/catalogue.json (à y migrer avec l'accord de l'équipe).
// Seul le Bombers est maquetté : les autres pièces affichent « [À définir] ».
// Les noms, prix et tissus restent lus dans le catalogue.

const IMG = '../assets/images/';

export const CONTENUS = {
  bombers: {
    vision: 'Un bombers pensé comme un compagnon de route : épaules franches, volume court, une pièce qui se marque avec le temps et devient la mémoire de celle ou celui qui la porte.',

    tissu: {
      texte: 'La coupe reste. Le tissu change au fil des deadstocks trouvés : selon la matière disponible à la confection, sa texture ou sa teinte peut légèrement varier. Chaque série a sa matière.',
      matiere: 'Sergé de coton, bleu marine',
      origine: 'Fin de série d’une filature des Vosges',
      fabrication: 'Assemblée à la main à l’atelier de Roubaix',
      // Figma : « 12 pièces dans ce tissu ». Chiffre non confirmé par Noé (PRD : à confirmer) :
      // l'afficher serait une fausse rareté (CLAUDE.md). Laissé à définir.
      realisables: null,
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
      'Entretien : lavage à 30 °C sur l’envers, ne pas sécher en machine',
    ],
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

export function contenu(slug) {
  return CONTENUS[slug] ?? null;
}
