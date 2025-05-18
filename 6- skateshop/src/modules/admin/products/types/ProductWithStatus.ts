import { Product } from "@/types/product";

export type ProductWithStatus = Omit<Product, "status"> & {
  status?: "active" | "inactive" | string;
};
