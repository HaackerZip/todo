import { Product, ProductFormData, ProductImage } from "@/types/product";

export const transformProductToFormData = (
  product?: Product,
): ProductFormData => {
  const defaultData: ProductFormData = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    categoryId: "",
    brand: "",
    discount: 0,
    specifications: [],
    images: [],
    variants: {
      sizes: [],
      colors: [],
      types: [],
    },
  };

  if (!product) return defaultData;

  const transformImages = (images: ProductImage[]): ProductImage[] => {
    return images.map((img) => ({
      url: img.url,
      type: img.type
    }));
  };

  return {
    ...defaultData,
    name: product.name,
    description: product.description || "",
    price: product.price || 0,
    stock: product.stock || 0,
    categoryId: product.categoryId || "",
    brand: product.brand,
    discount: product.discount || 0,
    specifications: (product.specifications || []).map((spec) => ({
      key: spec.key,
      value: spec.value,
    })),
    images: transformImages(product.images),
    variants: {
      sizes: product.sizes?.map((size) => size.size.id) || [],
      colors: product.colors?.map((color) => color.color.id) || [],
      types: product.types?.map((type) => type.type.id) || [],
    },
  };
};
