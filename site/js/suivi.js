// Suivi de fabrication — suivi.html?etape=<recue|tissu|coupe|assemblage|finitions>
// (Figma 08.2 à 08.6, Frise 114:603, Étape de suivi 114:601, Détail d'étape 114:665).
// Lit la dernière commande fictive de la session ; sans commande, retour à l'accueil.
// L'URL fixe l'avancement simulé ; toucher une étape de la frise en affiche le détail.
// « finitions » reproduit 08.6 : assemblage en cours, finitions sélectionnée et à venir.

import { prix } from './catalogue.js';
import { contenu } from './contenus-produit.js';
import { derniereCommande } from './session.js';
import { periodeReception } from './paiement.js';
import { CONTACT } from './recapitulatif.js';
import { lien } from './liens.js';

const commande = derniereCommande();
const ligne = commande?.lignes.find((l) => !l.produit.look);
if (!ligne) {
  location.replace(lien('accueil'));
  await new Promise(() => {});
}

const IMG = '../assets/images/';
const produit = ligne.produit;
const nom = produit.nom.toLowerCase();

// Décalage en jours depuis la commande (Figma : 10 févr. → tissu 10, coupe 11, …)
const ETAPES = [
  { id: 'recue', titre: 'Reçue', jours: 0,
    texte: `Votre commande est arrivée à l’atelier. Nous réservons pour votre ${nom} le tissu du lot en cours.`,
    photos: [
      { src: `${IMG}suivi-recue-atelier.jpg`, alt: 'L’atelier dans la pénombre : un tailleur penché sur sa table, sous trois lampes' },
      { src: `${IMG}suivi-recue-tissu.jpg`, alt: 'Pli d’un tissu bleu marine, en lumière rasante' },
    ] },
  { id: 'tissu', titre: 'Tissu', jours: 0,
    texte: `Le ${produit.tissu ?? 'tissu'} est sorti du lot et vérifié : la longueur nécessaire est réservée pour votre pièce.`,
    photos: [
      { src: `${IMG}suivi-recue-tissu.jpg`, alt: 'Pli d’un tissu bleu marine, en lumière rasante' },
      { src: `${IMG}suivi-tissu-texture.jpg`, alt: 'Gros plan sur la texture d’un drap de laine sombre' },
    ] },
  { id: 'coupe', titre: 'Coupe', jours: 1,
    texte: `Le patron est tracé à la craie, puis coupé à votre taille ${ligne.taille}.`,
    photos: [
      { src: `${IMG}suivi-coupe-craie.jpg`, alt: 'Laine rayée marquée à la craie, une paire de ciseaux posée dessus' },
      { src: `${IMG}suivi-assemblage-toile.jpg`, alt: 'Une toile de manteau essayée sur un modèle, dans l’atelier' },
    ] },
  { id: 'assemblage', titre: 'Assemblage', jours: 2,
    texte: 'Les grandes coutures sont montées. Les détails sont en préparation.',
    photos: [
      { src: `${IMG}suivi-assemblage-toile.jpg`, alt: 'Une toile de manteau essayée sur un modèle, dans l’atelier' },
      { src: `${IMG}suivi-coupe-craie.jpg`, alt: 'Laine rayée marquée à la craie, une paire de ciseaux posée dessus' },
    ] },
  { id: 'finitions', titre: 'Finitions', jours: 5, texte: 'Ourlets, boutons, repassage et contrôle final de votre pièce.', photos: [] },
  { id: 'expedition', titre: 'Expédition', jours: 6, texte: 'Votre pièce est emballée à l’atelier et part chez vous.', photos: [] },
];

const AVANCEMENT = ['recue', 'tissu', 'coupe', 'assemblage'];
const demandee = new URLSearchParams(location.search).get('etape');
const courante = AVANCEMENT.includes(demandee) ? demandee : demandee === 'finitions' ? 'assemblage' : 'recue';
let selection = demandee === 'finitions' ? 'finitions' : courante;
if (demandee !== selection && demandee !== 'finitions') history.replaceState(null, '', `?etape=${courante}`);

const iCourante = ETAPES.findIndex((e) => e.id === courante);
const etat = (i) => (i < iCourante ? 'terminee' : i === iCourante ? 'en-cours' : 'a-venir');

// --- Dates --------------------------------------------------------------------
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MOIS_COURT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const debut = new Date(commande.date);
const jour = (n) => { const d = new Date(debut); d.setDate(d.getDate() + n); return d; };
const num = (d) => (d.getDate() === 1 ? '1er' : d.getDate());
const long = (d) => `${num(d)} ${MOIS[d.getMonth()]}`;
const court = (d) => `${num(d)} ${MOIS_COURT[d.getMonth()]}`;
const heure = `${debut.getHours()} h ${String(debut.getMinutes()).padStart(2, '0')}`;

function dateFrise(e, i) {
  const s = etat(i);
  if (s === 'en-cours') return 'En cours';
  return s === 'terminee' ? court(jour(e.jours)) : `~ ${court(jour(e.jours))}`;
}

