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
import type { Category } from "@prisma/client";

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
    <div>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          {category?.id ? "Editar Categoría" : "Nueva Categoría"}
        </h1>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={() => onClose()} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            className="bg-sky-500 hover:bg-sky-600"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : (category?.id ? "Guardar" : "Crear")}
          </Button>
        </div>
      </header>

      <Card className="bg-gray-800 border-0">
        <div className="p-6 space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre de la categoría</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Skateboards Profesionales"
              className="bg-gray-900 border-gray-700"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-2">
            <Label>Imagen Representativa</Label>
            <div
              {...getRootProps()}
              className={`h-64 cursor-pointer rounded-lg border-2 border-dashed bg-gray-900 transition-colors
                ${isDragActive ? 'border-sky-500 bg-sky-500/10' : 'border-gray-700'}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input {...getInputProps()} />

              {image ? (
                <div className="relative h-full">
                  <Image
                    src={image}
                    alt="Previsualización"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                  <button
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImage('');
                    }}
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-gray-400">
                  <Upload className="mb-2 h-8 w-8" />
                  <p>Arrastra aquí la imagen</p>
                  <p className="text-sm">o haz clic para seleccionar</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Formatos: JPEG, PNG, WEBP (max 5MB)
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
            <Label htmlFor="featured">Destacar en página principal</Label>
          </div>
        </div>
      </Card>
    </div>
  );
}