import { useCart } from "@/context/CartContext";
import { formatPrice, pluralize } from "@/lib/format";

export function CartBar() {
  const { count, total, openCart, isOpen } = useCart();
  if (count === 0 || isOpen) return null;
  return (
    <div className="fixed bottom-4 left-4 right-20 z-40 md:hidden">
      <button
        onClick={openCart}
        className="flex w-full items-center justify-between rounded-2xl bg-cocoa-900 px-4 py-3 text-white shadow-lift"
      >
        <span className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-terracotta-500 text-sm font-bold">{count}</span>
          <span className="text-left text-sm">
            <span className="block text-xs text-white/60">Votre panier</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </span>
        </span>
        <span className="text-sm font-semibold">Commander →</span>
      </button>
    </div>
  );
}
