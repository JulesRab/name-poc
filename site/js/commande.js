// Tunnel de commande — commande.html?etape=coordonnees|livraison|paiement
// Figma 07.1 à 07.4, En-tête commande 94:2790. Paiement fictif : aucune donnée envoyée,
// aucune requête réseau ; les données de carte ne sont jamais enregistrées.

import { chargerCatalogue } from './catalogue.js';
import { lignesDetaillees, ligneProduit } from './panier.js';
import { lireCommande, majCommande, finaliserCommande } from './session.js';
import { gabaritRecapitulatif, gabaritAide, synchroniserRepli } from './recapitulatif.js';
import {
  CARTE_FACTICE, IDENTITE_EXPRESS, MESSAGES, ETAPES, echeances, euros, validerCoordonnees,
  adresseComplete, suggestionsAdresse, numeroCommande, etapeAutorisee,
} from './paiement.js';
import { lien } from './liens.js';

const zone = document.querySelector('[data-commande]');
const entete = document.querySelector('[data-entete-commande]');

function echapper(texte) {
  return String(texte ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// --- Garde-fous -----------------------------------------------------------
const lignes = await lignesDetaillees();
if (!lignes.length) {
  // Panier vide : retour au panier (état 06.4)
  location.replace(lien('panier'));
  await new Promise(() => {});
}

const commande = lireCommande();
const demandee = new URLSearchParams(location.search).get('etape');
const etape = etapeAutorisee(demandee, commande);
if (etape !== demandee) history.replaceState(null, '', `?etape=${etape}`);

const total = lignes.reduce((t, l) => t + l.produit.prix * l.quantite, 0);
const { delai } = await chargerCatalogue();
const LIBELLES_ETAPES = { coordonnees: 'Coordonnées', livraison: 'Livraison', paiement: 'Paiement' };
document.title = `${LIBELLES_ETAPES[etape]} — Commande — NAME.`;

// --- En-tête commande (94:2790) ---------------------------------------------
entete.innerHTML = `
  <a class="lien entete-commande__retour" href="${lien('panier')}"><span aria-hidden="true">←</span> Retour au panier</a>
  <img class="entete-commande__logo" src="../assets/logo/logo-noir.png" alt="NAME. atelier" width="410" height="173">
  <p class="entete-commande__securite"><span class="icone icone--cadenas" aria-hidden="true"></span>Paiement sécurisé</p>`;

// --- Indicateur d'étapes (83:298) -------------------------------------------
function indicateur() {
  const i = ETAPES.indexOf(etape);
  return `
    <ol class="etapes" aria-label="Étapes de la commande">
      ${ETAPES.map((e, k) => {
        const libelle = LIBELLES_ETAPES[e];
        if (k < i) {
          return `<li class="etape"><a class="etape__lien" href="?etape=${e}"><span class="etape__pastille"><span class="icone icone--coche" aria-hidden="true"></span></span>${libelle}<span class="visuellement-cache"> (terminée, modifier)</span></a></li>`;
        }
        if (k === i) return `<li class="etape" aria-current="step"><span class="etape__pastille">${k + 1}</span>${libelle}</li>`;
        return `<li class="etape etape--a-venir"><span class="etape__pastille">${k + 1}</span>${libelle}</li>`;
      }).join('')}
    </ol>`;
}

// --- Champ de formulaire (83:209) -------------------------------------------
function champ({ nom, libelle, type = 'text', valeur = '', placeholder = '', aide = '', autocomplete = 'off', inputmode = '', attributs = '' }) {
  const decrit = [`${nom}-erreur`, aide ? `${nom}-aide` : ''].filter(Boolean).join(' ');
  return `
    <div class="champ" data-champ="${nom}">
      <label class="champ__libelle" for="${nom}" data-libelle>${libelle}</label>
      <div class="champ__zone">
        <input class="champ__saisie" id="${nom}" name="${nom}" type="${type}" value="${echapper(valeur)}"
               ${placeholder ? `placeholder="${echapper(placeholder)}"` : ''} autocomplete="${autocomplete}"
               ${inputmode ? `inputmode="${inputmode}"` : ''} aria-describedby="${decrit}" ${attributs}>
      </div>
      ${aide ? `<p class="champ__message" id="${nom}-aide">${aide}</p>` : ''}
      <p class="champ__message champ__message--erreur" id="${nom}-erreur" hidden>
        <span class="icone icone--alerte" aria-hidden="true"></span><span data-texte-erreur></span>
      </p>
    </div>`;
}

function afficherErreurs(formulaire, erreurs, champs) {
  for (const nom of champs) {
    const entree = formulaire.elements[nom];
    if (!entree) continue;
    const code = erreurs[nom];
    entree.setAttribute('aria-invalid', String(Boolean(code)));
    const message = formulaire.querySelector(`#${nom}-erreur`);
    message.hidden = !code;
    message.querySelector('[data-texte-erreur]').textContent = code ? MESSAGES[nom][code] : '';
  }
  const premier = champs.find((n) => erreurs[n] && formulaire.elements[n]);
  if (premier) {
    // Focus posé par le script : il ne doit pas déclencher le remplissage factice
    formulaire.dataset.focusErreur = '';
    formulaire.elements[premier].focus();
    delete formulaire.dataset.focusErreur;
  }
  return !premier;
}

// L'erreur s'efface dès que la personne corrige
function effacerErreurAuFil(formulaire) {
  formulaire.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') !== 'true') return;
    e.target.setAttribute('aria-invalid', 'false');
    formulaire.querySelector(`#${e.target.name}-erreur`).hidden = true;
  });
}

