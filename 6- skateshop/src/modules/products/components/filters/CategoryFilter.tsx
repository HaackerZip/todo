import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/ui/select"
import { Label } from "@/modules/ui/label"

export function CategoryFilter({
  selectedCategory,
  categories,
  onChange
}: {
  selectedCategory: string
  categories?: Array<{ id: string; name: string }>
  onChange: (value: string) => void
}) {
  return (
    <div>
      <Label htmlFor="category" className="text-sm font-medium text-vintage-gold">
        Categoría
      </Label>
      <Select value={selectedCategory} onValueChange={onChange}>
        <SelectTrigger className="w-full mt-2 bg-coffee-brown border-rustic-brown">
          <SelectValue placeholder="Seleccionar categoría" />
        </SelectTrigger>
        <SelectContent className="bg-deep-black text-white border-rustic-brown">
          <SelectItem value="all">Todos los productos</SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}