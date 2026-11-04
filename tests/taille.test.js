// Tests de site/js/taille.js — sans dépendance :
//   node tests/taille.test.js
// Données lues dans data/catalogue.json (guide du Bombers).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  lireMesure, lireReference, recommander, ecarts, ecartPrincipal,
  formulerEcart, formulerPrincipal, phraseRecommandation, voisines, horsGamme,
} from '../site/js/taille.js';

const catalogue = JSON.parse(readFileSync(new URL('../data/catalogue.json', import.meta.url), 'utf8'));
const guide = catalogue.guidesTailles.bombers;
const tailles = catalogue.tailles;
const ref = (poitrine, longueur, epaules, manche) => ({ poitrine, longueur, epaules, manche });

// Cas du prompt 04 : [référence, taille attendue, phrase, hors gamme]
const CAS = [
  [ref(56, 70, 48, 62), 'M', '4 cm plus ample à la poitrine', null],
  [ref(55, 67, 48, 62), 'S', null, null],          // égalité S / M : la plus petite
  [ref(59, 67, 47, 62), 'M', null, null],
  [ref(64, 69, 51, 63), 'L', null, null],
  [ref(70, 76, 56, 66), 'XL', null, 'ample'],
  [ref(50, 60, 40, 58), 'XS', null, 'ajustee'],
];

for (const [reference, attendue, phrase, gamme] of CAS) {
  const libelle = Object.values(reference).join(', ');
  test(`référence ${libelle} → ${attendue}`, () => {
    const taille = recommander(guide, tailles, reference);
    assert.equal(taille, attendue);
    assert.equal(horsGamme(guide, tailles, taille, reference), gamme);
    if (phrase) assert.equal(formulerPrincipal(ecartPrincipal(ecarts(guide, taille, reference))), phrase);
  });
}

test('contrôle CLAUDE.md : la référence d’exemple du catalogue donne M', () => {
  const { tailleAttendue, ...exemple } = guide.exempleReference;
  assert.equal(recommander(guide, tailles, exemple), tailleAttendue);
  assert.equal(tailleAttendue, 'M');
});

test('phrase complète sur la fiche (04.6)', () => {
  const r = ref(56, 70, 48, 62);
  assert.equal(phraseRecommandation('M', ecarts(guide, 'M', r)),
    'Taille M recommandée · 4 cm plus ample à la poitrine que votre référence');
  assert.equal(phraseRecommandation('M', ecarts(guide, 'M', ref(60, 68, 48, 62))),
    'Taille M recommandée · identique à votre référence');
});

test('égalité d’écarts : le premier dans l’ordre du catalogue', () => {
  // M contre (59, 67, 47, 62) : +1 poitrine, +1 longueur, +1 épaules → poitrine
  assert.equal(ecartPrincipal(ecarts(guide, 'M', ref(59, 67, 47, 62))).cle, 'poitrine');
});

test('formulation des écarts (tableau 04.7)', () => {
  assert.equal(formulerEcart('poitrine', 4), '+4 cm, plus ample');
  assert.equal(formulerEcart('epaules', -2), '−2 cm, plus étroit');
  assert.equal(formulerEcart('longueur', 2), '+2 cm, plus long');
  assert.equal(formulerEcart('manche', -2), '−2 cm, plus court');
  assert.equal(formulerEcart('poitrine', 0), 'identique');
  assert.equal(formulerEcart('poitrine', 3.5), '+3,5 cm, plus ample');
  assert.equal(formulerPrincipal({ cle: 'longueur', ecart: -2 }), '2 cm plus court');
  assert.equal(formulerPrincipal({ cle: 'manche', ecart: 1 }), '1 cm plus long aux manches');
});

test('saisie : virgule, vide, non numérique, hors plage', () => {
  assert.deepEqual(lireMesure('56,5'), { valeur: 56.5 });
  assert.deepEqual(lireMesure(' 56.5 '), { valeur: 56.5 });
  assert.deepEqual(lireMesure(''), { erreur: 'vide' });
  assert.deepEqual(lireMesure('abc'), { erreur: 'nombre' });
  assert.deepEqual(lireMesure('300'), { erreur: 'plage' });
  assert.deepEqual(lireMesure('19'), { erreur: 'plage' });
  assert.deepEqual(lireMesure('20'), { valeur: 20 });
  assert.deepEqual(lireMesure('150'), { valeur: 150 });
  const r = lireReference({ poitrine: '56', longueur: '', epaules: '48', manche: '300' }, Object.keys(guide.mesures));
  assert.equal(r.valide, false);
  assert.deepEqual(r.erreurs, { longueur: 'vide', manche: 'plage' });
});

test('« Comparer en » : la taille et ses voisines', () => {
  assert.deepEqual(voisines(tailles, 'M'), ['S', 'M', 'L']);
  assert.deepEqual(voisines(tailles, 'XS'), ['XS', 'S']);
  assert.deepEqual(voisines(tailles, 'XL'), ['L', 'XL']);
});
