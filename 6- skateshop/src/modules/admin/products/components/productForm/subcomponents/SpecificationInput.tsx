import { Button } from "@/modules/ui/button";
import { Input } from "@/modules/ui/input";
import { Plus, X } from "lucide-react";
import { ProductSpecification } from "@/types/product";

interface SpecificationInputProps {
  specifications: ProductSpecification[];
  onChange: (specifications: ProductSpecification[]) => void;
}

export const SpecificationInput = ({ specifications, onChange }: SpecificationInputProps) => {
  const addSpecification = () => {
    onChange([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    const newSpecs = [...specifications];
    newSpecs.splice(index, 1);
    onChange(newSpecs);
  };

  const updateSpecification = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index] = { ...newSpecs[index], [field]: value };
    onChange(newSpecs);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Especificaciones</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSpecification}
          className="border-gray-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar Especificación
        </Button>
      </div>

      <div className="space-y-4">
        {specifications.map((spec, index) => (
          <div key={index} className="flex gap-4 items-start">
            <Input
              placeholder="Nombre"
              value={spec.key}
              onChange={(e) => updateSpecification(index, "key", e.target.value)}
              className="bg-[#0F172A] border-gray-700"
            />
            <Input
              placeholder="Valor"
              value={spec.value}
              onChange={(e) => updateSpecification(index, "value", e.target.value)}
              className="bg-[#0F172A] border-gray-700"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeSpecification(index)}
              className="text-red-500 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};