import { restaurant } from "@/config/restaurant";
import { formatRange, isOpenNow } from "@/lib/hours";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Hours() {
  const open = isOpenNow();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <SectionHeading title="Horaires" />
        <p className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${
          open ? "bg-forest-100 text-forest-700" : "bg-red-100 text-red-700"
        }`}>
          {open ? "● Ouvert maintenant" : "● Fermé actuellement"}
        </p>
        <ul className="mt-8 space-y-2 text-left">
          {restaurant.hours.map((h) => (
            <li key={h.day} className="flex justify-between border-b border-cream-200 py-2">
              <span className="font-medium">{h.day}</span>
              <span className="text-cocoa-600">{formatRange(h)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
