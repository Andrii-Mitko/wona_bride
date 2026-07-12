import { useQuery } from "@tanstack/react-query";
import { getDresses } from "@/lib/api/dresses";

type UseDressesParams = {
  page?: number;
  limit?: number;
  category?: string;
};

export function useDresses(params?: UseDressesParams) {
  return useQuery({
    queryKey: ["dresses", params],
    queryFn: () => getDresses(params),
  });
}
