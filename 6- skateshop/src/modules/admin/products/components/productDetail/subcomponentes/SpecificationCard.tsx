import { Card } from "@/modules/ui/card";

export const SpecificationCard = ({ specifications }: { specifications: { key: string; value: string }[] }) => (
  <Card className="bg-[#0F172A] border-gray-700">
    <div className="p-6">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        {specifications.map((spec, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-400">{spec.key}</span>
            <span className="font-medium">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);