// Onglets (Figma 83:253) — motif ARIA « tabs » : flèches gauche/droite, Début, Fin.
// Structure :
//   <div class="onglets" role="tablist" aria-label="…">
//     <button class="onglet" role="tab" aria-selected="true" aria-controls="p1" id="o1">…</button>
//   </div>
//   <div class="onglet-panneau" role="tabpanel" id="p1" aria-labelledby="o1">…</div>

export function initialiserOnglets(racine = document) {
  racine.querySelectorAll('[role="tablist"]').forEach((liste) => {
    const onglets = [...liste.querySelectorAll('[role="tab"]')];

    function activer(cible, deplacerFocus = true) {
      onglets.forEach((onglet) => {
        const actif = onglet === cible;
        onglet.setAttribute('aria-selected', String(actif));
        onglet.tabIndex = actif ? 0 : -1;
        const panneau = document.getElementById(onglet.getAttribute('aria-controls'));
        if (panneau) panneau.hidden = !actif;
      });
      if (deplacerFocus) cible.focus();
    }

    onglets.forEach((onglet, i) => {
      onglet.addEventListener('click', () => activer(onglet));
      onglet.addEventListener('keydown', (e) => {
        const cibles = {
          ArrowRight: onglets[(i + 1) % onglets.length],
          ArrowLeft: onglets[(i - 1 + onglets.length) % onglets.length],
          Home: onglets[0],
          End: onglets[onglets.length - 1],
        };
        if (cibles[e.key]) {
          e.preventDefault();
          activer(cibles[e.key]);
        }
      });
    });

    activer(onglets.find((o) => o.getAttribute('aria-selected') === 'true') ?? onglets[0], false);
  });
}
