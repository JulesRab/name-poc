// État du prototype en sessionStorage : fermer l'onglet remet tout à zéro
// pour le testeur suivant (CLAUDE.md). Aucune donnée n'est envoyée.
//
// Panier : [{ slug, taille, quantite }] — une ligne par couple pièce + taille.
//          Look : { type: 'look', slug, taille: 'unique', quantite: 1 }.
// Profil de taille : { type: 'Veste ou manteau', mesures: { poitrine: 56, … } }

const CLE_PANIER = 'name-panier';
const CLE_PROFIL = 'name-profil-taille';
const CLE_COMMANDE = 'name-commande-en-cours';
const CLE_DERNIERE = 'name-derniere-commande';

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

// Look Outlaws. : pièces uniques, vendu complet. Une seule ligne, quantité fixée à 1.
// Renvoie false si le look est déjà dans le panier.
export function ajouterLook(slug) {
  const panier = lirePanier();
  if (panier.some((l) => l.type === 'look' && l.slug === slug)) return false;
  panier.push({ type: 'look', slug, taille: 'unique', quantite: 1 });
  ecrirePanier(panier);
  return true;
}

export function lookDansPanier(slug) {
  return lirePanier().some((l) => l.type === 'look' && l.slug === slug);
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

// Commande en cours : { coordonnees, livraison, moyen } — jamais de données de carte
export function lireCommande() {
  return lire(CLE_COMMANDE, {});
}

export function majCommande(champs) {
  ecrire(CLE_COMMANDE, { ...lireCommande(), ...champs });
}

// Validation fictive : la commande est figée, le panier et la commande en cours sont vidés
export function finaliserCommande(commande) {
  ecrire(CLE_DERNIERE, commande);
  ecrire(CLE_COMMANDE, {});
  ecrirePanier([]);
}

export function derniereCommande() {
  return lire(CLE_DERNIERE, null);
}

// Petit drapeau de session (ex. bandeau d'arrivée vu une fois par visite)
export function drapeau(nom, valeur) {
  const cle = `name-${nom}`;
  if (valeur === undefined) return lire(cle, false);
  ecrire(cle, valeur);
  return valeur;
}
