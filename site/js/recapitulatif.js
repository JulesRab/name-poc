// Récapitulatif (Figma 86:219) et bloc Aide — panier, tunnel, confirmation.
// Total et frais visibles dès le panier : aucun coût ajouté en cours de tunnel.

import { chargerCatalogue } from './catalogue.js';
import { euros } from './paiement.js';
import { INDISPONIBLE } from './liens.js';

export const CONTACT = 'contact@name-atelier.com';
export const DELAI_LOOK = 'Pièces uniques existantes · expédiées sous 3 jours ouvrés';

// signature : le panier contient une pièce fabriquée à la commande (sinon : looks seuls)
export async function gabaritRecapitulatif(total, { signature = true } = {}) {
  const { delai, retours } = await chargerCatalogue();
  const mention = signature ? delai : DELAI_LOOK;
  return `
    <section class="recapitulatif" aria-labelledby="recap-titre">
      <h2 class="recapitulatif__titre" id="recap-titre">Récapitulatif</h2>
      <dl class="recapitulatif__lignes">
        <div class="recapitulatif__ligne"><dt>Sous-total</dt><dd>${euros(total)}</dd></div>
        <div class="recapitulatif__ligne"><dt>Livraison en France</dt><dd>Offerte</dd></div>
        <div class="recapitulatif__ligne recapitulatif__ligne--total"><dt>Total TTC</dt><dd data-total>${euros(total)}</dd></div>
      </dl>
      <p class="delai"><span class="icone icone--ciseaux" aria-hidden="true"></span><span>${mention}</span></p>
      <p class="recapitulatif__note">${retours} · Paiement sécurisé</p>
    </section>`;
}

export function gabaritAide() {
  return `
    <div class="aide-commande">
      <p class="aide-commande__contact">Une question ? ${CONTACT}</p>
      <a class="lien" href="${INDISPONIBLE}">Conditions de retour</a>
    </div>`;
}

// Mobile : récapitulatif replié au-dessus du formulaire, total visible.
// Desktop (≥ 1024 px) : colonne de droite, toujours ouverte.
export function synchroniserRepli(details) {
  const desktop = matchMedia('(min-width: 1024px)');
  const appliquer = () => { if (desktop.matches) details.open = true; };
  appliquer();
  desktop.addEventListener('change', (e) => { details.open = e.matches; });
  details.addEventListener('toggle', appliquer);
}
