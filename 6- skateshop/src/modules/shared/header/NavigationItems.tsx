import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/modules/ui/dropdown-menu";

interface SubItem {
  name: string;
  href: string;
}

interface Category {
  name: string;
  items: SubItem[];
}

interface Item {
  name: string;
  href?: string;
  categories?: Category[];
}

export function NavigationItem({ item }: { item: Item }) {
  return (
    <div className="justify-center aligc">
      {item.categories ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-sm font-semibold leading-6 text-white hover:text-vintage-gold">
            {item.name}
            <ChevronDown className="ml-1 h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-deep-black text-white">
            {item.categories.map((category) => (
              <div key={category.name} className="px-2 py-1.5">
                <p className="mb-1 px-2 text-sm font-semibold text-vintage-gold">{category.name}</p>
                {category.items.map((subItem) => (
                  <DropdownMenuItem key={subItem.name} asChild>
                    <Link href={subItem.href} className="text-sm hover:text-vintage-gold">
                      {subItem.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={item.href ?? "#"} className="text-sm font-semibold leading-6 text-white hover:text-vintage-gold">
          {item.name}
        </Link>
      )}
    </div>
  );
}
