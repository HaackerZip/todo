import { useQuery } from "@tanstack/react-query";
import { fetchFilters } from "@/modules/products/services/productsFilters";

export const useFilters = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
    staleTime: 1000 * 60 * 60,
    // Configuraciones adicionales recomendadas:
    retry: 2,
    retryDelay: 1000,
    refetchOnWindowFocus: false
  });

  // const { data: filters } = useQuery({
  // return { filters };
}