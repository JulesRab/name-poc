// Accueil (Figma 01.1) : les 4 premières pièces du Chapitre I, intro Outlaws.

import { chargerCatalogue, produitsSignature } from './catalogue.js';
import { carteProduit, initialiserCartes } from './carte-produit.js';
import { initialiserEtrePrevenu } from './etre-prevenu.js';

const catalogue = await chargerCatalogue();
const chapitreI = (await produitsSignature()).filter((p) => p.chapitre === 'I').slice(0, 4);

document.querySelector('[data-chapitre-i]').innerHTML = chapitreI.map((p) => `<li>${carteProduit(p)}</li>`).join('');
document.querySelector('[data-intro-outlaws]').textContent = catalogue.collection.intro;

initialiserCartes();
initialiserEtrePrevenu();
