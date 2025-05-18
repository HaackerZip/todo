import { toast } from "@/hooks/use-toast";

export const showAuthToast = (response: { success?: boolean; error?: string }, successMessage: string, errorMessage: string) => {
  if (!response.success) {
    toast({
      title: errorMessage,
      description: response.error || "Por favor, inténtalo de nuevo.",
      variant: "destructive",
    });
    return false;
  }

  toast({ title: successMessage, description: "Has iniciado sesión correctamente." });
  return true;
};