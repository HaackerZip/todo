import { PrismaClient } from "@prisma/client";
import { products } from "../src/components/data/products";
import { categories } from "../src/components/data/categories";
import { colors } from "../src/components/data/colors";
import { sizes } from "../src/components/data/sizes";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Iniciando seed...");

    // Limpiar la base de datos en orden para evitar errores de foreign keys
    console.log("🧹 Limpiando base de datos...");
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.orderDetail.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productSize.deleteMany();
    await prisma.productColor.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.size.deleteMany();
    await prisma.color.deleteMany();

    console.log("✨ Base de datos limpia");

    // Crear categorías
    console.log("📦 Creando categorías...");
    await Promise.all(
      categories.map((category) =>
        prisma.category.create({
          data: {
            id: category.id,
            name: category.name,
            imageUrl: category.imageUrl,
          },
        })
      )
    );

    // Crear colores
    console.log("🎨 Creando colores...");
    await Promise.all(
      colors.map((color) =>
        prisma.color.create({
          data: {
            name: color.name,
          },
        })
      )
    );

    // Crear tallas
    console.log("📏 Creando tallas...");
    await Promise.all(
      sizes.map((size) =>
        prisma.size.create({
          data: {
            id: size.id,
            name: size.name,
            type: size.id.includes("SK8") ? "skate" : "clothing",
          },
        })
      )
    );

    // Crear productos
    console.log("🛹 Creando productos...");
    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description || "",
          price: Number(product.price),
          stock: Number(product.stock || 0),
          categoryId: product.categoryId,
          brand: product.brand,
          views: 0,
          discount: product.discount,
          specifications: product.specifications || {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      // Crear imágenes del producto
      if (product.images && product.images.length > 0) {
        await Promise.all(
          product.images.map((image) =>
            prisma.productImage.create({
              data: {
                url: image.url,
                isMain: image.isMain,
                isHover: image.isHover,
                isGallery: image.isGallery,
                order: image.order,
                productId: createdProduct.id,
              },
            })
          )
        );
      }

      // Crear relaciones producto-color
      if (product.colors && product.colors.length > 0) {
        const existingColors = await prisma.color.findMany({
          where: { id: { in: product.colors } },
          select: { id: true },
        });
        const validColorIds = existingColors.map((color) => color.id);

        await Promise.all(
          validColorIds.map((colorId) =>
            prisma.productColor.create({
              data: {
                productId: createdProduct.id,
                colorId,
              },
            })
          )
        );
      }

      // Crear relaciones producto-talla
      if (product.sizes && product.sizes.length > 0) {
        const existingSizes = await prisma.size.findMany({
          where: { id: { in: product.sizes } },
          select: { id: true },
        });
        const validSizeIds = existingSizes.map((size) => size.id);

        await Promise.all(
          validSizeIds.map((sizeId) =>
            prisma.productSize.create({
              data: {
                productId: createdProduct.id,
                sizeId,
              },
            })
          )
        );
      }
    }

    console.log("✅ Seed completado con éxito!");
  } catch (error) {
    console.error("❌ Error durante el seed:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
