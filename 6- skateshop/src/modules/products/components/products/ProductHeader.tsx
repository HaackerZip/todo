"use client";

import { Skeleton } from "@/modules/ui/skeleton";

interface ProductHeaderProps {
  isLoading: boolean;
  totalProducts: number;
}

export const ProductHeader = ({ isLoading, totalProducts }: ProductHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-vintage-gold">
        Todos los productos
      </h1>
      <div className="text-sm text-gray-400">
        {isLoading ? (
          <Skeleton className="h-4 w-20 bg-coffee-brown/20 inline-block" />
        ) : (
          `${totalProducts} productos encontrados`
        )}
      </div>
    </div>
  );
};