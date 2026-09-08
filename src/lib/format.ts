import { restaurant } from "@/config/restaurant";

/** 3500 → "3 500" */
export function formatNumber(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** 3500 → "3 500 FCFA" */
export function formatPrice(n: number): string {
  return `${formatNumber(n)} ${restaurant.currency}`;
}

export function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count > 1 ? plural : singular;
}
