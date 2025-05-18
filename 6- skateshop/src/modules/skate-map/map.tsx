import React from "react";
import { SkateparksMap } from "./skateparks-map";

function Map() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-8 md:py-12 lg:py-16 dark:bg-background">
      <div className="w-full px-4 flex flex-col items-center space-y-4 text-center mb-8">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold text-vintage-gold">
          Skateparks Cercanos
        </h2>
        <p className="w-full max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-gray-300">
          Encuentra los mejores lugares para patinar cerca de ti. Nuestro mapa
          interactivo te muestra los skateparks en tu área con información
          detallada sobre cada uno.
        </p>
      </div>
      
      <div className="w-full px-4">
        <div className="mx-auto w-full max-w-[1200px] h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden rounded-xl border-4 border-rustic-brown/80 shadow-2xl shadow-rustic-brown/20">
          <SkateparksMap />
        </div>
      </div>
    </section>
  );
}

export default Map;