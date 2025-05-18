"use client"

import { Button } from "@/modules/ui/button"
import Carousel from "@/modules/shared/Carousel"
import { useRouter } from "next/navigation"
import { memo } from "react"

export function FeaturedProducts() {
  const router = useRouter()

  const handleViewAllClick = () => {
    router.push("/products")
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-[#010207] border-y border-zinc-800/30">
      {/* Contenedor único para mejor control */}
      <div className="flex flex-col gap-8">
        {/* Header - Contenedor flex mejorado */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Productos destacados
            </h2>
            <p className="text-sm text-zinc-400 max-w-lg">
              Selección exclusiva de nuestros mejores productos
            </p>
          </div>
          
          <Button
            variant="promo"
            size="lg"
            className="w-full sm:w-auto transition-transform hover:scale-[1.02]"
            onClick={handleViewAllClick}
            aria-label="Ver todos los productos"
          >
            Ver todos
          </Button>
        </div>

        {/* Carrusel */}
        <div className="relative">
          <Carousel />
        </div>
      </div>
    </section>
  )
}

export default memo(FeaturedProducts)