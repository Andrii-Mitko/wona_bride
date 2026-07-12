"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Category } from "@/types/category";

import css from "./DressCategories.module.css";

type Props = {
  categories: Category[];
  activeCategory: string;
};

export default function DressCategories({ categories, activeCategory }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(category: string) {
    const params = new URLSearchParams(searchParams);

    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const query = params.toString();

    router.push(`/catalog${query ? `?${query}` : ""}`);
  }

  return (
    <ul className={css.list}>
      {categories.map((category) => (
        <li key={category.id}>
          <button
            type="button"
            onClick={() => handleClick(category.id)}
            className={`${css.button} ${
              activeCategory === category.id ? css.active : ""
            }`}
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
