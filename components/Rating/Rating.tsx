"use client";

import { useState } from "react";

import css from "./Rating.module.css";

type RatingProps = {
  value?: number;
  onChange?: (value: number) => void;
};

export default function Rating({ value = 0, onChange }: RatingProps) {
  const [rating, setRating] = useState(value);

  const handleClick = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className={css.rating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={css.starButton}
          onClick={() => handleClick(star)}
          aria-label={`Оцінка ${star}`}
        >
          <svg className={css.star}>
            <use
              href={`/icons/icons.svg#${
                star <= rating ? "icon-star" : "icon-star-outline"
              }`}
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
