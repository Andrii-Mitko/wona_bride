import { Dress } from "./dress";

export type CartItem = {
  dress: Dress;
  selectedSize: string;
};

export type Cart = {
  items: CartItem[];
};
