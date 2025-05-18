export interface ProductCategory {
  id: string;
  name: string;
  isFeatured: boolean;
  imageUrl?: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export enum ImageType {
  MAIN = "MAIN",
  HOVER = "HOVER",
  GALLERY = "GALLERY",
}

export interface ProductImage {
  id?: string;
  url: string;
  type: ImageType;
  productId?: string;
}

export interface ProductSize {
  id: string;
  size: {
    id: string;
    name: string;
    type?: string;
  };
}

export interface ProductColor {
  id: string;
  color: {
    id: string;
    name: string;
  };
}

export interface ProductType {
  id: string;
  type: {
    id: string;
    name: string;
  };
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
  category?: ProductCategory | null;
  specifications: ProductSpecification[] | null;
  images: ProductImage[];
  sizes: ProductSize[];
  colors: ProductColor[];
  types: ProductType[];
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

export interface SimplifiedProduct extends ProductBase {
  sizes: Array<{ value: string; label: string }>;
  colors: Array<{ value: string; label: string }>;
  types: Array<{ value: string; label: string }>;
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
  images?: ProductImage[];
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

// Tipo para el formulario completo
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  brand: string;
  discount?: number;
  specifications: ProductSpecification[];
  images: ProductImage[];
  variants: {
    sizes: string[];
    colors: string[];
    types: string[];
  };
}
