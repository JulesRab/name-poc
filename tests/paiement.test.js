// Tests de site/js/paiement.js — sans dépendance :
//   node tests/paiement.test.js

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  echeances, euros, validerCoordonnees, numeroCommande, periodeReception,
  etapeAutorisee, suggestionsAdresse, adresseComplete,
} from '../site/js/paiement.js';

// Espaces insécables produits par Intl → espaces simples pour comparer
const net = (t) => t.replace(/[  ]/g, ' ');

test('paiement en 3 fois : 700 € → 233,33 + 233,33 + 233,34', () => {
  assert.deepEqual(echeances(700), [233.33, 233.33, 233.34]);
  assert.equal(net(euros(echeances(700)[0])), '233,33 €');
});

test('paiement en 3 fois : la somme est toujours le total', () => {
  for (const total of [700, 1030, 210, 40, 55, 2400, 1750.5]) {
    const e = echeances(total);
    assert.equal(Math.round(e.reduce((s, x) => s + x, 0) * 100), Math.round(total * 100));
    assert.ok(e[0] === e[1] && e[2] >= e[0]);
  }
  assert.deepEqual(echeances(1030), [343.33, 343.33, 343.34]);
});

test('montants', () => {
  assert.equal(net(euros(1030)), '1 030 €');
  assert.equal(net(euros(700)), '700 €');
});

test('coordonnées : obligatoires, e-mail, saisie manuelle', () => {
  const ok = { email: 'camille@exemple.fr', prenom: 'Camille', nom: 'Martin', adresse: '12 rue de l’Espérance, 59100 Roubaix' };
  assert.deepEqual(validerCoordonnees(ok), {});
  assert.deepEqual(validerCoordonnees({ ...ok, email: '' }), { email: 'vide' });
  assert.deepEqual(validerCoordonnees({ ...ok, email: 'camille@' }), { email: 'format' });
  assert.deepEqual(validerCoordonnees({ email: '', prenom: '', nom: '', adresse: '' }),
    { email: 'vide', prenom: 'vide', nom: 'vide', adresse: 'vide' });
  assert.deepEqual(validerCoordonnees({ ...ok, adresse: '12 rue X', manuel: true, codePostal: '591', ville: '' }),
    { codePostal: 'format', ville: 'vide' });
  assert.equal(adresseComplete({ manuel: true, adresse: '12 rue X', codePostal: '59100', ville: 'Roubaix' }), '12 rue X, 59100 Roubaix');
});

test('suggestions d’adresse dès 3 caractères', () => {
  assert.equal(suggestionsAdresse('12').length, 0);
  assert.equal(suggestionsAdresse('12 r').length, 3);
});

test('numéro de commande NA- + 4 chiffres', () => {
  assert.match(numeroCommande(), /^NA-\d{4}$/);
  assert.equal(numeroCommande(() => 0.1027), 'NA-1027');
  assert.equal(numeroCommande(() => 0.0005), 'NA-0005');
});

test('réception estimée : J+7 à J+14, en toutes lettres', () => {
  assert.equal(periodeReception(new Date(2026, 10, 4)), 'entre le 11 et le 18 novembre 2026');
  assert.equal(periodeReception(new Date(2026, 10, 21)), 'entre le 28 novembre et le 5 décembre 2026');
  assert.equal(periodeReception(new Date(2026, 11, 21)), 'entre le 28 décembre 2026 et le 4 janvier 2027');
  assert.equal(periodeReception(new Date(2026, 10, 24)), 'entre le 1er et le 8 décembre 2026');
});

test('accès aux étapes : renvoi à la première étape incomplète', () => {
  assert.equal(etapeAutorisee('paiement', {}), 'coordonnees');
  assert.equal(etapeAutorisee('paiement', { coordonnees: {} }), 'livraison');
  assert.equal(etapeAutorisee('paiement', { coordonnees: {}, livraison: {} }), 'paiement');
  assert.equal(etapeAutorisee('coordonnees', { coordonnees: {}, livraison: {} }), 'coordonnees');
  assert.equal(etapeAutorisee('nimporte', {}), 'coordonnees');
});
