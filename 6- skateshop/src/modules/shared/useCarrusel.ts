import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

export function useCarousel() {
  // Configuración personalizada:
  // - loop: activo para el carrusel infinito.
  // - align: 'start' para alinear las cards a la izquierda.
  // - duration: aumentado a 50 para suavizar la transición.
  // - dragFree: false para evitar el efecto elástico.
  // - dragThreshold: establece un umbral mínimo de 10 píxeles.
  // - containScroll: "trimSnaps" evita que se desborde el scroll.
  // - slidesToScroll: 1 para desplazar una card por interacción.
  // - watchResize: true para mantener la responsividad.
  // - breakpoints: ajusta el número de cards a mostrar según el ancho.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    duration: 50,
    dragFree: true,
    dragThreshold: 10,
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    watchResize: true,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 2 },
      '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 1 },
    },
  });

  // Use refs to track previous values for buttons enable/disable
  const prevEnabledRef = useRef(false);
  const nextEnabledRef = useRef(true);

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    const canScrollPrev = emblaApi.canScrollPrev();
    const canScrollNext = emblaApi.canScrollNext();

    if (prevEnabledRef.current !== canScrollPrev) {
      prevEnabledRef.current = canScrollPrev;
      setPrevBtnEnabled(canScrollPrev);
    }

    if (nextEnabledRef.current !== canScrollNext) {
      nextEnabledRef.current = canScrollNext;
      setNextBtnEnabled(canScrollNext);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateButtons();
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return useMemo(
    () => ({
      emblaRef,
      scrollPrev,
      scrollNext,
      prevBtnEnabled,
      nextBtnEnabled,
    }),
    [emblaRef, scrollPrev, scrollNext, prevBtnEnabled, nextBtnEnabled],
  );
}
