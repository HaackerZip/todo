import { z } from "zod";

// Esquema para crear o actualizar una categoría
export const categorySchema = z.object({
  name: z.string().min(1, "El nombre de la categoría es requerido"),
});

export type CategoryInput = z.infer<typeof categorySchema>;