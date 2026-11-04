// Logique du tunnel de commande — sans aucun accès au DOM, testable seule :
// node tests/paiement.test.js
// Paiement fictif : rien n'est envoyé, aucune requête réseau.

// Valeurs factices remplies au clic (prompt 05)
export const CARTE_FACTICE = {
  numero: '4242 4242 4242 4242',
  expiration: '12 / 28',
  cvc: '123',
};

// Identité fictive du paiement express (décision du 04/11)
export const IDENTITE_EXPRESS = {
  email: 'camille.martin@exemple.fr',
  prenom: 'Camille',
  nom: 'Martin',
  adresse: '12 rue de l’Espérance, 59100 Roubaix',
  telephone: '',
};

// Suggestions d'adresse fictives (dès 3 caractères)
export const SUGGESTIONS_ADRESSE = [
  '12 rue de l’Espérance, 59100 Roubaix',
  '12 rue de l’Espérance, 75013 Paris',
  '12 rue de l’Espoir, 59000 Lille',
];

export function suggestionsAdresse(saisie) {
  return String(saisie ?? '').trim().length >= 3 ? SUGGESTIONS_ADRESSE : [];
}

// --- Montants (en centimes pour éviter les erreurs d'arrondi) -----------------

const versCentimes = (euros) => Math.round(euros * 100);

// Payer en 3 fois : deux échéances arrondies au centime inférieur, la dernière corrige l'écart.
export function echeances(total, nombre = 3) {
  const centimes = versCentimes(total);
  const base = Math.floor(centimes / nombre);
  const liste = Array.from({ length: nombre - 1 }, () => base);
  liste.push(centimes - base * (nombre - 1));
  return liste.map((c) => c / 100);
}

// « 1 030 € », « 233,33 € » (centimes seulement s'il y en a)
export function euros(montant) {
  const entier = Number.isInteger(montant);
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'EUR',
    minimumFractionDigits: entier ? 0 : 2, maximumFractionDigits: 2,
  }).format(montant).replace(/\u202f/g, '\u00a0'); // U+202F absente de Didact Gothic
}

// --- Validation des coordonnées -------------------------------------------

export const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGES = {
  email: { vide: 'Saisissez votre adresse e-mail.', format: 'Saisissez une adresse e-mail valide, par exemple vous@exemple.fr.' },
  prenom: { vide: 'Saisissez votre prénom.' },
  nom: { vide: 'Saisissez votre nom.' },
  adresse: { vide: 'Saisissez votre adresse de livraison.' },
  codePostal: { vide: 'Saisissez votre code postal.', format: 'Saisissez un code postal à 5 chiffres.' },
  ville: { vide: 'Saisissez votre ville.' },
  numero: { vide: 'Saisissez le numéro de carte.' },
  expiration: { vide: 'Saisissez la date d’expiration.' },
  cvc: { vide: 'Saisissez le code de sécurité.' },
  titulaire: { vide: 'Saisissez le nom sur la carte.' },
};

// valeurs : { email, prenom, nom, adresse, codePostal, ville, manuel }
// → { champ: 'vide' | 'format' } (ordre d'affichage du formulaire)
export function validerCoordonnees(v) {
  const erreurs = {};
  const vide = (x) => !String(x ?? '').trim();
  if (vide(v.email)) erreurs.email = 'vide';
  else if (!EMAIL_VALIDE.test(v.email.trim())) erreurs.email = 'format';
  if (vide(v.prenom)) erreurs.prenom = 'vide';
  if (vide(v.nom)) erreurs.nom = 'vide';
  if (vide(v.adresse)) erreurs.adresse = 'vide';
  if (v.manuel) {
    if (vide(v.codePostal)) erreurs.codePostal = 'vide';
    else if (!/^\d{5}$/.test(v.codePostal.trim())) erreurs.codePostal = 'format';
    if (vide(v.ville)) erreurs.ville = 'vide';
  }
  return erreurs;
}

// Adresse sur une ligne (rappel à l'étape Livraison)
export function adresseComplete(c) {
  return c.manuel ? `${c.adresse}, ${c.codePostal} ${c.ville}` : c.adresse;
}

// --- Commande -------------------------------------------------------------

// « NA- » suivi de 4 chiffres. aleatoire : fonction [0, 1[ (injectable pour les tests)
export function numeroCommande(aleatoire = Math.random) {
  return `NA-${String(Math.floor(aleatoire() * 10000)).padStart(4, '0')}`;
}

const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const jour = (d) => (d.getDate() === 1 ? '1er' : String(d.getDate()));

function plusJours(date, n) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + n);
  return d;
}

// Réception estimée : entre J+7 et J+14, en toutes lettres.
// « entre le 11 et le 18 novembre 2026 » · « entre le 28 novembre et le 5 décembre 2026 »
// · « entre le 28 décembre 2026 et le 4 janvier 2027 »
export function periodeReception(date = new Date()) {
  const debut = plusJours(date, 7);
  const fin = plusJours(date, 14);
  const finTexte = `${jour(fin)} ${MOIS[fin.getMonth()]} ${fin.getFullYear()}`;
  if (debut.getFullYear() !== fin.getFullYear()) {
    return `entre le ${jour(debut)} ${MOIS[debut.getMonth()]} ${debut.getFullYear()} et le ${finTexte}`;
  }
  if (debut.getMonth() !== fin.getMonth()) {
    return `entre le ${jour(debut)} ${MOIS[debut.getMonth()]} et le ${finTexte}`;
  }
  return `entre le ${jour(debut)} et le ${finTexte}`;
}

// Étapes du tunnel et droits d'accès
export const ETAPES = ['coordonnees', 'livraison', 'paiement'];

// Première étape à laquelle on a droit, compte tenu de ce qui est rempli
export function etapeAutorisee(demandee, commande) {
  const premiereIncomplete = !commande?.coordonnees ? 'coordonnees' : !commande?.livraison ? 'livraison' : 'paiement';
  const voulue = ETAPES.includes(demandee) ? demandee : 'coordonnees';
  return ETAPES.indexOf(voulue) <= ETAPES.indexOf(premiereIncomplete) ? voulue : premiereIncomplete;
}
