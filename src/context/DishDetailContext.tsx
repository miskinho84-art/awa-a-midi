/**
 * 🍽️ FICHE DÉTAIL D'UN PLAT
 * État global : quel plat est actuellement ouvert dans la modale de détail.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Dish } from "@/data/menu";

interface DishDetailValue {
  dish: Dish | null;
  openDish: (dish: Dish) => void;
  closeDish: () => void;
}

const DishDetailContext = createContext<DishDetailValue | null>(null);

export function DishDetailProvider({ children }: { children: ReactNode }) {
  const [dish, setDish] = useState<Dish | null>(null);
  const openDish = useCallback((next: Dish) => setDish(next), []);
  const closeDish = useCallback(() => setDish(null), []);
  const value = useMemo(() => ({ dish, openDish, closeDish }), [dish, openDish, closeDish]);
  return <DishDetailContext.Provider value={value}>{children}</DishDetailContext.Provider>;
}

export function useDishDetail(): DishDetailValue {
  const ctx = useContext(DishDetailContext);
  if (!ctx) throw new Error("useDishDetail doit être utilisé à l'intérieur de <DishDetailProvider>");
  return ctx;
}
