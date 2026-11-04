// Collection Outlaws. (Figma 05.1) : intro, puis les cinq personnages dans l'ordre
// hiérarchique (rang), 2 cartes puis 3. Aucun filtre ni ajout rapide.

import { chargerCatalogue } from './catalogue.js';
import { carteLook } from './carte-produit.js';

const { collection } = await chargerCatalogue();

document.querySelector('[data-intro]').textContent = collection.intro;
document.querySelector('[data-looks]').innerHTML = [...collection.looks]
  .sort((a, b) => a.rang - b.rang)
  .map((look) => `<li>${carteLook(look, { titre: 'h2' })}</li>`)
  .join('');
