import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./cartStore";
import type { Dress } from "@/types/dress";

const mockDress = (id: string, price = 5000): Dress =>
  ({
    _id: id,
    name: `Сукня ${id}`,
    slug: `sukna-${id}`,
    article: `A-${id}`,
    price,
    description: "",
    images: [],
    category: [],
    style: [],
    color: "white",
    fabric: [],
    sizeType: "letter",
    sizes: [],
    isPopular: false,
    availability: "available",
    createdAt: "",
    updatedAt: "",
  }) as Dress;

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("cartStore", () => {
  it("додає плаття певного розміру в кошик", () => {
    useCartStore.getState().addToCart(mockDress("1"), "M");

    const items = useCartStore.getState().items;

    expect(items).toHaveLength(1);
    expect(items[0].selectedSize).toBe("M");
  });

  it("не додає дубль того самого плаття й розміру", () => {
    const dress = mockDress("1");

    useCartStore.getState().addToCart(dress, "M");
    useCartStore.getState().addToCart(dress, "M");

    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("додає те саме плаття, якщо розмір інший", () => {
    const dress = mockDress("1");

    useCartStore.getState().addToCart(dress, "M");
    useCartStore.getState().addToCart(dress, "L");

    expect(useCartStore.getState().items).toHaveLength(2);
  });

  it("видаляє товар з кошика за id і розміром", () => {
    const dress = mockDress("1");

    useCartStore.getState().addToCart(dress, "M");
    useCartStore.getState().removeFromCart("1", "M");

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("не видаляє товар з іншим розміром", () => {
    const dress = mockDress("1");

    useCartStore.getState().addToCart(dress, "M");
    useCartStore.getState().removeFromCart("1", "L");

    expect(useCartStore.getState().items).toHaveLength(1);
  });

  it("clearCart очищає весь кошик", () => {
    useCartStore.getState().addToCart(mockDress("1"), "M");
    useCartStore.getState().addToCart(mockDress("2"), "S");

    useCartStore.getState().clearCart();

    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
