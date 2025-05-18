import { Badge } from "@/modules/ui/badge";

const statusColors = {
  "In Stock": "bg-green-500/10 text-green-500",
  "Low Stock": "bg-yellow-500/10 text-yellow-500",
  "Out of Stock": "bg-red-500/10 text-red-500",
};

export const StatusBadge = ({ status }: { status: string }) => (
  <Badge variant="secondary" className={statusColors[status as keyof typeof statusColors]}>
    {status}
  </Badge>
);