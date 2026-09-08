import { restaurant } from "@/config/restaurant";
import { navLinks } from "@/config/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useMediaQuery";

export function Navbar() {
  const active = useActiveSection(navLinks.map((l) => l.id));
  const scrolled = useScrolled(20);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "bg-cream-50/95 shadow-soft backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#accueil" className="font-display text-xl font-bold text-terracotta-600">
          {restaurant.name}
        </a>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition ${active === link.id ? "text-terracotta-600" : "text-cocoa-700 hover:text-terracotta-500"}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#menu"
          className="rounded-full bg-terracotta-500 px-4 py-2 text-sm font-semibold text-white shadow-lift hover:bg-terracotta-600"
        >
          Commander
        </a>
      </div>
    </header>
  );
}
