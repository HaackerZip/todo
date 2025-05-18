"use client";

import { Button } from "@/modules/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/modules/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { FormField } from "@/modules/ui/FormField";
import { useAuthForm } from "@/hooks/useAuthForm";

// import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: LoginModalProps) {
  const { update } = useSession();
  // const { toast } = useToast();

  const {
    isRegistering,
    register,
    handleSubmit,
    errors,
    toggleMode,
    onSubmit,
  } = useAuthForm();

  const handleGoogleSignIn = async () => {
    const response = await signIn("google", { callbackUrl: "/" });
  };

  const handleSuccess = async () => {
    onOpenChange(false); // Cerrar el modal
    await update(); // Actualiza la sesión en la UI
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="hidden">Open</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-deep-black text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-vintage-gold">Cuenta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => onSubmit(data, handleSuccess))} className="space-y-4 mt-4">
          {/* Campo de correo electrónico */}
          <FormField
            id="email"
            label="Correo Electrónico"
            register={register}
            error={errors.email}
          />
          {/* Campo de contraseña */}
          <FormField
            id="password"
            label="Contraseña"
            type="password"
            register={register}
            error={errors.password}
          />
          {/* Campo de confirmación de contraseña (solo en modo registro) */}
          {isRegistering && (
            <FormField
              id="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              register={register}
              error={errors.confirmPassword}
            />
          )}
          {/* Botón de envío */}
          <Button type="submit" className="w-full bg-vintage-gold text-deep-black hover:bg-rustic-brown hover:text-white">
            {isRegistering ? "Registrarse" : "Acceder"}
          </Button>
          {/* Cambiar entre inicio de sesión y registro */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={toggleMode}
              className="text-vintage-gold hover:text-rustic-brown transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-vintage-gold focus:ring-opacity-50 rounded-md px-2 py-1"
            >
              {isRegistering ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes cuenta aún? Crear cuenta"}
            </button>
          </div>
        </form>
        {/* Separador */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-rustic-brown" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-deep-black px-2 text-muted-foreground">O continúa con</span>
          </div>
        </div>
        {/* Botón de Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full border-rustic-brown text-white hover:bg-rustic-brown hover:text-white"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}