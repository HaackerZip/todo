'use client';

import { useState, useEffect } from "react";
import { Button } from "@/modules/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/modules/ui/sheet";
import { Search, User, ShoppingBag } from "lucide-react";
import { SearchPanel } from "@/modules/shared/header/SearchPanel";
import { CartPanel } from "@/modules/cart/components/CartPanel";
import { AuthModal } from "@/modules/auth/components/AuthModal";
import { UserDropdown } from "@/modules/users/components/UserDropdown";
import { useSession, signOut } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import useCartStore from "@/modules/cart/hooks/useCartStore";

export function HeaderIcons() {
  const { data: session } = useSession();
  const { items, syncState, syncWithServer } = useCartStore();
  const isLoggedIn = !!session;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Calcular la cantidad total de items en el carrito
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Sincronizar el carrito cuando el usuario inicia sesión
  useEffect(() => {
    if (isLoggedIn && syncState.pendingSync) {
      syncWithServer().catch(error => {
        console.error("Error al sincronizar el carrito:", error);
        toast({
          title: "Error de sincronización",
          description: "No se pudo sincronizar el carrito con el servidor",
          variant: "destructive"
        });
      });
    }
  }, [isLoggedIn, syncState.pendingSync, syncWithServer]);

  // Función para manejar el logout
  const handleLogout = async () => {
    await signOut({ redirect: false }); // Cierra la sesión sin redirigir
    setIsAuthOpen(false); // Cierra el modal de autenticación si está abierto
    toast({ title: "Sesión cerrada correctamente" });
  };

  return (
    <div>
      <div className="flex flex-1 justify-end gap-4">
        {/* Buscador */}
        <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-6 w-6" />
              <span className="sr-only">Search and Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md lg:max-w-lg xl:max-w-xl bg-deep-black border-l border-coffee-brown">
            <SearchPanel onClose={() => setIsSearchOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Usuario */}
        {isLoggedIn ? (
          <UserDropdown onLogout={handleLogout} />
        ) : (
          <Button variant="ghost" size="icon" onClick={() => setIsAuthOpen(true)}>
            <User className="h-6 w-6" />
            <span className="sr-only">Account</span>
          </Button>
        )}

        {/* Carrito */}
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-vintage-gold text-xs font-bold text-deep-black">
                  {itemCount}
                  {syncState.pendingSync && (
                    <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:max-w-md lg:max-w-lg xl:max-w-xl bg-deep-black border-l border-coffee-brown"
          >
            <CartPanel onClose={() => setIsCartOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
      <AuthModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </div>
  );
}