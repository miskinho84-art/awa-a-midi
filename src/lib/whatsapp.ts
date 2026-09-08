/**
 * 💬 SYSTÈME DE COMMANDE WHATSAPP
 * Génère les liens "wa.me" avec un message pré-rempli.
 * Le numéro provient de la configuration centrale (WHATSAPP_NUMBER).
 */
import { restaurant } from "@/config/restaurant";
import type { Dish } from "@/data/menu";
import { orderModes, type CartItem, type OrderMode } from "@/types/cart";
import { formatPrice } from "./format";

/** Construit un lien WhatsApp vers le restaurant avec un message pré-rempli */
export function whatsappLink(message: string): string {
  return `https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const greeting = `Bonjour ${restaurant.name} 👋`;

/** Message pour la commande directe d'un seul plat (quantité optionnelle) */
export function buildSingleDishMessage(dish: Dish, quantity = 1): string {
  const qty = Math.max(1, Math.floor(quantity));
  const lines =
    qty > 1
      ? [
          `${dish.emoji} ${dish.name} × ${qty}`,
          `💰 ${formatPrice(dish.price * qty)} (${qty} × ${formatPrice(dish.price)})`,
        ]
      : [`${dish.emoji} ${dish.name}`, `💰 ${formatPrice(dish.price)}`];

  return [
    greeting,
    "",
    "Je souhaite commander :",
    "",
    ...lines,
    "",
    "Merci de me confirmer la disponibilité.",
  ].join("\n");
}

export interface CartMessageOptions {
  mode?: OrderMode;
  note?: string;
}

/** Message pour une commande complète (panier) */
export function buildCartMessage(items: CartItem[], options: CartMessageOptions = {}): string {
  const total = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  const lines = items.map(
    ({ dish, quantity }) =>
      `${dish.emoji} ${dish.name} × ${quantity} — ${formatPrice(dish.price * quantity)}`,
  );
  const modeLabel = orderModes.find((m) => m.id === options.mode);
  const extras: string[] = [];
  if (modeLabel) extras.push(`${modeLabel.emoji} Mode : ${modeLabel.label}`);
  if (options.note?.trim()) extras.push(`📝 Précision : ${options.note.trim()}`);

  return [
    greeting,
    "",
    "Je souhaite passer la commande suivante :",
    "",
    ...lines,
    "",
    `Total : ${formatPrice(total)}`,
    ...(extras.length ? ["", ...extras] : []),
    "",
    "Merci de confirmer ma commande.",
  ].join("\n");
}

/** Message générique (bouton flottant, contact, hero) */
export const generalOrderMessage = [
  greeting,
  "",
  "Je souhaite passer une commande. Pouvez-vous me confirmer les plats disponibles aujourd’hui ?",
  "",
  "Merci !",
].join("\n");

export const contactMessage = [
  greeting,
  "",
  "J’aimerais avoir quelques informations, s’il vous plaît.",
].join("\n");

export const singleDishLink = (dish: Dish, quantity = 1) =>
  whatsappLink(buildSingleDishMessage(dish, quantity));
