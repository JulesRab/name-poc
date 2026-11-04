// Contenus éditoriaux des looks Outlaws. (05.1 à 05.4), transcrits du Figma le 04/11/2026 :
// Grille 97:3085 (citations), Infos look 87:471, Onglets 97:3230, Slider Le Conseiller 201:875.
// Seul Le Conseiller est maquetté en entier. Pour les autres looks, les textes absents
// sont en lorem ipsum, à la demande de l'équipe (04/11) : pages look non testées.
// Écart signalé dans docs/journal.md. Prix, pièces et statut restent lus dans data/catalogue.json.
// Photos : séries studio et visuels Instagram @name.ateliers (ressources/, usage autorisé par Noé).

const IMG = '../assets/images/';
const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const LOREM_PIECE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. À plat : lorem ipsum.';

// Points sur la vue studio de face : positions relevées sur chaque photo,
// en % du cadre (pièce 1, 2, 3 dans l'ordre du catalogue).

const studio = (slug, n) => `${IMG}${slug}-studio-${n}.jpg`;
const contexte = (slug, n) => `${IMG}${slug}-contexte-${n}.jpg`;

const LOOKS = {
  'le-parrain': {
    points: [{ x: '45%', y: '55%' }, { x: '50%', y: '37%' }, { x: '53%', y: '88%' }],
    citation: 'On ne naît pas légende, on la taille à la main, fil après fil.',
    face: 1, dos: 4, profil: 3,
    gauche: { src: studio('le-parrain', 3), alt: 'Le Parrain de profil, long manteau sombre et canne', position: '50% 30%' },
    contextes: [
      { src: contexte('le-parrain', 1), alt: 'Le Parrain assis à une table, dans la pénombre' },
      { src: contexte('le-parrain', 2), alt: 'Le Parrain en costume sombre, assis dans un bureau' },
    ],
  },
  'le-bras-droit': {
    points: [{ x: '45%', y: '52%' }, { x: '53%', y: '38%' }, { x: '51%', y: '88%' }],
    citation: 'Ostentatoire. Il porte le pouvoir comme une fourrure.',
    face: 1, dos: 4, profil: 2,
    gauche: { src: contexte('le-bras-droit', 2), alt: 'Le Bras-Droit debout en manteau de fourrure, dans un salon sombre', position: '50% 40%' },
    contextes: [
      { src: contexte('le-bras-droit', 1), alt: 'Le Bras-Droit en fourrure, affalé dans un canapé' },
      { src: contexte('le-bras-droit', 3), alt: 'Le Bras-Droit assis, verre à la main' },
      { src: contexte('le-bras-droit', 4), alt: 'Le Bras-Droit en fourrure, assis face à l’objectif' },
      { src: contexte('le-bras-droit', 5), alt: 'Le Bras-Droit allumant un cigare' },
    ],
    gros: { 1: { src: `${IMG}le-bras-droit-fourrure.png`, packshot: true } },
  },
  'le-conseiller': {
    points: [{ x: '44%', y: '58%' }, { x: '51%', y: '41%' }, { x: '50%', y: '91%' }],
    citation: 'Méticuleux. Chaque détail est une décision.',
    citationLook: 'Il ne laisse rien au hasard, pas même un pli.',
    taille: 'M',
    recit: 'Le Conseiller ne parle qu’au bon moment. Son manteau rayé trace la hiérarchie : chaque ligne est une règle qu’il a écrite.',
    descriptions: [
      'Laine rayée bleu nuit, doublure en twill de soie. À plat : épaules 50 cm, longueur 118 cm, manches 64 cm.',
      'Popeline de coton blanche, col cassé. À plat : poitrine 56 cm, longueur 78 cm, manches 63 cm.',
      'Laine noire, pli marqué, taille haute. À plat : taille 41 cm, longueur 108 cm.',
    ],
    face: 7, dos: 4, profil: 2,
    gauche: { src: contexte('le-conseiller', 1), alt: 'Le Conseiller debout, manteau rayé ceinturé et mallette noire', position: '50% 40%' },
    contextes: [
      { src: contexte('le-conseiller', 3), alt: 'Atelier de couture plongé dans la pénombre, sous trois lampes' },
      { src: contexte('le-conseiller', 2), alt: 'Le Conseiller en veste rayée sur chemise bleu ciel' },
    ],
    gros: { 1: { src: `${IMG}le-conseiller-manteau.png`, packshot: true } },
  },
  'le-baron': {
    points: [{ x: '46%', y: '45%' }, { x: '54%', y: '41%' }, { x: '52%', y: '72%' }],
    citation: 'Silencieux. Il n’a jamais besoin d’élever la voix.',
    face: 7, dos: 4, profil: 2,
    gauche: { src: contexte('le-baron', 1), alt: 'Le Baron en cuir noir, de trois quarts, devant un mur d’affiches', position: '50% 35%' },
    contextes: [
      { src: contexte('le-baron', 2), alt: 'Le Baron de dos, veste de cuir noir' },
      { src: contexte('le-baron', 3), alt: 'Le Baron de profil, col de cuir relevé' },
    ],
  },
  'l-homme-de-main': {
    points: [{ x: '43%', y: '46%' }, { x: '53%', y: '42%' }, { x: '52%', y: '72%' }],
    citation: 'Brutal. Celui qui reste quand les autres partent.',
    face: 8, dos: 4, profil: 1,
    gauche: { src: contexte('l-homme-de-main', 2), alt: 'L’Homme de Main en bombers, le regard vers le bas', position: '50% 35%' },
    contextes: [
      { src: contexte('l-homme-de-main', 1), alt: 'L’Homme de Main dans un jardin, la nuit, devant une palissade' },
      { src: contexte('l-homme-de-main', 3), alt: 'L’Homme de Main accoudé, bombers bleu marine' },
      { src: contexte('l-homme-de-main', 4), alt: 'L’Homme de Main assis dans l’herbe, une caisse entre les jambes' },
    ],
  },
};

