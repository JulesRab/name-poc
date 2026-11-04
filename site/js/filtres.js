// Filtres de la liste Signature (Figma 89:402, 03.2, 03.3).
// Signature uniquement : pas de facette « Offre » (décision du 04/11, les looks
// restent dans la Collection). Plusieurs valeurs d'une facette = OU,
// facettes entre elles = ET. Filtres actifs reflétés dans l'URL.

export const FACETTES = [
  {
    cle: 'type',
    titre: 'Type de pièce',
    valeurs: [
      { valeur: 'vestes', libelle: 'Vestes et manteaux' },
      { valeur: 'pantalons', libelle: 'Pantalons' },
      { valeur: 'hauts', libelle: 'Hauts' },
    ],
    test: (p, v) => p.type === v,
  },
  {
    cle: 'taille',
    titre: 'Taille',
    // Toutes les pièces Signature existent dans toutes les tailles.
    valeurs: ['XS', 'S', 'M', 'L', 'XL'].map((t) => ({ valeur: t, libelle: t, puce: `Taille ${t}` })),
    test: () => true,
  },
  {
    cle: 'prix',
    titre: 'Prix',
    valeurs: [
      { valeur: 'moins-300', libelle: 'Moins de 300 €' },
      { valeur: '300-700', libelle: '300 à 700 €' },
      { valeur: 'plus-700', libelle: 'Plus de 700 €' },
    ],
    test: (p, v) => (v === 'moins-300' ? p.prix < 300 : v === '300-700' ? p.prix >= 300 && p.prix <= 700 : p.prix > 700),
  },
  {
    cle: 'dispo',
    titre: 'Disponibilité',
    valeurs: [
      { valeur: 'disponible', libelle: 'Disponible' },
      { valeur: 'a-venir', libelle: 'À venir (Chapitre II)' },
    ],
    test: (p, v) => p.statut === v,
  },
];

// État : { type: ['pantalons'], taille: ['M'], … }
export function lireEtat(params = new URLSearchParams(location.search)) {
  const etat = {};
  FACETTES.forEach(({ cle, valeurs }) => {
    const permises = valeurs.map((v) => v.valeur);
    const choisies = (params.get(cle) ?? '').split(',').filter((v) => permises.includes(v));
    if (choisies.length) etat[cle] = choisies;
  });
  return etat;
}

export function ecrireEtat(etat) {
  const params = new URLSearchParams();
  FACETTES.forEach(({ cle }) => { if (etat[cle]?.length) params.set(cle, etat[cle].join(',')); });
  const requete = params.toString();
  history.replaceState(null, '', requete ? `?${requete}` : location.pathname);
}

export function nombreFiltres(etat) {
  return Object.values(etat).reduce((n, v) => n + v.length, 0);
}

export function filtrer(produits, etat) {
  return produits.filter((p) => FACETTES.every(({ cle, test }) => !etat[cle]?.length || etat[cle].some((v) => test(p, v))));
}

// Liste des filtres actifs, pour les puces au-dessus des résultats
export function filtresActifs(etat) {
  return FACETTES.flatMap(({ cle, valeurs }) =>
    (etat[cle] ?? []).map((v) => {
      const def = valeurs.find((x) => x.valeur === v);
      return { cle, valeur: v, libelle: def.puce ?? def.libelle };
    })
  );
}

// Contenu du volet : un accordéon ouvert par facette
export function gabaritFacettes(idBase) {
  return FACETTES.map(({ cle, titre, valeurs }) => `
    <details class="accordeon" open>
      <summary class="accordeon__titre">${titre}</summary>
      <fieldset class="filtres__options ${cle === 'taille' ? 'tailles' : ''}">
        <legend class="visuellement-cache">${titre}</legend>
        ${valeurs.map(({ valeur, libelle }) => cle === 'taille'
          ? `<label class="taille"><input class="visuellement-cache" type="checkbox" name="${cle}" value="${valeur}">${libelle}</label>`
          : `<label class="case"><input class="case__entree" type="checkbox" name="${cle}" value="${valeur}" id="${idBase}-${cle}-${valeur}">${libelle}</label>`
        ).join('')}
      </fieldset>
    </details>`).join('');
}

export function etatDuFormulaire(formulaire) {
  const etat = {};
  FACETTES.forEach(({ cle }) => {
    const choisies = [...formulaire.querySelectorAll(`input[name="${cle}"]:checked`)].map((i) => i.value);
    if (choisies.length) etat[cle] = choisies;
  });
  return etat;
}

export function etatVersFormulaire(etat, formulaire) {
  formulaire.querySelectorAll('input[type="checkbox"]').forEach((i) => {
    i.checked = Boolean(etat[i.name]?.includes(i.value));
  });
}
