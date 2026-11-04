// Charge data/catalogue.json une seule fois par page et le garde en mémoire.
// Le chemin est résolu depuis ce fichier : il marche depuis n'importe quelle page de site/,
// à condition de servir le projet depuis la racine (python3 -m http.server 8000).

const URL_CATALOGUE = new URL('../../data/catalogue.json', import.meta.url);

let promesse = null;

export function chargerCatalogue() {
  if (!promesse) {
    promesse = fetch(URL_CATALOGUE).then((reponse) => {
      if (!reponse.ok) {
        throw new Error(`Catalogue introuvable (${reponse.status}) : ${URL_CATALOGUE}`);
      }
      return reponse.json();
    });
    // En cas d'échec, permettre un nouvel essai au prochain appel.
    promesse.catch(() => { promesse = null; });
  }
  return promesse;
}

// Tous les produits Signature, chapitre et statut compris.
export async function produitsSignature() {
  const catalogue = await chargerCatalogue();
  return catalogue.signature.flatMap((chapitre) =>
    chapitre.produits.map((produit) => ({
      ...produit,
      chapitre: chapitre.chapitre,
      statut: chapitre.statut,
    }))
  );
}

export async function trouverProduit(slug) {
  return (await produitsSignature()).find((produit) => produit.slug === slug) ?? null;
}

export async function trouverLook(slug) {
  const catalogue = await chargerCatalogue();
  return catalogue.collection.looks.find((look) => look.slug === slug) ?? null;
}

// Prix au format français : 1 050 €
const formatPrix = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function prix(montant) {
  // Espace fine insécable (U+202F) absente de Didact Gothic → espace insécable classique
  return formatPrix.format(montant).replace(/\u202f/g, '\u00a0');
}
