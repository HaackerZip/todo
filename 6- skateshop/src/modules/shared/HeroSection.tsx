"use client"

import { Button } from "@/modules/ui/button";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { DotButton, PrevButton, NextButton } from "./EmblaCarouselButtons";
import AutoplayPlugin from 'embla-carousel-autoplay'

const heroImages = [
  {
    src: "/skateshop-local.webp",
    alt: "ALTERTIVE SKATESHOP",
    title: "ALTERTIVE SKATESHOP",
    description: "Get ready for the new school year with our exclusive collection of skate gear and streetwear. Shop now and ride in style."
  },
  {
    src: "/skatepark-sansa.webp",
    alt: "SKATE PARK SESSION",
    title: "SKATE PARK SESSION",
    description: "Professional gear for your next skate session. Performance and style combined."
  },
  {
    src: "/skatepark-alto.webp",
    alt: "STREETWEAR COLLECTION",
    title: "STREETWEAR COLLECTION",
    description: "The latest trends in urban fashion. Limited editions available now."
  }
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
      containScroll: "trimSnaps"
    },
    [AutoplayPlugin({ 
      delay: 5000, 
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      playOnInit: true
    })]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );

  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {heroImages.map((image, index) => (
            <div 
              className="flex-[0_0_100%] min-w-0 relative h-full" 
              key={index}
            >
              <div className="absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              </div>
              <div className="relative h-full mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 flex flex-col justify-center">
                <h1 className="text-4xl font-bold tracking-tight text-vintage-gold sm:text-6xl lg:text-8xl">
                  {image.title}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
                  {image.description}
                </p>
                <div className="mt-10">
                  <Button 
                    size="lg" 
                    variant="promo"
                    className="bg-butterscotch hover:bg-vintage-gold text-deep-black"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>

      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  );
}