import { GalleryContentProps } from "@/modules/admin/products/types/ImageSection";
import { UploadButton } from "./Buttons";
import { UploadPlaceholder } from "./UploadPlaceholder";
import { GalleryImage } from "./GalleryImage";

export const GalleryContent = ({ 
  images, 
  onUpload, 
  onRemove, 
  isFull 
}: GalleryContentProps) => (
  <>
    <div className="flex items-center gap-4 mb-4">
      <UploadButton onClick={onUpload} disabled={isFull} />
    </div>
    <div className="grid grid-cols-4 gap-4">
      {images.map((image) => (
        <GalleryImage key={image.url} image={image} onRemove={onRemove} />
      ))}
      {!isFull && <UploadPlaceholder onClick={onUpload} />}
    </div>
  </>
);

