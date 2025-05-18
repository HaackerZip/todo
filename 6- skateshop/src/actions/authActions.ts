"use server";

import { comparePassword, hashPassword } from "@/utils/passwordUtils";
import { loginSchema, registerSchema } from "@/modules/auth/schemas/authSchemas";
import { createUser, findUserByEmail, handleAuthError, updateUserPassword } from "@/modules/auth/services/authService";
import { signIn } from "@/lib/auth";
import { z } from "zod";

// Tipo de retorno para las acciones
type ActionResponse = {
  success?: boolean;
  error?: string;
};

// Acción para iniciar sesión
export const loginAction = async (
  values: z.infer<typeof loginSchema>
): Promise<ActionResponse> => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Correo o contraseña inválidos" };
    }

    const { email, password } = validatedFields.data;

    const user = await findUserByEmail(email);

    if (!user) {
      return { error: "Usuario no encontrado" };
    }

    if (!user.password) {
      return { error: "Por favor, inicia sesión con tu proveedor OAuth" };
    }

    const passwordsMatch = await comparePassword(password, user.password);

    if (!passwordsMatch) {
      return { error: "Contraseña incorrecta" };
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  } catch (error) {
    return handleAuthError(error);
  }
};

// Acción para registrar un nuevo usuario
export const registerAction = async (
  values: z.infer<typeof registerSchema>
): Promise<ActionResponse> => {
  try {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Datos inválidos" };
    }

    const { email, name, password } = validatedFields.data;

    if (!email || !name || !password) {
      return { error: "Faltan campos obligatorios" };
    }

    const user = await findUserByEmail(email);

    if (user) {
      if (user.password) {
        return { error: "El usuario ya existe" };
      }

      const passwordHash = await hashPassword(password);
      await updateUserPassword(email, passwordHash);

      return { success: true };
    }

    const passwordHash = await hashPassword(password);
    await createUser(email, name, passwordHash);

    return { success: true };
  } catch (error) {
    console.error("Error en el registro:", error);
    return handleAuthError(error);
  }
};
