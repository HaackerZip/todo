import { z } from "zod";

// Esquema para elementos del carrito
export const cartItemSchema = z.object({
  productId: z.string().uuid("ID de producto inválido"),
  quantity: z.number().int("La cantidad debe ser un número entero").positive("La cantidad debe ser positiva"),
});

export type CartItemInput = z.infer<typeof cartItemSchema>;