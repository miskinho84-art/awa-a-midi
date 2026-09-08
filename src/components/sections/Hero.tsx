import { restaurant } from "@/config/restaurant";
import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="accueil" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-cream-100 via-cream-50 to-terracotta-50 pt-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-600">{restaurant.cuisine}</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-cocoa-900 md:text-6xl">
          {restaurant.name}
        </h1>
        <p className="mt-4 text-lg text-cocoa-600 md:text-xl">{restaurant.tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="#menu">
            <Button>Voir le menu</Button>
          </a>
          <a href={whatsappLink(generalOrderMessage)} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary">Commander WhatsApp</Button>
          </a>
        </div>
      </div>
    </section>
  );
}
