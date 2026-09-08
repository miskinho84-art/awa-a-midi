import type { Dish } from "@/data/menu";

export interface CartItem {
  dish: Dish;
  quantity: number;
}

export type OrderMode = "sur-place" | "a-emporter" | "livraison";

export const orderModes: { id: OrderMode; label: string; emoji: string }[] = [
  { id: "sur-place", label: "Sur place", emoji: "🍽️" },
  { id: "a-emporter", label: "À emporter", emoji: "🥡" },
  { id: "livraison", label: "Livraison", emoji: "🛵" },
];
