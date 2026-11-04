// Étapes de fabrication (Figma 86:273) et volet Fabrication (89:506, écran 04.8).
// Le volet s'ouvre depuis le bloc « Tissu du moment » (description Figma).

import { ETAPES_FABRICATION } from './contenus-produit.js';
import { ouvrirVolet, initialiserVolet } from './volet.js';
import { initialiserDelais } from './delai.js';

// Liste des 6 étapes + statut e-mail. Utilisée dans l'onglet de la fiche et dans le volet.
// titre : texte du titre, ou false pour aucun titre
export function gabaritEtapes({ titre = 'De la commande à chez vous', niveau = 'h3' } = {}) {
  return `
    ${titre ? `<${niveau} class="titre-s etapes-fabrication__titre-bloc">${titre}</${niveau}>` : ''}
    <ol class="etapes-fabrication__liste">
      ${ETAPES_FABRICATION.map((e, i) => `
        <li class="etapes-fabrication__etape">
          <span class="etapes-fabrication__numero" aria-hidden="true">${i + 1}</span>
          <div><p class="etapes-fabrication__titre">${e.titre}</p><p class="texte-m">${e.texte}</p></div>
        </li>`).join('')}
    </ol>
    <p class="etapes-fabrication__statut"><span class="icone icone--courriel" aria-hidden="true"></span>Chaque étape vous est envoyée par e-mail, avec des photos de l’atelier.</p>`;
}

function gabaritVolet() {
  return `
    <dialog class="volet volet--large" id="volet-fabrication" aria-labelledby="volet-fabrication-titre">
      <div class="volet__panneau">
        <div class="volet__entete">
          <h2 class="titre-s" id="volet-fabrication-titre">Fabrication</h2>
          <button class="en-tete__icone" type="button" data-fermer-volet>
            <span class="icone icone--fermer" aria-hidden="true"></span>
            <span class="visuellement-cache">Fermer la fabrication</span>
          </button>
        </div>
        <div class="volet__contenu etapes-fabrication etapes-fabrication--volet">
          ${gabaritEtapes()}
        </div>
        <div class="volet__actions">
          <p data-delai></p>
        </div>
      </div>
    </dialog>`;
}

export function ouvrirFabrication(declencheur) {
  let volet = document.getElementById('volet-fabrication');
  if (!volet) {
    document.body.insertAdjacentHTML('beforeend', gabaritVolet());
    volet = document.getElementById('volet-fabrication');
    initialiserVolet(volet);
    initialiserDelais(volet);
  }
  ouvrirVolet(volet, declencheur);
}
