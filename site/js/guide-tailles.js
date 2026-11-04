// Guide des tailles (Figma 113:749) — volet latéral en desktop, plein écran en mobile.
// Vues : Tableau des mesures (04.4) · Ma référence : saisie (04.5) puis comparaison (04.7).
// Toutes les mesures viennent de data/catalogue.json (guidesTailles). Logique : js/taille.js.

import { chargerCatalogue } from './catalogue.js';
import { ouvrirVolet, fermerVolet, initialiserVolet } from './volet.js';
import { initialiserOnglets } from './onglets.js';
import { INDISPONIBLE } from './liens.js';
import { lireProfil, ecrireProfil } from './session.js';
import {
  LIBELLES, MESSAGES_ERREUR, lireReference, recommander, ecarts, formulerEcart, voisines, horsGamme,
} from './taille.js';

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const nombre = (n) => String(n).replace('.', ',');

let etat = null; // { produit, guide, tailles, volet, comparee, onChoisir }

// --- Vue Tableau (04.4) --------------------------------------------------------
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
            <tr><th scope="row">${LIBELLES[cle] ?? cle}</th>${tailles.map((t) => `<td>${valeurs[t]}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// --- Vue Ma référence : saisie (04.5) -------------------------------------------
function saisie(guide) {
  if (!guide) {
    return '<p class="a-definir texte-m">[À définir] Comparaison avec votre référence : seul le Bombers est mesuré dans les maquettes.</p>';
  }
  const exemple = guide.exempleReference;
  const champ = (cle) => `
    <div class="champ" data-champ="${cle}">
      <label class="champ__libelle" for="ref-${cle}">${LIBELLES[cle] ?? cle} (cm)</label>
      <div class="champ__zone">
        <input class="champ__saisie" id="ref-${cle}" name="${cle}" type="text" inputmode="decimal" autocomplete="off"
               placeholder="${nombre(exemple[cle])}" aria-describedby="ref-${cle}-erreur">
      </div>
      <p class="champ__message champ__message--erreur" id="ref-${cle}-erreur" hidden>
        <span class="icone icone--alerte" aria-hidden="true"></span><span data-texte-erreur></span>
      </p>
    </div>`;
  const cles = Object.keys(guide.mesures);

  return `
    <form class="guide__saisie" novalidate data-saisie-reference>
      <h3 class="guide__titre">Trouvez votre taille en 1 minute</h3>
      <p class="texte-m">Prenez un vêtement que vous aimez porter, posez-le à plat et mesurez-le une seule fois. Chaque fiche vous indique ensuite votre taille et ce qui change par rapport à lui.</p>
      <p class="texte-s texte-secondaire">Valeurs grisées = exemple. Saisissez les mesures de votre vêtement.</p>
      <div class="champ">
        <label class="champ__libelle" for="ref-type">Votre vêtement de référence</label>
        <div class="champ__zone">
          <select class="champ__saisie" id="ref-type" name="type">
            ${guide.referencesPossibles.map((r) => `<option>${echapper(r)}</option>`).join('')}
          </select>
          <span class="icone icone--chevron champ__chevron" aria-hidden="true"></span>
        </div>
      </div>
      <div class="guide__paires">${cles.map(champ).join('')}</div>
      <div class="visuel guide__schema guide__schema--saisie" role="img" aria-label="Visuel à produire : schéma, où mesurer, pièce posée à plat">Schéma : où mesurer, pièce posée à plat</div>
      <div class="guide__pied-saisie">
        <button class="bouton bouton--l bouton--pleine-largeur" type="submit">Voir ma taille</button>
        <p class="texte-s texte-secondaire">Sans compte. Vos mesures restent sur cet appareil.</p>
      </div>
    </form>`;
}

// --- Vue Ma référence : comparaison (04.7) ---------------------------------------
function schema(produit, piece, reference, taille) {
  // Deux rectangles à la même échelle : largeur = poitrine, hauteur = longueur (cm)
  const marge = 6;
  const largeur = Math.max(piece.poitrine, reference.poitrine) + marge * 2;
  const hauteur = Math.max(piece.longueur, reference.longueur) + marge * 2;
  const rect = (l, h, classe) => `<rect class="${classe}" x="${(largeur - l) / 2}" y="${marge}" width="${l}" height="${h}" vector-effect="non-scaling-stroke"/>`;
  return `
    <figure class="guide__comparaison-visuelle">
      <svg viewBox="0 0 ${largeur} ${hauteur}" role="img" preserveAspectRatio="xMidYMid meet"
           aria-label="${echapper(produit.nom)} taille ${taille} : ${nombre(piece.poitrine)} cm de poitrine sur ${nombre(piece.longueur)} cm de longueur. Votre référence : ${nombre(reference.poitrine)} sur ${nombre(reference.longueur)} cm.">
        ${rect(reference.poitrine, reference.longueur, 'guide__silhouette guide__silhouette--reference')}
        ${rect(piece.poitrine, piece.longueur, 'guide__silhouette guide__silhouette--piece')}
      </svg>
      <figcaption class="guide__legende-schema">Silhouettes à plat superposées</figcaption>
    </figure>
    <ul class="guide__legende" role="list">
      <li><span class="guide__trait guide__trait--piece" aria-hidden="true"></span>${echapper(produit.nom)}, taille ${taille}</li>
      <li class="texte-secondaire"><span class="guide__trait guide__trait--reference" aria-hidden="true"></span>Votre référence</li>
    </ul>`;
}

function rendreComparaison() {
  const { produit, guide, tailles, profil, recommandee, comparee } = etat;
  const reference = profil.mesures;
  const liste = ecarts(guide, comparee, reference);
  const piece = Object.fromEntries(liste.map((e) => [e.cle, e.piece]));
  const gamme = horsGamme(guide, tailles, recommandee, reference);

  etat.volet.querySelector('[data-comparaison]').innerHTML = `
    <div class="guide__resultat">
      <p class="guide__taille" tabindex="-1" data-titre-resultat>Votre taille : ${recommandee}</p>
      <p class="texte-s texte-secondaire">${echapper(produit.nom)} comparé à votre vêtement de référence</p>
    </div>
    ${gamme ? `
      <p class="guide__alerte">Votre référence est ${gamme === 'ample' ? 'plus ample que notre XL' : 'plus ajustée que notre XS'}.
        <a class="lien" href="${INDISPONIBLE}">Écrivez à l’atelier pour en parler.</a></p>` : ''}
    <fieldset class="guide__comparer">
      <legend class="guide__comparer-libelle">Comparer en</legend>
      <div class="tailles">
        ${voisines(tailles, recommandee).map((t) => `
          <label class="taille"><input class="visuellement-cache" type="radio" name="comparer" value="${t}" ${t === comparee ? 'checked' : ''}>${t}</label>`).join('')}
      </div>
    </fieldset>
    <div data-zone-schema aria-live="polite">
      ${schema(produit, piece, reference, comparee)}
      <div class="guide__tableau-defilement">
        <table class="guide__tableau guide__tableau--ecarts">
          <caption class="visuellement-cache">Écarts entre le ${echapper(produit.nom)} taille ${comparee} et votre référence</caption>
          <thead><tr><th scope="col">Mesure</th><th scope="col">${echapper(produit.nom)} ${comparee}</th><th scope="col">Référence</th><th scope="col">Écart</th></tr></thead>
          <tbody>
            ${liste.map((e) => `<tr><th scope="row">${e.libelle}</th><td>${nombre(e.piece)}</td><td>${nombre(e.reference)}</td><td>${formulerEcart(e.cle, e.ecart)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;

  const actions = etat.volet.querySelector('[data-actions-comparaison]');
  actions.querySelector('[data-choisir]').textContent = `Choisir la taille ${comparee}`;
}

// --- Bascule entre les sous-vues de « Ma référence » ------------------------------
function afficher(sousVue) {
  const v = etat.volet;
  const comparaison = sousVue === 'comparaison';
  v.querySelector('[data-zone-saisie]').hidden = comparaison;
  v.querySelector('[data-comparaison]').hidden = !comparaison;
  v.querySelector('[data-actions-comparaison]').hidden = !comparaison;
  v.querySelector('[data-actions-tableau]').hidden = true;
  if (comparaison) rendreComparaison();
}

function majActionsSelonOnglet() {
  const v = etat.volet;
  const tableauActif = v.querySelector('#guide-o-tableau').getAttribute('aria-selected') === 'true';
  v.querySelector('[data-actions-tableau]').hidden = !tableauActif;
  if (tableauActif) v.querySelector('[data-actions-comparaison]').hidden = true;
  else v.querySelector('[data-actions-comparaison]').hidden = v.querySelector('[data-comparaison]').hidden;
}

function gabarit(produit, guide, tailles) {
  return `
    <dialog class="volet volet--large" id="guide-tailles" aria-labelledby="guide-tailles-titre">
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
            <div data-zone-saisie>${saisie(guide)}</div>
            <div class="guide__panneau" data-comparaison hidden></div>
          </div>
        </div>
        <div class="volet__actions volet__actions--colonne" data-actions-tableau>
          <button class="bouton bouton--secondaire bouton--pleine-largeur guide__vers-reference" type="button" data-vers-reference>Trouver ma taille avec un vêtement que j’aime porter</button>
          <a class="lien" href="${INDISPONIBLE}">Entre deux tailles ? Écrire à l’atelier</a>
        </div>
        <div class="volet__actions volet__actions--colonne" data-actions-comparaison hidden>
          <button class="bouton bouton--l bouton--pleine-largeur" type="button" data-choisir>Choisir la taille</button>
          <button class="bouton bouton--texte bouton--pleine-largeur" type="button" data-modifier>Modifier ma référence</button>
        </div>
      </div>
    </dialog>`;
}

// --- API ----------------------------------------------------------------------

// Profil compatible avec ce guide (même type de référence) → recommandation, sinon null
export function recommandationPour(guide, tailles) {
  const profil = lireProfil();
  if (!guide || !profil || !guide.referencesPossibles.includes(profil.type)) return null;
  const taille = recommander(guide, tailles, profil.mesures);
  return { taille, profil, ecarts: ecarts(guide, taille, profil.mesures) };
}

export async function preparerGuide(produit, { onChoisir } = {}) {
  const catalogue = await chargerCatalogue();
  const guide = produit.guideTailles ? catalogue.guidesTailles[produit.guideTailles] : null;
  const tailles = catalogue.tailles;
  document.body.insertAdjacentHTML('beforeend', gabarit(produit, guide, tailles));
  const volet = document.getElementById('guide-tailles');
  etat = { produit, guide, tailles, volet, onChoisir };
  initialiserVolet(volet);
  initialiserOnglets(volet);

  volet.querySelector('[role="tablist"]').addEventListener('click', majActionsSelonOnglet);
  volet.querySelector('[role="tablist"]').addEventListener('keyup', majActionsSelonOnglet);
  volet.querySelector('[data-vers-reference]').addEventListener('click', () => {
    volet.querySelector('#guide-o-reference').click();
    volet.querySelector('#ref-poitrine')?.focus();
  });

  if (!guide) return { guide, tailles };

  const formulaire = volet.querySelector('[data-saisie-reference]');
  const cles = Object.keys(guide.mesures);

  formulaire.addEventListener('submit', (e) => {
    e.preventDefault();
    const saisies = Object.fromEntries(cles.map((c) => [c, formulaire.elements[c].value]));
    const { reference, erreurs, valide } = lireReference(saisies, cles);

    cles.forEach((cle) => {
      const champ = formulaire.elements[cle];
      const message = volet.querySelector(`#ref-${cle}-erreur`);
      champ.setAttribute('aria-invalid', String(Boolean(erreurs[cle])));
      message.hidden = !erreurs[cle];
      message.querySelector('[data-texte-erreur]').textContent = erreurs[cle] ? MESSAGES_ERREUR[erreurs[cle]] : '';
    });

    if (!valide) {
      formulaire.elements[cles.find((c) => erreurs[c])].focus();
      return;
    }

    const profil = { type: formulaire.elements.type.value, mesures: reference };
    ecrireProfil(profil);
    etat.profil = profil;
    etat.recommandee = recommander(guide, tailles, reference);
    etat.comparee = etat.recommandee;
    afficher('comparaison');
    volet.querySelector('[data-titre-resultat]').focus();
  });

  // Effacer l'erreur dès que la saisie redevient lisible
  formulaire.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true') {
      e.target.setAttribute('aria-invalid', 'false');
      volet.querySelector(`#ref-${e.target.name}-erreur`).hidden = true;
    }
  });

  // « Comparer en » : schéma et tableau mis à jour
  volet.querySelector('[data-comparaison]').addEventListener('change', (e) => {
    if (e.target.name !== 'comparer') return;
    etat.comparee = e.target.value;
    rendreComparaison();
    volet.querySelector(`input[name="comparer"][value="${etat.comparee}"]`).focus();
  });

  volet.querySelector('[data-modifier]').addEventListener('click', () => {
    // Retour à la saisie, valeurs gardées
    cles.forEach((c) => { formulaire.elements[c].value = etat.profil ? nombre(etat.profil.mesures[c]) : ''; });
    afficher('saisie');
    volet.querySelector('[data-actions-comparaison]').hidden = true;
    formulaire.elements[cles[0]].focus();
  });

  volet.querySelector('[data-choisir]').addEventListener('click', () => {
    const taille = etat.comparee;
    volet._declencheur = null; // le focus est géré par la fiche
    fermerVolet(volet);
    etat.onChoisir?.(taille);
  });

  return { guide, tailles };
}

// vue : 'tableau' | 'reference' (saisie, ou comparaison si un profil existe) | 'comparaison'
export function ouvrirGuide(declencheur, vue = 'tableau') {
  if (!etat) return;
  const { volet, guide, tailles } = etat;
  if (vue === 'tableau') {
    volet.querySelector('#guide-o-tableau').click();
  } else {
    volet.querySelector('#guide-o-reference').click();
    const reco = recommandationPour(guide, tailles);
    if (reco) {
      etat.profil = reco.profil;
      if (etat.recommandee !== reco.taille || vue === 'comparaison') etat.comparee = reco.taille;
      etat.recommandee = reco.taille;
      afficher('comparaison');
    } else if (guide) {
      afficher('saisie');
      volet.querySelector('[data-actions-comparaison]').hidden = true;
    }
  }
  majActionsSelonOnglet();
  ouvrirVolet(volet, declencheur);
}
