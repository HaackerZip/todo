"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/modules/ui/input";
import { Label } from "@/modules/ui/label";
import { Button } from "@/modules/ui/button";
import { Switch } from "@/modules/ui/switch";
import { Card } from "@/modules/ui/card";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Category } from "@/types/user";

interface CategoryFormProps {
  onClose: (success?: boolean) => void;
  onSuccess?: () => Promise<void>;
  category?: Category;
}

export function CategoryForm({ onClose, category, onSuccess }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "");
  const [image, setImage] = useState(category?.imageUrl || "");
  const [isFeatured, setIsFeatured] = useState(category?.isFeatured || false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten imágenes (JPEG, PNG, WEBP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Tamaño máximo: 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('prefix', 'categories');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setImage(data.url);
      toast.success('Imagen subida exitosamente');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error subiendo imagen');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    multiple: false,
    disabled: isLoading
  });

  const handleSubmit = async () => {
    if (!name.trim()) return toast.error('Nombre requerido');
    if (!image) return toast.error('Imagen requerida');

    setIsLoading(true);
    try {
      const url = `/api/admin/categories${category?.id ? `?id=${category.id}` : ''}`;

      const res = await fetch(url, {
        method: category?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          imageUrl: image,
          isFeatured
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error guardando categoría');
      }

      await onSuccess?.();
      onClose(true);
      toast.success(`Categoría ${category?.id ? 'actualizada' : 'creada'}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error crítico');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-lg mx-auto">
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la categoría"
            className="bg-[#0F172A] border-gray-700"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label>Imagen</Label>
          <div
            {...getRootProps()}
            className={`mt-2 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
              ${isDragActive ? 'border-primary' : 'border-gray-700'}
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <input {...getInputProps()} />
            {image ? (
              <div className="relative w-40 h-40 mx-auto">
                <Image
                  src={image}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImage('');
                  }}
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white"
                  disabled={isLoading}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="text-gray-400">
                <Upload className="mx-auto h-12 w-12 mb-4" />
                <p className="text-sm">
                  {isDragActive
                    ? 'Suelta la imagen aquí'
                    : 'Arrastra una imagen o haz clic para seleccionar'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="featured"
            checked={isFeatured}
            onCheckedChange={setIsFeatured}
            disabled={isLoading}
          />
          <Label htmlFor="featured">Destacada</Label>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => onClose()}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Guardando...' : category?.id ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
