'use client';

import Image from "next/image";
import { notFound } from "next/navigation";
import { useProduct } from "@/modules/products/hooks/useProducts";
import { Button } from "@/modules/ui/button";
import { ClientOnly } from "@/modules//products/utils/ClientOnly";
import { ThumbnailGallery } from "@/modules/products/components/products/ThumbnailGallery";
import useCartStore from "@/modules/cart/hooks/useCartStore";
import { toast } from "@/hooks/use-toast";
import { ProductImage } from "@/types/product";

interface Props {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { product, isLoading, error } = useProduct(params.id);
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    if (!product) return;

    try {
      const mainImage = product.images.find((img: ProductImage) => img.isMain)?.url;
      if (!mainImage) {
        const firstImage = product.images[0]?.url;
        if (!firstImage) throw new Error("No se encontró imagen del producto");
        addToCart(firstImage);
        return;
      }
      addToCart(mainImage);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudo añadir el producto al carrito",
        variant: "destructive",
      });
    }
  };

  const addToCart = (image: string) => {
    addItem({
      id: crypto.randomUUID(),
      productId: product!.id || "",
      name: product!.name,
      price: product!.price,
      image,
      quantity: 1
    });

    toast({
      title: "Producto añadido",
      description: `${product!.name} se ha añadido al carrito`,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return notFound();

  // Obtener imágenes para la galería
  const mainImage = product.images.find((img: ProductImage) => img.isMain)?.url || product.images[0]?.url || "/placeholder.svg";
  const galleryImages = product.images
    .filter((img: ProductImage) => img.isGallery || img.isMain)
    .sort((a: ProductImage, b: ProductImage) => a.order - b.order)
    .map((img: ProductImage) => img.url);

  return (
    <ClientOnly>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow bg-deep-black">
          <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr] gap-8">
              <ThumbnailGallery images={galleryImages} productName={product.name} />

              <div className="aspect-square w-full overflow-hidden rounded-lg bg-coffee-brown">
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover object-center"
                  priority
                />
              </div>

              <div className="lg:pl-8">
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {product.name}
                </h1>

                <div className="mt-3">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-vintage-gold">
                    {/* ${product.price.toFixed(2)} */}xd
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6 text-base text-gray-300">
                    {product.description}
                  </div>
                </div>

                <div className="mt-8 flex">
                  <Button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full bg-coffee-brown hover:bg-coffee-brown/90"
                  >
                    Agregar al carrito
                  </Button>
                </div>

                {product.specifications && (
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-white">Especificaciones</h3>
                    <div className="mt-4 space-y-6">
                      <ul className="list-disc space-y-2 pl-4 text-sm text-gray-300">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <li key={key}>
                            <span className="text-gray-400">{key}:</span> {String(value)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ClientOnly>
  );
}