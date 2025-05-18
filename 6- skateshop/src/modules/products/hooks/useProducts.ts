import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import {
  fetchProducts,
  fetchProductsFilters,
  fetchProductUnique,
} from "@/modules/products/services/productService";
import { ProductsResponse } from "@/types/product";

// Obtener todos los productos
export function useProducts() {
  const { data, isLoading, error } = useQuery<ProductsResponse, Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  return { products: data?.data ?? [], isLoading, error };
}

// - Obtener un producto
export function useProduct(id: string) {
  const { data, isLoading, error } = useQuery<Product, Error>({
    queryKey: ["product-unique", id],
    queryFn: () => fetchProductUnique(id),
    staleTime: 1000 * 60 * 5,
  });

  return { product: data, isLoading, error };
}

// Obtener los productos con sus filtros
export function useFilteredProducts(searchParams: URLSearchParams) {
  const {
    data: filteredProducts,
    isLoading: isLoadingFilteredProducts,
    error: filteredProductsError,
  } = useQuery({
    queryKey: ["filtered-products", searchParams.toString()],
    queryFn: () => fetchProductsFilters(searchParams),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { filteredProducts, isLoadingFilteredProducts, filteredProductsError };
}