// Contenu complet d'un look, prêt pour la page : images, textes, pièces décrites.
// look : entrée de data/catalogue.json (collection.looks)
export function contenuLook(look) {
  const c = LOOKS[look.slug];
  if (!c) return null;
  const s = look.slug;
  const face = { src: studio(s, c.face), alt: `${look.personnage}, look complet de face, en studio`, packshot: true };
  const dos = { src: studio(s, c.dos), alt: `${look.personnage}, look complet de dos, en studio`, packshot: true };
  const profil = { src: studio(s, c.profil), alt: `${look.personnage}, de profil, en studio`, position: '50% 30%' };

  return {
    citation: c.citation,
    citationLook: c.citationLook ?? c.citation,
    taille: c.taille ?? null,
    recit: c.recit ?? LOREM,
    lorem: !c.recit,
    carte: { src: studio(s, c.face), alt: `${look.personnage}, look complet en pied` },
    face,
    gauche: c.gauche,
    // Slider desktop : vue 1 avec les points, contexte, dos
    slider: [face, { ...c.contextes[0], position: c.contextes[0].position ?? '50% 40%' }, dos],
    // Carrousel mobile : vue avec les points, puis photos
    carrousel: [face, c.gauche, c.contextes[0], dos],
    mosaique: [
      { ...c.contextes[0], position: '50% 40%' },
      { src: `${IMG}outlaws-groupe-1.jpg`, alt: 'Les cinq personnages d’Outlaws. réunis devant un mur de lierre', position: '50% 30%' },
      profil,
      { src: `${IMG}outlaws-salon.jpg`, alt: 'Salon feutré, personnages en cuir et fourrure', position: '50% 55%' },
      { ...(c.contextes[1] ?? c.gauche), position: '50% 35%' },
    ],
    pieces: look.pieces.map((p, i) => ({
      ...p,
      numero: i + 1,
      description: c.descriptions?.[i] ?? LOREM_PIECE,
      point: c.points[i],
      // Gros plan : packshot s'il existe, sinon zoom sur la photo studio
      gros: c.gros?.[i + 1] ?? { src: face.src, zoom: c.points[i] },
    })),
  };
}

export function citationLook(slug) {
  return LOOKS[slug]?.citation ?? null;
}

export function photoCarteLook(look) {
  const c = LOOKS[look.slug];
  return c ? { src: studio(look.slug, c.face), alt: `${look.personnage}, look complet en pied` } : null;
}

export const ALLIANCE = 'Alliance MOR Joaillerie portée sur les photos';
export const GARANTIE_LOOK = 'Pièces existantes, numérotées à la main et livrées avec leur certificat d’authenticité. Expédiées sous 3 jours ouvrés.';
