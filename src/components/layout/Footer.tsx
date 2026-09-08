import { restaurant } from "@/config/restaurant";
import { navLinks } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="bg-cocoa-900 text-cream-100">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl font-bold text-terracotta-400">{restaurant.name}</h3>
            <p className="mt-2 text-sm text-cream-300">{restaurant.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold">Navigation</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}><a href={l.href} className="hover:text-terracotta-400">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contact</h4>
            <p className="mt-3 text-sm">{restaurant.address.street}</p>
            <p className="text-sm">{restaurant.address.city}</p>
            <p className="mt-2 text-sm">{restaurant.phone}</p>
          </div>
        </div>
        <p className="mt-10 border-t border-cocoa-700 pt-6 text-center text-xs text-cream-400">
          © {restaurant.copyrightYear} {restaurant.name} — Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
