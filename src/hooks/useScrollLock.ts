import { useEffect } from "react";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

/** Bloque le défilement de la page (menus, tiroirs, modales, lightbox) */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    lockScroll();
    return () => unlockScroll();
  }, [locked]);
}
