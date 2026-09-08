/**
 * Verrou de défilement robuste (compatible iOS Safari) avec compteur de références :
 * plusieurs surcouches (menu mobile, panier, fiche plat…) peuvent se chevaucher
 * sans perdre la position de défilement.
 */
let lockCount = 0;
let savedScrollY = 0;

export function lockScroll(): void {
  if (typeof window === "undefined") return;
  lockCount += 1;
  if (lockCount > 1) return;

  savedScrollY = window.scrollY;
  const html = document.documentElement;
  const body = document.body;
  html.dataset.scrollLocked = "true";
  html.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${savedScrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
}

export function unlockScroll(): void {
  if (typeof window === "undefined" || lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0) return;

  const html = document.documentElement;
  const body = document.body;
  html.style.overflow = "";
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";

  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, savedScrollY);
  html.style.scrollBehavior = previousBehavior;
  delete html.dataset.scrollLocked;
}

export const isScrollLocked = (): boolean =>
  typeof document !== "undefined" && document.documentElement.dataset.scrollLocked === "true";
