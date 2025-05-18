// src/components/product/hooks/useProductForm.ts
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { ProductFormData, ProductFormSchema } from "../schemas/product.schema";
import { Product, ProductFormData } from "@/types/product";
import { toast } from "sonner";
import { submitProduct } from "../services/productService";
import { ProductFormSubmitHandler } from "../types/ProductFormTypes";
import { transformProductToFormData } from "../helpers/productFormHelper";
import { productFormSchema } from "../schema/productFormSchema";

export const useProductForm = (
  product?: Product,
  onClose?: (success?: boolean) => void,
) => {
  const [activeTab, setActiveTab] = useState("basic");

  const defaultValues = useMemo(
    () => transformProductToFormData(product),
    [product],
  );

  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onSubmit",
    shouldUnregister: false,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }, // , errors
  } = methods;

  // console.log("Estado del formulario:", { isSubmitting, errors });

  const resetForm = useMemo(
    () => () => reset(defaultValues),
    [reset, defaultValues],
  );

  const handleFormSubmit: ProductFormSubmitHandler = async (data) => {

    try {
      const response = await submitProduct(data, product?.id);
      if (response.success) {
        toast.success(product ? "Product updated" : "Product created");
        onClose?.(true);
      } else { 
        toast.error(response.error || "Error al procesar el producto");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    }
  };

  return {
    methods,
    isSubmitting,
    handleSubmit,
    handleFormSubmit,
    resetForm,
    activeTab,
    setActiveTab,
  };
};
