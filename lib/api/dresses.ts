import { dresses } from "@/data/dresses";
import { DressCategory } from "@/types/dress";

export type GetDressesParams = {
  page?: number;
  limit?: number;
  category?: DressCategory;
};

export type GetDressesResponse = {
  dresses: typeof dresses;
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
};

export async function getDresses(
  params?: GetDressesParams,
): Promise<GetDressesResponse> {
  const page = params?.page ?? 1;
  const limit = params?.limit ?? 8;

  let result = [...dresses];

  if (params?.category) {
    result = result.filter((dress) =>
      dress.category.includes(params.category!),
    );
  }

  const totalItems = result.length;
  const totalPages = Math.ceil(totalItems / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    dresses: result.slice(start, end),
    totalItems,
    totalPages,
    page,
    limit,
  };
}

export async function getDressBySlug(slug: string) {
  return dresses.find((dress) => dress.slug === slug);
}

export async function getSimilarDresses(slug: string, limit = 4) {
  const currentDress = dresses.find((dress) => dress.slug === slug);

  if (!currentDress) {
    return [];
  }

  return dresses
    .filter(
      (dress) =>
        dress.slug !== slug &&
        dress.style.some((style) => currentDress.style.includes(style)),
    )
    .slice(0, limit);
}
