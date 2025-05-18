// "use client"

// import { useCallback, useEffect, useState, useMemo, memo } from "react"
// import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/modules/ui/button"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/modules/ui/accordion"
// import { Checkbox } from "@/modules/ui/checkbox"
// import { Label } from "@/modules/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/modules/ui/select"
// import { Slider } from "@/modules/ui/slider"
// import { useDebounceFunction } from "@/hooks/useDebounce"
// import type { FiltersResponse } from "@/types/filters"

// interface ProductFiltersProps {
//   filters?: FiltersResponse
//   isLoading?: boolean
// }

// // Memoized filter item components
// const FilterCheckbox = memo(({
//   id,
//   label,
//   checked,
//   onChange
// }: {
//   id: string
//   label: string
//   checked: boolean
//   onChange: (checked: boolean) => void
// }) => (
//   <div className="flex items-center space-x-2">
//     <Checkbox
//       id={id}
//       checked={checked}
//       onCheckedChange={onChange}
//     />
//     <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
//       {label}
//     </label>
//   </div>
// ))

// FilterCheckbox.displayName = "FilterCheckbox"

// const SizeLabel = memo(({
//   size,
//   isSelected,
//   onClick
// }: {
//   size: string
//   isSelected: boolean
//   onClick: () => void
// }) => (
//   <Label
//     className={`flex items-center justify-center p-2 border border-rustic-brown rounded cursor-pointer transition-colors ${isSelected
//       ? "bg-rustic-brown text-white"
//       : "hover:bg-rustic-brown hover:text-white"
//       }`}
//     onClick={onClick}
//   >
//     {size}
//   </Label>
// ))

// SizeLabel.displayName = "SizeLabel"

// export function ProductFilters({ filters }: ProductFiltersProps) {

//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [priceRange, setPriceRange] = useState([0, 200])
//   const [isUpdating, setIsUpdating] = useState(false)

//   // Memoize current filter values
//   const currentFilters = useMemo(() => ({
//     brands: searchParams.getAll("brand"),
//     sizes: searchParams.getAll("size"),
//     colors: searchParams.getAll("color"),
//     types: searchParams.getAll("type"),
//     minPrice: searchParams.get("minPrice"),
//     maxPrice: searchParams.get("maxPrice"),
//     categoryId: searchParams.get("categoryId"),
//   }), [searchParams])

//   useEffect(() => {
//     if (!filters) return

//     if (!currentFilters.minPrice && !currentFilters.maxPrice) {
//       setPriceRange([0, 200])
//     } else if (currentFilters.minPrice && currentFilters.maxPrice) {
//       setPriceRange([parseInt(currentFilters.minPrice), parseInt(currentFilters.maxPrice)])
//     }

//     if (currentFilters.categoryId) {
//       setSelectedCategory(currentFilters.categoryId)
//     }
//   }, [currentFilters.minPrice, currentFilters.maxPrice, currentFilters.categoryId, filters])

//   const updateFilters = useCallback((newParams: URLSearchParams) => {
//     if (isUpdating) return
//     setIsUpdating(true)

//     // Update URL without causing a page reload
//     router.push(`${pathname}?${newParams.toString()}`, { scroll: false })

//     // Prevent rapid consecutive updates
//     setTimeout(() => setIsUpdating(false), 100)
//   }, [pathname, router, isUpdating])

//   // Debounced price change handler
//   const debouncedUpdatePrice = useDebounceFunction((value: [number, number]) => {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set("minPrice", value[0].toString())
//     params.set("maxPrice", value[1].toString())
//     updateFilters(params)
//   }, 300)

//   const handlePriceChange = useCallback((value: [number, number]) => {
//     setPriceRange(value)
//     debouncedUpdatePrice(value)
//   }, [debouncedUpdatePrice])

//   const handleFilterChange = useCallback((type: string, value: string, checked: boolean) => {
//     const params = new URLSearchParams(searchParams.toString())
//     const currentValues = params.getAll(type)

//     if (checked) {
//       if (!currentValues.includes(value)) {
//         params.append(type, value)
//       }
//     } else {
//       params.delete(type)
//       currentValues.filter(v => v !== value).forEach(v => params.append(type, v))
//     }

//     updateFilters(params)
//   }, [searchParams, updateFilters])

