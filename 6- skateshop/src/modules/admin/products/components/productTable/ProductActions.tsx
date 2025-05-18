import { Button } from "@/modules/ui/button"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { ProductWithStatus } from "../../types/ProductWithStatus"




interface ProductActionsProps {
  product: ProductWithStatus
  onView: (product: ProductWithStatus) => void
  onDelete: (product: ProductWithStatus) => void
}

export const ProductActions = ({ product, onView, onDelete }: ProductActionsProps) => (
  <div className="flex gap-2">
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-400 hover:text-white"
      onClick={() => onView(product)}
      aria-label="View product"
    >
      <Eye className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-400 hover:text-white"
      onClick={() => window.dispatchEvent(new CustomEvent("editProduct", { detail: product }))}
      aria-label="Edit product"
    >
      <Pencil className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="text-gray-400 hover:text-red-500"
      onClick={() => onDelete(product)}
      aria-label="Delete product"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
)