"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Dress } from "@/types/dress";

type WishlistStore = {
  items: Dress[];

  addToWishlist: (dress: Dress) => void;

  removeFromWishlist: (id: string) => void;

  isInWishlist: (id: string) => boolean;

  toggleWishlist: (dress: Dress) => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (dress) =>
        set((state) => {
          const exists = state.items.some((item) => item._id === dress._id);

          if (exists) {
            return state;
          }

          return {
            items: [...state.items, dress],
          };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        })),

      isInWishlist: (id) => get().items.some((item) => item._id === id),

      toggleWishlist: (dress) => {
        const isAlreadyInWishlist = get().isInWishlist(dress._id);

        if (isAlreadyInWishlist) {
          get().removeFromWishlist(dress._id);
        } else {
          get().addToWishlist(dress);
        }
      },
    }),
    {
      name: "wona-wishlist",
    },
  ),
);
