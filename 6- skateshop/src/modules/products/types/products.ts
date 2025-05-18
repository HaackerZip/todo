// Definidos los tipos para los productos
export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductImage {
  id?: string;
  url: string;
  isMain: boolean;
  isHover: boolean;
  isGallery: boolean;
  order: number;
}

export interface ProductBase {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  brand: string;
  views: number;
  discount?: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Podria usarse para los filtros
export interface Product extends ProductBase {
  category?: ProductCategory;
  specifications: ProductSpecification[];
  images: ProductImage[];
  sizes: Array<{ value: string; label: string }>;
  colors: Array<{ value: string; label: string }>;
  types: Array<{ value: string; label: string }>;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
    };
  };
}

export interface FeaturedProductsResponse {
  data: Product[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface CreateProductInput
  extends Omit<ProductBase, "id" | "views" | "createdAt" | "updatedAt"> {
  specifications?: ProductSpecification[];
  images: { main: { url: string } };
  sizes?: string[];
  colors?: string[];
  types?: string[];
}

export interface UpdateProductInput
  extends Partial<
    Omit<ProductBase, "id" | "views" | "createdAt" | "updatedAt">
  > {
  specifications?: ProductSpecification[];
  images?: ProductImage[];
  sizes?: string[];
  colors?: string[];
  types?: string[];
}
