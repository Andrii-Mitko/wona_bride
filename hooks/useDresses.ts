import { useQuery } from "@tanstack/react-query";

import { getDresses, type GetDressesParams } from "@/lib/api/dresses";

export function useDresses(params?: GetDressesParams) {
  return useQuery({
    queryKey: ["dresses", params],
    queryFn: () => getDresses(params),
  });
}
