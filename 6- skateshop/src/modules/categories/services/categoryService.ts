import { Category } from '@/types/user';

export async function getFeaturedCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories/featured');
  if (!response.ok) {
    throw new Error('Failed to fetch featured categories');
  }
  return response.json();
}