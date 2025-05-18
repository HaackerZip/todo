import { ColumnData } from "@/types/category"
import { ProductStatusBadge } from "./ProductStatusBadge"
import { ProductActions } from "./ProductActions"
import { ProductWithStatus } from "../../types/ProductWithStatus"
import { toast } from "sonner"

export const productsTableColumns = (
  onViewProduct: (product: ProductWithStatus) => void
): ColumnData<ProductWithStatus>[] => [
  {
    key: "name",
    label: "Name",
    render: (value) => typeof value === 'string' ? value : 'N/A'
  },
  {
    key: "price",
    label: "Price",
    render: (value) => {
      const numValue = typeof value === 'string' ? parseFloat(value) : Number(value)
      return !isNaN(numValue) ? `$${numValue.toFixed(2)}` : 'N/A'
    }
  },
  {
    key: "stock",
    label: "Stock",
    render: (value) => typeof value === 'number' ? value.toString() : 'N/A'
  },
  {
    key: "category",
    label: "Category",
    render: (value) => {
      if (value && typeof value === 'object' && 'name' in value) {
        return (value as { name: string }).name
      }
      return 'N/A'
    }
  },
  {
    key: "status",
    label: "Status",
    render: (value) => <ProductStatusBadge status={value as ProductWithStatus['status']} />
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => {
      if (!row) return null;
      return (
        <ProductActions
          product={row}
          onView={onViewProduct}
          onDelete={(product) => {
            toast.success(`Product "${product.name}" deleted successfully`)
          }}
        />
      );
    }
  }
]