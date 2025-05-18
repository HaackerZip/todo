import { GalleryImageProps } from "@/modules/admin/products/types/ImageSection";
import { Button } from "@/modules/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export const GalleryImage = ({ image, onRemove }: GalleryImageProps) => (
    <div className="relative group">
      <div className="w-full h-32 bg-[#0F172A] rounded-lg overflow-hidden">
        <Image
          src={image.url}
          alt="Gallery image"
          width={128}
          height={128}
          className="w-full h-full object-cover"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(image.url)}
        type="button"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );