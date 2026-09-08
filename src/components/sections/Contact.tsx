import { restaurant, googleMapsUrl, phoneHref } from "@/config/restaurant";
import { contactMessage, whatsappLink } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Contact" subtitle="Venez nous rendre visite ou passez commande" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p><strong>Adresse :</strong> {restaurant.address.street}, {restaurant.address.city}</p>
            <p><strong>Téléphone :</strong> <a href={phoneHref} className="text-terracotta-600">{restaurant.phone}</a></p>
            <p><strong>Email :</strong> {restaurant.email}</p>
            <a
              href={whatsappLink(contactMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white"
            >
              Nous écrire sur WhatsApp
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.address.mapsQuery)}&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              title="Localisation"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