// --- Validation fictive et confirmation ------------------------------------
function confirmer(coordonnees, moyen) {
  finaliserCommande({
    numero: numeroCommande(),
    date: new Date().toISOString(),
    email: coordonnees.email,
    prenom: coordonnees.prenom,
    moyen,
    total,
    lignes: lignes.map(({ produit, taille, quantite }) => ({
      taille, quantite,
      produit: { slug: produit.slug, nom: produit.nom, prix: produit.prix, tissu: produit.tissu },
    })),
  });
  // replace : le retour arrière ne repasse pas par le paiement, aucune commande recréée
  location.replace(lien('confirmation'));
}

// Court état de chargement des paiements express et du paiement fictif
function patienter(bouton, texte = 'Validation en cours…') {
  bouton.disabled = true;
  bouton.setAttribute('aria-busy', 'true');
  bouton.textContent = texte;
  zone.querySelector('[data-annonce]').textContent = texte;
  return new Promise((r) => setTimeout(r, 1200));
}

// --- Étape 1 : coordonnées (07.1, 07.2) ---------------------------------------
function etapeCoordonnees() {
  const c = commande.coordonnees ?? {};
  return `
    <section class="paiement-express" aria-labelledby="express-titre">
      <h2 class="paiement-express__titre" id="express-titre">Paiement express</h2>
      <div class="paiement-express__boutons">
        <button class="bouton bouton--l bouton--secondaire" type="button" data-express="Apple Pay">Apple Pay</button>
        <button class="bouton bouton--l bouton--secondaire" type="button" data-express="Google Pay">Google Pay</button>
      </div>
    </section>
    <p class="commande__separation">ou remplissez vos coordonnées</p>
    <form class="commande__formulaire" novalidate data-formulaire="coordonnees">
      <h2 class="titre-s">Coordonnées</h2>
      ${champ({ nom: 'email', libelle: 'E-mail', type: 'email', valeur: c.email, placeholder: 'vous@exemple.fr', autocomplete: 'email', inputmode: 'email',
        aide: 'Pas besoin de créer un compte. Le suivi de commande arrive par e-mail.' })}
      <div class="commande__paire">
        ${champ({ nom: 'prenom', libelle: 'Prénom', valeur: c.prenom, autocomplete: 'given-name' })}
        ${champ({ nom: 'nom', libelle: 'Nom', valeur: c.nom, autocomplete: 'family-name' })}
      </div>
      <div class="commande__adresse">
        ${champ({ nom: 'adresse', libelle: c.manuel ? 'Adresse' : 'Adresse de livraison', valeur: c.adresse, autocomplete: 'street-address',
          aide: 'Commencez à saisir, on complète le reste.', attributs: 'aria-controls="suggestions-adresse" aria-expanded="false"' })}
        <ul class="suggestions-adresse" id="suggestions-adresse" role="list" aria-label="Suggestions d’adresse" hidden></ul>
      </div>
      <button class="lien commande__manuel" type="button" data-adresse-manuelle ${c.manuel ? 'hidden' : ''}>Saisir l’adresse manuellement</button>
      <div class="commande__paire" data-champs-manuels ${c.manuel ? '' : 'hidden'}>
        ${champ({ nom: 'codePostal', libelle: 'Code postal', valeur: c.codePostal, autocomplete: 'postal-code', inputmode: 'numeric' })}
        ${champ({ nom: 'ville', libelle: 'Ville', valeur: c.ville, autocomplete: 'address-level2' })}
      </div>
      ${champ({ nom: 'telephone', libelle: 'Téléphone (facultatif)', type: 'tel', valeur: c.telephone, placeholder: '06 00 00 00 00', autocomplete: 'tel', inputmode: 'tel' })}
      <label class="case"><input class="case__entree" type="checkbox" name="infos" ${c.infos ? 'checked' : ''}>M’informer des prochaines sorties (facultatif)</label>
      <button class="bouton bouton--l bouton--pleine-largeur" type="submit">Continuer vers la livraison</button>
    </form>`;
}

