import { ImageUploadBlockProps } from "@/modules/admin/products/types/ImageSection";
import { Card } from "@/modules/ui/card";
import { ImageType } from "@prisma/client";
import { GalleryContent } from "./GalleryContent";
import { SingleImageContent } from "./SingleImageContent";

export const ImageUploadBlock = ({
  type,
  title,
  limit,
  fileInputRef,
  images,
  onFileUpload,
  onImageRemove
}: ImageUploadBlockProps) => {
  const currentImages = images.filter(img => img.type === type);
  const mainImage = currentImages[0]?.url;

  return (
    <Card className="bg-[#1E293B] border-0 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        {title} {limit && `(${currentImages.length}/${limit})`}
      </h2>
      
      {type === ImageType.GALLERY ? (
        <GalleryContent
          images={currentImages}
          onUpload={() => fileInputRef.current?.click()}
          onRemove={(url) => onImageRemove(url, type)}
          isFull={currentImages.length >= (limit || 0)}
        />
      ) : (
        <SingleImageContent
          imageUrl={mainImage}
          onUpload={() => fileInputRef.current?.click()}
          onRemove={() => mainImage && onImageRemove(mainImage, type)}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={e => e.target.files?.[0] && onFileUpload(e.target.files[0], type)}
      />
    </Card>
  );
}; 