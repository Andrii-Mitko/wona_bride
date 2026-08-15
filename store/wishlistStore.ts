"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Dress } from "@/types/dress";

type WishlistStore = {
  items: Dress[];
  hasHydrated: boolean;

  addToWishlist: (dress: Dress) => void;

  removeFromWishlist: (id: string) => void;

  isInWishlist: (id: string) => boolean;

  toggleWishlist: (dress: Dress) => void;

  setHasHydrated: (state: boolean) => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,

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

      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "wona-wishlist",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
