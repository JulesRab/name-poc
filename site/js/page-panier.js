// Page panier (Figma 06.3) et panier vide (06.4).

import { lignesDetaillees, ligneProduit, avecSignature } from './panier.js';
import { lirePanier, changerQuantite, retirerDuPanier } from './session.js';
import { gabaritRecapitulatif, gabaritAide } from './recapitulatif.js';
import { lien } from './liens.js';

const QUANTITE_MAX = 9;
const zone = document.querySelector('[data-page-panier]');
let actionLocale = false; // évite un second rendu quand c'est cette page qui modifie le panier

async function rendre(focus) {
  const lignes = await lignesDetaillees();

  if (!lignes.length) {
    // 06.4 Panier vide
    zone.innerHTML = `
      <div class="panier-vide">
        <h1 class="titre-l" tabindex="-1" data-titre>Votre panier est vide.</h1>
        <p class="texte-l">Les pièces Signature sont fabriquées à la commande. Les looks Outlaws. sont des pièces uniques.</p>
        <div class="panier-vide__actions">
          <a class="bouton bouton--l" href="${lien('signature')}">Voir Signature</a>
          <a class="bouton bouton--l bouton--secondaire" href="${lien('collection')}">Voir la Collection</a>
        </div>
      </div>`;
    if (focus) zone.querySelector('[data-titre]').focus();
    return;
  }

  const total = lignes.reduce((t, l) => t + l.produit.prix * l.quantite, 0);
  zone.innerHTML = `
    <div class="page-panier">
      <div class="page-panier__articles">
        <h1 class="titre-l">Panier</h1>
        <ul class="page-panier__lignes" role="list">${(await Promise.all(lignes.map((l) => ligneProduit(l)))).join('')}</ul>
      </div>
      <div class="page-panier__colonne">
        ${await gabaritRecapitulatif(total, { signature: avecSignature(lignes) })}
        <a class="bouton bouton--l bouton--pleine-largeur" href="${lien('commande', { etape: 'coordonnees' })}">Commander</a>
        <p class="recapitulatif__note">Paiement par carte, Apple Pay, Google Pay ou en 3 fois sans frais. Sans création de compte.</p>
        ${gabaritAide()}
      </div>
    </div>`;

  if (focus) zone.querySelector(focus)?.focus();
}

zone.addEventListener('click', async (e) => {
  const ligne = e.target.closest('.ligne-panier');
  if (!ligne) return;
  const { slug, taille } = ligne.dataset;
  const actuelle = lirePanier().find((l) => l.slug === slug && l.taille === taille);
  if (!actuelle) return;
  let focus = null;
  actionLocale = true;
  if (e.target.closest('[data-plus]')) {
    changerQuantite(slug, taille, Math.min(QUANTITE_MAX, actuelle.quantite + 1));
    focus = `[data-slug="${slug}"][data-taille="${taille}"] [data-plus]`;
  } else if (e.target.closest('[data-moins]')) {
    changerQuantite(slug, taille, Math.max(1, actuelle.quantite - 1));
    focus = `[data-slug="${slug}"][data-taille="${taille}"] [data-moins]`;
  } else if (e.target.closest('[data-retirer]')) {
    retirerDuPanier(slug, taille);
    focus = '.page-panier h1, [data-titre]';
  } else { actionLocale = false; return; }
  actionLocale = false;
  await rendre(focus);
});

// Le panneau de l'en-tête peut aussi modifier le panier : on suit
document.addEventListener('panier:change', () => { if (!actionLocale) rendre(); });

await rendre();
