// Être prévenu des prochaines sorties (Figma 86:346).
// Bloc dans la page, jamais en pop-up. Aucune case pré-cochée.
// Rien n'est envoyé ni enregistré : seul l'état visuel change.
// Usage : <section data-etre-prevenu></section>

import { INSTAGRAM } from './liens.js';

let compteur = 0;

const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function gabarit(id) {
  return `
    <h2 class="etre-prevenu__titre" id="${id}-titre">Être prévenu des prochaines sorties</h2>
    <p class="etre-prevenu__texte">Chapitre II, les basiques, arrive en août 2027. Un e-mail au moment de la sortie, rien d’autre.</p>
    <form class="etre-prevenu__formulaire" novalidate data-formulaire>
      <div class="champ">
        <label class="champ__libelle" for="${id}-email">E-mail</label>
        <div class="champ__zone">
          <input class="champ__saisie" id="${id}-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="vous@exemple.fr" aria-describedby="${id}-erreur">
        </div>
        <p class="champ__message champ__message--erreur" id="${id}-erreur" hidden>
          <span class="icone icone--alerte" aria-hidden="true"></span>Saisissez une adresse e-mail valide.
        </p>
      </div>
      <button class="bouton bouton--l" type="submit">M’inscrire</button>
    </form>
    <p class="etre-prevenu__confirmation" data-confirmation hidden tabindex="-1">C’est noté. Vous recevrez un e-mail à la sortie du Chapitre II.</p>
    <a class="lien" href="${INSTAGRAM}" target="_blank" rel="noopener">Suivre @name.ateliers sur Instagram<span class="visuellement-cache"> (nouvel onglet)</span></a>
    <p class="etre-prevenu__note">Aucune case pré-cochée. Désinscription en un clic.</p>`;
}

export function initialiserEtrePrevenu(racine = document) {
  racine.querySelectorAll('[data-etre-prevenu]').forEach((bloc) => {
    const id = `prevenu-${++compteur}`;
    bloc.classList.add('etre-prevenu');
    bloc.setAttribute('aria-labelledby', `${id}-titre`);
    bloc.innerHTML = gabarit(id);

    const formulaire = bloc.querySelector('[data-formulaire]');
    const champ = formulaire.querySelector('input');
    const erreur = bloc.querySelector(`#${id}-erreur`);
    const confirmation = bloc.querySelector('[data-confirmation]');

    function afficherErreur(oui) {
      champ.setAttribute('aria-invalid', String(oui));
      erreur.hidden = !oui;
    }

    formulaire.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!EMAIL_VALIDE.test(champ.value.trim())) {
        afficherErreur(true);
        champ.focus();
        return;
      }
      // État Envoyé : aucune donnée n'est transmise ni conservée.
      formulaire.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
    });

    champ.addEventListener('input', () => {
      if (champ.getAttribute('aria-invalid') === 'true' && EMAIL_VALIDE.test(champ.value.trim())) afficherErreur(false);
    });
  });
}
