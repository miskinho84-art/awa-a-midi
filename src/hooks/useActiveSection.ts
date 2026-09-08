import { useEffect, useState } from "react";

/**
 * Retourne l'id de la section actuellement "active" (pour surligner le lien de navigation).
 * Basé sur IntersectionObserver : aucune mesure de mise en page pendant le défilement.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key.split("|").filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length || typeof IntersectionObserver === "undefined") return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const current = sectionIds.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      // Bande de détection : entre 30 % et 40 % de la hauteur de l'écran
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
