"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/modules/ui/card";
import { DataTable } from "@/modules/admin/DataTable";
import { Button } from "@/modules/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/modules/ui/badge";
import { CategoryForm } from "@/modules/admin/categories/CategoryForm";
import { toast } from "sonner";
import Image from "next/image";
import { Category, ColumnData } from "@/types/category";

const columns: ColumnData<Category>[] = [
  {
    key: "imageUrl",
    label: "Image",
    render: (value: string | number | boolean | undefined, row?: Category) => {
      if (!row?.imageUrl) return null;
      return (
        <div className="w-12 h-12 rounded-lg overflow-hidden relative">
          <Image
            src={row.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      );
    },
  },
  { key: "name", label: "Name" },
  { key: "productCount", label: "Products" },
  {
    key: "isFeatured",
    label: "Featured",
    render: (value: string | number | boolean | undefined, row?: Category) => (
      <Badge variant={row?.isFeatured ? "default" : "secondary"}>
        {row?.isFeatured ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (value: string | number | boolean | undefined, row?: Category) => {
      if (!row) return null;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const event = new CustomEvent("editCategory", {
                detail: row,
              });
              window.dispatchEvent(event);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600"
            onClick={() => {
              const event = new CustomEvent("deleteCategory", {
                detail: row,
              });
              window.dispatchEvent(event);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

const filters = [
  {
    key: "isFeatured",
    label: "Featured Status",
    options: [
      { label: "Featured", value: "true" },
      { label: "Not Featured", value: "false" },
    ],
  },
];

export default function Categories() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar categorías
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      toast.error('Error loading categories');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDeleteCategory = useCallback(async (category: Category) => {
    try {
      const response = await fetch(`/api/admin/categories?id=${category.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete category');
      }

      toast.success(`Category "${category.name}" deleted successfully`);
      fetchCategories(); // Recargar lista
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error deleting category');
    }
  }, [fetchCategories]);

  // Event listeners para edición y eliminación
  useEffect(() => {
    const handleEditCategory = (event: CustomEvent<Category>) => {
      setSelectedCategory(event.detail);
      setShowCategoryForm(true);
    };

    const handleDeleteCategoryEvent = (event: CustomEvent<Category>) => {
      if (window.confirm(`Are you sure you want to delete "${event.detail.name}"?`)) {
        handleDeleteCategory(event.detail);
      }
    };

    window.addEventListener('editCategory', handleEditCategory as EventListener);
    window.addEventListener('deleteCategory', handleDeleteCategoryEvent as EventListener);

    return () => {
      window.removeEventListener('editCategory', handleEditCategory as EventListener);
      window.removeEventListener('deleteCategory', handleDeleteCategoryEvent as EventListener);
    };
  }, [handleDeleteCategory]);

  const handleFormClose = async (success?: boolean) => {
    if (success) {
      await fetchCategories(); // Recargar datos después de una operación exitosa
      toast.success(
        selectedCategory
          ? `Category "${selectedCategory.name}" updated successfully`
          : "Category created successfully"
      );
    }
    setShowCategoryForm(false);
    setSelectedCategory(undefined);
  };

  return (
    <div className="p-6">
      {!showCategoryForm ? (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Categories</h1>
            <Button
              onClick={() => setShowCategoryForm(true)}
              className="bg-[#38BDF8] hover:bg-[#38BDF8]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>

          <Card className="bg-[#1E293B] border-0">
            <div className="p-6">
              <DataTable
                columns={columns}
                data={isLoading ? [] : categories}
                filters={filters}
                searchable
              />
            </div>
          </Card>
        </>
      ) : (
        <CategoryForm
          onClose={handleFormClose}
          category={selectedCategory}
          onSuccess={fetchCategories}
        />
      )}
    </div>
  );
}