function brancherCoordonnees() {
  const formulaire = zone.querySelector('[data-formulaire="coordonnees"]');
  const adresse = formulaire.elements.adresse;
  const liste = formulaire.querySelector('#suggestions-adresse');
  const manuels = formulaire.querySelector('[data-champs-manuels]');
  const lienManuel = formulaire.querySelector('[data-adresse-manuelle]');
  effacerErreurAuFil(formulaire);

  const montrerSuggestions = () => {
    const s = manuels.hidden ? suggestionsAdresse(adresse.value) : [];
    liste.innerHTML = s.map((a) => `<li><button class="suggestions-adresse__choix" type="button" data-suggestion="${echapper(a)}">${echapper(a)}</button></li>`).join('');
    liste.hidden = !s.length;
    adresse.setAttribute('aria-expanded', String(Boolean(s.length)));
  };
  adresse.addEventListener('input', montrerSuggestions);
  adresse.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && !liste.hidden) { e.preventDefault(); liste.querySelector('button').focus(); }
    if (e.key === 'Escape') { liste.hidden = true; adresse.setAttribute('aria-expanded', 'false'); }
  });
  liste.addEventListener('keydown', (e) => {
    const boutons = [...liste.querySelectorAll('button')];
    const i = boutons.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); boutons[Math.min(i + 1, boutons.length - 1)].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? boutons[i - 1] : adresse).focus(); }
    if (e.key === 'Escape') { liste.hidden = true; adresse.focus(); }
  });
  liste.addEventListener('click', (e) => {
    const choix = e.target.closest('[data-suggestion]');
    if (!choix) return;
    adresse.value = choix.dataset.suggestion;
    adresse.setAttribute('aria-invalid', 'false');
    formulaire.querySelector('#adresse-erreur').hidden = true;
    liste.hidden = true;
    adresse.setAttribute('aria-expanded', 'false');
    formulaire.elements.telephone.focus();
  });

  lienManuel.addEventListener('click', () => {
    manuels.hidden = false;
    lienManuel.hidden = true;
    liste.hidden = true;
    formulaire.querySelector('[data-champ="adresse"] [data-libelle]').textContent = 'Adresse';
    adresse.focus();
  });

  formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = Object.fromEntries(['email', 'prenom', 'nom', 'adresse', 'codePostal', 'ville', 'telephone'].map((n) => [n, formulaire.elements[n].value.trim()]));
    v.manuel = !manuels.hidden;
    v.infos = formulaire.elements.infos.checked;
    const ok = afficherErreurs(formulaire, validerCoordonnees(v), ['email', 'prenom', 'nom', 'adresse', 'codePostal', 'ville']);
    if (!ok) return;
    majCommande({ coordonnees: v });
    location.href = '?etape=livraison';
  });

  zone.querySelectorAll('[data-express]').forEach((b) => b.addEventListener('click', async () => {
    await patienter(b);
    confirmer(IDENTITE_EXPRESS, b.dataset.express);
  }));
}

