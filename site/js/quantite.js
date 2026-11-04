// Quantité (Figma 83:269) — Signature uniquement ; une pièce unique reste à 1.
// Structure :
//   <div class="quantite" data-quantite data-min="1" data-max="9">
//     <button class="quantite__bouton" type="button" data-moins>…</button>
//     <output class="quantite__valeur" aria-live="polite">1</output>
//     <button class="quantite__bouton" type="button" data-plus>…</button>
//   </div>
// Émet l'événement « quantite » (detail.valeur) à chaque changement.

export function initialiserQuantites(racine = document) {
  racine.querySelectorAll('[data-quantite]').forEach((bloc) => {
    const min = Number(bloc.dataset.min ?? 1);
    const max = Number(bloc.dataset.max ?? 9);
    const sortie = bloc.querySelector('.quantite__valeur');
    const moins = bloc.querySelector('[data-moins]');
    const plus = bloc.querySelector('[data-plus]');

    function regler(valeur) {
      const v = Math.min(max, Math.max(min, valeur));
      sortie.textContent = v;
      moins.disabled = v <= min;
      plus.disabled = v >= max;
      bloc.dispatchEvent(new CustomEvent('quantite', { detail: { valeur: v }, bubbles: true }));
    }

    moins.addEventListener('click', () => regler(Number(sortie.textContent) - 1));
    plus.addEventListener('click', () => regler(Number(sortie.textContent) + 1));
    regler(Number(sortie.textContent) || min);
  });
}
