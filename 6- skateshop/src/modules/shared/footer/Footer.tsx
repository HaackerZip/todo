import Link from "next/link"
import { Input } from "@/modules/ui/input"
import { Button } from "@/modules/ui/button"
import { Instagram, Facebook, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Enlaces principales */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-vintage-gold">Navegación</h3>
            <ul className="space-y-2">
              {["Inicio", "Tienda", "Contacto", "Sobre Nosotros"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-vintage-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-vintage-gold">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-vintage-gold transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="hover:text-vintage-gold transition-colors">
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="hover:text-vintage-gold transition-colors">
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Suscripción a newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-vintage-gold">Newsletter</h3>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Tu email" className="bg-coffee-brown border-rustic-brown text-white" />
              <Button type="submit" className="bg-vintage-gold text-deep-black hover:bg-rustic-brown hover:text-white">
                Suscribirse
              </Button>
            </form>
          </div>

          {/* Información legal */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-vintage-gold">Legal</h3>
            <ul className="space-y-2">
              {["Términos y Condiciones", "Política de Privacidad", "Devoluciones"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-vintage-gold transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-rustic-brown text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Radical Skateshop. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

