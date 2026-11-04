// Panneau panier (Figma 89:299, écran 06.1) et Ligne panier (86:217).
// S'ouvre à droite après l'ajout (480 px), plein écran en mobile.
// La ligne panier resservira à la page panier (prompt 05).

import { chargerCatalogue, produitsSignature, prix } from './catalogue.js';
import { lirePanier, changerQuantite, retirerDuPanier } from './session.js';
import { ouvrirVolet, initialiserVolet } from './volet.js';
import { contenu } from './contenus-produit.js';
import { lien, lienProduit } from './liens.js';

const QUANTITE_MAX = 9;

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function lignesDetaillees() {
  const produits = await produitsSignature();
  return lirePanier()
    .map((l) => ({ ...l, produit: produits.find((p) => p.slug === l.slug) }))
    .filter((l) => l.produit);
}

export async function ligneProduit(ligne) {
  const { produit, taille, quantite } = ligne;
  const { delai } = await chargerCatalogue();
  const vignette = contenu(produit.slug)?.vignettes?.[0];
  const media = vignette
    ? `<img class="ligne-panier__image" src="${vignette.src}" alt="" width="96" height="120">`
    : '<span class="visuel ligne-panier__visuel" aria-hidden="true">Packshot</span>';
  const id = `ligne-${produit.slug}-${taille}`;

  return `
    <li class="ligne-panier" data-slug="${produit.slug}" data-taille="${taille}">
      ${media}
      <div class="ligne-panier__infos">
        <div class="ligne-panier__ligne">
          <h3 class="ligne-panier__nom" id="${id}"><a href="${lienProduit(produit.slug)}">${echapper(produit.nom)}</a></h3>
          <p class="ligne-panier__prix">${prix(produit.prix * quantite)}</p>
        </div>
        <p class="ligne-panier__detail">Taille ${taille} · ${echapper(produit.tissu.charAt(0).toUpperCase() + produit.tissu.slice(1))}</p>
        <p class="ligne-panier__delai">${echapper(delai)}</p>
        <div class="ligne-panier__actions">
          <div class="quantite" role="group" aria-labelledby="${id}" aria-describedby="${id}-q">
            <button class="quantite__bouton" type="button" data-moins ${quantite <= 1 ? 'disabled' : ''}>
              <span class="icone icone--moins-16" aria-hidden="true"></span><span class="visuellement-cache">Retirer une pièce</span>
            </button>
            <output class="quantite__valeur" id="${id}-q" aria-live="polite"><span class="visuellement-cache">Quantité : </span>${quantite}</output>
            <button class="quantite__bouton" type="button" data-plus ${quantite >= QUANTITE_MAX ? 'disabled' : ''}>
              <span class="icone icone--plus-16" aria-hidden="true"></span><span class="visuellement-cache">Ajouter une pièce</span>
            </button>
          </div>
          <button class="lien ligne-panier__retirer" type="button" data-retirer>Retirer<span class="visuellement-cache"> ${echapper(produit.nom)}, taille ${taille}</span></button>
        </div>
      </div>
    </li>`;
}

function gabaritPanneau() {
  return `
    <dialog class="volet volet--large" id="panneau-panier" aria-labelledby="panneau-panier-titre">
      <div class="volet__panneau">
        <div class="volet__entete">
          <h2 class="titre-s" id="panneau-panier-titre">Panier (<span data-panneau-nombre>0</span>)</h2>
          <button class="en-tete__icone" type="button" data-fermer-volet>
            <span class="icone icone--fermer" aria-hidden="true"></span>
            <span class="visuellement-cache">Fermer le panier</span>
          </button>
        </div>
        <div class="volet__contenu panneau-panier__contenu">
          <p class="texte-m panneau-panier__annonce" data-panneau-annonce tabindex="-1">Ajouté à votre panier.</p>
          <ul class="panneau-panier__lignes" role="list" data-panneau-lignes></ul>
        </div>
        <div class="volet__actions volet__actions--colonne">
          <div class="panneau-panier__sous-total">
            <span>Sous-total</span>
            <span class="panneau-panier__montant" data-panneau-total></span>
          </div>
          <p class="panneau-panier__note">Livraison offerte en France. Total calculé à l’étape suivante, sans frais cachés.</p>
          <a class="bouton bouton--l bouton--pleine-largeur" href="${lien('commande')}">Commander</a>
          <button class="bouton bouton--l bouton--secondaire bouton--pleine-largeur" type="button" data-fermer-volet>Continuer mes achats</button>
        </div>
      </div>
    </dialog>`;
}

async function rendre(panneau, annonce) {
  const lignes = await lignesDetaillees();
  const nombre = lignes.reduce((n, l) => n + l.quantite, 0);
  const total = lignes.reduce((t, l) => t + l.produit.prix * l.quantite, 0);
  panneau.querySelector('[data-panneau-nombre]').textContent = nombre;
  panneau.querySelector('[data-panneau-total]').textContent = prix(total);
  panneau.querySelector('[data-panneau-annonce]').textContent = annonce ?? (nombre ? '' : 'Votre panier est vide.');
  panneau.querySelector('[data-panneau-annonce]').hidden = !panneau.querySelector('[data-panneau-annonce]').textContent;
  panneau.querySelector('[data-panneau-lignes]').innerHTML = (await Promise.all(lignes.map(ligneProduit))).join('');
}

function panneau() {
  let p = document.getElementById('panneau-panier');
  if (p) return p;
  document.body.insertAdjacentHTML('beforeend', gabaritPanneau());
  p = document.getElementById('panneau-panier');
  initialiserVolet(p);

  p.addEventListener('click', async (e) => {
    const ligne = e.target.closest('.ligne-panier');
    if (!ligne) return;
    const { slug, taille } = ligne.dataset;
    const actuelle = lirePanier().find((l) => l.slug === slug && l.taille === taille);
    if (!actuelle) return;
    if (e.target.closest('[data-plus]')) changerQuantite(slug, taille, Math.min(QUANTITE_MAX, actuelle.quantite + 1));
    else if (e.target.closest('[data-moins]')) changerQuantite(slug, taille, Math.max(1, actuelle.quantite - 1));
    else if (e.target.closest('[data-retirer]')) retirerDuPanier(slug, taille);
    else return;
    const cible = e.target.closest('[data-plus], [data-moins]') ? `[data-slug="${slug}"][data-taille="${taille}"] ${e.target.closest('[data-plus]') ? '[data-plus]' : '[data-moins]'}` : null;
    await rendre(p, '');
    // Garder le focus au même endroit après le nouveau rendu
    (cible && p.querySelector(cible)) ? p.querySelector(cible).focus() : p.querySelector('[data-fermer-volet]').focus();
  });
  return p;
}

// Ouvre le panneau après un ajout (06.1)
export async function ouvrirPanneauPanier(declencheur) {
  const p = panneau();
  await rendre(p, 'Ajouté à votre panier.');
  ouvrirVolet(p, declencheur);
  p.querySelector('[data-panneau-annonce]').focus();
}
