import { Upload } from "lucide-react";
import { UploadPlaceholderProps } from "@/modules/admin/products/types/ImageSection";

export const UploadPlaceholder = ({ onClick }: UploadPlaceholderProps) => (
  <div
    role="button"
    tabIndex={0}
    className="w-full h-32 bg-[#0F172A] rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    aria-label="Upload placeholder"
  >
    <Upload className="h-8 w-8 text-gray-400" />
  </div>
);