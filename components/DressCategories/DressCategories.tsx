"use client";

import Link from "next/link";
import css from "./DressCategories.module.css";
import { categories } from "@/data/categories";

type Props = {
  categories: typeof categories;
  activeCategory: string;
};

export default function DressCategories({ categories, activeCategory }: Props) {
  return (
    <ul className={css.list}>
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={
              category.id === "all"
                ? "/catalog"
                : `/catalog?category=${category.id}`
            }
            className={`${css.button} ${
              activeCategory === category.id ? css.active : ""
            }`}
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
