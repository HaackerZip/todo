import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchProductsFeatured } from "../services/productService";
import { FeaturedProductsResponse } from "@/types/product";

type PaginationParams = {
  page?: number;
  limit?: number;
  orderBy?: "name" | "price" | "createdAt" | "featuredPriority";
  order?: "asc" | "desc";
};

const defaultParams: Required<PaginationParams> = {
  page: 1,
  limit: 15,
  orderBy: "featuredPriority",
  order: "desc",
};

const normalizeParams = (
  params?: PaginationParams,
): Required<PaginationParams> => ({
  page: params?.page || defaultParams.page,
  limit: Math.min(50, params?.limit || defaultParams.limit),
  orderBy: params?.orderBy || defaultParams.orderBy,
  order: params?.order || defaultParams.order,
});

async function getFeaturedProducts(
  params?: PaginationParams,
): Promise<FeaturedProductsResponse> {
  const normalizedParams = normalizeParams(params);
  const queryParams = new URLSearchParams({
    page: normalizedParams.page.toString(),
    limit: normalizedParams.limit.toString(),
    orderBy: normalizedParams.orderBy,
    order: normalizedParams.order,
  });

  const response = await fetchProductsFeatured(queryParams);
  const data = response.json();

  return data;
}

export function useFeaturedProducts(
  params?: PaginationParams,
): UseQueryResult<FeaturedProductsResponse, Error> {
  const memoizedParams = useMemo(() => normalizeParams(params), [params]);

  return useQuery({
    queryKey: ["featured-products", memoizedParams],
    queryFn: () => getFeaturedProducts(memoizedParams),
    // keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
