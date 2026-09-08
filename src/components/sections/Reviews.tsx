import { reviews } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Reviews() {
  return (
    <section id="avis" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Avis clients" subtitle="Ce qu'ils disent de nous" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <article key={r.id} className="rounded-2xl bg-white p-6 shadow-soft">
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="mt-3 text-cocoa-700">"{r.text}"</p>
              <p className="mt-4 font-semibold text-cocoa-900">{r.author}</p>
              {r.context && <p className="text-xs text-cocoa-500">{r.context}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
