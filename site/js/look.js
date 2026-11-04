// Page look — look.html?l=<slug> (Figma 05.2, 05.3 fiche pièce ouverte, 05.4 vendu).
// Même gabarit que la fiche produit : photos séparées des informations.
// Le look se vend complet (décision du 04/11) : les points ouvrent une fiche courte,
// sans achat à la pièce.

import { chargerCatalogue, prix } from './catalogue.js';
import { contenuLook, ALLIANCE, GARANTIE_LOOK } from './contenus-look.js';
import { initialiserOnglets } from './onglets.js';
import { ouvrirPanneauPanier } from './panier.js';
import { ajouterLook } from './session.js';
import { CONTACT } from './recapitulatif.js';
import { lien, lienLook, INDISPONIBLE } from './liens.js';

const params = new URLSearchParams(location.search);
const catalogue = await chargerCatalogue();
const looks = [...catalogue.collection.looks].sort((a, b) => a.rang - b.rang);
const look = looks.find((l) => l.slug === params.get('l'));
const c = look ? contenuLook(look) : null;

if (!look || !c) {
  location.replace(INDISPONIBLE);
  await new Promise(() => {});
}

const vendu = look.statut === 'vendu';
const rang = looks.indexOf(look);
document.title = `${look.personnage} — Outlaws. — NAME.`;

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (x) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]));
}
// Taille exacte de chaque pièce : connue pour Le Conseiller seulement (PRD : [À définir])
const taille = c.taille ? `taille unique (${c.taille})` : 'taille unique';
const tailleADefinir = c.taille ? '' : '<p class="infos-look__note"><span class="a-definir">[À définir]</span> Taille exacte de chaque pièce</p>';

// --- Vue studio avec points (Point 83:283) et fiches pièce (95:3396) ----------
function fichePiece(p, prefixe) {
  const visuel = p.gros.packshot
    ? `<img src="${p.gros.src}" alt="" loading="lazy">`
    : `<img class="fiche-piece__zoom" src="${p.gros.src}" alt="" loading="lazy" style="object-position: ${p.gros.zoom.x} ${p.gros.zoom.y}; transform-origin: ${p.gros.zoom.x} ${p.gros.zoom.y}">`;
  return `
    <div class="fiche-piece" id="${prefixe}-piece-${p.numero}" role="group" aria-labelledby="${prefixe}-piece-${p.numero}-titre"
         style="--x: ${p.point.x}; --y: ${p.point.y}" hidden data-fiche-piece>
      <div class="fiche-piece__entete">
        <h3 class="fiche-piece__nom" id="${prefixe}-piece-${p.numero}-titre" tabindex="-1">${p.numero} · ${echapper(p.nom)}</h3>
        <button class="fiche-piece__fermer" type="button" data-fermer-piece>
          <span class="icone icone--fermer" aria-hidden="true"></span><span class="visuellement-cache">Fermer la fiche ${echapper(p.nom)}</span>
        </button>
      </div>
      <div class="fiche-piece__visuel${p.gros.packshot ? ' fiche-piece__visuel--packshot' : ''}">${visuel}</div>
      <p class="fiche-piece__prix">${prix(p.prix)} · ${taille}</p>
      <p class="fiche-piece__description">${echapper(p.description)}</p>
      <p class="fiche-piece__note">Pièce unique, vendue avec le look complet.</p>
    </div>`;
}

function vuePoints(prefixe, chargement) {
  return `
    <div class="vue-look" data-vue-look>
      <div class="vue-look__cadre">
        <img src="${c.face.src}" alt="${echapper(c.face.alt)}" loading="${chargement}">
        ${c.pieces.map((p) => `
          <button class="point vue-look__point" type="button" style="left: ${p.point.x}; top: ${p.point.y}"
                  aria-expanded="false" aria-controls="${prefixe}-piece-${p.numero}" data-point>
            ${p.numero}<span class="visuellement-cache"> · ${echapper(p.nom)} : voir la fiche de la pièce</span>
          </button>`).join('')}
        ${c.pieces.map((p) => fichePiece(p, prefixe)).join('')}
      </div>
    </div>`;
}

// --- Galerie : desktop = photo à gauche + slider (201:875) ; mobile = carrousel ----
function image(v, classe, chargement = 'lazy') {
  return `
    <figure class="${classe}${v.packshot ? ' galerie__packshot' : ''}">
      <img src="${v.src}" alt="${echapper(v.alt)}" loading="${chargement}" style="object-position: ${v.position ?? '50% 50%'}">
    </figure>`;
}

