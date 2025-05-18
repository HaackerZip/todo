import { FiltersResponse } from "@/types/filters"

export async function fetchFilters(): Promise<FiltersResponse> {
    const response = await fetch("/api/products/filters")
    if (!response.ok) {
      throw new Error("Failed to fetch filters")
    }
    return response.json()
  }
  
  