//   const handleCategoryChange = useCallback((value: string) => {
//     const params = new URLSearchParams(searchParams.toString())
//     if (value && value !== "all") {
//       params.set("categoryId", value)
//     } else {
//       params.delete("categoryId")
//     }
//     setSelectedCategory(value)
//     updateFilters(params)
//   }, [searchParams, updateFilters])

//   const handleClearFilters = useCallback(() => {
//     setSelectedCategory("all")
//     setPriceRange([0, 200])
//     updateFilters(new URLSearchParams())
//   }, [updateFilters])

//   if (!filters) return null

//   return (
//     <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pb-8 -mx-4 px-4 lg:mx-0 lg:px-0">
//       <div className="space-y-6">
//         {/* Selector de categoría */}
//         <div>
//           <Label htmlFor="category" className="text-sm font-medium text-vintage-gold">
//             Categoría
//           </Label>
//           <Select value={selectedCategory} onValueChange={handleCategoryChange}>
//             <SelectTrigger className="w-full mt-2 bg-coffee-brown border-rustic-brown">
//               <SelectValue placeholder="Seleccionar categoría" />
//             </SelectTrigger>
//             <SelectContent className="bg-deep-black text-white border-rustic-brown">
//               <SelectItem value="all">Todos los productos</SelectItem>
//               {filters?.categories?.map((category) => (
//                 <SelectItem key={category.id} value={category.id}>
//                   {category.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Rango de precio */}
//         <div className="space-y-4">
//           <Label className="text-sm font-medium text-vintage-gold">Rango de precio</Label>
//           <Slider
//             defaultValue={[0, 200]}
//             min={0}
//             max={200}
//             step={10}
//             value={priceRange}
//             onValueChange={handlePriceChange}
//             className="mt-2"
//           />
//           <div className="flex justify-between text-sm text-gray-400">
//             <span>${priceRange[0]}</span>
//             <span>${priceRange[1]}</span>
//           </div>
//         </div>

//         {/* Filtros dinámicos */}
//         <Accordion type="single" collapsible className="w-full">
//           {filters.brands.length > 0 && (
//             <AccordionItem value="brand" className="border-rustic-brown">
//               <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
//                 Marca
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-2">
//                   {filters.brands.map((brand) => (
//                     <FilterCheckbox
//                       key={brand}
//                       id={`brand-${brand}`}
//                       label={brand}
//                       checked={currentFilters.brands.includes(brand)}
//                       onChange={(checked) => handleFilterChange("brand", brand, checked)}
//                     />
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           )}

//           {filters.sizes.length > 0 && (
//             <AccordionItem value="size" className="border-rustic-brown">
//               <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
//                 Talla
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="grid grid-cols-3 gap-2">
//                   {filters.sizes.map((size) => (
//                     <SizeLabel
//                       key={size.value}
//                       size={size.label}
//                       isSelected={currentFilters.sizes.includes(size.value)}
//                       onClick={() => handleFilterChange("size", size.value, !currentFilters.sizes.includes(size.value))}
//                     />
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           )}

//           {filters.colors.length > 0 && (
//             <AccordionItem value="color" className="border-rustic-brown">
//               <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
//                 Color
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-2">
//                   {filters.colors.map((color) => (
//                     <FilterCheckbox
//                       key={color.value}
//                       id={`color-${color.value}`}
//                       label={color.label}
//                       checked={currentFilters.colors.includes(color.value)}
//                       onChange={(checked) => handleFilterChange("color", color.value, checked)}
//                     />
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           )}

//           {filters.types.length > 0 && (
//             <AccordionItem value="type" className="border-rustic-brown">
//               <AccordionTrigger className="text-vintage-gold hover:text-vintage-gold">
//                 Tipo
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="space-y-2">
//                   {filters.types.map((type) => (
//                     <FilterCheckbox
//                       key={type.value}
//                       id={`type-${type.value}`}
//                       label={type.label}
//                       checked={currentFilters.types.includes(type.value)}
//                       onChange={(checked) => handleFilterChange("type", type.value, checked)}
//                     />
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           )}
//         </Accordion>

//         {/* Botones de acción */}
//         <div className="space-y-2">
//           <Button
//             variant="outline"
//             className="w-full border-rustic-brown hover:bg-rustic-brown"
//             onClick={handleClearFilters}
//           >
//             Limpiar filtros
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }