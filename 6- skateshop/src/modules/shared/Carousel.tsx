import { memo, useCallback } from "react";
import { useCarousel } from "@/modules/shared/useCarrusel";
import { useFeaturedProducts } from "@/modules/products/hooks/useFeaturedProducts";
import Controls from "./Controls";
import ProductCard from "@/modules/products/components/products/ProductCard";
import { Skeleton } from "@/modules/ui/skeleton"; // Componente de esqueleto opcional

const Carousel = memo(function Carousel() {
  const { emblaRef, scrollPrev, scrollNext, prevBtnEnabled, nextBtnEnabled } = useCarousel();

  const { data, isLoading, error } = useFeaturedProducts({
    page: 1,
    limit: 15,  
    orderBy: "createdAt",
    order: "desc"
  });

  const handlePrevClick = useCallback(() => {
    scrollPrev();
    // Feedback táctil opcional: 
    // document.getElementById('prevBtn')?.classList.add('scale-90');
    // setTimeout(() => document.getElementById('prevBtn')?.classList.remove('scale-90'), 150);
  }, [scrollPrev]);

  const handleNextClick = useCallback(() => {
    scrollNext();
    // Mismo feedback opcional para nextBtn
  }, [scrollNext]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-[480px] space-x-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[30rem] px-4">
          <div className="h-full rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
            <Skeleton className="aspect-[3/4] w-full bg-gray-800" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-4 w-1/4 bg-gray-800" />
              <Skeleton className="h-6 w-3/4 bg-gray-800" />
              <Skeleton className="h-8 w-1/3 bg-gray-800 mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (error) return (
    <div className="flex flex-col justify-center items-center h-64 p-4 bg-gray-900/50 rounded-lg border border-red-500/30">
      <span className="text-red-400 mb-2">⚠️</span>
      <p className="text-red-400 text-center max-w-md">
        {error.message || "Error cargando productos destacados"}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-3 text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );

  if (!data?.data?.length) return (
    <div className="flex flex-col justify-center items-center h-64 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
      <span className="text-gray-400 mb-2">🔍</span>
      <p className="text-gray-400 text-center">No hay productos destacados disponibles</p>
      <p className="text-xs text-gray-500 mt-1">Prueba con otras categorías</p>
    </div>
  );

  return (
    <div className="w-full relative group/carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y select-none ml-[calc(1rem*-1)]">
          {data.data.map((product) => (
            <div 
              key={product.id} 
              className="flex-shrink-0 w-[30rem] pl-4 pr-8" // Aumenté el padding right para mejor espaciado
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <Controls
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        prevEnabled={prevBtnEnabled}
        nextEnabled={nextBtnEnabled}
        className="opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100"
      />
    </div>
  );
});

Carousel.displayName = "Carousel";
export default Carousel;