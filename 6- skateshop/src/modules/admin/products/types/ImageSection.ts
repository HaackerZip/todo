import { ProductImage, ImageType } from "@/types/product";

export type ImageSectionConfig = {
  type: ImageType;
  title: string;
  limit?: number;
};

export type ImageUploadBlockProps = ImageSectionConfig & {
  fileInputRef: React.RefObject<HTMLInputElement>;
  images: ProductImage[];
  onFileUpload: (file: File, type: ImageType) => void;
  onImageRemove: (url: string, type: ImageType) => void;
};

export type SingleImageContentProps = {
  imageUrl?: string;
  onUpload: () => void;
  onRemove: () => void;
};

export type GalleryContentProps = {
  images: ProductImage[];
  onUpload: () => void;
  onRemove: (url: string) => void;
  isFull: boolean;
};

export type UploadButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export type DeleteButtonProps = {
  onClick: () => void;
};

export type GalleryImageProps = {
  image: ProductImage;
  onRemove: (url: string) => void;
};

export type UploadPlaceholderProps = {
  onClick: () => void;
};
