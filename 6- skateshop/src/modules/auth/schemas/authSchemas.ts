import { z } from "zod";

// Esquema base para el correo electrónico
const emailSchema = z.string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");

// Esquema base para la contraseña
const passwordSchema = z.string({ required_error: "Password is required" })
  .min(6, "Password must be at least 6 characters")
  .max(32, "Password must be less than 32 characters");

// Esquema base para el nombre
const nameSchema = z.string({ required_error: "Name is required" })
  .min(1, "Name is required").optional();

// Esquema para el inicio de sesión
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Esquema para el registro
export const registerSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
  confirmPassword: z.string({ required_error: "Confirm Password is required" })
    .min(1, "Confirm Password is required")
    .min(6, "Confirm Password must be more than 6 characters")
    .max(32, "Confirm Password must be less than 32 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});