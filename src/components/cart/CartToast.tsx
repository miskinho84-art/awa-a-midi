import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export function CartToast() {
  const { lastAdded } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, [lastAdded]);

  if (!visible || !lastAdded) return null;

  return (
    <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-cocoa-900 px-5 py-2.5 text-sm text-white shadow-lift">
      {lastAdded.dish.emoji} {lastAdded.dish.name} ajouté
    </div>
  );
}
