"use client";

import { useSearchParams } from "next/navigation";
import { ProductList } from "@/modules/products/components/products/ProductList";
import { ProductFilters } from "@/modules/products/components/filters/ProductFilters";
import { Skeleton } from "@/modules/ui/skeleton";
import { useFilteredProducts } from "@/modules/products/hooks/useProducts";
import { useFilters } from "@/modules/products/hooks/useFilters";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  const { filteredProducts, isLoadingFilteredProducts, filteredProductsError } = useFilteredProducts(searchParams);
  const { data: filters } = useFilters();

  const products = filteredProducts?.data ?? [];

  const error = filteredProductsError
    ? new Error(filteredProductsError.message)
    : null;

  return (
    <div className="min-h-screen w-full bg-custom-gray px-4 py-8">
      <div className="gap-8 lg:grid lg:grid-cols-[280px_1fr]">
        <div className="sticky top-20 h-[calc(100vh-5rem)] self-start overflow-y-hidden">
          <ProductFilters filters={filters} />
        </div>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-vintage-gold">
              Todos los productos
            </h1>
            <div className="text-sm text-gray-400">
              {isLoadingFilteredProducts ? (
                <Skeleton className="inline-block h-4 w-20 bg-coffee-brown/20" />
              ) : (
                `${products.length} productos encontrados`
              )}
            </div>
          </div>

          <div className="grid min-h-[400px] grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <ProductList
              products={products}
              isLoading={isLoadingFilteredProducts}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
