import { Dress } from "./dress";

export type CartItem = {
  dress: Dress;
  quantity: number;
  selectedSize: string;
};

export type Cart = {
  items: CartItem[];
};
