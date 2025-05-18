"use client";

import { CategoryCard } from '@/modules/categories/components/CategoryCard';
import { useFeaturedCategories } from '@/modules/categories/hooks/useFeaturedCategories';
import { Skeleton } from '@/modules/ui/skeleton'; // Asume que tienes un componente Skeleton
import { AlertCircle, Frown } from 'lucide-react';

function CategorySkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[3/4] rounded-xl bg-zinc-800/30" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4 bg-zinc-800/30" />
        <Skeleton className="h-4 w-1/2 bg-zinc-800/30" />
      </div>
    </div>
  );
}

export function FeaturedCategories() {
  const { data: categories, isLoading, error } = useFeaturedCategories();

  if (isLoading) {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#010207] border-y border-zinc-800/30">
        <div className="space-y-8">
          <Skeleton className="h-10 w-64 bg-zinc-800/30 rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <CategorySkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 sm:px-6 py-12 text-center">
        <div className="inline-flex flex-col items-center justify-center p-6 rounded-lg bg-zinc-900/30 border border-red-900/30 max-w-md">
          <AlertCircle className="h-10 w-10 text-red-400 mb-4" />
          <h3 className="text-lg font-medium text-red-400 mb-2">
            Error al cargar
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            No pudimos cargar las categorías destacadas
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="w-full px-4 sm:px-6 py-12 text-center">
        <div className="inline-flex flex-col items-center justify-center p-6 rounded-lg bg-zinc-900/30 border border-zinc-800/30 max-w-md">
          <Frown className="h-10 w-10 text-yellow-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-300 mb-2">
            No hay categorías disponibles
          </h3>
          <p className="text-sm text-gray-400">
            Prueba con otras secciones de nuestro catálogo
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#010207] border-y border-zinc-800/30">
      <div className="space-y-10">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Categorías destacadas
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
            Explora nuestras colecciones más populares
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}