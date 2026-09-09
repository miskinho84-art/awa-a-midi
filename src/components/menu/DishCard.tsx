import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, Plus } from "lucide-react";
import type { Dish } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useDishDetail } from "@/context/DishDetailContext";
import { formatPrice } from "@/lib/format";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DishBadgePill } from "./DishBadge";

interface DishCardProps {
  dish: Dish;
  index?: number;
}

export function DishCard({ dish, index = 0 }: DishCardProps) {
  const { addItem } = useCart();
  const { openDish } = useDishDetail();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: MouseEvent) => {
    e.stopPropagation();
    if (!dish.available) return;
    addItem(dish);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleOpen = (e?: MouseEvent) => {
    e?.stopPropagation();
    openDish(dish);
  };

  return (
    <Reveal delay={(index % 3) * 0.08} y={24} className="h-full">
      <article
        onClick={() => openDish(dish)}
        className={cn(
          "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-cocoa-900/5 transition-[translate,box-shadow] duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-lift",
          !dish.available && "opacity-75",
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
          <button
            type="button"
            onClick={handleOpen}
            aria-label={`Voir le détail : ${dish.name}`}
            className="relative block size-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-terracotta-500/70"
          >
            <img
              src={dish.image}
              alt={dish.name}
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
              className="size-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa-900/30 via-transparent to-transparent"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-cocoa-900 shadow-sm transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <Eye className="size-3.5" />
              Voir le plat
            </span>
          </button>

          {dish.badge && <DishBadgePill badge={dish.badge} className="pointer-events-none absolute left-4 top-4" />}

          {!dish.available && (
            <span className="pointer-events-none absolute inset-0 grid place-items-center bg-cocoa-900/45 text-sm font-bold uppercase tracking-wider text-white">
              Indisponible
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-cocoa-900">
              {dish.emoji} {dish.name}
            </h3>
          </div>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-cocoa-700/75">{dish.description}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-display text-lg font-bold text-terracotta-600">{formatPrice(dish.price)}</span>
            <Button
              size="sm"
              onClick={handleAdd}
              disabled={!dish.available}
              icon={
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="size-4" />
                    </motion.span>
                  ) : (
                    <motion.span key="plus" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Plus className="size-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              }
            >
              {added ? "Ajouté" : "Ajouter"}
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
