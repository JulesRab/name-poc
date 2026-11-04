// Carte produit (Figma 85:296) et Carte look (85:316).
// Carte produit : visuels défilant avec les flèches. Pas de changement d'image
// au survol ni d'ajout rapide au panier (CLAUDE.md).

import { prix } from './catalogue.js';
import { lienProduit, lienLook } from './liens.js';
import { contenu } from './contenus-produit.js';

// Visuels à produire : blocs gris avec leur contenu attendu (composant Visuel).
const VISUELS_PRODUIT = ['Packshot face — fond neutre', 'Packshot dos — fond neutre'];

let compteur = 0;

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function carteProduit(produit, { titre = 'h3' } = {}) {
  const id = `carte-${produit.slug}-${++compteur}`;
  const aVenir = produit.statut === 'a-venir';
  // Photos exportées de Figma quand elles existent, sinon blocs gris (composant Visuel)
  const photos = contenu(produit.slug)?.vignettes;
  const visuels = photos ?? VISUELS_PRODUIT;
  const plusieurs = visuels.length > 1;

  return `
    <article class="carte-produit" data-carte>
      <div class="carte-produit__media">
        ${visuels.map((v, i) => photos
          ? `<img class="carte-produit__visuel carte-produit__photo" src="${v.src}" alt="${echapper(v.alt)}" loading="lazy" width="765" height="1024"${i ? ' hidden' : ''}>`
          : `<div class="visuel carte-produit__visuel" role="img" aria-label="${echapper(produit.nom)}, visuel à produire : ${echapper(v)}"${i ? ' hidden' : ''}>${echapper(v)}</div>`).join('')}
        ${aVenir ? '<span class="mention mention--plein carte-produit__mention">À venir · août 2027</span>' : ''}
        ${plusieurs ? `
          <button class="carte-produit__fleche carte-produit__fleche--gauche" type="button" data-precedent aria-controls="${id}-compte">
            <span class="icone icone--chevron-gauche" aria-hidden="true"></span>
            <span class="visuellement-cache">Visuel précédent : ${echapper(produit.nom)}</span>
          </button>
          <button class="carte-produit__fleche carte-produit__fleche--droite" type="button" data-suivant aria-controls="${id}-compte">
            <span class="icone icone--chevron-droite" aria-hidden="true"></span>
            <span class="visuellement-cache">Visuel suivant : ${echapper(produit.nom)}</span>
          </button>
          <p class="carte-produit__compte" id="${id}-compte" aria-live="polite"><span data-index>1</span> / ${visuels.length}</p>` : ''}
      </div>
      <div class="carte-produit__infos">
        <div class="carte-produit__ligne">
          <${titre} class="carte-produit__nom"><a class="carte-produit__lien" href="${lienProduit(produit.slug)}">${echapper(produit.nom)}</a></${titre}>
          <p class="carte-produit__prix">${prix(produit.prix)}</p>
        </div>
        <p class="carte-produit__tissu">Tissu du moment : ${echapper(produit.tissu)}</p>
      </div>
    </article>`;
}

// Carte look : personnage, prix du look complet. La citation n'existe pas
// encore dans le catalogue : elle n'est pas affichée (pas d'invention).
export function carteLook(look, { titre = 'h3' } = {}) {
  const vendu = look.statut === 'vendu';
  return `
    <article class="carte-look" data-carte>
      <div class="carte-look__media">
        <div class="visuel carte-look__visuel" role="img" aria-label="${echapper(look.personnage)}, visuel à produire : photo look Collection, plan large, personnage en pied">Photo look Collection — plan large, personnage en pied</div>
        ${vendu ? '<span class="mention mention--plein carte-produit__mention">Vendu</span>' : ''}
      </div>
      <div class="carte-look__infos">
        <${titre} class="carte-look__nom"><a class="carte-produit__lien" href="${lienLook(look.slug)}">${echapper(look.personnage)}</a></${titre}>
        <p class="carte-look__prix">${vendu ? 'Look complet · vendu' : `Look complet · ${prix(look.prix)}`}</p>
      </div>
    </article>`;
}

// Défilement des visuels : délégation d'événements, une seule fois par page.
let initialise = false;

export function initialiserCartes() {
  if (initialise) return;
  initialise = true;

  document.addEventListener('click', (e) => {
    const bouton = e.target.closest('[data-precedent], [data-suivant]');
    if (!bouton) return;
    const media = bouton.closest('.carte-produit__media');
    const visuels = [...media.querySelectorAll('.carte-produit__visuel')];
    const actuel = visuels.findIndex((v) => !v.hidden);
    const pas = bouton.hasAttribute('data-suivant') ? 1 : -1;
    const suivant = (actuel + pas + visuels.length) % visuels.length;
    visuels.forEach((v, i) => { v.hidden = i !== suivant; });
    media.querySelector('[data-index]').textContent = suivant + 1;
  });
}
