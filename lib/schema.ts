import { Dress } from "@/types/dress";

export function getProductSchema(dress: Dress) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",

    name: dress.name,

    image: dress.images.map((image) => `https://wona-bride.com.ua${image}`),

    description: dress.description,

    sku: dress.slug,

    brand: {
      "@type": "Brand",
      name: "WONA Bride",
    },

    offers: {
      "@type": "Offer",
      url: `https://wona-bride.com.ua/catalog/${dress.slug}`,
      price: dress.price,
      priceCurrency: "UAH",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}
