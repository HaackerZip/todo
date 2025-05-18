import { TabsContent } from "@/modules/ui/tabs";
import { Card } from "@/modules/ui/card";
import { ImageCard } from "../subcomponentes/ImageCard";

export const ImagesSection = ({ images, productName }: { images?: any; productName: string }) => (
  <TabsContent value="images" className="mt-6">
    <div className="grid gap-6">
      {images && (
        <>
          <Card className="bg-[#0F172A] border-gray-700">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Product Images</h3>
              <div className="grid grid-cols-2 gap-4">
                <ImageCard
                  title="Main Image"
                  src={images.main}
                  alt={productName}
                />
                <ImageCard
                  title="Hover Image"
                  src={images.hover}
                  alt={`${productName} hover`}
                />
              </div>
            </div>
          </Card>

          <Card className="bg-[#0F172A] border-gray-700">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Gallery</h3>
              <div className="grid grid-cols-3 gap-4">
                {images.gallery.map((image: string, index: number) => (
                  <ImageCard
                    key={index}
                    src={image}
                    alt={`${productName} ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  </TabsContent>
);