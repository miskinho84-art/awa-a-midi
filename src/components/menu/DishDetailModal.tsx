import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Clock, Flame, X } from "lucide-react";
import { categories, spiceLabels, type Dish } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useDishDetail } from "@/context/DishDetailContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollLock } from "@/hooks/useScrollLock";
import { formatPrice } from "@/lib/format";
import { singleDishLink } from "@/lib/whatsapp";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { DishBadgePill } from "./DishBadge";

const MAX_QUANTITY = 20;

const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const sheetVariants = { hidden: { y: "100%" }, visible: { y: 0 } };
const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export function DishDetailModal() {
  const { dish, closeDish } = useDishDetail();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const restoreFocus = useRef<HTMLElement | null>(null);

  useScrollLock(dish !== null);

  useEffect(() => {
    if (!dish) return;
    restoreFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      restoreFocus.current?.focus({ preventScroll: true });
    };
  }, [dish, closeDish]);

  return (
    <AnimatePresence>
      {dish && (
        <motion.div
          key="dish-detail"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6"
        >
          <div className="absolute inset-0 bg-cocoa-900/55" onClick={closeDish} aria-hidden="true" />
          <motion.div
            key={dish.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-detail-title"
            variants={isDesktop ? dialogVariants : sheetVariants}
            transition={
              isDesktop
                ? { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                : { type: "spring", damping: 30, stiffness: 280 }
            }
            className="relative w-full md:max-w-3xl"
          >
            <DishDetailPanel dish={dish} onClose={closeDish} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DishDetailPanel({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const category = categories.find((c) => c.id === dish.category);
  const total = dish.price * quantity;

  useEffect(() => {
    const id = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 80);
    return () => window.clearTimeout(id);
  }, []);

  const handleAdd = () => {
    if (!dish.available) return;
    addItem(dish, quantity);
    setAdded(true);
    window.setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="max-h-[92vh] overflow-y-auto rounded-t-3xl bg-cream-50 shadow-lift md:rounded-3xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream-100 md:aspect-[21/9]">
        <img src={dish.image} alt={dish.name} className="size-full object-cover" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/95 text-cocoa-900 shadow-soft"
        >
          <X className="size-5" />
        </button>
        {dish.badge && <DishBadgePill badge={dish.badge} className="absolute left-4 top-4" />}
      </div>

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-terracotta-600">
              {category?.emoji} {category?.label}
            </p>
            <h2 id="dish-detail-title" className="mt-1 font-display text-2xl font-bold text-cocoa-900 md:text-3xl">
              {dish.emoji} {dish.name}
            </h2>
          </div>
          <p className="font-display text-2xl font-bold text-terracotta-600">{formatPrice(dish.price)}</p>
        </div>

        <p className="mt-4 text-cocoa-700/85 leading-relaxed">
          {dish.longDescription || dish.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-cocoa-700/70">
          {dish.prepTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4 text-terracotta-500" />
              {dish.prepTime}
            </span>
          )}
          {dish.spiceLevel !== undefined && (
            <span className="inline-flex items-center gap-1.5">
              <Flame className="size-4 text-terracotta-500" />
              {spiceLabels[dish.spiceLevel]}
            </span>
          )}
        </div>

        {dish.ingredients && dish.ingredients.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-cocoa-700/60">Ingrédients</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {dish.ingredients.map((ing) => (
                <li key={ing} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-cocoa-800 shadow-sm ring-1 ring-cocoa-900/5">
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <QuantityStepper
            name={dish.name}
            quantity={quantity}
            onIncrement={() => setQuantity((q) => Math.min(MAX_QUANTITY, q + 1))}
            onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
            min={1}
            max={MAX_QUANTITY}
            size="md"
          />
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              onClick={handleAdd}
              disabled={!dish.available}
              size="lg"
              icon={added ? <Check className="size-5" /> : undefined}
            >
              {added ? "Ajouté !" : `Ajouter · ${formatPrice(total)}`}
            </Button>
            <Button
              href={singleDishLink(dish)}
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon />}
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
