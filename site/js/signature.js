// Page liste Signature (Figma 03.1, 03.2, 03.3).

import { chargerCatalogue, produitsSignature } from './catalogue.js';
import { carteProduit, initialiserCartes } from './carte-produit.js';
import { initialiserEtrePrevenu } from './etre-prevenu.js';
import { ouvrirVolet, fermerVolet, initialiserVolet } from './volet.js';
import {
  lireEtat, ecrireEtat, filtrer, nombreFiltres, filtresActifs,
  gabaritFacettes, etatDuFormulaire, etatVersFormulaire,
} from './filtres.js';

const pluriel = (n, un, plusieurs) => `${n} ${n > 1 ? plusieurs : un}`;

const catalogue = await chargerCatalogue();
const produits = await produitsSignature();

const zone = {
  intro: document.querySelector('[data-intro]'),
  barre: document.querySelector('[data-barre]'),
  chapitres: document.querySelector('[data-chapitres]'),
  resultats: document.querySelector('[data-resultats]'),
};
const volet = document.getElementById('volet-filtres');
const formulaire = volet.querySelector('form');
const boutonVoir = volet.querySelector('[data-voir]');

let etat = lireEtat();

// --- Vue par chapitres (03.1) ---------------------------------------------
function rendreChapitres() {
  zone.chapitres.innerHTML = catalogue.signature.map((chapitre) => `
    <section class="liste-section" aria-labelledby="chapitre-${chapitre.chapitre}">
      <div class="liste-section__titres">
        <h2 class="titre-m" id="chapitre-${chapitre.chapitre}">${chapitre.titre}</h2>
        <p class="texte-m texte-secondaire">${chapitre.sousTitre}</p>
      </div>
      <ul class="grille grille--3" role="list">
        ${produits.filter((p) => p.chapitre === chapitre.chapitre).map((p) => `<li>${carteProduit(p)}</li>`).join('')}
      </ul>
    </section>`).join('');
}

// --- Vue filtrée (03.3) ---------------------------------------------------
function rendreResultats() {
  const liste = filtrer(produits, etat);
  zone.resultats.innerHTML = `
    <p class="texte-m texte-secondaire" role="status">${liste.length > 1
      ? `${liste.length} pièces correspondent à vos filtres`
      : `${liste.length} pièce correspond à vos filtres`}</p>
    <ul class="grille grille--3" role="list">
      ${liste.map((p) => `<li>${carteProduit(p, { titre: 'h2' })}</li>`).join('')}
    </ul>`;
}

// --- Barre de filtres -----------------------------------------------------
function rendreBarre() {
  const n = nombreFiltres(etat);
  const disponibles = produits.filter((p) => p.statut === 'disponible').length;
  const aVenir = produits.length - disponibles;

  zone.barre.innerHTML = n === 0
    ? `
      <button class="bouton bouton--secondaire" type="button" data-ouvrir-filtres aria-haspopup="dialog" aria-controls="volet-filtres">Filtrer</button>
      <p class="barre-filtres__compte">${pluriel(produits.length, 'pièce', 'pièces')} · ${pluriel(disponibles, 'disponible', 'disponibles')}, ${aVenir} à venir</p>`
    : `
      <button class="bouton bouton--secondaire" type="button" data-ouvrir-filtres aria-haspopup="dialog" aria-controls="volet-filtres">Filtrer (${n})</button>
      <ul class="barre-filtres__puces" role="list" aria-label="Filtres actifs">
        ${filtresActifs(etat).map(({ cle, valeur, libelle }) => `
          <li><button class="mention barre-filtres__puce" type="button" data-retirer="${cle}:${valeur}">${libelle}<span aria-hidden="true">&nbsp;&nbsp;×</span><span class="visuellement-cache"> : retirer ce filtre</span></button></li>`).join('')}
      </ul>
      <button class="bouton bouton--texte" type="button" data-tout-effacer>Tout effacer</button>`;
}

function rendre() {
  const filtre = nombreFiltres(etat) > 0;
  zone.intro.classList.toggle('liste-intro--compacte', filtre);
  zone.chapitres.hidden = filtre;
  zone.resultats.hidden = !filtre;
  rendreBarre();
  if (filtre) rendreResultats();
}

function appliquer(nouvelEtat) {
  etat = nouvelEtat;
  ecrireEtat(etat);
  rendre();
}

// --- Volet ----------------------------------------------------------------
formulaire.querySelector('[data-facettes]').innerHTML = gabaritFacettes('filtre');

function majBoutonVoir() {
  const n = filtrer(produits, etatDuFormulaire(formulaire)).length;
  boutonVoir.textContent = n > 1 ? `Voir ${n} résultats` : `Voir ${n} résultat`;
}

formulaire.addEventListener('change', majBoutonVoir);

formulaire.addEventListener('submit', (e) => {
  e.preventDefault();
  appliquer(etatDuFormulaire(formulaire));
  // La barre vient d'être redessinée : le focus revient sur le nouveau bouton Filtrer
  volet._declencheur = zone.barre.querySelector('[data-ouvrir-filtres]');
  fermerVolet(volet);
});

volet.querySelector('[data-effacer]').addEventListener('click', () => {
  etatVersFormulaire({}, formulaire);
  majBoutonVoir();
});

// Fermeture sans valider : on revient aux filtres appliqués
volet.addEventListener('close', () => etatVersFormulaire(etat, formulaire));

initialiserVolet(volet);

zone.barre.addEventListener('click', (e) => {
  if (e.target.closest('[data-ouvrir-filtres]')) {
    etatVersFormulaire(etat, formulaire);
    majBoutonVoir();
    ouvrirVolet(volet, e.target.closest('[data-ouvrir-filtres]'));
  }
  const retirer = e.target.closest('[data-retirer]');
  if (retirer) {
    const [cle, valeur] = retirer.dataset.retirer.split(':');
    const suivant = { ...etat, [cle]: etat[cle].filter((v) => v !== valeur) };
    if (!suivant[cle].length) delete suivant[cle];
    appliquer(suivant);
    zone.barre.querySelector('[data-ouvrir-filtres]').focus();
  }
  if (e.target.closest('[data-tout-effacer]')) {
    appliquer({});
    zone.barre.querySelector('[data-ouvrir-filtres]').focus();
  }
});

// --- Démarrage ------------------------------------------------------------
rendreChapitres();
rendre();
initialiserCartes();
initialiserEtrePrevenu();
