// Table unique des liens du site. Une route sans écran mène à indisponible.html
// (aucun lien cassé). Pour brancher un écran construit, passer `pret` à true.
// Liste des liens temporaires tenue dans docs/journal.md.

export const INDISPONIBLE = 'indisponible.html';

const ROUTES = {
  accueil:    { url: 'index.html', pret: true },
  signature:  { url: 'signature.html', pret: true },
  produit:    { url: 'produit.html', pret: false },     // prompt 03
  collection: { url: 'collection.html', pret: false },  // pas de prompt pour l'instant
  look:       { url: 'look.html', pret: false },        // pas de prompt pour l'instant
  panier:     { url: 'panier.html', pret: false },      // prompt 05
  marque:     { url: INDISPONIBLE, pret: false },       // pas d'écran prévu
};

export const INSTAGRAM = 'https://www.instagram.com/name.ateliers/';

export function lien(route, params = {}) {
  const r = ROUTES[route];
  if (!r || !r.pret) return INDISPONIBLE;
  const requete = new URLSearchParams(params).toString();
  return requete ? `${r.url}?${requete}` : r.url;
}

export const lienProduit = (slug) => lien('produit', { p: slug });
export const lienLook = (slug) => lien('look', { l: slug });
