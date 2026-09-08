import { restaurant, type OpeningHour } from "@/config/restaurant";

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "11:00" → "11h00" */
export function formatHour(hhmm: string | null): string {
  if (!hhmm) return "—";
  const [h, m] = hhmm.split(":");
  return `${h}h${m}`;
}

export function formatRange(hour: OpeningHour): string {
  if (!hour.open || !hour.close) return "Fermé";
  return `${formatHour(hour.open)} – ${formatHour(hour.close)}`;
}

export function getTodayHours(date = new Date()): OpeningHour | undefined {
  return restaurant.hours.find((h) => h.dayIndex === date.getDay());
}

export function isOpenNow(date = new Date()): boolean {
  const today = getTodayHours(date);
  if (!today?.open || !today.close) return false;
  const now = date.getHours() * 60 + date.getMinutes();
  return now >= toMinutes(today.open) && now < toMinutes(today.close);
}

/** Jours schema.org pour les données structurées */
export const schemaDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
