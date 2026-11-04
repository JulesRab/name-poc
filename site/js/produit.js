// Fiche produit Signature — produit.html?p=<slug> (Figma 04.1, 04.2, 04.3, 04.9 ; 06.1 à l'ajout).
// Photos séparées des informations produit (CLAUDE.md). Délai juste au-dessus du bouton.

import { chargerCatalogue, produitsSignature, prix } from './catalogue.js';
import { carteProduit, initialiserCartes } from './carte-produit.js';
import { contenu, entretienPour } from './contenus-produit.js';
import { gabaritEtapes, ouvrirFabrication } from './fabrication.js';
import { phraseRecommandation } from './taille.js';
import { initialiserOnglets } from './onglets.js';
import { initialiserEtrePrevenu } from './etre-prevenu.js';
import { preparerGuide, ouvrirGuide, recommandationPour } from './guide-tailles.js';
import { ouvrirPanneauPanier } from './panier.js';
import { ajouterAuPanier, drapeau } from './session.js';
import { lien, lienProduit, INDISPONIBLE } from './liens.js';

const params = new URLSearchParams(location.search);
const catalogue = await chargerCatalogue();
const produits = await produitsSignature();
const produit = produits.find((p) => p.slug === params.get('p'));

if (!produit) {
  // Slug absent ou inconnu : aucun lien cassé
  location.replace(INDISPONIBLE);
  await new Promise(() => {}); // arrêt silencieux du module pendant la redirection
}

const aVenir = produit.statut === 'a-venir';
const infos = contenu(produit.slug);
const chapitre = catalogue.signature.find((c) => c.chapitre === produit.chapitre);
const AD = (texte) => `<span class="a-definir">[À définir] ${texte}</span>`;

