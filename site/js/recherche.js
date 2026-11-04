// Calque de recherche (Figma 89:617, écrans 02.1, 02.2, 02.3), sur toutes les pages.
// Recherche sur le nom, le tissu, le type de pièce et les personnages,
// sans tenir compte des accents ni des majuscules. Échap et la croix ferment.

import { chargerCatalogue, produitsSignature } from './catalogue.js';
import { carteProduit, carteLook, initialiserCartes } from './carte-produit.js';
import { lien, lienProduit } from './liens.js';

const TYPES = { vestes: 'vestes et manteaux', pantalons: 'pantalons', hauts: 'hauts' };

const normaliser = (texte) => String(texte).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function gabaritRecherche() {
  return `
    <dialog class="recherche" id="recherche" aria-label="Recherche">
      <div class="recherche__panneau">
        <form class="recherche__champ" role="search" data-formulaire-recherche>
          <span class="icone icone--recherche recherche__loupe" aria-hidden="true"></span>
          <label class="visuellement-cache" for="recherche-saisie">Rechercher une pièce, un tissu</label>
          <input class="recherche__saisie" id="recherche-saisie" type="search" autocomplete="off" placeholder="Rechercher une pièce, un tissu…" data-saisie>
          <button class="en-tete__icone" type="button" data-fermer-recherche>
            <span class="icone icone--fermer" aria-hidden="true"></span>
            <span class="visuellement-cache">Fermer la recherche</span>
          </button>
        </form>
        <div class="recherche__contenu" data-contenu aria-live="polite"></div>
      </div>
    </dialog>`;
}

function suggestions() {
  return `
    <div class="recherche__suggestions">
      <h2 class="recherche__surtitre">Suggestions</h2>
      <ul role="list">
        <li><a class="lien" href="${lienProduit('pantalon-wide')}">Pantalon wide</a></li>
        <li><a class="lien" href="${lienProduit('bombers')}">Bombers</a></li>
        <li><a class="lien" href="${lienProduit('pull')}">Pull</a></li>
        <li><a class="lien" href="${lien('collection')}">Outlaws. — les looks</a></li>
      </ul>
    </div>`;
}

function aucunResultat(requete) {
  return `
    <h2 class="recherche__aucun">Aucune pièce ne correspond à « ${echapper(requete)} ».</h2>
    <p class="texte-m">Name. propose pour l’instant des vêtements Signature et les looks de la Collection Outlaws.</p>
    <div class="recherche__retours">
      <a class="bouton bouton--l" href="${lien('signature')}">Voir Signature</a>
      <a class="bouton bouton--l bouton--secondaire" href="${lien('collection')}">Voir la Collection</a>
    </div>`;
}

function resultats(requete, produits, looks) {
  const n = produits.length + looks.length;
  return `
    <p class="texte-m">${n} résultat${n > 1 ? 's' : ''} pour « ${echapper(requete)} »</p>
    <ul class="grille grille--recherche" role="list">
      ${produits.map((p) => `<li>${carteProduit(p, { titre: 'h2' })}</li>`).join('')}
      ${looks.map((l) => `<li>${carteLook(l, { titre: 'h2' })}</li>`).join('')}
    </ul>`;
}

export async function initialiserRecherche() {
  const calque = document.getElementById('recherche');
  if (!calque) return;
  const saisie = calque.querySelector('[data-saisie]');
  const contenu = calque.querySelector('[data-contenu]');
  let declencheur = null;
  let index = null;

  async function construireIndex() {
    const catalogue = await chargerCatalogue();
    const produits = (await produitsSignature()).map((p) => ({ ...p, cle: normaliser(`${p.nom} ${p.tissu} ${TYPES[p.type] ?? p.type}`) }));
    const looks = catalogue.collection.looks.map((l) => ({ ...l, cle: normaliser(l.personnage) }));
    return { produits, looks };
  }

  async function chercher() {
    const requete = saisie.value.trim();
    if (!requete) { contenu.innerHTML = suggestions(); return; }
    index ??= await construireIndex();
    const q = normaliser(requete);
    const produits = index.produits.filter((p) => p.cle.includes(q));
    const looks = index.looks.filter((l) => l.cle.includes(q));
    contenu.innerHTML = produits.length + looks.length ? resultats(requete, produits, looks) : aucunResultat(requete);
  }

  function ouvrir(source) {
    declencheur = source;
    document.getElementById('menu-mobile')?.close();
    saisie.value = '';
    contenu.innerHTML = suggestions();
    calque.showModal();
    saisie.focus();
  }

  document.addEventListener('click', (e) => {
    const bouton = e.target.closest('[data-ouvrir-recherche]');
    if (bouton) { e.preventDefault(); ouvrir(bouton); }
  });

  calque.querySelector('[data-fermer-recherche]').addEventListener('click', () => calque.close());
  calque.addEventListener('click', (e) => { if (e.target === calque) calque.close(); });
  // Un champ type="search" absorbe le premier Échap (il s'efface) : on ferme directement.
  calque.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); calque.close(); }
  });
  calque.addEventListener('close', () => {
    const cible = declencheur && document.contains(declencheur) && declencheur.offsetParent !== null
      ? declencheur
      : document.querySelector('.en-tete [data-ouvrir-recherche]:not([hidden])');
    cible?.focus();
  });

  calque.querySelector('[data-formulaire-recherche]').addEventListener('submit', (e) => { e.preventDefault(); chercher(); });
  saisie.addEventListener('input', chercher);

  initialiserCartes();
}
