import { TabsContent } from "@/modules/ui/tabs";
import { Card } from "@/modules/ui/card";
import { InfoCard } from "../subcomponentes/InfoCard";
import { SpecificationCard } from "../subcomponentes/SpecificationCard";

export const DetailsSection = ({ product }: { product: any }) => (
  <TabsContent value="details" className="mt-6">
    <div className="grid gap-6">
      <div className="grid grid-cols-3 gap-4">
        <InfoCard title="Price" value={product.price} />
        <InfoCard title="Stock" value={`${product.stock} units`} />
        <InfoCard title="Category" value={product.category} />
      </div>

      {product.description && (
        <Card className="bg-[#0F172A] border-gray-700 p-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
          <p className="text-gray-300">{product.description}</p>
        </Card>
      )}

      {product.specifications && <SpecificationCard specifications={product.specifications} />}
    </div>
  </TabsContent>
);