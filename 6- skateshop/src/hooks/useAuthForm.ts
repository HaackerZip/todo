import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginAction, registerAction } from "@/actions/authActions";
import { useToast } from "./use-toast";
import { loginSchema, registerSchema } from "@/modules/auth/schemas/authSchemas";
import { z } from "zod";
import { showAuthToast } from "@/utils/showAuthToast";

// Tipo explícito para los errores
type ErrorsType = {
  email?: { message: string };
  password?: { message: string };
  confirmPassword?: { message: string }; // Opcional, solo para registro
};

export const useAuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  const schema = isRegistering ? registerSchema : loginSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toggleMode = () => {
    setIsRegistering((prev) => !prev);
    reset();
  };

  const onSubmit = async (data: z.infer<typeof schema>, onSuccess: () => void) => {
    try {
      if (isRegistering) {
        const registerResponse = await registerAction({
          email: data.email,
          password: data.password,
          confirmPassword: "confirmPassword" in data ? data.confirmPassword : "",
          name: data.email.split("@")[0], // Usar el correo como nombre por defecto
        });

        if (showAuthToast(registerResponse, "Registro exitoso", "Error en el registro")) {
          setIsRegistering(false);
          reset();
        }
      } else {
        const loginResponse = await loginAction({
          email: data.email,
          password: data.password,
        });

        if (showAuthToast(loginResponse, "Bienvenido", "Error de inicio de sesión")) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return {
    isRegistering,
    register,
    handleSubmit,
    errors: errors as ErrorsType,
    toggleMode,
    onSubmit,
  };
};