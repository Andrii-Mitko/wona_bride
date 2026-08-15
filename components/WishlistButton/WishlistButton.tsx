"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import type { Dress } from "@/types/dress";

import css from "./WishlistButton.module.css";

type Props = {
  dress: Dress;
  variant?: "overlay" | "inline";
};

export default function WishlistButton({ dress, variant = "overlay" }: Props) {
  const isInWishlist = useWishlistStore((state) =>
    state.isInWishlist(dress._id),
  );

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleWishlist(dress);
      }}
      className={`${css.button} ${css[variant]} ${
        isInWishlist ? css.active : ""
      }`}
      aria-label={isInWishlist ? "Видалити з обраного" : "Додати до обраного"}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" className={css.icon}>
        <path
          d="M12 21s-6.7-4.35-9.33-8.6C1.1 9.9 1.7 6.6 4.6 5.1
             c2.2-1.15 4.6-.35 5.9 1.4l1.5 2 1.5-2c1.3-1.75 3.7-2.55 5.9-1.4
             c2.9 1.5 3.5 4.8 1.93 7.3C18.7 16.65 12 21 12 21z"
        />
      </svg>
    </button>
  );
}
