// Délai de fabrication (Figma 85:233).
// Texte tiré de data/catalogue.json (clé « delai »), jamais écrit en dur.
// Usage : <p class="delai" data-delai></p>

import { chargerCatalogue } from './catalogue.js';

export async function initialiserDelais(racine = document) {
  const cibles = racine.querySelectorAll('[data-delai]:not([data-delai-pret])');
  if (!cibles.length) return;

  let texte;
  try {
    texte = (await chargerCatalogue()).delai;
  } catch (erreur) {
    console.error('[NAME.] délai introuvable', erreur);
    return;
  }

  cibles.forEach((el) => {
    el.classList.add('delai');
    el.innerHTML = '<span class="icone icone--ciseaux" aria-hidden="true"></span><span></span>';
    el.lastElementChild.textContent = texte;
    el.dataset.delaiPret = '';
  });
}
