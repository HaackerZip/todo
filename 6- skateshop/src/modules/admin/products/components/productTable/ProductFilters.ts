import { FilterOption } from "@/types/category";

export const productsFilters: FilterOption[] = [
  {
    key: "category",
    label: "Category",
    options: [
      { label: "All", value: "all" },
      { label: "Decks", value: "Decks" },
      { label: "Trucks", value: "Trucks" },
      { label: "Wheels", value: "Wheels" },
    ],
  },
  {
    key: "status",
    label: "Status",
    options: [
      { label: "All", value: "all" },
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
];
