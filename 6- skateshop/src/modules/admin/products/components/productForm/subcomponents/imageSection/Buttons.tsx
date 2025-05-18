import { DeleteButtonProps } from "@/modules/admin/products/types/ImageSection";
import { UploadButtonProps } from "@/modules/admin/products/types/ImageSection";

import { Button } from "@/modules/ui/button";
import { Trash2, Upload } from "lucide-react";

export const DeleteButton = ({ onClick }: DeleteButtonProps) => (
  <Button variant="destructive" size="sm" onClick={onClick} type="button">
    <Trash2 className="h-4 w-4 mr-2" />
    Eliminar
  </Button>
);


export const UploadButton = ({ onClick, disabled }: UploadButtonProps) => (
  <Button
    variant="outline"
    className="border-gray-700"
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    <Upload className="h-4 w-4 mr-2" />
    Subir imagen
  </Button>
);