function galerie() {
  const diapo = (v, i) => (i === 0 ? vuePoints('slider', 'eager') : image(v, 'galerie__diapo'));
  return `
    <div class="galerie galerie--look" aria-label="Photos du look ${echapper(look.personnage)}" role="region">
      ${image(c.gauche, 'galerie__gauche galerie__gauche--photo', 'eager')}
      <div class="galerie__slider" data-slider>
        ${c.slider.map((v, i) => `<div class="galerie__slide" ${i ? 'hidden' : ''}>${diapo(v, i)}</div>`).join('')}
        <button class="carte-produit__fleche galerie__fleche galerie__fleche--gauche" type="button" data-precedent-slide>
          <span class="icone icone--chevron-gauche" aria-hidden="true"></span><span class="visuellement-cache">Photo précédente</span>
        </button>
        <button class="carte-produit__fleche galerie__fleche galerie__fleche--droite" type="button" data-suivant-slide>
          <span class="icone icone--chevron-droite" aria-hidden="true"></span><span class="visuellement-cache">Photo suivante</span>
        </button>
        <p class="galerie__compte" aria-live="polite"><span data-index-slide>1</span> / ${c.slider.length}</p>
      </div>
    </div>
    <div class="carrousel carrousel--look" role="region" aria-label="Photos du look ${echapper(look.personnage)}" data-carrousel>
      <ul class="carrousel__piste" role="list" tabindex="0" aria-label="Faire défiler les photos">
        ${c.carrousel.map((v, i) => `<li class="carrousel__diapo">${i === 0 ? vuePoints('carrousel', 'eager') : image(v, 'carrousel__visuel')}</li>`).join('')}
      </ul>
      <div class="carrousel__points" aria-hidden="true">${c.carrousel.map((_, i) => `<span class="carrousel__point${i ? '' : ' est-actif'}"></span>`).join('')}</div>
    </div>`;
}

// --- Infos look (87:471) ------------------------------------------------------
function infosLook() {
  const achat = vendu
    ? '<button class="bouton bouton--l bouton--pleine-largeur" type="button" disabled>Look vendu</button>'
    : `<button class="bouton bouton--l bouton--pleine-largeur" type="button" data-acheter-look>Acheter le look complet — ${prix(look.prix)}</button>`;
  return `
    <div class="infos infos--look">
      <div class="infos__entete">
        <p class="infos__ligne">Outlaws. — Personnage ${look.rang} sur ${looks.length}</p>
        <h1 class="infos__nom infos-look__nom" tabindex="-1">${echapper(look.personnage)}</h1>
        <p class="infos-look__citation">« ${echapper(c.citationLook)} »</p>
        ${vendu
          ? '<span class="mention mention--plein">Vendu</span>'
          : `<span class="mention">${echapper(catalogue.collection.mention)}</span>`}
      </div>
      <div class="infos-look__composition">
        <h2 class="infos-look__titre">Le look comprend</h2>
        <ul class="infos-look__pieces" role="list">
          ${c.pieces.map((p) => `<li><span>${echapper(p.nom)} · ${taille}</span><span>${prix(p.prix)}</span></li>`).join('')}
        </ul>
        <hr class="separateur">
        <p class="infos-look__total"><span>Look complet</span><span>${vendu ? 'Vendu' : prix(look.prix)}</span></p>
        ${tailleADefinir}
      </div>
      <p class="infos-look__note">${ALLIANCE} : ${vendu ? 'non incluse' : 'vendue séparément'}.</p>
      <div class="infos__achat">
        <p class="infos-look__garantie">${GARANTIE_LOOK}</p>
        ${achat}
        <a class="bouton bouton--l bouton--secondaire bouton--pleine-largeur" href="mailto:${CONTACT}?subject=${encodeURIComponent(`Look ${look.personnage}`)}">Une question ? Écrire à l’atelier</a>
        <p class="infos__conditions">${echapper(catalogue.retours)} · <a class="lien" href="${INDISPONIBLE}">Conditions de retour</a></p>
      </div>
    </div>`;
}

// --- Onglets (97:3230) en desktop, accordéons en mobile -----------------------
function panneaux() {
  const recit = `<p class="panneau-produit__vision">${echapper(c.recit)}</p>`;
  const details = `
    <div class="carte-blanche details">
      <ul class="details-pieces" role="list">
        ${c.pieces.map((p) => `
          <li>
            <h3 class="details-pieces__nom">${p.numero} · ${echapper(p.nom)} <span>${prix(p.prix)} · ${taille}</span></h3>
            <p>${echapper(p.description)}</p>
          </li>`).join('')}
      </ul>
      <p>Pièces uniques · 1 exemplaire chacune, numérotées à la main.</p>
    </div>`;
  const livraison = `
    <div class="carte-blanche details">
      <p>${GARANTIE_LOOK}</p>
      <ul>
        <li>${echapper(catalogue.livraison)}</li>
        <li>${echapper(catalogue.retours)}</li>
        <li>Une question avant l’achat ou un rendez-vous : ${CONTACT}</li>
      </ul>
    </div>`;
  return [
    ['personnage', 'Le personnage', recit],
    ['pieces', 'Détails des pièces', details],
    ['livraison', 'Livraison et retours', livraison],
  ];
}

