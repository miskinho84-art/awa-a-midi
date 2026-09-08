/**
 * 🛒 SYSTÈME DE PANIER
 * État global du panier (ajout, quantités, suppression, total),
 * persistance locale et ouverture du tiroir.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { dishes, type Dish } from "@/data/menu";
import type { CartItem, OrderMode } from "@/types/cart";

const STORAGE_KEY = "awa-a-midi:cart:v1";
const MAX_QUANTITY = 20;

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "add"; dish: Dish; quantity: number }
  | { type: "remove"; id: string }
  | { type: "set"; id: string; quantity: number }
  | { type: "clear" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((i) => i.dish.id === action.dish.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.dish.id === action.dish.id
              ? { ...i, quantity: Math.min(MAX_QUANTITY, i.quantity + action.quantity) }
              : i,
          ),
        };
      }
      return { items: [...state.items, { dish: action.dish, quantity: action.quantity }] };
    }
    case "remove":
      return { items: state.items.filter((i) => i.dish.id !== action.id) };
    case "set": {
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.dish.id !== action.id) };
      }
      return {
        items: state.items.map((i) =>
          i.dish.id === action.id ? { ...i, quantity: Math.min(MAX_QUANTITY, action.quantity) } : i,
        ),
      };
    }
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

function loadInitialState(): CartState {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as { id: string; quantity: number }[];
    const items = parsed
      .map(({ id, quantity }) => {
        const dish = dishes.find((d) => d.id === id);
        if (!dish || !dish.available) return null;
        return { dish, quantity: Math.min(MAX_QUANTITY, Math.max(1, Number(quantity) || 1)) };
      })
      .filter((i): i is CartItem => i !== null);
    return { items };
  } catch {
    return { items: [] };
  }
}

export interface LastAdded {
  dish: Dish;
  token: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  mode: OrderMode;
  note: string;
  lastAdded: LastAdded | null;
  addItem: (dish: Dish, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setMode: (mode: OrderMode) => void;
  setNote: (note: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<OrderMode>("a-emporter");
  const [note, setNote] = useState("");
  const [lastAdded, setLastAdded] = useState<LastAdded | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state.items.map((i) => ({ id: i.dish.id, quantity: i.quantity }))),
      );
    } catch {
      /* ignore */
    }
  }, [state.items]);

  const addItem = useCallback((dish: Dish, quantity = 1) => {
    if (!dish.available) return;
    dispatch({ type: "add", dish, quantity });
    setLastAdded({ dish, token: Date.now() });
  }, []);

  const removeItem = useCallback((id: string) => dispatch({ type: "remove", id }), []);
  const setQuantity = useCallback(
    (id: string, quantity: number) => dispatch({ type: "set", id, quantity }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const increment = useCallback(
    (id: string) => {
      const item = state.items.find((i) => i.dish.id === id);
      if (item) dispatch({ type: "set", id, quantity: item.quantity + 1 });
    },
    [state.items],
  );
  const decrement = useCallback(
    (id: string) => {
      const item = state.items.find((i) => i.dish.id === id);
      if (item) dispatch({ type: "set", id, quantity: item.quantity - 1 });
    },
    [state.items],
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const count = useMemo(() => state.items.reduce((s, i) => s + i.quantity, 0), [state.items]);
  const total = useMemo(
    () => state.items.reduce((s, i) => s + i.quantity * i.dish.price, 0),
    [state.items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      count,
      total,
      isOpen,
      mode,
      note,
      lastAdded,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
      clear,
      openCart,
      closeCart,
      toggleCart,
      setMode,
      setNote,
    }),
    [
      state.items,
      count,
      total,
      isOpen,
      mode,
      note,
      lastAdded,
      addItem,
      removeItem,
      setQuantity,
      increment,
      decrement,
      clear,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>");
  return ctx;
}
