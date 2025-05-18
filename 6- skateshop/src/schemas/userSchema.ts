import { z } from "zod";

export const RoleEnum = z.enum(["ADMIN", "USER"]);

// Esquema para crear o actualizar un usuario
export const userSchema = z.object({
  name: z.string().nullable().optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").nullable().optional(),
  image: z.string().url("URL de imagen inválida").nullable().optional(),
  role: RoleEnum.default("USER").optional(),
});

export type UserInput = z.infer<typeof userSchema>;
