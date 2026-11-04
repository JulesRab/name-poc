// Confirmation de commande (Figma 08.1). Lit la dernière commande fictive de la session ;
// sans commande (URL tapée, nouvel onglet), retour à l'accueil.

import { chargerCatalogue } from './catalogue.js';
import { ligneProduit } from './panier.js';
import { derniereCommande } from './session.js';
import { gabaritRecapitulatif, gabaritAide, DELAI_LOOK } from './recapitulatif.js';
import { gabaritEtapes } from './fabrication.js';
import { periodeReception } from './paiement.js';
import { lien, INSTAGRAM } from './liens.js';

const commande = derniereCommande();
if (!commande) {
  location.replace(lien('accueil'));
  await new Promise(() => {});
}

function echapper(texte) {
  return String(texte ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const signature = commande.lignes.some((l) => !l.produit.look);
const delai = signature ? (await chargerCatalogue()).delai : DELAI_LOOK;
const lignesHtml = (await Promise.all(commande.lignes.map((l) => ligneProduit(l, { lecture: true })))).join('');
const zone = document.querySelector('[data-confirmation]');

zone.innerHTML = `
  <div class="commande commande--confirmation">
    <div class="commande__colonne confirmation">
      <div class="confirmation__titres">
        <p class="confirmation__numero">Commande n° ${echapper(commande.numero)}</p>
        <h1 class="titre-l" tabindex="-1" data-titre>${signature ? 'Merci. Votre pièce part à l’atelier.' : 'Merci. Votre look est réservé.'}</h1>
        <p class="texte-l">Un e-mail de confirmation vient d’être envoyé à ${echapper(commande.email)}. Vous serez prévenu·e à l’expédition.</p>
      </div>
      <div class="confirmation__delais">
        <p class="delai"><span class="icone icone--ciseaux" aria-hidden="true"></span><span>${echapper(delai)}</span></p>
        ${signature ? `<p class="delai"><span class="icone icone--ciseaux" aria-hidden="true"></span><span>Réception estimée : ${periodeReception(new Date(commande.date))}</span></p>` : ''}
      </div>
      ${signature ? `<section class="etapes-fabrication etapes-fabrication--volet" aria-label="Ce qui se passe maintenant">
        ${gabaritEtapes({ titre: 'Ce qui se passe maintenant', niveau: 'h2' })}
      </section>` : ''}
      <div class="confirmation__actions">
        ${signature ? `<a class="bouton bouton--l" href="${lien('suivi', { etape: 'recue' })}">Suivre la fabrication de ma pièce</a>` : ''}
        <a class="bouton bouton--l bouton--secondaire" href="${lien('accueil')}">Continuer la visite</a>
        <a class="bouton bouton--l bouton--texte" href="${INSTAGRAM}" target="_blank" rel="noopener">Suivre @name.ateliers<span class="visuellement-cache"> (nouvel onglet)</span></a>
      </div>
    </div>
    <aside class="commande__recap commande__recap--fixe" aria-label="Récapitulatif de la commande">
      <ul class="page-panier__lignes" role="list">${lignesHtml}</ul>
      ${await gabaritRecapitulatif(commande.total, { signature })}
      ${gabaritAide()}
    </aside>
  </div>`;

zone.querySelector('[data-titre]').focus();
