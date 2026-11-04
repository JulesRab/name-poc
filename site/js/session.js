// État du prototype en sessionStorage : fermer l'onglet remet tout à zéro
// pour le testeur suivant (CLAUDE.md). Aucune donnée n'est envoyée.
//
// Panier : [{ slug, taille, quantite }]
// Une ligne par couple pièce + taille.

const CLE_PANIER = 'name-panier';

function lire(cle, valeurParDefaut) {
  try {
    const brut = sessionStorage.getItem(cle);
    return brut ? JSON.parse(brut) : valeurParDefaut;
  } catch {
    return valeurParDefaut;
  }
}

function ecrire(cle, valeur) {
  try {
    sessionStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    // Navigation privée stricte : le prototype continue, sans mémoire.
  }
  document.dispatchEvent(new CustomEvent('panier:change'));
}

export function lirePanier() {
  return lire(CLE_PANIER, []);
}

// Nombre d'articles affiché dans « Mon panier (n) ».
export function nombreArticles() {
  return lirePanier().reduce((total, ligne) => total + (ligne.quantite ?? 1), 0);
}

export function ajouterAuPanier({ slug, taille, quantite = 1 }) {
  const panier = lirePanier();
  const ligne = panier.find((l) => l.slug === slug && l.taille === taille);
  if (ligne) ligne.quantite += quantite;
  else panier.push({ slug, taille, quantite });
  ecrire(CLE_PANIER, panier);
}

export function changerQuantite(slug, taille, quantite) {
  const panier = lirePanier().map((l) => (l.slug === slug && l.taille === taille ? { ...l, quantite } : l));
  ecrire(CLE_PANIER, panier);
}

export function retirerDuPanier(slug, taille) {
  ecrire(CLE_PANIER, lirePanier().filter((l) => !(l.slug === slug && l.taille === taille)));
}

// Petit drapeau de session (ex. bandeau d'arrivée vu une fois par visite)
export function drapeau(nom, valeur) {
  const cle = `name-${nom}`;
  if (valeur === undefined) return lire(cle, false);
  ecrire(cle, valeur);
  return valeur;
}
