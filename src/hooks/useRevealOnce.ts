import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Observateur partagé pour toutes les apparitions au défilement :
 * un seul IntersectionObserver pour toute la page.
 */
type Callback = () => void;
let observer: IntersectionObserver | null = null;
const callbacks = new Map<Element, Callback>();

function getObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const callback = callbacks.get(entry.target);
        if (!callback) continue;
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
        callback();
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0 },
  );
  return observer;
}

export function observeOnce(element: Element, callback: Callback): () => void {
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }
  const io = getObserver();
  callbacks.set(element, callback);
  io.observe(element);
  return () => {
    callbacks.delete(element);
    io.unobserve(element);
  };
}

/** Devient `true` (une seule fois) lorsque l'élément entre dans la zone visible */
export function useRevealOnce<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    return observeOnce(el, () => setVisible(true));
  }, [visible]);

  return [ref, visible];
}
