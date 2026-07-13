import { SizeType } from "@/lib/validation/dress";

export type DressCategory =
  | "wedding"
  | "evening"
  | "cocktail"
  | "holiday"
  | "graduation"
  | "kids";

export type Dress = {
  id: string;

  name: string;

  slug: string;

  price: number;

  description: string;

  images: string[];

  category: DressCategory[];

  style: string[];

  sizeType: SizeType;

  sizes: string[];

  isPopular: boolean;
};
