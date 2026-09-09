import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { navLinks } from "@/config/navigation";
import { fullAddress, phoneHref, restaurant } from "@/config/restaurant";
import { formatRange } from "@/lib/hours";
import { useScrollLock } from "@/hooks/useScrollLock";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

type LegalPage = "confidentialite" | "mentions" | null;

export function Footer() {
  const [legal, setLegal] = useState<LegalPage>(null);
  const year = Math.max(restaurant.copyrightYear, new Date().getFullYear());

  return (
    <footer className="relative overflow-hidden bg-cocoa-900 pb-8 pt-16 text-cream-100 md:pt-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-diamond-light opacity-[0.04]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full glow-terracotta-soft" />

      <div className="container-x relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm font-display text-lg italic text-cream-100/80">« {restaurant.tagline} »</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream-100/60">{restaurant.description}</p>
            <SocialLinks variant="dark" className="mt-6" />
          </div>

          <nav aria-label="Navigation du pied de page">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta-300">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="text-sm text-cream-100/75 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta-300">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-cream-100/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-terracotta-400" />
                <span>{fullAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-terracotta-400" />
                <a href={phoneHref} className="hover:text-white">{restaurant.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-terracotta-400" />
                <a href={`mailto:${restaurant.email}`} className="hover:text-white">{restaurant.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta-300">Horaires</h3>
            <ul className="mt-5 space-y-2 text-sm text-cream-100/75">
              {restaurant.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="tabular-nums">{formatRange(h)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-cream-100/50 sm:flex-row">
          <p>© {year} {restaurant.name}. Tous droits réservés.</p>
          <div className="flex gap-4">
            <button type="button" onClick={() => setLegal("mentions")} className="hover:text-white">
              Mentions légales
            </button>
            <button type="button" onClick={() => setLegal("confidentialite")} className="hover:text-white">
              Confidentialité
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {legal && <LegalModal page={legal} onClose={() => setLegal(null)} />}
      </AnimatePresence>
    </footer>
  );
}

function LegalModal({ page, onClose }: { page: "confidentialite" | "mentions"; onClose: () => void }) {
  useScrollLock(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-cream-50 p-6 shadow-lift"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-xl font-bold text-cocoa-900">
            {page === "confidentialite" ? "Politique de confidentialité" : "Mentions légales"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white shadow-soft ring-1 ring-cocoa-900/5"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-cocoa-700/85">
          {page === "confidentialite" ? (
            <>
              <p>
                {restaurant.name} ne collecte aucune donnée personnelle via ce site. Aucun cookie de suivi n’est
                déposé. Le contenu de votre panier est conservé uniquement dans le stockage local de votre
                navigateur.
              </p>
              <p>
                Lorsque vous cliquez sur « Commander sur WhatsApp », vous êtes redirigé vers l’application
                WhatsApp. Les échanges sont régis par la politique de confidentialité de WhatsApp.
              </p>
              <p>Pour toute question, écrivez-nous à {restaurant.email}.</p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-cocoa-900">Éditeur :</strong> {restaurant.name} — {fullAddress}.
                Téléphone : {restaurant.phone}. Email : {restaurant.email}.
              </p>
              <p>
                <strong className="text-cocoa-900">Directeur de la publication :</strong> la direction de{" "}
                {restaurant.name}.
              </p>
              <p>
                <strong className="text-cocoa-900">Hébergement :</strong> Vercel Inc.
              </p>
              <p>
                <strong className="text-cocoa-900">Propriété intellectuelle :</strong> l’ensemble des contenus
                est la propriété de {restaurant.name}. Toute reproduction est interdite sans autorisation.
              </p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
