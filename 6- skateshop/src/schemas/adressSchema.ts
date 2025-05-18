import { z } from "zod";

// Esquema para dirección
export const addressSchema = z.object({
  address: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  postalCode: z.string().min(1, "El código postal es requerido"),
  country: z.string().min(1, "El país es requerido"),
});

export type AddressInput = z.infer<typeof addressSchema>;