import type { MetadataRoute } from "next";

import { getDresses } from "@/lib/api/dresses";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { dresses } = await getDresses({
    limit: 1000,
  });

  const products = dresses.map((dress) => ({
    url: `https://wona-bride.com.ua/catalog/${dress.slug}`,
    lastModified: dress.updatedAt ? new Date(dress.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://wona-bride.com.ua",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: "https://wona-bride.com.ua/catalog",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },

    ...products,
  ];
}
