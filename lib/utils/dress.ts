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