// --- Étape 2 : livraison (07.3) ---------------------------------------------
function etapeLivraison() {
  const c = commande.coordonnees;
  return `
    <div class="rappel-coordonnees">
      <p>${echapper(`${c.prenom} ${c.nom}`)} · ${echapper(c.email)}<br>${echapper(adresseComplete(c))}, France</p>
      <a class="lien" href="?etape=coordonnees">Modifier<span class="visuellement-cache"> les coordonnées</span></a>
    </div>
    <form class="commande__formulaire" novalidate data-formulaire="livraison">
      <h2 class="titre-s">Livraison</h2>
      <fieldset class="commande__options">
        <legend class="visuellement-cache">Mode de livraison</legend>
        <label class="option">
          <input class="radio" type="radio" name="livraison" value="domicile" checked>
          <span class="option__contenu">
            <span class="option__titre">Livraison à domicile en France</span>
            <span class="option__description">Expédiée après fabrication · reçue sous 1 à 2 semaines après la commande</span>
          </span>
          <span class="option__valeur">Offerte</span>
        </label>
      </fieldset>
      <p class="texte-m">Votre pièce est fabriquée à la commande : comptez environ une semaine d’atelier, puis l’expédition. Un e-mail vous prévient à chaque étape.</p>
      <p class="delai"><span class="icone icone--ciseaux" aria-hidden="true"></span><span>${echapper(delai)}</span></p>
      <button class="bouton bouton--l bouton--pleine-largeur" type="submit">Continuer vers le paiement</button>
    </form>`;
}

function brancherLivraison() {
  zone.querySelector('[data-formulaire="livraison"]').addEventListener('submit', (e) => {
    e.preventDefault();
    majCommande({ livraison: { mode: 'domicile' } });
    location.href = '?etape=paiement';
  });
}

// --- Étape 3 : paiement (07.4) ----------------------------------------------
function etapePaiement() {
  const c = commande.coordonnees;
  const e3 = echeances(total);
  const option = (valeur, titre, description, coche = false) => `
    <label class="option" data-option="${valeur}">
      <input class="radio" type="radio" name="moyen" value="${valeur}" ${coche ? 'checked' : ''}>
      <span class="option__contenu">
        <span class="option__titre">${titre}</span>
        <span class="option__description">${description}</span>
      </span>
    </label>`;
  return `
    <form class="commande__formulaire" novalidate data-formulaire="paiement">
      <h2 class="titre-s">Paiement</h2>
      <fieldset class="commande__options">
        <legend class="visuellement-cache">Moyen de paiement</legend>
        ${option('carte', 'Carte bancaire', 'Visa, Mastercard, CB', true)}
        ${option('express', 'Apple Pay / Google Pay', 'Validation sur votre téléphone')}
        ${option('trois-fois', 'Payer en 3 fois', `3 × ${euros(e3[0])}, sans frais`)}
      </fieldset>
      <div class="carte-bancaire" data-carte>
        <p class="carte-bancaire__echeances" data-echeances hidden>Échéances : ${e3.map(euros).join(' · ')}</p>
        ${champ({ nom: 'numero', libelle: 'Numéro de carte', placeholder: '1234 1234 1234 1234', inputmode: 'numeric', autocomplete: 'off' })}
        <div class="commande__paire">
          ${champ({ nom: 'expiration', libelle: 'Date d’expiration', placeholder: 'MM / AA', inputmode: 'numeric', autocomplete: 'off' })}
          ${champ({ nom: 'cvc', libelle: 'Code de sécurité', placeholder: 'CVC', inputmode: 'numeric', autocomplete: 'off' })}
        </div>
        ${champ({ nom: 'titulaire', libelle: 'Nom sur la carte', valeur: `${c.prenom} ${c.nom}`, autocomplete: 'off' })}
        <p class="champ__message">Paiement fictif : un clic dans un champ vide le remplit. Rien n’est envoyé.</p>
      </div>
      <p class="commande__mentions">En validant, vous acceptez les conditions générales de vente. Droit de rétractation de 14 jours. Aucune option payante n’est pré-cochée.</p>
      <button class="bouton bouton--l bouton--pleine-largeur" type="submit" data-payer>Payer ${euros(total)}</button>
    </form>`;
}

