import { useState } from "react";
import { categories, getDishesByCategory, type FilterId } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

export function MenuSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  const dishes = getDishesByCategory(filter);
  const { addItem } = useCart();

  return (
    <section id="menu" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title="Notre Menu" subtitle="Des plats préparés avec passion" />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === cat.id ? "bg-terracotta-500 text-white" : "bg-cream-200 text-cocoa-700 hover:bg-cream-300"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <article key={dish.id} className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <img src={dish.image} alt={dish.name} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-bold text-cocoa-900">{dish.emoji} {dish.name}</h3>
                  {dish.badge && (
                    <span className="rounded-full bg-terracotta-100 px-2 py-0.5 text-xs font-semibold text-terracotta-700">
                      {dish.badge}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-cocoa-600 line-clamp-2">{dish.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-terracotta-600">{formatPrice(dish.price)}</span>
                  <button
                    onClick={() => addItem(dish)}
                    disabled={!dish.available}
                    className="rounded-full bg-terracotta-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-terracotta-600 disabled:opacity-50"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
