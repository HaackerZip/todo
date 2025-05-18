"use client"

import { Badge } from "@/modules/ui/badge"
import { Button } from "@/modules/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/modules/ui/card"
import { Eye, Pencil, Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { DataTable } from "@/modules/admin/DataTable"
import { ProductForm } from "@/modules/admin/products/components/productForm/ProductForm"
import { ProductDetailsModal } from "@/modules/admin/products/components/productDetail/ProductDetailModal"
import { toast } from "sonner"
import { ColumnData } from "@/types/category"
import { Product } from "@/types/product"
import { useProducts } from "@/modules/products/hooks/useProducts"

// Extendemos el tipo Product para incluir el status
type ProductWithStatus = Omit<Product, 'status'> & {
  status?: 'active' | 'inactive' | string;
};


const handleDeleteProduct = (product: ProductWithStatus) => {
  toast.success(`Product "${product.name}" deleted successfully`)
}

export default function Products() {
  const { products } = useProducts() // , isLoading, error

  const [showProductForm, setShowProductForm] = useState(false)
  const [showProductDetails, setShowProductDetails] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductWithStatus | undefined>(undefined)

  useEffect(() => {
    const handleEditProduct = (event: CustomEvent<ProductWithStatus>) => {
      setSelectedProduct(event.detail)
      setShowProductForm(true)
    }

    window.addEventListener("editProduct", handleEditProduct as EventListener)

    return () => {
      window.removeEventListener("editProduct", handleEditProduct as EventListener)
    }
  }, [])

  const handleFormClose = () => {
    setShowProductForm(false)
    setSelectedProduct(undefined)
  }

  const handleViewProduct = (product: ProductWithStatus) => {
    setSelectedProduct(product)
    setShowProductDetails(true)
  }

  // Función de ayuda para renderizar valores
  const renderValue = (value: unknown) => {
    if (typeof value === 'number' || typeof value === 'string') {
      return value.toString();
    }
    if (value && typeof value === 'object' && 'name' in value) {
      return (value as { name: string }).name;
    }
    return 'N/A';
  }

  const columns: ColumnData<ProductWithStatus>[] = [
    {
      key: "name",
      label: "Name",
      render: (value) => renderValue(value)
    },
    {
      key: "price",
      label: "Price",
      render: (value) => {
        const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
        return !isNaN(numValue) ? `$${numValue.toFixed(2)}` : 'N/A';
      }
    },
    {
      key: "stock",
      label: "Stock",
      render: (value) => renderValue(value)
    },
    {
      key: "category",
      label: "Category",
      render: (value) => {
        if (value && typeof value === 'object' && 'name' in value) {
          return (value as { name: string }).name;
        }
        return 'N/A';
      }
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        if (value === "active" || value === "inactive") {
          return (
            <Badge variant={value === "active" ? "default" : "destructive"}>
              {value}
            </Badge>
          );
        }
        return null;
      }
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => row && handleViewProduct(row)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => row && window.dispatchEvent(new CustomEvent("editProduct", { detail: row }))}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-red-500"
            onClick={() => row && handleDeleteProduct(row)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const filters = [
    {
      key: "category",
      label: "Category",
      options: [
        { label: "All", value: "all" },
        { label: "Decks", value: "Decks" },
        { label: "Trucks", value: "Trucks" },
        { label: "Wheels", value: "Wheels" }
      ]
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" }
      ]
    }
  ]

  return (
    <div className="space-y-4 p-8">
      {!showProductForm ? (
        <>
        <Card className="bg-[#1E293B]">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-white text-2xl">Products</CardTitle>
            <Button onClick={() => setShowProductForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <DataTable
              data={products.map(p => ({ ...p, status: p.stock > 0 ? 'active' : 'inactive' }))}
              columns={columns}
              filters={filters}
            />
          </CardContent>
        </Card>
      </>
      ) : (
        <ProductForm
          onClose={handleFormClose}
          product={selectedProduct}
        />
      )}

      {showProductDetails && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => {
            setShowProductDetails(false)
            setSelectedProduct(undefined)
          }}
          open={showProductDetails}
        />
      )}
    </div>
  )
}

// "use client"

// import { ProductForm } from "@/modules/admin/products/components/productForm/ProductForm"
// import { ProductDetailsModal } from "@/modules/admin/products/components/productDetail/ProductDetailModal"
// import { ProductsTable } from "@/modules/admin/products/components/productTable/ProductTable"
// import { useProductsManagement } from "@/modules/admin/products/hooks/useProductsManagement"

// export default function ProductsPage() {
//   const {
//     products,
//     showProductForm,
//     showProductDetails,
//     selectedProduct,
//     handleFormClose,
//     handleViewProduct
//   } = useProductsManagement()

//   return (
//     <div className="space-y-4 p-8">
//       {!showProductForm ? (
//         <ProductsTable 
//           products={products}
//           onAddProduct={() => showProductForm(true)}
//           onViewProduct={handleViewProduct}
//         />
//       ) : (
//         <ProductForm
//           onClose={handleFormClose}
//           product={selectedProduct}
//         />
//       )}

//       {showProductDetails && selectedProduct && (
//         <ProductDetailsModal
//           product={selectedProduct}
//           onClose={() => {
//             showProductDetails(false)
//             selectedProduct(undefined)
//           }}
//           open={showProductDetails}
//         />
//       )}
//     </div>
//   )
// }