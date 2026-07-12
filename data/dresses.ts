import { Dress } from "@/types/dress";

export const dresses: Dress[] = [
  {
    id: "1",
    name: "Amelia",
    slug: "amelia",
    price: 11000,
    description: "Елегантна весільна сукня.",
    images: ["/images/dresses/image.png"],
    sizes: ["XS", "S", "M"],
    category: "classic",
    isPopular: true,
  },

  {
    id: "2",
    name: "Victoria",
    slug: "victoria",
    price: 14500,
    description: "Витончена сукня для особливого дня.",
    images: ["/images/dresses/image2.jpg"],
    sizes: ["S", "M", "L"],
    category: "princess",
    isPopular: true,
  },

  {
    id: "3",
    name: "Sofia",
    slug: "sofia",
    price: 12500,
    description: "Сукня з ніжним силуетом.",
    images: ["/images/dresses/image3.png"],
    sizes: ["XS", "S"],
    category: "classic",
    isPopular: false,
  },

  {
    id: "4",
    name: "Elena",
    slug: "elena",
    price: 16000,
    description: "Розкішна весільна сукня.",
    images: ["/images/dresses/image4.png"],
    sizes: ["M", "L"],
    category: "mermaid",
    isPopular: true,
  },
];
