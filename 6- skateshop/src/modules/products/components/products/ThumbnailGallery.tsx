'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ThumbnailGalleryProps {
  images: string[];
  productName: string;
}

export function ThumbnailGallery({ images, productName }: ThumbnailGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="hidden lg:flex flex-col gap-4 order-first">
      {images.map((image, index) => (
        <button
          key={index}
          onClick={() => setSelectedIndex(index)}
          className={`aspect-square w-full overflow-hidden rounded-md border-2 ${index === selectedIndex ? 'border-vintage-gold' : 'border-coffee-brown hover:border-vintage-gold'
            } cursor-pointer transition-all`}
        >
          <Image
            src={image}
            alt={`${productName} - Vista ${index + 1}`}
            width={100}
            height={100}
            className="h-full w-full object-cover object-center"
          />
        </button>
      ))}
    </div>
  );
}
