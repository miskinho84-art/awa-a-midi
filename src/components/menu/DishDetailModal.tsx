import { useDishDetail } from "@/context/DishDetailContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { useScrollLock } from "@/hooks/useScrollLock";

export function DishDetailModal() {
  const { dish, closeDish } = useDishDetail();
  const { addItem } = useCart();
  useScrollLock(!!dish);

  if (!dish) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={closeDish} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <button onClick={closeDish} className="absolute right-4 top-4 text-2xl">×</button>
        <img src={dish.image} alt={dish.name} className="h-48 w-full rounded-xl object-cover" />
        <h2 className="mt-4 font-display text-2xl font-bold">{dish.emoji} {dish.name}</h2>
        <p className="mt-2 text-cocoa-600">{dish.longDescription || dish.description}</p>
        <p className="mt-4 text-xl font-bold text-terracotta-600">{formatPrice(dish.price)}</p>
        <button
          onClick={() => { addItem(dish); closeDish(); }}
          className="mt-6 w-full rounded-full bg-terracotta-500 py-3 font-semibold text-white"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
