export interface NavLink {
  id: string;
  label: string;
  href: string;
}

/** Liens de navigation (navbar + footer). L'id correspond à l'id de la section. */
export const navLinks: NavLink[] = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
  { id: "menu", label: "Menu", href: "#menu" },
  { id: "a-propos", label: "À propos", href: "#a-propos" },
  { id: "avis", label: "Avis", href: "#avis" },
  { id: "contact", label: "Contact", href: "#contact" },
];
