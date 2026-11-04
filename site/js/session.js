// État du prototype en sessionStorage : fermer l'onglet remet tout à zéro
// pour le testeur suivant. Le panier complet arrive au flow 1 (prompt 03).

const CLE_PANIER = 'name-panier';

function lire(cle, valeurParDefaut) {
  try {
    const brut = sessionStorage.getItem(cle);
    return brut ? JSON.parse(brut) : valeurParDefaut;
  } catch {
    return valeurParDefaut;
  }
}

export function lirePanier() {
  return lire(CLE_PANIER, []);
}

// Nombre d'articles affiché dans « Mon panier (n) ».
export function nombreArticles() {
  return lirePanier().reduce((total, ligne) => total + (ligne.quantite ?? 1), 0);
}