function dateDetail(e, i) {
  const s = etat(i);
  if (s === 'a-venir') return `Prévue vers le ${long(jour(e.jours))}`;
  if (s === 'terminee') return `Terminée le ${long(jour(ETAPES[i + 1].jours))}`;
  return e.id === 'recue' ? `Depuis le ${long(debut)}, ${heure}` : `Depuis le ${long(jour(e.jours))}, mis à jour aujourd’hui`;
}

function echapper(texte) {
  return String(texte ?? '').replace(/[&<>"']/g, (x) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[x]));
}

// --- Gabarits -----------------------------------------------------------------
function frise() {
  return `
    <ol class="frise" role="list" aria-label="Étapes de fabrication">
      ${ETAPES.map((e, i) => `
        <li class="frise__etape frise__etape--${etat(i)}">
          <button class="frise__bouton" type="button" data-etape="${e.id}" aria-pressed="${e.id === selection}" aria-controls="detail-etape">
            <span class="frise__point" aria-hidden="true">${etat(i) === 'terminee' ? '<span class="icone icone--coche"></span>' : ''}</span>
            <span class="frise__libelle">${e.titre}</span>
            <span class="frise__date">${dateFrise(e, i)}<span class="visuellement-cache"> · ${{ terminee: 'terminée', 'en-cours': 'étape en cours', 'a-venir': 'à venir' }[etat(i)]}</span></span>
          </button>
        </li>`).join('')}
    </ol>`;
}

function detail() {
  const i = ETAPES.findIndex((e) => e.id === selection);
  const e = ETAPES[i];
  const s = etat(i);
  const mention = { terminee: '<span class="mention">Terminée</span>', 'en-cours': '<span class="mention mention--plein">En cours</span>', 'a-venir': '<span class="mention">À venir</span>' }[s];
  const photos = s === 'a-venir' || !e.photos.length
    ? '<div class="detail-etape__attente"><p>Les photos arrivent à cette étape.</p></div>'
    : e.photos.map((p) => `<figure class="detail-etape__photo"><img src="${p.src}" alt="${echapper(p.alt)}" loading="lazy"></figure>`).join('');
  return `
    <div class="detail-etape__titre">
      <h2 class="titre-m" tabindex="-1" data-titre-etape>${e.titre}</h2>
      ${mention}
    </div>
    <p class="detail-etape__date">${dateDetail(e, i)}</p>
    <p class="texte-l">${echapper(e.texte)}</p>
    <div class="detail-etape__photos">${photos}</div>`;
}

const vignette = contenu(produit.slug)?.vignettes?.[0];
const zone = document.querySelector('[data-suivi]');
const reception = periodeReception(debut).replace(/ \d{4}$/, '');

zone.innerHTML = `
  <div class="suivi">
    <div class="suivi__titres">
      <h1 class="titre-l">Votre pièce à l’atelier</h1>
      <p class="suivi__reference">Commande ${echapper(commande.numero)}, passée le ${long(debut)} ${debut.getFullYear()}</p>
    </div>
    <div class="suivi__piece">
      ${vignette ? `<img class="suivi__visuel" src="${vignette.src}" alt="" width="120" height="120">` : '<span class="visuel suivi__visuel" aria-hidden="true">Packshot</span>'}
      <div class="suivi__infos">
        <p class="titre-s">${echapper(produit.nom)}</p>
        <p class="texte-m">${echapper(produit.tissu.charAt(0).toUpperCase() + produit.tissu.slice(1))}, taille ${echapper(ligne.taille)}</p>
      </div>
      <p class="titre-s suivi__prix">${prix(produit.prix)}</p>
    </div>
    <div class="suivi__livraison">
      <p class="texte-s texte-secondaire">Livraison estimée</p>
      <p class="titre-m">${reception.charAt(0).toUpperCase() + reception.slice(1)}</p>
    </div>
    <div class="frise-zone" data-frise>${frise()}</div>
    <section class="detail-etape" id="detail-etape" aria-live="polite" data-detail>${detail()}</section>
    <div class="suivi__aide">
      <p class="texte-m">Chaque nouvelle étape vous est envoyée par e-mail. Cette page s’ouvre depuis le lien de l’e-mail, sans compte.</p>
      <a class="lien" href="mailto:${CONTACT}?subject=${encodeURIComponent(`Commande ${commande.numero}`)}">Une question sur votre pièce ? Écrire à l’atelier</a>
    </div>
  </div>`;

zone.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-etape]');
  if (!b) return;
  selection = b.dataset.etape;
  zone.querySelectorAll('[data-etape]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  zone.querySelector('[data-detail]').innerHTML = detail();
});

// Mobile : la frise défile, l'étape sélectionnée est ramenée dans le cadre
const cadreFrise = zone.querySelector('[data-frise]');
const choisie = cadreFrise.querySelector('[aria-pressed="true"]');
cadreFrise.scrollLeft = choisie.offsetLeft - (cadreFrise.clientWidth - choisie.offsetWidth) / 2;
