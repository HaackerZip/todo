import { z } from "zod";

const sizeInputSchema = z.object({
  sizeId: z.string().uuid("ID de talla inválido"),
});

const colorInputSchema = z.object({
  colorId: z.string().uuid("ID de color inválido"),
});

const typeInputSchema = z.object({
  typeId: z.string().uuid("ID de tipo inválido"),
});

const imageInputSchema = z.object({
  url: z.string().url("URL de imagen inválida"),
  type: z.enum(["MAIN", "HOVER", "GALLERY"]),
});

const imagesSchema = z.array(imageInputSchema).refine((images) => {
  const mainImage = images.find(img => img.type === "MAIN");
  return !!mainImage;
}, "Se requiere una imagen principal (MAIN)");

const specificationSchema = z.object({
  key: z.string(),
  value: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  description: z.string(),
  price: z.number().positive("Precio debe ser mayor que 0"),
  stock: z.number().int().nonnegative("Stock no puede ser negativo"),
  categoryId: z.string().uuid("ID de categoría inválido"),
  brand: z.string().min(1, "Marca requerida"),
  discount: z.number().min(0).max(100).optional(),
  specifications: z.array(specificationSchema),
  images: imagesSchema,
  sizes: z.array(sizeInputSchema).optional(),
  colors: z.array(colorInputSchema).optional(),
  types: z.array(typeInputSchema).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
