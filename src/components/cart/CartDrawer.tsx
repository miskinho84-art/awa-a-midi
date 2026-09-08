import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { buildCartMessage, whatsappLink } from "@/lib/whatsapp";
import { orderModes } from "@/types/cart";
import { useScrollLock } from "@/hooks/useScrollLock";

export function CartDrawer() {
  const { items, total, isOpen, closeCart, removeItem, setQuantity, mode, setMode, note, setNote } = useCart();
  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-display text-xl font-bold">Votre panier</h2>
          <button onClick={closeCart} className="text-2xl text-cocoa-500">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="text-center text-cocoa-500">Votre panier est vide</p>
          ) : (
            <ul className="space-y-4">
              {items.map(({ dish, quantity }) => (
                <li key={dish.id} className="flex gap-3">
                  <img src={dish.image} alt="" className="size-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="font-semibold">{dish.name}</p>
                    <p className="text-sm text-terracotta-600">{formatPrice(dish.price)}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <button onClick={() => setQuantity(dish.id, quantity - 1)} className="size-7 rounded-full bg-cream-200">-</button>
                      <span>{quantity}</span>
                      <button onClick={() => setQuantity(dish.id, quantity + 1)} className="size-7 rounded-full bg-cream-200">+</button>
                      <button onClick={() => removeItem(dish.id)} className="ml-auto text-xs text-red-500">Suppr.</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t p-5">
            <div className="mb-3 flex gap-2">
              {orderModes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`rounded-full px-3 py-1 text-xs ${mode === m.id ? "bg-terracotta-500 text-white" : "bg-cream-200"}`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Précision (optionnel)"
              className="mb-3 w-full rounded-xl border p-2 text-sm"
              rows={2}
            />
            <p className="mb-3 text-lg font-bold">Total : {formatPrice(total)}</p>
            <a
              href={whatsappLink(buildCartMessage(items, { mode, note }))}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-[#25D366] py-3 text-center font-semibold text-white"
            >
              Commander sur WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
