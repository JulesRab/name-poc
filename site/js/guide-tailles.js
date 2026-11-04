// Guide des tailles (Figma 113:749) — volet latéral en desktop, depuis le bas en mobile.
// Prompt 03 : vue « Tableau des mesures » (04.4), lue dans data/catalogue.json.
// Prompt 04 : vue « Ma référence » (04.5), recommandation (04.6), comparaison (04.7).

import { chargerCatalogue } from './catalogue.js';
import { ouvrirVolet, initialiserVolet } from './volet.js';
import { initialiserOnglets } from './onglets.js';
import { INDISPONIBLE } from './liens.js';

const MESURES = { poitrine: 'Poitrine', longueur: 'Longueur', epaules: 'Épaules', manche: 'Manche' };

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function tableau(produit, guide, tailles) {
  if (!guide) {
    return `<p class="a-definir texte-m">[À définir] Mesures à plat du ${echapper(produit.nom.toLowerCase())} : seul le Bombers est mesuré dans les maquettes.</p>`;
  }
  return `
    <div class="guide__tableau-defilement">
      <table class="guide__tableau">
        <caption class="visuellement-cache">Mesures à plat du ${echapper(produit.nom)}, en centimètres</caption>
        <thead>
          <tr><td></td>${tailles.map((t) => `<th scope="col">${t}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${Object.entries(guide.mesures).map(([cle, valeurs]) => `
            <tr><th scope="row">${MESURES[cle] ?? cle}</th>${tailles.map((t) => `<td>${valeurs[t]}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function gabarit(produit, guide, tailles) {
  return `
    <dialog class="volet volet--large volet--bas" id="guide-tailles" aria-labelledby="guide-tailles-titre">
      <div class="volet__panneau">
        <div class="volet__entete">
          <h2 class="titre-s" id="guide-tailles-titre">Guide des tailles</h2>
          <button class="en-tete__icone" type="button" data-fermer-volet>
            <span class="icone icone--fermer" aria-hidden="true"></span>
            <span class="visuellement-cache">Fermer le guide des tailles</span>
          </button>
        </div>
        <div class="onglets guide__onglets" role="tablist" aria-label="Vues du guide">
          <button class="onglet" role="tab" id="guide-o-tableau" aria-controls="guide-p-tableau" aria-selected="true">Tableau des mesures</button>
          <button class="onglet" role="tab" id="guide-o-reference" aria-controls="guide-p-reference" aria-selected="false">Ma référence</button>
        </div>
        <div class="volet__contenu guide__contenu">
          <div role="tabpanel" id="guide-p-tableau" aria-labelledby="guide-o-tableau" class="guide__panneau">
            <p class="texte-m guide__fort">Coupe unisexe : mêmes mesures pour toutes et tous.</p>
            <h3 class="guide__titre">${echapper(produit.nom)} — coupe unisexe</h3>
            <p class="texte-s texte-secondaire">Mesures de la pièce posée à plat, en centimètres.</p>
            ${tableau(produit, guide, tailles)}
            <div class="visuel guide__schema" role="img" aria-label="Visuel à produire : schéma, comment mesurer une pièce à plat">Schéma : comment mesurer une pièce à plat</div>
            <p class="texte-m">Astuce : mesurez une pièce que vous aimez porter, posée à plat, et comparez.</p>
          </div>
          <div role="tabpanel" id="guide-p-reference" aria-labelledby="guide-o-reference" class="guide__panneau" hidden>
            <p class="a-definir texte-m">[À définir] Saisie de votre référence et taille recommandée : flow 3 (prompt 04).</p>
          </div>
        </div>
        <div class="volet__actions volet__actions--colonne">
          <button class="bouton bouton--secondaire bouton--pleine-largeur guide__vers-reference" type="button" data-vers-reference>Trouver ma taille avec un vêtement que j’aime porter</button>
          <a class="lien" href="${INDISPONIBLE}">Entre deux tailles ? Écrire à l’atelier</a>
        </div>
      </div>
    </dialog>`;
}

let volet = null;

export async function preparerGuide(produit) {
  const catalogue = await chargerCatalogue();
  const guide = produit.guideTailles ? catalogue.guidesTailles[produit.guideTailles] : null;
  document.body.insertAdjacentHTML('beforeend', gabarit(produit, guide, catalogue.tailles));
  volet = document.getElementById('guide-tailles');
  initialiserVolet(volet);
  initialiserOnglets(volet);
  volet.querySelector('[data-vers-reference]').addEventListener('click', () => volet.querySelector('#guide-o-reference').click());
}

// vue : 'tableau' | 'reference'
export function ouvrirGuide(declencheur, vue = 'tableau') {
  if (!volet) return;
  volet.querySelector(vue === 'reference' ? '#guide-o-reference' : '#guide-o-tableau').click();
  ouvrirVolet(volet, declencheur);
}
