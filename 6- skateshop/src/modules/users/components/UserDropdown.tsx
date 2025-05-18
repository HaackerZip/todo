import { User, Home, ShoppingBag, LogOut, HelpCircle, Heart } from "lucide-react"
import { Button } from "@/modules/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/modules/ui/dropdown-menu"
import Link from "next/link"

interface UserDropdownProps {
  onLogout: () => void
}

export function UserDropdown({ onLogout }: UserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
          <span className="sr-only">Menú de usuario</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-deep-black border-rustic-brown text-white">
        <DropdownMenuLabel className="text-vintage-gold">Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-rustic-brown " />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center cursor-pointer">
            <Home className="mr-2 h-4 w-4" />
            <span>Mi Perfil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/shopping" className="flex items-center cursor-pointer">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Mis Compras</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/wishlist" className="flex items-center cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>Lista de deseos</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/support" className="flex items-center cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span> Ayuda</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-rustic-brown" />
        <DropdownMenuItem onClick={onLogout} className="text-red-500 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

