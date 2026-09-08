/**
 * 📸 GALERIE — remplacez les images par vos propres photos.
 * size : "lg" (2×2) | "tall" (1×2) | "wide" (2×1) | "sm" (1×1)
 */
import { pexels } from "./menu";

export interface GalleryItem {
  id: string;
  src: string;
  /** Version haute définition pour le plein écran (optionnel) */
  full?: string;
  alt: string;
  caption: string;
  size: "lg" | "tall" | "wide" | "sm";
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: pexels(1640777, 600, 600),
    alt: "Poulet braisé servi avec alloco et salade fraîche",
    caption: "Poulet braisé maison",
    size: "lg",
  },
  {
    id: "g2",
    src: pexels(7944334, 600, 900),
    full: pexels(7944334, 1200, 1800),
    alt: "Viande grillée sur les flammes du barbecue",
    caption: "Au feu de bois",
    size: "tall",
  },
  {
    id: "g3",
    src: pexels(34467117, 700, 700),
    full: pexels(34467117, 1400, 1400),
    alt: "Jus de bissap frais servi avec du citron vert",
    caption: "Jus de bissap",
    size: "sm",
  },
  {
    id: "g4",
    src: pexels(1640774, 600, 600),
    alt: "Attiéké poisson avec tomates et oignons",
    caption: "Attiéké poisson",
    size: "sm",
  },
  {
    id: "g5",
    src: pexels(262978, 800, 500),
    alt: "Salle du restaurant AWA à Midi, chaleureuse et lumineuse",
    caption: "Notre salle",
    size: "wide",
  },
  {
    id: "g6",
    src: pexels(35185310, 700, 700),
    full: pexels(35185310, 1400, 1400),
    alt: "Épices colorées dans des bols",
    caption: "Nos épices",
    size: "sm",
  },
  {
    id: "g7",
    src: pexels(1640776, 600, 600),
    alt: "Dèguè à la mangue servi dans un verre",
    caption: "Douceurs maison",
    size: "sm",
  },
  {
    id: "g8",
    src: pexels(28459125, 700, 700),
    full: pexels(28459125, 1400, 1400),
    alt: "Cuisiniers en pleine préparation en cuisine",
    caption: "En cuisine",
    size: "sm",
  },
  {
    id: "g9",
    src: pexels(3937193, 1200, 700),
    full: pexels(3937193, 1600, 1000),
    alt: "Groupe d'amis partageant un repas convivial",
    caption: "Moments partagés",
    size: "wide",
  },
];
