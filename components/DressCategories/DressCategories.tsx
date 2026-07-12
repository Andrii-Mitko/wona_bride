"use client";

import css from "./DressCategories.module.css";
import { dressCategories } from "@/data/categories";

type Props = {
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function DressCategories({ activeCategory, onChange }: Props) {
  return (
    <ul className={css.list}>
      {dressCategories.map((category) => (
        <li key={category.id}>
          <button
            className={`${css.button} ${
              activeCategory === category.id ? css.active : ""
            }`}
            onClick={() => onChange(category.id)}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
