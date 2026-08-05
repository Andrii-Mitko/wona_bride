import { SizeType } from "@/lib/validation/dress";

export type DressCategory =
  | "wedding"
  | "evening"
  | "cocktail"
  | "holiday"
  | "graduation"
  | "kids";

export type DressStyle = "princess" | "a-line" | "mermaid" | "minimal";

export type DressAvailability = "available" | "order" | "waiting";

export type Dress = {
  _id: string;

  createdAt: string;
  updatedAt: string;

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

  availability: DressAvailability;
};

export type DressFromDB = Omit<Dress, "_id"> & {
  _id: string;
};
