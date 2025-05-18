import { Card } from "@/modules/ui/card";
import { Badge } from "@/modules/ui/badge";

export const VariantCard = ({ title, items }: { title: string; items: string[] }) => (
  <Card className="bg-[#0F172A] border-gray-700">
    <div className="p-6">
      <h3 className="text-sm font-medium text-gray-400 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary" className="bg-[#1E293B]">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  </Card>
);