import { Product, ProductFormData } from "@/types/product";

export interface ProductFormProps {
  onClose: (success?: boolean) => void;
  product?: Product;
}

export type ProductFormSubmitHandler = (data: ProductFormData) => Promise<void>;
