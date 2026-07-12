import { dresses } from "../../data/dresses";

type GetDressesParams = {
  page?: number;
  limit?: number;
  category?: string;
};

export async function getDresses(params?: GetDressesParams) {
  let result = [...dresses];

  if (params?.category) {
    result = result.filter((dress) => dress.category === params.category);
  }

  return result;
}
