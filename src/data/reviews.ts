/**
 * ⭐ AVIS CLIENTS — données de démonstration.
 * Remplacez / ajoutez simplement des entrées dans ce tableau.
 */
export interface Review {
  id: string;
  author: string;
  /** Note sur 5 */
  rating: number;
  text: string;
  /** Contexte affiché sous le nom (optionnel) */
  context?: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Aïcha K.",
    rating: 5,
    text: "Une très belle découverte. Les plats sont délicieux et les portions généreuses !",
    context: "Déjeuner entre amies",
  },
  {
    id: "r2",
    author: "Moussa D.",
    rating: 5,
    text: "Le poulet braisé est tout simplement incroyable. Je commande sur WhatsApp toutes les semaines, c’est rapide et pratique.",
    context: "Client régulier",
  },
  {
    id: "r3",
    author: "Fatou S.",
    rating: 5,
    text: "Enfin un restaurant où l’attiéké poisson a le vrai goût de la maison. Service souriant et accueil chaleureux.",
    context: "Dîner en famille",
  },
  {
    id: "r4",
    author: "Jean-Marc A.",
    rating: 4,
    text: "Cadre agréable, ambiance conviviale et cuisine généreuse. Parfait pour la pause déjeuner entre collègues.",
    context: "Pause déjeuner",
  },
  {
    id: "r5",
    author: "Mariam T.",
    rating: 5,
    text: "Le jus de bissap maison est un délice, et le dèguè en dessert… on en redemande !",
    context: "Goûter gourmand",
  },
  {
    id: "r6",
    author: "Kouassi B.",
    rating: 5,
    text: "Commande passée sur WhatsApp à 12h05, plat prêt à 12h30. Efficace, chaud et savoureux.",
    context: "Commande à emporter",
  },
  {
    id: "r7",
    author: "Nadia O.",
    rating: 5,
    text: "Les alloco sont croustillants à souhait et la sauce pimentée relevée comme il faut. Un vrai régal.",
    context: "Première visite",
  },
];
