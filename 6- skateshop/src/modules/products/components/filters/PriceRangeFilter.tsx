import { useEffect, useState } from "react";
import { Slider } from "@/modules/ui/slider"
import { Label } from "@/modules/ui/label"

export function PriceRangeFilter({
  priceRange,
  onChange
}: {
  priceRange: [number, number]
  onChange: (value: [number, number]) => void
}) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleValueChange = (value: [number, number]) => {
    setLocalPriceRange(value);
    onChange(value);
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-vintage-gold">Rango de precio</Label>
      <Slider
        defaultValue={[0, 200]}
        min={0}
        max={200}
        // step={10}
        value={localPriceRange}
        onValueChange={handleValueChange}
        className="mt-2"
      />
      <div className="flex justify-between text-sm text-gray-400">
        <span>${localPriceRange[0]}</span>
        <span>${localPriceRange[1]}</span>
      </div>
    </div>
  );
}