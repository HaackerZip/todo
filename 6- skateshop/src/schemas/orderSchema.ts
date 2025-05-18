import { z } from "zod";
import { orderDetailSchema } from "./orderDetailSchema";
import { paymentSchema } from "./paymentSchema";

export const PaymentStatusEnum = z.enum(["PENDING", "COMPLETED", "FAILED"]);
export const OrderStatusEnum = z.enum(["PENDING", "SHIPPED", "COMPLETED", "CANCELLED"]);

// Esquema para crear una orden
export const orderSchema = z.object({
  userId: z.string().uuid("ID de usuario inválido").nullable().optional(),
  details: z.array(orderDetailSchema).min(1, "La orden debe tener al menos un producto"),
  total: z.coerce.number().positive("El total debe ser positivo"),
  trackingCode: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  payments: z.array(paymentSchema).optional(),
  status: OrderStatusEnum.default("PENDING").optional()
});

export type OrderInput = z.infer<typeof orderSchema>;