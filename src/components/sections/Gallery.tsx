import { galleryItems } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Gallery() {
  return (
    <section className="bg-cream-100 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Galerie" subtitle="Quelques instants gourmands" />
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {galleryItems.map((item) => (
            <figure key={item.id} className="overflow-hidden rounded-xl">
              <img src={item.src} alt={item.alt} className="h-40 w-full object-cover transition hover:scale-105 md:h-48" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
