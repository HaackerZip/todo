import { CardHeader, CardTitle, CardContent, Card } from "@/modules/ui/card"
import { Button } from "@/modules/ui/button"
import { Plus } from "lucide-react"
import { DataTable } from "@/modules/admin/DataTable"
import { productsTableColumns } from "./ProductsTableColumns"
import { ProductWithStatus } from "../../types/ProductWithStatus"
import { productsFilters } from "./ProductFilters"

  
interface ProductsTableProps {
  products: ProductWithStatus[]
  onAddProduct: () => void
  onViewProduct: (product: ProductWithStatus) => void
}

export const ProductsTable = ({ 
  products, 
  onAddProduct, 
  onViewProduct 
}: ProductsTableProps) => (
  <Card className="bg-[#1E293B]">
    <CardHeader className="flex flex-row justify-between items-center">
      <CardTitle className="text-white text-2xl">Products</CardTitle>
      <Button onClick={onAddProduct}>
        <Plus className="h-4 w-4 mr-2" />
        Add Product
      </Button>
    </CardHeader>
    <CardContent className="p-6 pt-0">
      <DataTable
        data={products}
        columns={productsTableColumns(onViewProduct)}
        filters={productsFilters}
      />
    </CardContent>
  </Card>
)