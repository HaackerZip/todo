import { ProductBase, ProductCategory } from "./product"

export interface VariantOption {
  value: string
  label: string
}

export interface FiltersResponse {
  brands: string[]
  sizes: VariantOption[]
  colors: VariantOption[]
  types: VariantOption[]
  categories?: ProductCategory[]
}

export interface ProductFiltersProps {
  products: ProductBase[]
  filters?: FiltersResponse
}

export type FilterType = 'brand' | 'size' | 'color' | 'type'

export interface CurrentFilters {
  brands: string[]
  sizes: string[]
  colors: string[]
  types: string[]
  minPrice: number
  maxPrice: number
  categoryId: string
}
