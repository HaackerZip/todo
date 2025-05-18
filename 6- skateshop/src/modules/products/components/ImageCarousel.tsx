"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/modules/ui/button"

interface ImageCarouselProps {
  images: string[]
  productName: string
}

export function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  if (!images.length) {
    return (
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-coffee-brown">
        <Image
          src="/placeholder.svg"
          alt={productName}
          width={600}
          height={600}
          className="h-full w-full object-cover object-center"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-coffee-brown">
      <div className="relative h-full w-full">
        <Image
          src={images[currentIndex]}
          alt={`${productName} - Vista ${currentIndex + 1}`}
          fill
          className="object-cover object-center"
          priority={currentIndex === 0}
        />
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={previousImage}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Imagen anterior</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70"
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Siguiente imagen</span>
        </Button>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? "bg-vintage-gold" : "bg-white/50"
              }`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Imagen {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
