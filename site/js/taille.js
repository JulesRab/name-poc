// Logique du guide des tailles « Ma référence » — sans aucun accès au DOM,
// testable seule : node tests/taille.test.js
//
// Règle (CLAUDE.md) : pour chaque taille, somme des écarts absolus entre le
// tableau de la pièce et la référence ; taille au plus petit total ; en cas
// d'égalité, la plus petite taille.
//
// guide : catalogue.guidesTailles[x] → { mesures: { poitrine: { XS: 54, … }, … } }
// tailles : catalogue.tailles → ['XS', 'S', 'M', 'L', 'XL'] (ordre croissant)
// reference : { poitrine: 56, longueur: 70, epaules: 48, manche: 62 }

export const MESURE_MIN = 20;
export const MESURE_MAX = 150;

export const LIBELLES = { poitrine: 'Poitrine', longueur: 'Longueur', epaules: 'Épaules', manche: 'Manche' };

// Vocabulaire des écarts (prompt 04) et lieu de la mesure dans la phrase de la fiche
const VOCABULAIRE = {
  poitrine: { plus: 'plus ample', moins: 'plus étroit', lieu: ' à la poitrine' },
  epaules:  { plus: 'plus ample', moins: 'plus étroit', lieu: ' aux épaules' },
  longueur: { plus: 'plus long',  moins: 'plus court',  lieu: '' },
  manche:   { plus: 'plus long',  moins: 'plus court',  lieu: ' aux manches' },
};

const MOINS = '−'; // signe moins typographique

// --- Saisie ------------------------------------------------------------------

// Lit une saisie en cm. Virgule ou point acceptés comme séparateur décimal.
// → { valeur } ou { erreur: 'vide' | 'nombre' | 'plage' }
export function lireMesure(texte) {
  const brut = String(texte ?? '').trim().replace(/\s+/g, '').replace(',', '.');
  if (brut === '') return { erreur: 'vide' };
  if (!/^\d+(\.\d+)?$/.test(brut)) return { erreur: 'nombre' };
  const valeur = Number(brut);
  if (valeur < MESURE_MIN || valeur > MESURE_MAX) return { erreur: 'plage' };
  return { valeur };
}

export const MESSAGES_ERREUR = {
  vide: 'Saisissez cette mesure, en centimètres.',
  nombre: 'Saisissez un nombre, en centimètres.',
  plage: 'Vérifiez cette mesure : elle se prend à plat, en centimètres.',
};

// saisies : { poitrine: '56,5', … } → { reference, erreurs: { cle: code } }
export function lireReference(saisies, cles) {
  const reference = {};
  const erreurs = {};
  for (const cle of cles) {
    const r = lireMesure(saisies[cle]);
    if (r.erreur) erreurs[cle] = r.erreur;
    else reference[cle] = r.valeur;
  }
  return { reference, erreurs, valide: Object.keys(erreurs).length === 0 };
}

// --- Recommandation ----------------------------------------------------------

const arrondi = (n) => Math.round(n * 10) / 10;

export function totaux(guide, tailles, reference) {
  return Object.fromEntries(tailles.map((t) => [
    t,
    arrondi(Object.entries(guide.mesures).reduce((s, [cle, valeurs]) => s + Math.abs(valeurs[t] - reference[cle]), 0)),
  ]));
}

export function recommander(guide, tailles, reference) {
  const t = totaux(guide, tailles, reference);
  // Parcours dans l'ordre croissant : à total égal, la plus petite taille est gardée
  return tailles.reduce((meilleure, taille) => (t[taille] < t[meilleure] ? taille : meilleure), tailles[0]);
}

// Écart de chaque mesure : pièce − référence (positif = la pièce est plus grande)
export function ecarts(guide, taille, reference) {
  return Object.entries(guide.mesures).map(([cle, valeurs]) => ({
    cle,
    libelle: LIBELLES[cle] ?? cle,
    piece: valeurs[taille],
    reference: reference[cle],
    ecart: arrondi(valeurs[taille] - reference[cle]),
  }));
}

// Plus grand écart en valeur absolue ; à égalité, le premier dans l'ordre du
// catalogue (poitrine, longueur, épaules, manche). null si tout est identique.
export function ecartPrincipal(liste) {
  return liste.reduce((max, e) => (Math.abs(e.ecart) > Math.abs(max?.ecart ?? 0) ? e : max), null);
}

// Les tailles voisines pour « Comparer en » : [précédente, taille, suivante]
export function voisines(tailles, taille) {
  const i = tailles.indexOf(taille);
  return tailles.slice(Math.max(0, i - 1), i + 2);
}

// Référence hors de la gamme : 'ample' (au-delà du XL sur ≥ 2 mesures, XL recommandé)
// ou 'ajustee' (en deçà du XS sur ≥ 2 mesures, XS recommandé), sinon null.
export function horsGamme(guide, tailles, taille, reference) {
  const premiere = tailles[0];
  const derniere = tailles[tailles.length - 1];
  const mesures = Object.entries(guide.mesures);
  if (taille === derniere && mesures.filter(([cle, v]) => reference[cle] > v[derniere]).length >= 2) return 'ample';
  if (taille === premiere && mesures.filter(([cle, v]) => reference[cle] < v[premiere]).length >= 2) return 'ajustee';
  return null;
}

// --- Formulation -------------------------------------------------------------

const cm = (n) => `${String(Math.abs(n)).replace('.', ',')} cm`;

// Tableau 04.7 : « +4 cm, plus ample » · « −2 cm, plus court » · « identique »
export function formulerEcart(cle, ecart) {
  if (ecart === 0) return 'identique';
  const v = VOCABULAIRE[cle];
  return ecart > 0 ? `+${cm(ecart)}, ${v.plus}` : `${MOINS}${cm(ecart)}, ${v.moins}`;
}

// Fiche 04.6 : « 4 cm plus ample à la poitrine » (sans « que votre référence »)
export function formulerPrincipal(e) {
  if (!e || e.ecart === 0) return 'identique';
  const v = VOCABULAIRE[e.cle];
  return `${cm(e.ecart)} ${e.ecart > 0 ? v.plus : v.moins}${v.lieu}`;
}

// Phrase complète sous les tailles (04.6)
export function phraseRecommandation(taille, liste) {
  const principal = ecartPrincipal(liste);
  const comparaison = principal ? `${formulerPrincipal(principal)} que votre référence` : 'identique à votre référence';
  return `Taille ${taille} recommandée · ${comparaison}`;
}
