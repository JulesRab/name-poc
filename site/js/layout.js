// En-tête, menu mobile et pied de page communs, injectés sur chaque page.
// Chaque page contient :
//   <header data-layout="en-tete"></header> … <footer data-layout="pied"></footer>
// Sources Figma : En-tête 85:191, Menu mobile 208:952, Pied de page 85:231.

import { nombreArticles } from './session.js';
import { initialiserMenuMobile } from './menu-mobile.js';
import { initialiserDelais } from './delai.js';
import { gabaritRecherche, initialiserRecherche } from './recherche.js';
import { lien, INSTAGRAM, INDISPONIBLE } from './liens.js';

// Liens centralisés dans liens.js (indisponible.html tant qu'un écran n'existe pas).
const LIENS = {
  accueil: lien('accueil'),
  signature: lien('signature'),
  collection: lien('collection'),
  marque: lien('marque'),
  panier: lien('panier'),
  instagram: INSTAGRAM,
};

const LOGO_NOIR = '../assets/logo/logo-noir.png';

// Page courante : lien de navigation « Actif »
function courant(lien) {
  const page = location.pathname.split('/').pop() || 'index.html';
  return lien !== INDISPONIBLE && lien === page ? ' aria-current="page"' : '';
}

function libellePanier(n) {
  return `Mon panier, ${n} article${n > 1 ? 's' : ''}`;
}

function logo(classe = 'en-tete__logo') {
  return `
    <a class="${classe}" href="${LIENS.accueil}">
      <img src="${LOGO_NOIR}" alt="NAME. atelier, accueil" width="410" height="173">
    </a>`;
}

function enTete(n) {
  return `
    <a class="lien-evitement" href="#contenu">Aller au contenu</a>

    <div class="en-tete__gauche">
      <button class="en-tete__icone" type="button" data-ouvrir-menu aria-haspopup="dialog" aria-controls="menu-mobile">
        <span class="icone icone--menu" aria-hidden="true"></span>
        <span class="visuellement-cache">Menu</span>
      </button>
      <button class="en-tete__icone" type="button" data-ouvrir-recherche aria-haspopup="dialog" aria-controls="recherche">
        <span class="icone icone--recherche" aria-hidden="true"></span>
        <span class="visuellement-cache">Rechercher</span>
      </button>
    </div>

    ${logo()}

    <nav class="en-tete__nav" aria-label="Navigation principale">
      <ul>
        <li><a class="lien-nav" href="${LIENS.signature}"${courant(LIENS.signature)}>Signature</a></li>
        <li><a class="lien-nav" href="${LIENS.collection}"${courant(LIENS.collection)}>Collection</a></li>
        <li><a class="lien-nav" href="${LIENS.marque}">La marque</a></li>
      </ul>
    </nav>

    <div class="en-tete__actions">
      <button class="en-tete__icone en-tete__recherche-desktop" type="button" data-ouvrir-recherche aria-haspopup="dialog" aria-controls="recherche">
        <span class="icone icone--recherche" aria-hidden="true"></span>
        <span class="visuellement-cache">Rechercher</span>
      </button>
      <a class="bouton en-tete__panier-desktop" href="${LIENS.panier}" data-ouvrir-panier aria-haspopup="dialog">Mon panier (<span data-compteur-panier>${n}</span>)</a>
      <a class="en-tete__panier-mobile" href="${LIENS.panier}" data-ouvrir-panier aria-haspopup="dialog" aria-label="${libellePanier(n)}" data-libelle-panier>
        <span class="en-tete__icone" aria-hidden="true"><span class="icone icone--sac"></span></span>
        <span aria-hidden="true">(<span data-compteur-panier>${n}</span>)</span>
      </a>
    </div>`;
}

