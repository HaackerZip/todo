// src/modules/products/components/Filters/hooks/useFilterState.ts
// import { FiltersResponse } from "@/types/filters"
import { useSearchParams } from "next/navigation"
import { useMemo, useState, useCallback, useEffect } from "react"

// 1. Tipo mejorado con valores numéricos para precios
interface CurrentFilters {
  brands: string[]
  sizes: string[]
  colors: string[]
  types: string[]
  minPrice: number
  maxPrice: number
  categoryId: string
}

// 2. Valores por defecto centralizados
const DEFAULT_PRICE_RANGE: [number, number] = [0, 200]
const DEFAULT_CATEGORY = "all"

// 3. Función de utilidad para parsear números seguros
const safeParseInt = (value: string | null): number => {
  if (!value) return NaN
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? NaN : parsed
}

export const useFilterState = () => {
  const searchParams = useSearchParams()

  // 4. Inicialización optimizada del estado
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = safeParseInt(searchParams.get("minPrice"))
    const max = safeParseInt(searchParams.get("maxPrice"))
    return [Number.isNaN(min) ? DEFAULT_PRICE_RANGE[0] : min,
    Number.isNaN(max) ? DEFAULT_PRICE_RANGE[1] : max]
  })

  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get("categoryId") || DEFAULT_CATEGORY
  })

  useEffect(() => {
    const newCategory = searchParams.get("categoryId") || DEFAULT_CATEGORY
    if (newCategory !== selectedCategory) {
      setSelectedCategory(newCategory)
    }
  }, [searchParams, selectedCategory])

  // 5. Memoización de los filtros actuales
  const currentFilters = useMemo<CurrentFilters>(() => ({
    brands: searchParams.getAll("brand"),
    sizes: searchParams.getAll("size"),
    colors: searchParams.getAll("color"),
    types: searchParams.getAll("type"),
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    categoryId: selectedCategory
  }), [searchParams, priceRange, selectedCategory])

  // 6. Callback estable estable para actualizaciones
  const handlePriceChange = useCallback((newRange: [number, number]) => {
    setPriceRange([
      Math.max(newRange[0], DEFAULT_PRICE_RANGE[0]),
      Math.min(newRange[1], DEFAULT_PRICE_RANGE[1])
    ])
  }, [])

  return {
    currentFilters,
    priceRange,
    selectedCategory,
    setSelectedCategory,
    setPriceRange: handlePriceChange
  }
}