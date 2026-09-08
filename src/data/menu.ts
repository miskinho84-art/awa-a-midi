/**
 * MENU DU RESTAURANT AWA À MIDI
 */
export type CategoryId = "plats" | "accompagnements" | "boissons" | "desserts";
export type FilterId = CategoryId | "all";
export type DishBadge = "Populaire" | "Nouveau" | "Végétarien";
export type SpiceLevel = 0 | 1 | 2 | 3;

export interface Dish {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  highlights?: string[];
  ingredients?: string[];
  prepTime?: string;
  spiceLevel?: SpiceLevel;
  price: number;
  category: CategoryId;
  image: string;
  emoji: string;
  badge?: DishBadge;
  available: boolean;
  featured?: boolean;
}

export interface Category {
  id: FilterId;
  label: string;
  emoji: string;
}

export const categories: Category[] = [
  { id: "all", label: "Tous", emoji: "✨" },
  { id: "plats", label: "Plats", emoji: "🍗" },
  { id: "accompagnements", label: "Accompagnements", emoji: "🍌" },
  { id: "boissons", label: "Boissons", emoji: "🧃" },
  { id: "desserts", label: "Desserts", emoji: "🍨" },
];

export const spiceLabels: Record<SpiceLevel, string> = {
  0: "Doux",
  1: "Légèrement relevé",
  2: "Relevé",
  3: "Très relevé",
};

export const pexels = (id: number, w = 800, h = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const dishes: Dish[] = [
  {
    id: "poulet-braise",
    name: "Poulet braisé",
    description: "Poulet mariné aux épices, braisé lentement et servi avec alloco, salade fraîche et sauce pimentée maison.",
    longDescription: "Notre poulet est mariné 24 heures dans un mélange d’épices maison, puis braisé lentement au feu de bois.",
    highlights: ["Mariné 24h", "Braisé au feu de bois", "Alloco dorés"],
    ingredients: ["Poulet fermier", "Épices maison", "Alloco", "Sauce pimentée"],
    prepTime: "20 min",
    spiceLevel: 2,
    price: 3500,
    category: "plats",
    image: pexels(1640777),
    emoji: "🍗",
    badge: "Populaire",
    available: true,
    featured: true,
  },
  {
    id: "poulet-saute",
    name: "Poulet sauté",
    description: "Morceaux de poulet sautés aux légumes et épices, servi avec du riz.",
    price: 3000,
    category: "plats",
    image: pexels(1640772),
    emoji: "🍗",
    available: true,
  },
  {
    id: "attieke-poisson",
    name: "Attiéké poisson",
    description: "Attiéké frais accompagné de poisson grillé, tomates et oignons.",
    price: 4000,
    category: "plats",
    image: pexels(1640774),
    emoji: "🐟",
    badge: "Populaire",
    available: true,
  },
  {
    id: "attieke-poulet",
    name: "Attiéké poulet",
    description: "Attiéké accompagné de poulet braisé et sauce.",
    price: 3500,
    category: "plats",
    image: pexels(1640773),
    emoji: "🍗",
    available: true,
  },
  {
    id: "riz-sauce",
    name: "Riz sauce",
    description: "Riz blanc servi avec une sauce riche aux légumes et viande.",
    price: 2500,
    category: "plats",
    image: pexels(1640775),
    emoji: "🍚",
    available: true,
  },
  {
    id: "alloco",
    name: "Alloco",
    description: "Bananes plantain frites croustillantes.",
    price: 1500,
    category: "accompagnements",
    image: pexels(1640777),
    emoji: "🍌",
    available: true,
  },
  {
    id: "bissap",
    name: "Jus de bissap",
    description: "Jus de bissap frais maison, légèrement sucré.",
    price: 1000,
    category: "boissons",
    image: pexels(34467117),
    emoji: "🧃",
    badge: "Populaire",
    available: true,
  },
  {
    id: "degue",
    name: "Dèguè",
    description: "Yaourt onctueux au mil, mangue fraîche et noix de coco.",
    price: 1500,
    category: "desserts",
    image: pexels(1640776),
    emoji: "🍨",
    badge: "Nouveau",
    available: true,
  },
];

export const featuredDish: Dish = dishes.find((d) => d.featured) ?? dishes[0];

export const getDishesByCategory = (filter: FilterId) =>
  filter === "all" ? dishes : dishes.filter((d) => d.category === filter);
