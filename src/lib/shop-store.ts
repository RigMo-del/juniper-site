import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = { id: string; qty: number };

export type Click = {
  id: string;
  productId: string;
  price: number;
  ratePct: number;
  commission: number;
  at: number;
};

type ShopState = {
  tag: string;
  ratePct: number;
  cart: CartLine[];
  saved: string[];
  recent: string[];
  clicks: Click[];
  setTag: (tag: string) => void;
  setRatePct: (n: number) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  toggleSaved: (id: string) => void;
  view: (id: string) => void;
  track: (productId: string, price: number, ratePct: number) => void;
  clearClicks: () => void;
};

function cleanTag(raw: string) {
  return raw.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 32);
}

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      tag: "juniper-20",
      ratePct: 4,
      cart: [],
      saved: [],
      recent: [],
      clicks: [],
      setTag: (tag) => set({ tag: cleanTag(tag) }),
      setRatePct: (n) => {
        if (!Number.isFinite(n)) return;
        set({ ratePct: Math.min(20, Math.max(0, Math.round(n * 2) / 2)) });
      },
      add: (id) =>
        set((state) => {
          const hit = state.cart.find((line) => line.id === id);
          if (!hit) return { cart: [...state.cart, { id, qty: 1 }] };
          return {
            cart: state.cart.map((line) =>
              line.id === id ? { ...line, qty: Math.min(9, line.qty + 1) } : line,
            ),
          };
        }),
      setQty: (id, qty) =>
        set((state) => ({
          cart:
            qty <= 0
              ? state.cart.filter((line) => line.id !== id)
              : state.cart.map((line) =>
                  line.id === id ? { ...line, qty: Math.min(9, qty) } : line,
                ),
        })),
      remove: (id) => set((state) => ({ cart: state.cart.filter((line) => line.id !== id) })),
      toggleSaved: (id) =>
        set((state) => ({
          saved: state.saved.includes(id)
            ? state.saved.filter((item) => item !== id)
            : [id, ...state.saved],
        })),
      view: (id) =>
        set((state) => ({
          recent: [id, ...state.recent.filter((item) => item !== id)].slice(0, 8),
        })),
      track: (productId, price, ratePct) =>
        set((state) => ({
          clicks: [
            {
              id: crypto.randomUUID(),
              productId,
              price,
              ratePct,
              commission: Math.round(price * ratePct) / 100,
              at: Date.now(),
            },
            ...state.clicks,
          ].slice(0, 300),
        })),
      clearClicks: () => set({ clicks: [] }),
    }),
    { name: "juniper-shop", skipHydration: true },
  ),
);
