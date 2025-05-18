import { Sheet, SheetContent, SheetTrigger } from "@/modules/ui/sheet";
import { Button } from "@/modules/ui/button";
import { Menu } from "lucide-react";
import { navigation } from "@/data/navigation";
import { NavigationItem } from "@/modules/shared/header/NavigationItems";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-deep-black">
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-coffee-brown">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <NavigationItem key={item.name} item={item} />
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
