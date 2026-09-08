import { generalOrderMessage, whatsappLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-terracotta-500 py-20 text-center text-white">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Envie de goûter ?</h2>
        <p className="mt-4 text-lg text-white/90">Commandez maintenant directement sur WhatsApp</p>
        <a href={whatsappLink(generalOrderMessage)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
          <Button variant="ghost" className="bg-white text-terracotta-600 hover:bg-cream-100">
            Commander maintenant
          </Button>
        </a>
      </div>
    </section>
  );
}
