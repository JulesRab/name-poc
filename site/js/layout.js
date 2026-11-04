// En-tête et pied de page communs, injectés sur chaque page.
// Chaque page contient :
//   <header data-layout="en-tete"></header> … <footer data-layout="pied"></footer>
// Version fonctionnelle du prompt 00 : la structure, le style et le menu mobile
// seront alignés sur le UI kit Figma (85:191, 208:952, 85:231) au prompt 01.

import { nombreArticles } from './session.js';

// Écrans pas encore construits : tout mène à indisponible.html (aucun lien cassé).
// À rebrancher au fil des flows.
const INDISPONIBLE = 'indisponible.html';

const LIENS = {
  accueil: 'index.html',
  signature: INDISPONIBLE, // signature.html — prompt 02
  collection: INDISPONIBLE, // collection.html — hors prompts pour l'instant
  marque: INDISPONIBLE, // pas d'écran prévu
  recherche: INDISPONIBLE, // calque de recherche — prompt 02
  panier: INDISPONIBLE, // panier.html — prompt 05
  instagram: 'https://www.instagram.com/name.ateliers/',
};

function enTete() {
  return `
    <a class="lien-evitement" href="#contenu">Aller au contenu</a>
    <a class="en-tete__logo" href="${LIENS.accueil}">
      <img src="../assets/logo/logo-noir.png" alt="NAME. atelier, retour à l'accueil" width="410" height="173">
    </a>
    <nav class="en-tete__nav" aria-label="Navigation principale">
      <ul>
        <li><a href="${LIENS.signature}">Signature.</a></li>
        <li><a href="${LIENS.collection}">Collection.</a></li>
        <li><a href="${LIENS.marque}">La marque</a></li>
      </ul>
    </nav>
    <div class="en-tete__actions">
      <a class="en-tete__recherche" href="${LIENS.recherche}">Rechercher</a>
      <a class="en-tete__panier" href="${LIENS.panier}">
        Mon panier (<span data-compteur-panier>${nombreArticles()}</span>)
      </a>
    </div>`;
}

function pied() {
  return `
    <nav class="pied__nav" aria-label="Pied de page">
      <div class="pied__groupe">
        <h2 class="pied__titre">Informations</h2>
        <ul>
          <li><a href="${INDISPONIBLE}">Livraison</a></li>
          <li><a href="${INDISPONIBLE}">Retours</a></li>
          <li><a href="${INDISPONIBLE}">Paiement</a></li>
          <li><a href="${INDISPONIBLE}">Contact</a></li>
        </ul>
      </div>
      <div class="pied__groupe">
        <h2 class="pied__titre">Suivre Name.</h2>
        <ul>
          <li><a href="${LIENS.instagram}" target="_blank" rel="noopener">Instagram<span class="visuellement-cache"> (nouvel onglet)</span></a></li>
        </ul>
      </div>
      <div class="pied__groupe">
        <h2 class="pied__titre">Légal</h2>
        <ul>
          <li><a href="${INDISPONIBLE}">Mentions légales</a></li>
          <li><a href="${INDISPONIBLE}">Conditions générales de vente</a></li>
          <li><a href="${INDISPONIBLE}">Confidentialité</a></li>
        </ul>
      </div>
    </nav>
    <img class="pied__logo" src="../assets/logo/logo-noir.png" alt="NAME. atelier" width="410" height="173" loading="lazy">`;
}

export function majCompteurPanier() {
  document.querySelectorAll('[data-compteur-panier]').forEach((el) => {
    el.textContent = nombreArticles();
  });
}

function monter() {
  const zoneEnTete = document.querySelector('[data-layout="en-tete"]');
  const zonePied = document.querySelector('[data-layout="pied"]');
  if (zoneEnTete) {
    zoneEnTete.classList.add('en-tete');
    zoneEnTete.innerHTML = enTete();
  }
  if (zonePied) {
    zonePied.classList.add('pied');
    zonePied.innerHTML = pied();
  }
}

monter();
