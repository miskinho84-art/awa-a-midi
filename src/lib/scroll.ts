/** Défile en douceur vers une section (utilisable après la fermeture d'une surcouche) */
export function scrollToSection(hashOrId: string, options: { delay?: number } = {}): void {
  const id = hashOrId.replace(/^#/, "");
  const run = () => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };
  if (options.delay) window.setTimeout(run, options.delay);
  else run();
}
