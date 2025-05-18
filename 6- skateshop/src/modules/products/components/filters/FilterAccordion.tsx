import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/modules/ui/accordion"
import { CurrentFilters, FiltersResponse, FilterType } from "@/types/filters"
import { Checkbox } from "@/modules/ui/checkbox"
import { Label } from "@/modules/ui/label"
import { memo } from "react"

// Memoized filter item components
const FilterCheckbox = memo(({
  id,
  label,
  checked,
  onChange
}: {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) => (
  <div className="flex items-center space-x-2">
    <Checkbox
      id={id}
      checked={checked}
      onCheckedChange={onChange}
    />
    <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
  </div>
))

FilterCheckbox.displayName = "FilterCheckbox"

const SizeLabel = memo(({
  size,
  isSelected,
  onClick
}: {
  size: string
  isSelected: boolean
  onClick: () => void
}) => (
  <Label
    className={`flex items-center justify-center p-2 border border-rustic-brown rounded cursor-pointer transition-colors ${isSelected
      ? "bg-rustic-brown text-white"
      : "hover:bg-rustic-brown hover:text-white"
      }`}
    onClick={onClick}
  >
    {size}
  </Label>
))

SizeLabel.displayName = "SizeLabel"


interface FilterAccordionProps {
  filters: FiltersResponse
  currentFilters: CurrentFilters
  onFilterChange: (type: FilterType, value: string, checked: boolean) => void
}

export function FilterAccordion({
  filters,
  currentFilters,
  onFilterChange
}: FilterAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {filters.brands.length > 0 && (
        <AccordionItem value="brand" className="border-rustic-brown">
          <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
            Marca
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filters.brands.map((brand) => (
                <FilterCheckbox
                  key={brand}
                  id={`brand-${brand}`}
                  label={brand}
                  checked={currentFilters.brands.includes(brand)}
                  onChange={(checked) => onFilterChange("brand", brand, checked)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {filters.sizes.length > 0 && (
        <AccordionItem value="size" className="border-rustic-brown">
          <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
            Talla
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-2">
              {filters.sizes.map((size) => (
                <SizeLabel
                  key={size.value}
                  size={size.label}
                  isSelected={currentFilters.sizes.includes(size.value)}
                  onClick={() => onFilterChange("size", size.value, !currentFilters.sizes.includes(size.value))}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {filters.colors.length > 0 && (
        <AccordionItem value="color" className="border-rustic-brown">
          <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filters.colors.map((color) => (
                <FilterCheckbox
                  key={color.value}
                  id={`color-${color.value}`}
                  label={color.label}
                  checked={currentFilters.colors.includes(color.value)}
                  onChange={(checked) => onFilterChange("color", color.value, checked)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}

      {filters.types.length > 0 && (
        <AccordionItem value="type" className="border-rustic-brown">
          <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
            Tipo
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {filters.types.map((type) => (
                <FilterCheckbox
                  key={type.value}
                  id={`type-${type.value}`}
                  label={type.label}
                  checked={currentFilters.types.includes(type.value)}
                  onChange={(checked) => onFilterChange("type", type.value, checked)}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}