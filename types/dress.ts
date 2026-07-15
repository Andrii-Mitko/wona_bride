import { SizeType } from "@/lib/validation/dress";

export type DressCategory =
  | "wedding"
  | "evening"
  | "cocktail"
  | "holiday"
  | "graduation"
  | "kids";

export type DressStyle = "princess" | "a-line" | "mermaid" | "minimal";

export type Dress = {
  id: string;

  name: string;

  slug: string;

  article: string;

  price: number;

  description: string;

  images: string[];

  category: DressCategory[];

  style: DressStyle[];

  color: string;

  fabric: string[];

  sizeType: SizeType;

  sizes: string[];

  isPopular: boolean;
};
