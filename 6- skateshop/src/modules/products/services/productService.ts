import { Product, ProductsResponse } from "@/types/product";

// fetch para obtener todos los productos
export async function fetchProducts(): Promise<ProductsResponse> {
  const response = await fetch("/api/products");
  const products = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch products");
  }

  return products;
}

// fetch para obtener todos un solo producto
export async function fetchProductUnique(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`);
  const product = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch product unique");
  }

  return product;
}

// fetch para los filtros
export async function fetchProductsFilters(
  params: URLSearchParams,
): Promise<ProductsResponse> {
  const response = await fetch(`/api/products?${params.toString()}`);
  const products = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return products;
}

// fetch para los productos destacados
export async function fetchProductsFeatured(queryParams: URLSearchParams) {
  const response = await fetch(
    `/api/products/featured?${queryParams.toString()}`,
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch featured products");
  }
  return response;
}
