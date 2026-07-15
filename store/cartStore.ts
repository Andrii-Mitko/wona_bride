"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";
import { Dress } from "@/types/dress";

type CartStore = {
  items: CartItem[];

  addToCart: (dress: Dress, size: string) => void;

  removeFromCart: (id: string, size: string) => void;

  increaseQuantity: (id: string, size: string) => void;

  decreaseQuantity: (id: string, size: string) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (dress, size) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.dress.id === dress.id && item.selectedSize === size,
          );

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.dress.id === dress.id && item.selectedSize === size
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                dress,
                quantity: 1,
                selectedSize: size,
              },
            ],
          };
        }),

      removeFromCart: (id, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.dress.id === id && item.selectedSize === size),
          ),
        })),

      increaseQuantity: (id, size) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.dress.id === id && item.selectedSize === size
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        })),

      decreaseQuantity: (id, size) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.dress.id === id && item.selectedSize === size
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "wona-cart",
    },
  ),
);
