"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { Dress } from "@/types/dress";

type CartStore = {
  items: CartItem[];

  addToCart: (dress: Dress, size: string) => void;

  removeFromCart: (id: string, size: string) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (dress, size) =>
        set((state) => {
          const exists = state.items.some(
            (item) =>
              item.dress._id === dress._id && item.selectedSize === size,
          );

          if (exists) {
            return state;
          }

          return {
            items: [
              ...state.items,
              {
                dress,
                selectedSize: size,
                quantity: 1,
              },
            ],
          };
        }),

      removeFromCart: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.dress._id === id && item.selectedSize === size),
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "wona-cart",
    },
  ),
);