function echapper(texte) {
  return String(texte).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
const majuscule = (t) => t.charAt(0).toUpperCase() + t.slice(1);

document.title = `${produit.nom} — Signature. — NAME.`;

// --- Bandeau d'arrivée (04.9) : QR code ou Instagram, une fois par visite --------
function bandeauArrivee() {
  const source = params.get('src');
  if (!['qr', 'instagram'].includes(source) || drapeau('bandeau-arrivee-vu')) return '';
  return `
    <aside class="bandeau-arrivee" aria-label="Présentation de Name." data-bandeau-arrivee>
      <p class="bandeau-arrivee__texte"><strong class="bandeau-arrivee__titre">Vous découvrez Name.</strong> <span>Un label de création textile qui construit ses récits à travers le vêtement. Matières naturelles, issues de deadstocks.</span></p>
      <div class="bandeau-arrivee__actions">
        <a class="lien" href="${lien('signature')}">Signature</a>
        <a class="lien" href="${lien('collection')}">Collection</a>
        <button class="en-tete__icone bandeau-arrivee__fermer" type="button" data-fermer-bandeau>
          <span class="icone icone--fermer" aria-hidden="true"></span><span class="visuellement-cache">Fermer la présentation</span>
        </button>
      </div>
    </aside>`;
}

// --- Galerie : desktop = packshot + slider (201:742) ; mobile = carrousel (208:832) ---
function image(v, classe, chargement = 'lazy') {
  const mention = v.contexte && produit.inspiration
    ? `<span class="mention mention--plein galerie__mention">Inspiration · ${echapper(produit.inspiration)}</span>` : '';
  return `
    <figure class="${classe}${v.packshot ? ' galerie__packshot' : ''}">
      <img src="${v.src}" alt="${echapper(v.alt)}" loading="${chargement}" style="object-position: ${v.position ?? '50% 50%'}">
      ${mention}
    </figure>`;
}

function visuelGris(texte, classe) {
  return `<div class="visuel ${classe}" role="img" aria-label="Visuel à produire : ${echapper(texte)}">${echapper(texte)}</div>`;
}

function galerie() {
  const gauche = infos?.packshot
    ? image({ ...infos.packshot, packshot: true }, 'galerie__gauche', 'eager')
    : visuelGris('Packshot face — fond neutre', 'galerie__gauche');

  const slides = infos?.slider ?? [{ gris: 'Visuel en contexte — porté' }, { gris: 'Packshot dos — fond neutre' }];
  const diapo = (v, i) => (v.gris ? visuelGris(v.gris, 'galerie__diapo') : image(v, 'galerie__diapo', i === 0 ? 'eager' : 'lazy'));

  const carrousel = infos?.carrousel ?? [{ gris: 'Packshot face — fond neutre' }, { gris: 'Packshot dos — fond neutre' }];

  return `
    <div class="galerie" aria-label="Photos du ${echapper(produit.nom)}" role="region">
      ${gauche}
      <div class="galerie__slider" data-slider>
        ${slides.map((v, i) => `<div class="galerie__slide" ${i ? 'hidden' : ''}>${diapo(v, i)}</div>`).join('')}
        <button class="carte-produit__fleche galerie__fleche galerie__fleche--gauche" type="button" data-precedent-slide>
          <span class="icone icone--chevron-gauche" aria-hidden="true"></span><span class="visuellement-cache">Photo précédente</span>
        </button>
        <button class="carte-produit__fleche galerie__fleche galerie__fleche--droite" type="button" data-suivant-slide>
          <span class="icone icone--chevron-droite" aria-hidden="true"></span><span class="visuellement-cache">Photo suivante</span>
        </button>
        <p class="galerie__compte" aria-live="polite"><span data-index-slide>1</span> / ${slides.length}</p>
      </div>
    </div>
    <div class="carrousel" role="region" aria-label="Photos du ${echapper(produit.nom)}" data-carrousel>
      <ul class="carrousel__piste" role="list" tabindex="0" aria-label="Faire défiler les photos">
        ${carrousel.map((v, i) => `<li class="carrousel__diapo">${v.gris ? visuelGris(v.gris, 'carrousel__visuel') : image(v, 'carrousel__visuel', i === 0 ? 'eager' : 'lazy')}</li>`).join('')}
      </ul>
      <div class="carrousel__points" aria-hidden="true">${carrousel.map((_, i) => `<span class="carrousel__point${i ? '' : ' est-actif'}"></span>`).join('')}</div>
    </div>`;
}

// --- Infos produit (87:387) ---------------------------------------------------
function infosProduit() {
  const tissu = `
    <div class="infos__tissu">
      <p>${aVenir ? 'Tissu prévu' : 'Tissu du moment'} : ${echapper(produit.tissu)}</p>
      ${aVenir ? '' : '<button class="lien" type="button" data-vers-tissu>En savoir plus</button>'}
    </div>
    <p class="infos__variation"><span class="icone icone--info" aria-hidden="true"></span>Deadstock : selon le tissu disponible à la confection, sa texture ou sa teinte peut légèrement varier.</p>`;

  const entete = `
    <div class="infos__entete">
      ${aVenir
        ? `<span class="mention mention--plein">Chapitre ${produit.chapitre} · À venir · août 2027</span>`
        : `<p class="infos__ligne">Signature. — ${echapper(chapitre.titre)}</p>`}
      <div class="infos__nom-prix">
        <h1 class="infos__nom">${echapper(produit.nom)}</h1>
        <p class="infos__prix">${prix(produit.prix)}</p>
      </div>
      ${tissu}
    </div>`;

  const conditions = `
    <p class="infos__conditions">${echapper(catalogue.livraison)} · TVA incluse · ${echapper(catalogue.retours.replace('Retours sous', 'Retour'))} · <a class="lien" href="${INDISPONIBLE}">Conditions de retour</a></p>`;

  if (aVenir) {
    return `
      <div class="infos">
        ${entete}
        <div class="infos__achat">
          <p class="texte-m">Sortie prévue en août 2027. Les prix sont indicatifs.</p>
          <a class="bouton bouton--l bouton--pleine-largeur" href="#etre-prevenu" data-vers-prevenu>Être prévenu de la sortie</a>
          ${conditions}
        </div>
      </div>`;
  }

  return `
    <div class="infos">
      ${entete}
      <form class="infos__taille" novalidate data-formulaire-achat>
        <fieldset class="infos__choix" aria-describedby="taille-erreur taille-conseil">
          <legend class="infos__legende">Taille<span data-taille-choisie></span></legend>
          <div class="infos__libelle-taille">
            <div class="infos__liens-taille">
              <button class="lien" type="button" data-ouvrir-guide="reference" aria-haspopup="dialog" data-trouver-taille>Trouver ma taille</button>
              <button class="lien" type="button" data-ouvrir-guide="tableau" aria-haspopup="dialog">Guide des tailles</button>
            </div>
          </div>
          <div class="tailles" data-tailles>
            ${catalogue.tailles.map((t) => `<label class="taille"><input class="visuellement-cache" type="radio" name="taille" value="${t}">${t}</label>`).join('')}
          </div>
          <p class="champ__message champ__message--erreur" id="taille-erreur" hidden>
            <span class="icone icone--alerte" aria-hidden="true"></span>Choisissez votre taille pour continuer.
          </p>
          <p class="infos__conseil" id="taille-conseil">Coupe unisexe. Entre deux tailles : prenez la plus petite pour un tombé ajusté.</p>
          <p class="infos__recommandation" data-recommandation hidden>
            <span data-phrase-recommandation></span> · <button class="lien" type="button" data-ouvrir-guide="comparaison" aria-haspopup="dialog">Voir la comparaison</button>
          </p>
        </fieldset>
        <div class="infos__achat">
          <p data-delai></p>
          <button class="bouton bouton--l bouton--pleine-largeur" type="submit" data-bouton-achat>Choisir ma taille</button>
          ${conditions}
        </div>
      </form>
    </div>`;
}

// --- Savoir-faire / fabrication (200:3782) : ancre du lien « En savoir plus » ----
function savoirFaire() {
  const blocs = [
    ['couches', 'Un tissu, un seul lot', 'Chaque série est coupée dans un même lot de deadstock, en quantité limitée.'],
    ['ciseaux-24', 'Coupée à votre taille', 'Rien n’est produit d’avance : la pièce est coupée après votre commande.'],
    ['repere', 'Cousue à l’atelier de Roubaix', 'Assemblée à la main, pièce par pièce, par une petite équipe.'],
    ['appareil-photo', 'Chaque étape en photo', 'Vous suivez la fabrication par e-mail, photos de l’atelier à l’appui.'],
  ];
  return `
    <section class="savoir-faire" id="fabrication" aria-label="Savoir-faire et fabrication" tabindex="-1">
      ${blocs.map(([icone, titre, texte]) => `
        <div class="savoir-faire__bloc">
          <span class="icone icone--${icone}" aria-hidden="true"></span>
          <h2 class="savoir-faire__titre">${titre}</h2>
          <p class="texte-m">${texte}</p>
        </div>`).join('')}
    </section>`;
}

// --- Onglets (115:4925) en desktop, accordéons en mobile ------------------------
function panneaux() {
  const t = infos?.tissu;
  const ligneTissu = (libelle, valeur) => `<div class="tissu__ligne"><dt>${libelle}</dt><dd>${valeur}</dd></div>`;

  const vision = infos?.vision ? `<p class="panneau-produit__vision">${echapper(infos.vision)}</p>` : `<p>${AD('Texte « L’histoire de la pièce »')}</p>`;

  const tissu = `
    <div class="carte-blanche tissu">
      <h3 class="titre-s">Tissu du moment</h3>
      <p class="texte-m">${t ? echapper(t.texte) : AD('Présentation du tissu')}</p>
      <dl class="tissu__liste">
        ${ligneTissu('Matière', t ? echapper(t.matiere) : echapper(majuscule(produit.tissu)))}
        ${ligneTissu('Origine', t ? echapper(t.origine) : AD('Origine du deadstock'))}
        ${ligneTissu('Atelier', t ? echapper(t.atelier) : AD('Lieu de fabrication'))}
      </dl>
      ${t?.serie ? `<p class="texte-m tissu__serie">${echapper(t.serie)}</p>` : ''}
      ${t?.precedents?.length ? `
        <p class="tissu__surtitre">Tissus précédents</p>
        <ul class="tissu__precedents" role="list">
          ${t.precedents.map((p) => `<li><img src="${p.image}" alt="" loading="lazy" style="object-position: ${p.position}"><span>${echapper(p.nom)}</span></li>`).join('')}
        </ul>` : ''}
      <button class="lien" type="button" data-vers-etapes>Voir les étapes de fabrication</button>
    </div>`;

  const details = infos?.details ? `
    <div class="carte-blanche details">
      <ul>${infos.details.map((d) => `<li>${echapper(d)}</li>`).join('')}</ul>
      <div>
        <p>Composition :</p>
        <ul>${infos.composition.map((d) => `<li>${echapper(d)}</li>`).join('')}</ul>
      </div>
      <p>Réf. : ${echapper(infos.reference)}</p>
    </div>` : `<p>${AD('Détails, composition et entretien')}</p>`;

  const e = entretienPour(produit);
  const entretien = e ? `
    <div class="carte-blanche details entretien">
      <p>${echapper(e.intro)}</p>
      <ul>${e.consignes.map(([titre, texte]) => `<li><span class="entretien__titre">${titre} :</span> ${echapper(texte)}</li>`).join('')}</ul>
      <p>${echapper(e.fin)}</p>
    </div>` : `<p>${AD('Conseils d’entretien')}</p>`;

  // Note Figma 196:12028 (04/11) : conditions sous les 6 étapes
  const livraison = `
    <div class="carte-blanche etapes-fabrication">
      ${gabaritEtapes()}
      <p class="etapes-fabrication__conditions">${echapper(catalogue.livraison)} · TVA incluse · Paiement sécurisé par carte bancaire · Retour sous 14 jours, pièce non portée.</p>
    </div>`;

  return [
    ['vision', 'L’histoire de la pièce', vision],
    ['tissu', 'Tissu du moment', tissu],
    ['details', 'Détails produit', details],
    ['entretien', 'Entretien', entretien],
    ['livraison', 'Informations de livraison', livraison],
  ];
}

function onglets() {
  const liste = panneaux();
  return `
    <section class="panneaux-produit" aria-label="Informations sur la pièce">
      <div class="panneaux-produit__onglets">
        <div class="onglets" role="tablist" aria-label="Informations sur la pièce">
          ${liste.map(([id, titre], i) => `<button class="onglet" role="tab" id="o-${id}" aria-controls="p-${id}" aria-selected="${i === 0}">${titre}</button>`).join('')}
        </div>
        ${liste.map(([id, , corps], i) => `<div class="panneau-produit" role="tabpanel" id="p-${id}" aria-labelledby="o-${id}" ${i ? 'hidden' : ''}>${corps}</div>`).join('')}
      </div>
      <div class="panneaux-produit__accordeons">
        ${liste.map(([id, titre, corps], i) => `
          <details class="accordeon" data-accordeon="${id}" ${i === 0 ? 'open' : ''}>
            <summary class="accordeon__titre">${titre}</summary>
            <div class="accordeon__contenu panneau-produit">${corps}</div>
          </details>`).join('')}
      </div>
    </section>`;
}

// --- Mosaïque (130:10321) avec points vers les pièces -------------------------
function mosaique() {
  if (!infos?.mosaique) return '';
  const points = infos.points.map((pt, i) => {
    const p = produits.find((x) => x.slug === pt.slug);
    return p ? `
      <a class="mosaique__point" href="${lienProduit(p.slug)}" style="left: ${pt.gauche}; top: ${pt.haut}">
        <span class="point" aria-hidden="true">${i + 1}</span>
        <span class="mention mention--plein">${echapper(p.nom)} · ${prix(p.prix)}</span>
      </a>` : '';
  }).join('');
  return `
    <section class="mosaique" aria-label="L’univers de la pièce">
      ${infos.mosaique.map((v, i) => `<figure class="mosaique__case mosaique__case--${i + 1}"><img src="${v.src}" alt="${echapper(v.alt)}" loading="lazy" style="object-position: ${v.position}"></figure>`).join('')}
      <div class="mosaique__points">${points}</div>
    </section>`;
}

// --- Autres pièces du chapitre ------------------------------------------------
function autresPieces() {
  const autres = produits.filter((p) => p.chapitre === produit.chapitre && p.slug !== produit.slug).slice(0, 3);
  return `
    <section class="accueil-section autres-pieces" aria-labelledby="titre-autres">
      <div class="titre-section">
        <h2 class="titre-m" id="titre-autres">Autres pièces du ${echapper(chapitre.titre)}</h2>
        <a class="lien" href="${lien('signature')}">Voir toute la ligne Signature</a>
      </div>
      <ul class="grille grille--3" role="list">${autres.map((p) => `<li>${carteProduit(p)}</li>`).join('')}</ul>
    </section>`;
}

// --- Rendu --------------------------------------------------------------------
const main = document.getElementById('contenu');
main.innerHTML = `
  ${bandeauArrivee()}
  <section class="fiche" aria-label="${echapper(produit.nom)}">
    ${galerie()}
    ${infosProduit()}
  </section>
  ${savoirFaire()}
  ${onglets()}
  ${mosaique()}
  ${aVenir ? '<div class="zone-prevenu" id="etre-prevenu"><section data-etre-prevenu></section></div>' : ''}
  ${autresPieces()}`;

initialiserOnglets(main);
initialiserCartes();
initialiserEtrePrevenu(main);
const { initialiserDelais } = await import('./delai.js');
initialiserDelais(main);
if (!aVenir) await preparerGuide(produit, { onChoisir: choisirTaille });

// --- Comportements ------------------------------------------------------------
const formulaire = main.querySelector('[data-formulaire-achat]');
const bouton = main.querySelector('[data-bouton-achat]');
const groupeTailles = main.querySelector('[data-tailles]');
const erreur = main.querySelector('#taille-erreur');
const tailleChoisie = main.querySelector('[data-taille-choisie]');

function afficherErreurTaille(oui) {
  if (!groupeTailles) return;
  groupeTailles.setAttribute('aria-invalid', String(oui));
  erreur.hidden = !oui;
}

function majTailleChoisie(taille) {
  tailleChoisie.textContent = ` : ${taille}`;
  bouton.textContent = `Ajouter au panier — ${prix(produit.prix)}`;
  afficherErreurTaille(false);
}

// État « Taille recommandée » (04.6) : la recommandation reste affichée,
// la taille choisie à la main prime toujours.
function afficherRecommandation() {
  const reco = recommandationPour(catalogue.guidesTailles[produit.guideTailles], catalogue.tailles);
  const zone = main.querySelector('[data-recommandation]');
  if (!zone) return null;
  zone.hidden = !reco;
  main.querySelector('#taille-conseil').hidden = Boolean(reco);
  main.querySelector('[data-trouver-taille]').hidden = Boolean(reco);
  if (reco) zone.querySelector('[data-phrase-recommandation]').textContent = phraseRecommandation(reco.taille, reco.ecarts);
  return reco;
}

function selectionnerTaille(taille) {
  const radio = formulaire.querySelector(`input[name="taille"][value="${taille}"]`);
  if (!radio) return;
  radio.checked = true;
  majTailleChoisie(taille);
}

// « Choisir la taille M » dans le guide : volet fermé, fiche en état 04.6
function choisirTaille(taille) {
  afficherRecommandation();
  selectionnerTaille(taille);
  formulaire.querySelector(`input[name="taille"][value="${taille}"]`).focus();
}

formulaire?.addEventListener('change', (e) => {
  if (e.target.name !== 'taille') return;
  majTailleChoisie(e.target.value);
});

// Profil déjà saisi (sur cette fiche ou une autre au même type de référence)
if (formulaire) {
  const reco = afficherRecommandation();
  if (reco) selectionnerTaille(reco.taille);
}

formulaire?.addEventListener('submit', (e) => {
  e.preventDefault();
  const taille = formulaire.querySelector('input[name="taille"]:checked')?.value;
  if (!taille) {
    // 04.3 : erreur visible, sans bloquer
    afficherErreurTaille(true);
    groupeTailles.querySelector('input').focus();
    return;
  }
  ajouterAuPanier({ slug: produit.slug, taille });
  ouvrirPanneauPanier(bouton);
});

main.addEventListener('click', (e) => {
  const guide = e.target.closest('[data-ouvrir-guide]');
  if (guide) ouvrirGuide(guide, guide.dataset.ouvrirGuide);

  if (e.target.closest('[data-vers-tissu]')) {
    // Le bloc « Tissu du moment » ouvre ensuite le volet fabrication (04.8)
    activerPanneau('tissu');
  }
  const versEtapes = e.target.closest('[data-vers-etapes]');
  if (versEtapes) ouvrirFabrication(versEtapes); // Volet fabrication (04.8)

  if (e.target.closest('[data-fermer-bandeau]')) {
    drapeau('bandeau-arrivee-vu', true);
    main.querySelector('[data-bandeau-arrivee]').remove();
    main.querySelector('.infos__nom').setAttribute('tabindex', '-1');
    main.querySelector('.infos__nom').focus();
  }
  if (e.target.closest('[data-vers-prevenu]')) {
    e.preventDefault();
    const champ = main.querySelector('#etre-prevenu input[type="email"]');
    champ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    champ?.focus({ preventScroll: true });
  }
});

function activerPanneau(id) {
  const desktop = matchMedia('(min-width: 1024px)').matches;
  if (desktop) {
    const onglet = main.querySelector(`#o-${id}`);
    onglet.click();
    onglet.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    const acc = main.querySelector(`[data-accordeon="${id}"]`);
    acc.open = true;
    acc.querySelector('summary').focus();
    acc.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Slider desktop
const slider = main.querySelector('[data-slider]');
slider.addEventListener('click', (e) => {
  const b = e.target.closest('[data-precedent-slide], [data-suivant-slide]');
  if (!b) return;
  const slides = [...slider.querySelectorAll('.galerie__slide')];
  const i = slides.findIndex((s) => !s.hidden);
  const j = (i + (b.hasAttribute('data-suivant-slide') ? 1 : -1) + slides.length) % slides.length;
  slides.forEach((s, k) => { s.hidden = k !== j; });
  slider.querySelector('[data-index-slide]').textContent = j + 1;
});

// Carrousel mobile : défilement natif (glisser), points synchronisés
const piste = main.querySelector('.carrousel__piste');
const pointsCarrousel = [...main.querySelectorAll('.carrousel__point')];
piste.addEventListener('scroll', () => {
  const i = Math.round(piste.scrollLeft / piste.clientWidth);
  pointsCarrousel.forEach((p, k) => p.classList.toggle('est-actif', k === i));
}, { passive: true });
