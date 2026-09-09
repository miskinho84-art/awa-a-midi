import { useState } from "react";
import { categories, getDishesByCategory, type FilterId } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DishCard } from "@/components/menu/DishCard";
import { cn } from "@/utils/cn";

export function MenuSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  const dishes = getDishesByCategory(filter);

  return (
    <section id="menu" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading title="Notre Menu" subtitle="Des plats préparés avec passion, à emporter ou à déguster sur place" />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                filter === cat.id
                  ? "bg-terracotta-500 text-white shadow-glow"
                  : "bg-white text-cocoa-800 shadow-soft ring-1 ring-cocoa-900/5 hover:text-terracotta-600",
              )}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>

        {dishes.length === 0 && (
          <p className="mt-12 text-center text-cocoa-600">Aucun plat dans cette catégorie pour le moment.</p>
        )}
      </div>
    </section>
  );
}
