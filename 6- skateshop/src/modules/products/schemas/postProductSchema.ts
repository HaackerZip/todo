import { z } from "zod";

export const postProductSchema = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un texto",
      })
      .trim()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(120, "El nombre no puede exceder los 120 caracteres"),

    description: z
      .string()
      .trim()
      .max(500, "La descripción no puede exceder los 500 caracteres")
      .optional(),

    price: z.coerce
      .number({
        required_error: "El precio es requerido",
        invalid_type_error: "El precio debe ser un número",
      })
      .positive("El precio debe ser mayor a 0")
      .max(999999.99, "El precio no puede exceder $999,999.99"),

    stock: z.coerce
      .number()
      .int("El stock debe ser un número entero")
      .min(0, "El stock no puede ser negativo")
      .default(0),

    images: z
      .array(
        z.object({
          url: z
            .string()
            .url("URL de imagen inválida")
            .regex(/\.(jpeg|jpg|png|webp)$/i, "Formato de imagen no soportado"),
          isMain: z.boolean(),
          isHover: z.boolean(),
          isGallery: z.boolean(),
          order: z.number().min(0),
        }),
      )
      .min(1, "Se requiere al menos una imagen")
      .refine(
        (images) => images.some((img) => img.isMain),
        "Se requiere al menos una imagen principal (MAIN)",
      ),

    categoryId: z.string().uuid("ID de categoría inválido").optional(),

    brand: z
      .string()
      .trim()
      .min(2, "La marca debe tener al menos 2 caracteres")
      .max(50, "La marca no puede exceder los 50 caracteres"),

    discount: z.coerce
      .number()
      .min(0, "El descuento no puede ser negativo")
      .max(100, "El descuento no puede exceder el 100%")
      .default(0),

    specifications: z
      .record(z.any(), {
        invalid_type_error: "Especificaciones deben ser un objeto clave-valor",
      })
      .optional(),

    sizes: z
      .array(z.string().uuid("ID de talla inválido"))
      .max(20, "Máximo 20 tallas permitidas")
      .default([]),

    colors: z
      .array(z.string().uuid("ID de color inválido"))
      .max(10, "Máximo 10 colores permitidos")
      .default([]),

    types: z
      .array(z.string().uuid("ID de tipo inválido"))
      .max(5, "Máximo 5 tipos permitidos")
      .default([]),
  })
  .refine(
    (data) => {
      // Validación adicional: stock debe ser 0 si hay 100% de descuento
      if (data.discount === 100 && data.stock > 0) {
        return false;
      }
      return true;
    },
    {
      message: "El stock debe ser 0 cuando el descuento es del 100%",
      path: ["stock"],
    },
  );

// Tipo TypeScript inferido
export type ProductInput = z.infer<typeof postProductSchema>;
