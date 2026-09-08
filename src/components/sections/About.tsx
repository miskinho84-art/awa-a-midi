import { restaurant } from "@/config/restaurant";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="a-propos" className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="À propos" subtitle={restaurant.description} />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <img
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Intérieur du restaurant"
            className="rounded-2xl object-cover shadow-soft"
          />
          <div className="flex flex-col justify-center">
            <p className="text-cocoa-700 leading-relaxed">
              Depuis {restaurant.foundedYear}, {restaurant.name} vous accueille à {restaurant.address.city} pour découvrir une cuisine africaine contemporaine préparée avec passion.
            </p>
            <p className="mt-4 text-cocoa-700 leading-relaxed">
              Commandez facilement via WhatsApp et venez savourez nos plats emblématiques.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
