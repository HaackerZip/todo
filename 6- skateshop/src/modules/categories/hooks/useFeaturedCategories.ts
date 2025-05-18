import { useQuery } from '@tanstack/react-query';
import { getFeaturedCategories } from '@/modules/categories/services/categoryService';

export function useFeaturedCategories() {
  return useQuery({
    queryKey: ['featuredCategories'],
    queryFn: getFeaturedCategories
  });
}