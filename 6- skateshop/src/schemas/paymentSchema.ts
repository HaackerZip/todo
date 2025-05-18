import { z } from "zod";

export const PaymentMethodEnum = z.enum(["CARD", "PAYPAL", "TRANSFER"]);

// Esquema para pago
export const paymentSchema = z.object({
  method: PaymentMethodEnum,
  transactionReference: z.string().nullable().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
