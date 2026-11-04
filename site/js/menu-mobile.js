// Menu mobile plein écran (Figma 208:952).
// <dialog> + showModal() : focus piégé, Échap et arrière-plan inerte sont natifs.

export function initialiserMenuMobile() {
  const menu = document.getElementById('menu-mobile');
  const boutonOuvrir = document.querySelector('[data-ouvrir-menu]');
  if (!menu || !boutonOuvrir) return;

  boutonOuvrir.addEventListener('click', () => {
    menu.showModal();
    boutonOuvrir.setAttribute('aria-expanded', 'true');
  });

  menu.querySelector('[data-fermer-menu]')?.addEventListener('click', () => menu.close());

  // Au retour (bouton, Échap ou lien), le focus revient sur le bouton Menu.
  menu.addEventListener('close', () => {
    boutonOuvrir.setAttribute('aria-expanded', 'false');
    boutonOuvrir.focus();
  });

  // Passage en desktop pendant que le menu est ouvert : on le ferme.
  matchMedia('(min-width: 1024px)').addEventListener('change', (e) => {
    if (e.matches && menu.open) menu.close();
  });
}
