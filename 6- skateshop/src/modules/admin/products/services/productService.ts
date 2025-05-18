import { ProductFormData } from "@/types/product";
import { productFormSchema } from "../schema/productFormSchema";

type ProductResponse = {
  success: boolean;
  error?: string;
  data?: Record<string, unknown>;
  details?: Array<{ field: string; message: string }>;
};

export const submitProduct = async (
  data: ProductFormData,
  productId?: string,
): Promise<ProductResponse> => {
  try {
    const payload = createProductPayload(data);

    const method = productId ? "PUT" : "POST";
    const url = `/api/admin/products${productId ? `/${productId}` : ""}`;

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { 
        success: false, 
        error: responseData.error || 'Error al procesar la solicitud' 
      };
    }

    return { 
      success: true, 
      data: responseData 
    };
  } catch (error) {
    return handleServiceError(error);
  }
};

// Función que transforma y valida los datos
export const createProductPayload = (data: ProductFormData) => {
  // Validamos y transformamos los datos
  const transformedData = {
    ...data,
    price: Number(data.price),
    stock: Number(data.stock),
    discount: data.discount ? Number(data.discount) : null,
    specifications: data.specifications || [],
    images: Array.isArray(data.images) ? data.images.map(img => ({
      url: img.url,
      type: img.type
    })) : [],
    variants: {
      sizes: data.variants?.sizes || [],
      colors: data.variants?.colors || [],
      types: data.variants?.types || []
    }
  };

  // Validación con Zod
  const result = productFormSchema.safeParse(transformedData);
  if (!result.success) {
    const errorMessages = result.error.errors
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join("\n");
    throw new Error(`Error de validación:\n${errorMessages}`);
  }

  return result.data;
};

const handleServiceError = (error: unknown): ProductResponse => {
  if (error instanceof Error) {
    return { success: false, error: error.message };
  }
  return { success: false, error: "Unknown error occurred" };
};
