/**
 * =====================================================================
 *  ⚙️  CONFIGURATION DU RESTAURANT — AWA À MIDI
 * ---------------------------------------------------------------------
 *  Toutes les informations susceptibles de changer sont centralisées
 *  ici (numéro WhatsApp, téléphone, adresse, horaires, réseaux sociaux…).
 *  Modifiez uniquement ce fichier : le reste du site se met à jour seul.
 * =====================================================================
 */

/**
 * 📱 Numéro WhatsApp du restaurant.
 * Format international, SANS "+" ni espaces. Exemple : 2250701020304
 */
export const WHATSAPP_NUMBER = "2250700000000";

export interface OpeningHour {
  /** Nom complet du jour */
  day: string;
  /** Index JavaScript du jour (0 = dimanche, 1 = lundi, …) */
  dayIndex: number;
  /** Heure d'ouverture "HH:MM" (null = fermé) */
  open: string | null;
  /** Heure de fermeture "HH:MM" (null = fermé) */
  close: string | null;
}

export interface Stat {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  description: string;
  cuisine: string;
  foundedYear: number;
  copyrightYear: number;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
    countryCode: string;
    /** Requête utilisée pour le bouton et la carte Google Maps */
    mapsQuery: string;
  };
  siteUrl: string;
  currency: string;
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  hours: OpeningHour[];
  stats: Stat[];
}

export const restaurant: RestaurantConfig = {
  name: "AWA à Midi",
  tagline: "Le goût qui vous donne rendez-vous à midi.",
  description:
    "Découvrez nos plats préparés avec passion et commandez directement sur WhatsApp.",
  cuisine: "Cuisine africaine contemporaine",
  foundedYear: 2019,
  copyrightYear: 2026,

  whatsappNumber: WHATSAPP_NUMBER,
  phone: "+225 07 00 00 00 00",
  email: "contact@awaamidi.com",

  address: {
    street: "Rue des Jardins, Cocody Riviera 2",
    city: "Abidjan",
    country: "Côte d’Ivoire",
    countryCode: "CI",
    mapsQuery: "Rue des Jardins, Cocody Riviera 2, Abidjan, Côte d'Ivoire",
  },

  siteUrl: "https://awaamidi.com",
  currency: "FCFA",

  socials: {
    instagram: "https://instagram.com/awaamidi",
    facebook: "https://facebook.com/awaamidi",
    tiktok: "https://tiktok.com/@awaamidi",
  },

  /** 🕐 Horaires d'ouverture — modifiez librement */
  hours: [
    { day: "Lundi", dayIndex: 1, open: "11:00", close: "22:00" },
    { day: "Mardi", dayIndex: 2, open: "11:00", close: "22:00" },
    { day: "Mercredi", dayIndex: 3, open: "11:00", close: "22:00" },
    { day: "Jeudi", dayIndex: 4, open: "11:00", close: "22:00" },
    { day: "Vendredi", dayIndex: 5, open: "11:00", close: "23:00" },
    { day: "Samedi", dayIndex: 6, open: "11:00", close: "23:00" },
    { day: "Dimanche", dayIndex: 0, open: "12:00", close: "21:00" },
  ],

  /** 📊 Chiffres clés affichés sur le site */
  stats: [
    { value: 500, suffix: "+", label: "Clients satisfaits" },
    { value: 20, suffix: "+", label: "Plats proposés" },
    { value: 4.9, decimals: 1, suffix: "/5", label: "Note moyenne" },
    { value: 7, suffix: "j/7", label: "Pour vous servir" },
  ],
};

/* ---------- Valeurs dérivées (ne pas modifier) ---------- */

export const phoneHref = `tel:${restaurant.phone.replace(/[^\d+]/g, "")}`;

export const fullAddress = `${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.country}`;

export const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  restaurant.address.mapsQuery,
)}`;

/** URL de la carte intégrée (iframe). Remplaçable par un lien "Intégrer une carte" de Google Maps. */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  restaurant.address.mapsQuery,
)}&output=embed&hl=fr`;
