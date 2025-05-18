"use client";

import ProductCard from "@/modules/products/components/products/ProductCard";
import { Skeleton } from "@/modules/ui/skeleton";
import { Product } from "@/types/product";

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

function ProductSkeleton() {
  return (
    <div className="contents">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-full px-2 h-full">
          {/* Contenedor de imagen - Versión optimizada */}
          <Skeleton className="aspect-[3/4] rounded-lg bg-[#E9BA27]/20" />

          {/* Contenedor de detalles */}
          <div className="p-3 space-y-2">
            <Skeleton className="h-3 w-1/4 bg-gray-700" />
            <Skeleton className="h-5 w-3/4 bg-gray-600" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-6 w-1/3 bg-vintage-gold/30" />
              <Skeleton className="h-8 w-20 bg-[#E9BA27]/30" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductList({ products, isLoading, error }: ProductListProps) {
  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-destructive">
        {error.message}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="contents">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}