import { z } from "zod";
import { ImageType } from "@/types/product";

const specificationSchema = z.object({
  key: z.string(),
  value: z.string(),
});

// Formulario de "/admin/products"
export const productFormSchema = z.object({
  name: z.string().min(1, "Nombre requerido (mín. 1 carácter)"),
  description: z.string(),
  price: z.number().positive("Precio debe ser mayor que 0"),
  stock: z.number().int().nonnegative("Stock no puede ser negativo"),
  categoryId: z
    .string()
    .uuid("Seleccione una categoría")
    .nonempty("Seleccione una categoría"),
  brand: z.string().min(1, "Marca requerida"),
  discount: z.number().min(0).max(100).optional(),
  specifications: z.array(specificationSchema),
  images: z.array(z.object({
    url: z.string().url("URL de imagen inválida"),
    type: z.nativeEnum(ImageType),
  })).refine((images) => {
    const mainImage = images.find(img => img.type === ImageType.MAIN);
    return !!mainImage;
  }, "Se requiere una imagen principal (MAIN)").refine((images) => {
    const galleryImages = images.filter(img => img.type === ImageType.GALLERY);
    return galleryImages.length <= 5;
  }, "Máximo 5 imágenes de galería permitidas"),
  variants: z.object({
    sizes: z.array(z.string()),
    colors: z.array(z.string()),
    types: z.array(z.string()),
  }),
});
