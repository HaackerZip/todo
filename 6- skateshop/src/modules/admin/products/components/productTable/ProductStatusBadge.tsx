import { Badge } from "@/modules/ui/badge"
import { ProductWithStatus } from "../../types/ProductWithStatus"

interface ProductStatusBadgeProps {
  status: ProductWithStatus['status']
}

export const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  if (status === "active" || status === "inactive") {
    return (
      <Badge variant={status === "active" ? "default" : "destructive"}>
        {status}
      </Badge>
    )
  }
  return null
}