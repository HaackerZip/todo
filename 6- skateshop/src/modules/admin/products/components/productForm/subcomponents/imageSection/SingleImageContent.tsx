import Image from "next/image";
import { Upload } from "lucide-react";
import { DeleteButton, UploadButton } from "./Buttons";
import { SingleImageContentProps } from "@/modules/admin/products/types/ImageSection";

export const SingleImageContent = ({ 
  imageUrl, 
  onUpload, 
  onRemove 
}: SingleImageContentProps) => (
  <div className="flex items-center gap-4">
    <div className="w-32 h-32 bg-[#0F172A] rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Product preview"
          width={128}
          height={128}
          className="w-full h-full object-cover rounded-lg"
          priority
        />
      ) : <Upload className="h-8 w-8 text-gray-400" />}
    </div>
    <div className="flex flex-col gap-2">
      <UploadButton onClick={onUpload} />
      {imageUrl && <DeleteButton onClick={onRemove} />}
    </div>
  </div>
);