import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { VariantList } from "../subcomponents/VariantList";
import { Card } from "@/modules/ui/card";

type VariantType = 'sizes' | 'colors' | 'types';

const variantConfig: {
  type: VariantType;
  label: string;
}[] = [
  { type: 'sizes', label: 'Sizes' },
  { type: 'colors', label: 'Colors' },
  { type: 'types', label: 'Types' }
];

const VariantCard = ({ children }: { children: React.ReactNode }) => (
  <Card className="bg-[#1E293B] border-0 p-6">
    {children}
  </Card>
);

export const VariantsSection = () => {
  const { setValue, watch } = useFormContext();
  const variants = watch("variants") || { sizes: [], colors: [], types: [] };

  const handleVariantChange = useCallback((type: VariantType, items: string[]) => {
    setValue(`variants.${type}`, items, { shouldValidate: true });
  }, [setValue]);

  return (
    <div className="grid gap-6">
      {variantConfig.map(({ type, label }) => (
        <VariantCard key={type}>
          <VariantList
            label={label}
            items={variants[type]}
            onAdd={(newItem) => 
              handleVariantChange(type, [...variants[type], newItem])
            }
            onRemove={(itemToRemove) => 
              handleVariantChange(type, variants[type].filter((item: string) => item !== itemToRemove))
            } 
            aria-label={`${label.toLowerCase()} selection list`}
          />
        </VariantCard>
      ))}
    </div>
  );
};