function brancherPaiement() {
  const formulaire = zone.querySelector('[data-formulaire="paiement"]');
  const carte = formulaire.querySelector('[data-carte]');
  const champsCarte = ['numero', 'expiration', 'cvc', 'titulaire'];
  effacerErreurAuFil(formulaire);

  // Les champs carte se placent sous l'option choisie (carte ou 3 fois)
  const placerCarte = () => {
    const moyen = formulaire.elements.moyen.value;
    const avecCarte = moyen !== 'express';
    carte.hidden = !avecCarte;
    formulaire.querySelector('[data-echeances]').hidden = moyen !== 'trois-fois';
    if (avecCarte) formulaire.querySelector(`[data-option="${moyen}"]`).after(carte);
  };
  formulaire.addEventListener('change', (e) => { if (e.target.name === 'moyen') placerCarte(); });
  placerCarte();

  // Chaque champ vide se remplit au clic (ou au focus clavier) avec une valeur factice
  const factices = { ...CARTE_FACTICE, titulaire: `${commande.coordonnees.prenom} ${commande.coordonnees.nom}` };
  const remplir = (e) => {
    const nom = e.target.name;
    if (!(nom in factices) || e.target.value) return;
    if (e.type === 'focusin' && 'focusErreur' in formulaire.dataset) return;
    e.target.value = factices[nom];
    e.target.setAttribute('aria-invalid', 'false');
    formulaire.querySelector(`#${nom}-erreur`).hidden = true;
  };
  carte.addEventListener('click', remplir);
  carte.addEventListener('focusin', remplir);

  formulaire.addEventListener('submit', async (e) => {
    e.preventDefault();
    const moyen = formulaire.elements.moyen.value;
    if (moyen !== 'express') {
      const erreurs = Object.fromEntries(champsCarte.filter((n) => !formulaire.elements[n].value.trim()).map((n) => [n, 'vide']));
      if (!afficherErreurs(formulaire, erreurs, champsCarte)) return;
    }
    const libelles = { carte: 'Carte bancaire', express: 'Apple Pay / Google Pay', 'trois-fois': 'Paiement en 3 fois' };
    await patienter(formulaire.querySelector('[data-payer]'), moyen === 'express' ? 'Validation sur votre téléphone…' : 'Paiement en cours…');
    // Aucune donnée de carte n'est conservée : seul le moyen choisi est gardé
    confirmer(commande.coordonnees, libelles[moyen]);
  });
}

// --- Rendu ----------------------------------------------------------------
const ETAPES_RENDU = {
  coordonnees: [etapeCoordonnees, brancherCoordonnees],
  livraison: [etapeLivraison, brancherLivraison],
  paiement: [etapePaiement, brancherPaiement],
};
const [gabarit, brancher] = ETAPES_RENDU[etape];

const lignesHtml = (await Promise.all(lignes.map((l) => ligneProduit(l, { lecture: true })))).join('');
zone.innerHTML = `
  <div class="commande">
    <details class="commande__recap" data-recap>
      <summary class="commande__recap-resume">Récapitulatif de commande <span>${euros(total)}</span></summary>
      <div class="commande__recap-contenu">
        <ul class="page-panier__lignes" role="list">${lignesHtml}</ul>
        ${await gabaritRecapitulatif(total)}
        ${gabaritAide()}
      </div>
    </details>
    <div class="commande__colonne">
      <h1 class="visuellement-cache">Commande — ${LIBELLES_ETAPES[etape]}</h1>
      ${indicateur()}
      ${gabarit()}
      <p class="visuellement-cache" aria-live="polite" data-annonce></p>
    </div>
  </div>`;

synchroniserRepli(zone.querySelector('[data-recap]'));
brancher();
