import { dresses } from "@/data/dresses";
import { DressCategory } from "@/types/dress";

type GetDressesParams = {
  page?: number;
  limit?: number;
  category?: DressCategory;
};

export async function getDresses(params?: GetDressesParams) {
  let result = [...dresses];

  const category = params?.category;

  if (category) {
    result = result.filter((dress) => dress.category.includes(category));
  }

  return result;
}

export async function getDressBySlug(slug: string) {
  return dresses.find((dress) => dress.slug === slug);
}
