import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/category';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/products?categoryId=${category.id}`}
      className="group relative block overflow-hidden rounded-lg bg-coffee-brown shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-vintage-gold focus:ring-opacity-50"
      aria-label={`Explorar categoría ${category.name}`}
    >
      <div className="relative aspect-[3/4] w-full bg-[#E9BA27]">
        <Image
          src={category.imageUrl || '/default-category-image.svg'}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          placeholder="blur"
          blurDataURL="/placeholder.svg"
          priority={false}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-xl font-bold text-white drop-shadow-md">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-gray-200 transition-colors duration-200 group-hover:text-vintage-gold">
          Ver productos
        </p>
      </div>
    </Link>
  );
}