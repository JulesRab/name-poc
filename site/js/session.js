// État du prototype en sessionStorage : fermer l'onglet remet tout à zéro
// pour le testeur suivant (CLAUDE.md). Aucune donnée n'est envoyée.
//
// Panier : [{ slug, taille, quantite }] — une ligne par couple pièce + taille.
// Profil de taille : { type: 'Veste ou manteau', mesures: { poitrine: 56, … } }

const CLE_PANIER = 'name-panier';
const CLE_PROFIL = 'name-profil-taille';

function lire(cle, valeurParDefaut) {
  try {
    const brut = sessionStorage.getItem(cle);
    return brut ? JSON.parse(brut) : valeurParDefaut;
  } catch {
    return valeurParDefaut;
  }
}

function ecrire(cle, valeur, evenement) {
  try {
    sessionStorage.setItem(cle, JSON.stringify(valeur));
  } catch {
    // Navigation privée stricte : le prototype continue, sans mémoire.
  }
  if (evenement) document.dispatchEvent(new CustomEvent(evenement));
}

const ecrirePanier = (panier) => ecrire(CLE_PANIER, panier, 'panier:change');

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
  ecrirePanier(panier);
}

export function changerQuantite(slug, taille, quantite) {
  ecrirePanier(lirePanier().map((l) => (l.slug === slug && l.taille === taille ? { ...l, quantite } : l)));
}

export function retirerDuPanier(slug, taille) {
  ecrirePanier(lirePanier().filter((l) => !(l.slug === slug && l.taille === taille)));
}

// Profil de taille (guide « Ma référence ») — effacé à la fermeture de l'onglet
export function lireProfil() {
  return lire(CLE_PROFIL, null);
}

export function ecrireProfil(profil) {
  ecrire(CLE_PROFIL, profil, 'profil:change');
}

// Petit drapeau de session (ex. bandeau d'arrivée vu une fois par visite)
export function drapeau(nom, valeur) {
  const cle = `name-${nom}`;
  if (valeur === undefined) return lire(cle, false);
  ecrire(cle, valeur);
  return valeur;
}
