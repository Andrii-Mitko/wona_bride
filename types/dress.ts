export type DressCategory =
  | "wedding"
  | "evening"
  | "cocktail"
  | "holiday"
  | "graduation"
  | "kids";

export type DressStyle = "princess" | "mermaid" | "a-line" | "minimal";

export type DressSize = "XS" | "S" | "M" | "L" | "XL";

export type Dress = {
  id: string;

  name: string;

  slug: string;

  price: number;

  description: string;

  images: string[];

  category: DressCategory[];

  style: DressStyle[];

  sizes: DressSize[];

  isPopular: boolean;
};
