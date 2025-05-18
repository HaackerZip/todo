// src/modules/products/components/Filters/index.tsx
"use client"
import { useFilterState } from "@/modules/products/hooks/useFiltersState"
import { useFiltersHandlers } from "@/modules/products/hooks/useFiltersHandlers"
import { CategoryFilter } from "./CategoryFilter"
import { PriceRangeFilter } from "./PriceRangeFilter"
import { FilterAccordion } from "./FilterAccordion"
import { Button } from "@/modules/ui/button"
import { CurrentFilters, FiltersResponse } from "@/types/filters"


interface ProductFiltersProps {
  filters?: FiltersResponse
}

export function ProductFilters({ filters }: ProductFiltersProps) {
  const { currentFilters, priceRange, selectedCategory } = useFilterState() // setSelectedCategory, setPriceRange
  const {
    handlePriceChange,
    handleFilterChange,
    handleCategoryChange,
    handleClearFilters
  } = useFiltersHandlers()

  if (!filters) return null

  // Aseguramos la conversión de tipos
  const safeCurrentFilters: CurrentFilters = {
    ...currentFilters,
    minPrice: Number(currentFilters.minPrice),
    maxPrice: Number(currentFilters.maxPrice),
    categoryId: currentFilters.categoryId || "all"
  }

  return (
    <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
      <div className="space-y-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          categories={filters.categories}
          onChange={handleCategoryChange}
        />

        <PriceRangeFilter
          priceRange={priceRange}
          onChange={handlePriceChange}
        />

        <FilterAccordion
          filters={filters}
          currentFilters={safeCurrentFilters}
          onFilterChange={handleFilterChange}
        />

        <Button
          variant="outline"
          className="w-full border-rustic-brown hover:bg-rustic-brown"
          onClick={handleClearFilters}
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  )
}