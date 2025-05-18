import { useCallback, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { ProductImage, ImageType } from "@/types/product";
import { ImageSectionConfig } from "../../../types/ImageSection";
import { ImageUploadBlock } from "../subcomponents/imageSection/ImageUploadBlock";

export const ImagesSection = () => {
  const { setValue, watch } = useFormContext<{ images: ProductImage[] }>();
  const watchedImages = watch("images");
  const images = useMemo(() => watchedImages || [], [watchedImages]);
  
  const fileInputsRef = useRef<Record<ImageType, HTMLInputElement | null>>({
    [ImageType.MAIN]: null,
    [ImageType.HOVER]: null,
    [ImageType.GALLERY]: null,
  });

  const imageSections = useMemo<ImageSectionConfig[]>(() => [
    { type: ImageType.MAIN, title: "Imagen Principal" },
    { type: ImageType.HOVER, title: "Imagen Hover" },
    { type: ImageType.GALLERY, title: "Galería", limit: 5 },
  ], []);

  const getImagesByType = useCallback(
    (type: ImageType) => images.filter(img => img.type === type),
    [images]
  );

  const handleFileUpload = useCallback(async (file: File, type: ImageType) => {
    try {
      const currentImages = getImagesByType(type);
      
      if (type === ImageType.GALLERY && currentImages.length >= 5) {
        toast.error("Límite de 5 imágenes en galería alcanzado");
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('prefix', 'products');

      await toast.promise(
        fetch('/api/admin/upload', { method: 'POST', body: formData })
          .then(async response => {
            if (!response.ok) throw new Error('Error al subir la imagen');
            return response.json();
          }),
        {
          loading: `Subiendo ${type.toLowerCase()}...`,
          success: (data: { url: string }) => {
            const updateStrategy = type === ImageType.GALLERY ? 'append' : 'replace';
            const newImages = updateStrategy === 'replace'
              ? [...images.filter(img => img.type !== type), { url: data.url, type }]
              : [...images, { url: data.url, type }];
            
            setValue("images", newImages);
            return `${type} subida!`;
          },
          error: (err: Error) => `Error subiendo ${type}: ${err.message}`
        }
      );
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Error crítico durante la subida");
    }
  }, [getImagesByType, images, setValue]);

  const handleImageRemove = useCallback((url: string, type: ImageType) => {
    const newImages = images.filter(img => !(img.url === url && img.type === type));
    setValue("images", newImages);
    toast.success(`${type} eliminada`);
  }, [images, setValue]);

  return (
    <div className="grid gap-6">
      {imageSections.map((section) => (
        <ImageUploadBlock 
          key={section.type}
          {...section}
          fileInputRef={{ current: fileInputsRef.current[section.type] }}
          images={images}
          onFileUpload={handleFileUpload}
          onImageRemove={handleImageRemove}
        />
      ))}
    </div>
  );
};