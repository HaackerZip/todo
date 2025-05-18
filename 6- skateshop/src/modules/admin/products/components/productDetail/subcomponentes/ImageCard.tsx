import Image from "next/image";

export const ImageCard = ({ title, src, alt }: { title?: string; src: string; alt: string }) => (
    <div>
      {title && <p className="text-xs text-gray-400 mb-2">{title}</p>}
      <div className="aspect-square rounded-lg overflow-hidden bg-black/20">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          width={200}
          height={200}
        />
      </div>
    </div>
  );