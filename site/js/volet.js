// Volet latéral générique (filtres, puis guide des tailles, fabrication, panier).
// <dialog class="volet"> + showModal() : focus piégé, Échap et arrière-plan
// inerte natifs. Clic sur le voile = fermeture.

export function ouvrirVolet(volet, declencheur = document.activeElement) {
  if (volet.open) return;
  volet._declencheur = declencheur;
  volet.showModal();
  declencheur?.setAttribute?.('aria-expanded', 'true');
}

export function fermerVolet(volet) {
  if (volet.open) volet.close();
}

export function initialiserVolet(volet) {
  if (volet._initialise) return;
  volet._initialise = true;

  volet.querySelectorAll('[data-fermer-volet]').forEach((b) => b.addEventListener('click', () => fermerVolet(volet)));

  // Clic sur le voile (en dehors du panneau)
  volet.addEventListener('click', (e) => {
    if (e.target === volet) fermerVolet(volet);
  });

  volet.addEventListener('close', () => {
    const d = volet._declencheur;
    d?.setAttribute?.('aria-expanded', 'false');
    if (d && document.contains(d)) d.focus();
  });
}