function onglets() {
  const liste = panneaux();
  return `
    <section class="panneaux-produit" aria-label="À propos du look">
      <div class="panneaux-produit__onglets">
        <div class="onglets" role="tablist" aria-label="À propos du look">
          ${liste.map(([id, titre], i) => `<button class="onglet" role="tab" id="o-${id}" aria-controls="p-${id}" aria-selected="${i === 0}">${titre}</button>`).join('')}
        </div>
        ${liste.map(([id, , corps], i) => `<div class="panneau-produit" role="tabpanel" id="p-${id}" aria-labelledby="o-${id}" ${i ? 'hidden' : ''}>${corps}</div>`).join('')}
      </div>
      <div class="panneaux-produit__accordeons">
        ${liste.map(([id, titre, corps], i) => `
          <details class="accordeon" ${i === 0 ? 'open' : ''}>
            <summary class="accordeon__titre">${titre}</summary>
            <div class="accordeon__contenu panneau-produit">${corps}</div>
          </details>`).join('')}
      </div>
    </section>`;
}

function mosaique() {
  return `
    <section class="mosaique" aria-label="L’univers du personnage">
      ${c.mosaique.map((v, i) => `<figure class="mosaique__case mosaique__case--${i + 1}"><img src="${v.src}" alt="${echapper(v.alt)}" loading="lazy" style="object-position: ${v.position ?? '50% 50%'}"></figure>`).join('')}
    </section>`;
}

// --- Personnages (97:3256) : précédent, tous, suivant --------------------------
function personnages() {
  const avant = looks[rang - 1];
  const apres = looks[rang + 1];
  return `
    <nav class="personnages" aria-label="Autres personnages">
      ${avant ? `<a class="bouton bouton--l bouton--texte personnages__lien" href="${lienLook(avant.slug)}"><span class="icone icone--fleche-20 icone--retournee" aria-hidden="true"></span>${echapper(avant.personnage)}</a>` : '<span></span>'}
      <a class="lien" href="${lien('collection')}">Tous les personnages</a>
      ${apres ? `<a class="bouton bouton--l bouton--texte personnages__lien" href="${lienLook(apres.slug)}">${echapper(apres.personnage)}<span class="icone icone--fleche-20" aria-hidden="true"></span></a>` : '<span></span>'}
    </nav>`;
}

// --- Rendu --------------------------------------------------------------------
const main = document.getElementById('contenu');
main.innerHTML = `
  <section class="fiche fiche--look" aria-label="${echapper(look.personnage)}">
    ${galerie()}
    ${infosLook()}
  </section>
  ${onglets()}
  ${mosaique()}
  ${personnages()}`;

initialiserOnglets(main);

// --- Fiches pièce : un seul point ouvert par vue, Échap ou croix pour fermer ----
function fermerFiche(vue, { rendreFocus = false } = {}) {
  const point = vue.querySelector('[data-point][aria-expanded="true"]');
  if (!point) return;
  point.setAttribute('aria-expanded', 'false');
  document.getElementById(point.getAttribute('aria-controls')).hidden = true;
  if (rendreFocus) point.focus();
}

main.addEventListener('click', (e) => {
  const point = e.target.closest('[data-point]');
  if (point) {
    const vue = point.closest('[data-vue-look]');
    const ouvert = point.getAttribute('aria-expanded') === 'true';
    fermerFiche(vue);
    if (!ouvert) {
      point.setAttribute('aria-expanded', 'true');
      const fiche = document.getElementById(point.getAttribute('aria-controls'));
      fiche.hidden = false;
      fiche.querySelector('.fiche-piece__nom').focus();
    }
    return;
  }
  if (e.target.closest('[data-fermer-piece]')) {
    fermerFiche(e.target.closest('[data-vue-look]'), { rendreFocus: true });
    return;
  }
  const acheter = e.target.closest('[data-acheter-look]');
  if (acheter) {
    const ajoute = ajouterLook(look.slug);
    ouvrirPanneauPanier(acheter, ajoute ? 'Ajouté à votre panier.' : 'Ce look est déjà dans votre panier.');
  }
});

main.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const vue = e.target.closest('[data-vue-look]');
  if (vue) fermerFiche(vue, { rendreFocus: true });
});

// Slider desktop (sans défilement automatique : voir docs/journal.md)
const slider = main.querySelector('[data-slider]');
slider.addEventListener('click', (e) => {
  const b = e.target.closest('[data-precedent-slide], [data-suivant-slide]');
  if (!b) return;
  const slides = [...slider.querySelectorAll('.galerie__slide')];
  const i = slides.findIndex((s) => !s.hidden);
  const j = (i + (b.hasAttribute('data-suivant-slide') ? 1 : -1) + slides.length) % slides.length;
  fermerFiche(slides[i].querySelector('[data-vue-look]') ?? slider);
  slides.forEach((s, k) => { s.hidden = k !== j; });
  slider.querySelector('[data-index-slide]').textContent = j + 1;
});

// Carrousel mobile : défilement natif, points synchronisés
const piste = main.querySelector('.carrousel__piste');
const pointsCarrousel = [...main.querySelectorAll('.carrousel__point')];
piste.addEventListener('scroll', () => {
  const i = Math.round(piste.scrollLeft / piste.clientWidth);
  pointsCarrousel.forEach((p, k) => p.classList.toggle('est-actif', k === i));
}, { passive: true });
