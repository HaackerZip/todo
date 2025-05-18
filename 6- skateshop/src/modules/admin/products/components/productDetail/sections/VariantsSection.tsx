import { TabsContent } from "@/modules/ui/tabs";
import { VariantCard } from "../subcomponentes/VariantCard";

export const VariantsSection = ({ product }: { product: any }) => (
  <TabsContent value="variants" className="mt-6">
    <div className="grid gap-6">
      {product.sizes && <VariantCard title="Available Sizes" items={product.sizes} />}
      {product.colors && <VariantCard title="Available Colors" items={product.colors} />}
      {product.types && <VariantCard title="Available Types" items={product.types} />}
    </div>
  </TabsContent>
);