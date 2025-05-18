import { z } from "zod";

// Esquema para detalle de orden
export const orderDetailSchema = z.object({
  productId: z.string().uuid("ID de producto inválido"),
  quantity: z.number().int("La cantidad debe ser un número entero").positive("La cantidad debe ser positiva"),
  unitPrice: z.coerce.number().positive("El precio unitario debe ser positivo"),
});

export type OrderDetailInput = z.infer<typeof orderDetailSchema>;

