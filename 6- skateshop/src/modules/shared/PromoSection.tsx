import { Button } from "@/modules/ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function PromoSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-zinc-800/30">
      {/* Fondo optimizado */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/tiendaskate.jpg"
          alt="Promoción: 6 cuotas sin interés en todos los productos"
          fill
          priority
          quality={90}
          className="object-cover object-center transition-all duration-500 group-hover/promo:scale-105"
          placeholder="blur"
          blurDataURL="/placeholder-promo.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010207]/90 via-[#010207]/60 to-[#010207]/90" />
      </div>

      {/* Contenido */}
      <div className="relative px-6 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-2xl text-center group/promo">
          {/* Texto promocional */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-vintage-gold sm:text-5xl lg:text-6xl drop-shadow-md">
              6 CUOTAS SIN INTERÉS
            </h2>
            <p className="text-xl leading-8 text-zinc-300/90">
              En toda nuestra colección de productos
            </p>
          </div>

          {/* CTA mejorado */}
          <div className="mt-10">
            <Button
              variant="promo"
              size="lg"
              className="group/button transition-all hover:scale-105 focus-visible:scale-105"
              aria-label="Conocer más sobre las 6 cuotas sin interés"
            >
              <span className="inline-flex items-center gap-x-1.5">
                Descubre más
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Efecto de partículas opcional */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
      </div>
    </section>
  );
}