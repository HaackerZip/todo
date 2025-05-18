import { SpecificationInput } from "@/modules/admin/products/components/productForm/subcomponents/SpecificationInput";
import { Card } from "@/modules/ui/card";
import { Label } from "@/modules/ui/label";
import { Input } from "@/modules/ui/input";
import { Textarea } from "@/modules/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// interface Specification {
//   key: string;
//   value: string;
// }

interface Category {
  id: string;
  name: string;
  isFeatured: boolean;
  imageUrl: string | null;
  productCount: number;
}

export const BasicInfoSection = () => {
  const { register, control, formState: { errors } } = useFormContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/admin/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error("Error al cargar las categorías");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Card className="bg-[#1E293B] border-0">
      <div className="p-6 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Product name"
            className="bg-[#0F172A] border-gray-700"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter product description..."
            className="bg-[#0F172A] border-gray-700 min-h-[100px]"
            {...register("description")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="0.00"
              className="bg-[#0F172A] border-gray-700"
              {...register("price", { 
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
                valueAsNumber: true,
              })}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message as string}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="discount">Discount (%)</Label>
            <Input
              id="discount"
              type="number"
              placeholder="0"
              className="bg-[#0F172A] border-gray-700"
              {...register("discount", {
                min: { value: 0, message: "Discount must be positive" },
                max: { value: 100, message: "Discount cannot exceed 100%" },
                valueAsNumber: true,
              })}
            />
            {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message as string}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              placeholder="0"
              className="bg-[#0F172A] border-gray-700"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock must be positive" },
                valueAsNumber: true,
              })}
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message as string}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              placeholder="Brand name"
              className="bg-[#0F172A] border-gray-700"
              {...register("brand", { required: "Brand is required" })}
            />
            {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message as string}</p>}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Category</Label>
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <SelectTrigger className="bg-[#0F172A] border-gray-700">
                  <SelectValue placeholder={isLoading ? "Loading categories..." : "Select category"} />
                </SelectTrigger>
                <SelectContent className="bg-[#1E293B] border-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message as string}</p>}
        </div>

        <div className="grid gap-2">
          <Controller
            name="specifications"
            control={control}
            render={({ field }) => (
              <SpecificationInput
                specifications={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </Card>
  );
};