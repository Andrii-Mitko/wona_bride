import { DressCategory } from "@/types/dress";

const categories: DressCategory[] = [
  "wedding",
  "evening",
  "cocktail",
  "holiday",
  "graduation",
  "kids",
];

export function isDressCategory(value: string): value is DressCategory {
  return categories.includes(value as DressCategory);
}

export const styleLabels = {
  princess: "Принцеса",
  "a-line": "А-силует",
  mermaid: "Русалка",
  minimal: "Мінімалізм",
} as const;

export const categoryLabels = {
  wedding: "Весільна",
  evening: "Вечірня",
  cocktail: "Коктейльна",
  holiday: "Святкова",
  graduation: "Випускна",
  kids: "Дитяча",
} as const;