function menuMobile(n) {
  return `
    <dialog class="menu-mobile" id="menu-mobile" aria-label="Menu">
      <div class="menu-mobile__entete">
        <button class="en-tete__icone" type="button" data-fermer-menu>
          <span class="icone icone--fermer" aria-hidden="true"></span>
          <span class="visuellement-cache">Fermer le menu</span>
        </button>
        ${logo()}
      </div>

      <nav class="menu-mobile__nav" aria-label="Menu">
        <ul class="menu-mobile__principal">
          <li>
            <a class="menu-mobile__entree" href="${LIENS.signature}">
              <span class="menu-mobile__entree-titre">Signature.</span>
              <span class="menu-mobile__entree-sous-titre">Les pièces fabriquées à la commande</span>
            </a>
          </li>
          <li>
            <a class="menu-mobile__entree" href="${LIENS.collection}">
              <span class="menu-mobile__entree-titre">Collection.</span>
              <span class="menu-mobile__entree-sous-titre">Outlaws. — les looks en pièces uniques</span>
            </a>
          </li>
          <li>
            <a class="menu-mobile__entree" href="${LIENS.marque}">
              <span class="menu-mobile__entree-titre">La marque</span>
              <span class="menu-mobile__entree-sous-titre">L’atelier, les matières, la démarche</span>
            </a>
          </li>
        </ul>

        <hr class="separateur">

        <ul class="menu-mobile__secondaire">
          <li><button type="button" data-ouvrir-recherche aria-haspopup="dialog" aria-controls="recherche">Rechercher</button></li>
          <li><a href="${LIENS.panier}">Mon panier (<span data-compteur-panier>${n}</span>)</a></li>
          <li><a href="${INDISPONIBLE}">Livraison et retours</a></li>
          <li><a href="${INDISPONIBLE}">Contact</a></li>
        </ul>
      </nav>

      <div class="menu-mobile__bas">
        <a href="${LIENS.instagram}" target="_blank" rel="noopener">Instagram · @name.ateliers<span class="visuellement-cache"> (nouvel onglet)</span></a>
        <p>contact@name-atelier.com</p>
      </div>
    </dialog>`;
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
          <li><a href="${LIENS.instagram}" target="_blank" rel="noopener">Instagram · @name.ateliers<span class="visuellement-cache"> (nouvel onglet)</span></a></li>
          <li><span class="pied__texte">contact@name-atelier.com</span></li>
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
    <img class="pied__logo" src="../assets/logo/logo-blanc.png"
         srcset="../assets/logo/logo-blanc.png 410w, ../assets/logo/logo-blanc-hd.png 1637w"
         sizes="(min-width: 1024px) 720px, 345px"
         alt="NAME. atelier" width="410" height="173" loading="lazy">
    <p class="pied__mentions">© 2026 Name. atelier</p>`;
}

export function majCompteurPanier() {
  const n = nombreArticles();
  document.querySelectorAll('[data-compteur-panier]').forEach((el) => { el.textContent = n; });
  document.querySelectorAll('[data-libelle-panier]').forEach((el) => { el.setAttribute('aria-label', libellePanier(n)); });
}

function monter() {
  const n = nombreArticles();
  const zoneEnTete = document.querySelector('[data-layout="en-tete"]');
  const zonePied = document.querySelector('[data-layout="pied"]');

  if (zoneEnTete) {
    zoneEnTete.classList.add('en-tete');
    zoneEnTete.innerHTML = enTete(n);
    zoneEnTete.insertAdjacentHTML('afterend', menuMobile(n) + gabaritRecherche());
    initialiserMenuMobile();
    initialiserRecherche();
  }

  if (zonePied) {
    zonePied.classList.add('pied', 'sur-fond-sombre');
    zonePied.innerHTML = pied();
  }

  initialiserDelais();
}

monter();

// « Mon panier (n) » ouvre le panneau panier (prompt 05) ; le lien reste un repli vers la page
document.addEventListener('click', async (e) => {
  const lienPanier = e.target.closest('[data-ouvrir-panier]');
  if (!lienPanier) return;
  e.preventDefault();
  const { ouvrirPanneauPanier } = await import('./panier.js');
  ouvrirPanneauPanier(lienPanier, null);
});

// Le compteur suit le panier (ajout, quantité, retrait)
document.addEventListener('panier:change', majCompteurPanier);
