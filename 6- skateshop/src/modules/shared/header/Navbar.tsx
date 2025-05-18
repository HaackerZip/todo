import { navigation } from "@/data/navigation";
import { NavigationItem } from "@/modules/shared/header/NavigationItems";

export function Navbar() {
  return (
    <div className="hidden lg:flex gap-x-12">
      {navigation.map((item) => (
        <NavigationItem key={item.name} item={item} />
      ))}
    </div>
  );
}