import { describe, it, expect, beforeEach } from "vitest";
import { useWishlistStore } from "./wishlistStore";
import type { Dress } from "@/types/dress";

const mockDress = (id: string): Dress =>
  ({
    _id: id,
    name: `Сукня ${id}`,
    slug: `sukna-${id}`,
    article: `A-${id}`,
    price: 5000,
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
  useWishlistStore.setState({ items: [], hasHydrated: true });
});

describe("wishlistStore", () => {
  it("додає плаття в список обраного", () => {
    const dress = mockDress("1");

    useWishlistStore.getState().addToWishlist(dress);

    expect(useWishlistStore.getState().items).toHaveLength(1);
    expect(useWishlistStore.getState().items[0]._id).toBe("1");
  });

  it("не додає те саме плаття двічі", () => {
    const dress = mockDress("1");

    useWishlistStore.getState().addToWishlist(dress);
    useWishlistStore.getState().addToWishlist(dress);

    expect(useWishlistStore.getState().items).toHaveLength(1);
  });

  it("видаляє плаття зі списку обраного", () => {
    const dress = mockDress("1");

    useWishlistStore.getState().addToWishlist(dress);
    useWishlistStore.getState().removeFromWishlist("1");

    expect(useWishlistStore.getState().items).toHaveLength(0);
  });

  it("isInWishlist повертає правильний результат", () => {
    const dress = mockDress("1");

    expect(useWishlistStore.getState().isInWishlist("1")).toBe(false);

    useWishlistStore.getState().addToWishlist(dress);

    expect(useWishlistStore.getState().isInWishlist("1")).toBe(true);
  });

  it("toggleWishlist додає, якщо немає, і видаляє, якщо вже є", () => {
    const dress = mockDress("1");

    useWishlistStore.getState().toggleWishlist(dress);
    expect(useWishlistStore.getState().isInWishlist("1")).toBe(true);

    useWishlistStore.getState().toggleWishlist(dress);
    expect(useWishlistStore.getState().isInWishlist("1")).toBe(false);
  });

  it("зберігає кілька різних платтів одночасно", () => {
    useWishlistStore.getState().addToWishlist(mockDress("1"));
    useWishlistStore.getState().addToWishlist(mockDress("2"));
    useWishlistStore.getState().addToWishlist(mockDress("3"));

    expect(useWishlistStore.getState().items).toHaveLength(3);
  });
});
