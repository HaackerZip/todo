import Image from "next/image";
import Link from "next/link";
import { Button } from "@/modules/ui/button";
import { ShoppingCart, Zap, Heart } from "lucide-react";
import useCartStore from "@/modules/cart/hooks/useCartStore";
import { toast } from "@/hooks/use-toast";
import { memo, useCallback, useMemo } from "react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";

const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  // Memoize image URLs and formatted price
  const { mainImage, hoverImage, formattedPrice } = useMemo(() => {
    const main = product.images.find((img) => img.type === "MAIN");
    const hover = product.images.find((img) => img.type === "HOVER");
    
    const formatPrice = (price: number | null | undefined) => {
      if (typeof price !== "number" || isNaN(price)) return "N/A";
      return `$${price.toFixed(2)}`;
    };

    return {
      mainImage: main?.url || "/placeholder.svg",
      hoverImage: hover?.url || main?.url || "/placeholder.svg",
      formattedPrice: formatPrice(product.price)
    };
  }, [product.images, product.price]);

  const handleAddToCart = useCallback(() => {
    try {
      if (!product.id) throw new Error("Product ID is required");

      addItem({
        id: crypto.randomUUID(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: mainImage,
        quantity: 1,
      });

      toast({
        title: "Producto añadido",
        description: `${product.name} se ha añadido al carrito`,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast({
        title: "Error",
        description: "No se pudo añadir el producto al carrito",
        variant: "destructive",
      });
    }
  }, [addItem, product.id, product.name, product.price, mainImage]);

  const handleBuyNow = useCallback(() => {
    handleAddToCart();
    router.push("/checkout");
  }, [handleAddToCart, router]);

  return (
    <div className="group/card h-full overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 hover:border-yellow-500 hover:shadow-yellow-500/20">
      <Link href={`/products/${product.id}`} className="block" aria-label={`View ${product.name} details`}>
        <div className="group/card relative aspect-[3/4] overflow-hidden rounded-t-lg bg-[#E9BA27] transition-transform duration-300">
          {/* Badge opcional */}
          {product.createdAt && (
            <span className="absolute left-2 top-2 z-10 rounded-full bg-green-600/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Nuevo
            </span>
          )}
          
          {/* Ícono favorito */}
          <button
            onClick={(e) => {
              e.preventDefault();
              // Lógica de favoritos aquí
            }}
            className="absolute right-2 top-2 z-10 rounded-full bg-gray-900/50 p-1.5 transition-all hover:bg-gray-900/80 hover:scale-110"
            aria-label="Añadir a favoritos"
          >
            <Heart className="h-4 w-4 stroke-gray-300 fill-transparent transition-colors hover:stroke-red-500" />
          </button>

          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="bg-yellow-800 object-fill object-center transition-[opacity,transform] duration-300 group-hover/card:opacity-0"
            priority={false}
          />
          <Image
            src={hoverImage}
            alt={`${product.name} hover`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="bg-yellow-800 object-fill object-center opacity-0 transition-[opacity,transform] duration-300 group-hover/card:opacity-100"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover/card:opacity-100" />
        </div>
      </Link>

      <div className="flex flex-shrink-0 flex-col justify-between bg-deep-black p-4 space-y-1.5">
        <div>
          <p className="text-xs font-semibold text-yellow-500/90">{product.brand}</p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-gray-100">
            {product.name}
          </h3>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-lg font-bold text-transparent">
            {formattedPrice}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="promo"
              className="px-2 py-1 text-xs transition-transform hover:scale-[1.03]"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              Agregar
            </Button>
            <Button
              size="sm"
              variant="default"
              className="px-2 py-1 text-xs bg-vintage-gold hover:bg-deep-black text-black hover:text-vintage-gold transition-transform hover:scale-[1.03]"
              onClick={handleBuyNow}
              aria-label={`Buy ${product.name} now`}
            >
              <Zap className="mr-1 h-3 w-3 text-black" />
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;