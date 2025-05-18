import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useRef, useEffect } from "react"
import { useDebounceFunction } from "@/hooks/useDebounce"

type FilterType = 'brand' | 'size' | 'color' | 'type'

export const useFiltersHandlers = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isUpdating = useRef(false)

  const updateFilters = useCallback((newParams: URLSearchParams) => {
    if (isUpdating.current) return

    isUpdating.current = true
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false })

    const timer = setTimeout(() => {
      isUpdating.current = false
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, router])

  const debouncedUpdatePrice = useDebounceFunction((value: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("minPrice", Math.max(0, value[0]).toString())
    params.set("maxPrice", Math.min(200, value[1]).toString())
    updateFilters(params)
  }, 300)

  const handleFilterChange = useCallback((
    type: FilterType,
    value: string,
    checked: boolean
  ) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentValues = params.getAll(type)

    const newValues = checked
      ? Array.from(new Set([...currentValues, value]))
      : currentValues.filter(v => v !== value)

    params.delete(type)
    newValues.forEach(v => params.append(type, v))

    updateFilters(params)
  }, [searchParams, updateFilters])

  const handleCategoryChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const newValue = value !== "all" ? value : null

    if (newValue) {
      params.set("categoryId", newValue)
    } else {
      params.delete("categoryId")
    }
    updateFilters(params)
  }, [searchParams, updateFilters])

  useEffect(() => {
    return () => {
      isUpdating.current = false
    }
  }, [])

  return {
    handlePriceChange: debouncedUpdatePrice,
    handleFilterChange,
    handleCategoryChange,
    handleClearFilters: () => updateFilters(new URLSearchParams())
  }
}