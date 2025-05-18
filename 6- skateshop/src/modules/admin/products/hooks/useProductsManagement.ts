import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { useProducts } from "@/modules/products/hooks/useProducts";

type ProductWithStatus = Omit<Product, "status"> & {
  status?: "active" | "inactive" | string;
};

export const useProductsManagement = () => {
  const { products: originalProducts } = useProducts();
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductWithStatus>();

  useEffect(() => {
    const handleEditProduct = (event: CustomEvent<ProductWithStatus>) => {
      setSelectedProduct(event.detail);
      setShowProductForm(true);
    };

    window.addEventListener("editProduct", handleEditProduct as EventListener);
    return () =>
      window.removeEventListener(
        "editProduct",
        handleEditProduct as EventListener,
      );
  }, []);

  const handleFormClose = () => {
    setShowProductForm(false);
    setSelectedProduct(undefined);
  };

  const handleViewProduct = (product: ProductWithStatus) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleDeleteProduct = (product: ProductWithStatus) => {
    toast.success(`Product "${product.name}" deleted successfully`);
  };

  const products = originalProducts.map((p) => ({
    ...p,
    status: p.stock > 0 ? "active" : "inactive",
  }));

  return {
    products,
    showProductForm,
    showProductDetails,
    selectedProduct,
    handleFormClose,
    handleViewProduct,
    handleDeleteProduct,
    setShowProductForm,
    setShowProductDetails,
    setSelectedProduct,
  };
};
