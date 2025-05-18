import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { productSchema } from "@/modules/products/schemas/productSchemas";
import { z } from "zod";
import type { ProductInput } from "@/modules/products/schemas/productSchemas";

// PUT - Actualizar producto existente
export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      price,
      stock,
      categoryId,
      brand,
      discount,
      specifications,
      images,
      sizes,
      colors,
      types,
    } = body;

    // Primero actualizamos el producto
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        categoryId,
        brand,
        discount: discount ? parseFloat(discount) : null,
        specifications,
        // Actualizamos las imágenes relacionadas
        images: {
          deleteMany: {}, // Eliminamos todas las imágenes existentes
          create: (images as ProductInput["images"]).map((image) => ({
            url: image.url,
            type: image.type,
          })),
        },
        // Actualizamos las variantes
        sizes: {
          deleteMany: {},
          create: sizes?.map((size: string) => ({ value: size })) || [],
        },
        colors: {
          deleteMany: {},
          create: colors?.map((color: string) => ({ value: color })) || [],
        },
        types: {
          deleteMany: {},
          create: types?.map((type: string) => ({ value: type })) || [],
        },
      },
      include: {
        images: true,
        category: true,
        sizes: true,
        colors: true,
        types: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[UPDATE_PRODUCT_ERROR]:", error);
    return NextResponse.json(
      { error: "Error actualizando producto" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  console.log("POST /api/admin/products - Starting request handling");

  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { error: "No autorizado: Inicia sesión" },
      { status: 401 },
    );
  }

  try {
    const rawData = await request.json();
    console.log("Received request data:", JSON.stringify(rawData, null, 2));

    const validatedData = productSchema.parse(rawData);
    console.log("Validated data:", JSON.stringify(validatedData, null, 2));

    const product = await prisma.$transaction(async (tx) => {
      // Primero creamos el producto
      const newProduct = await tx.product.create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          price: validatedData.price,
          stock: validatedData.stock,
          categoryId: validatedData.categoryId,
          brand: validatedData.brand,
          discount: validatedData.discount,
          specifications: validatedData.specifications,
        },
      });

      console.log("Producto creado:", newProduct.id);

      try {
        // Ensure all previous images are deleted
        await tx.productImage.deleteMany({
          where: { productId: newProduct.id },
        });
        console.log("Imágenes anteriores eliminadas");

        // Crear todas las imágenes
        await tx.productImage.createMany({
          data: validatedData.images.map((image) => ({
            url: image.url,
            type: image.type,
            productId: newProduct.id,
          })),
        });

        console.log("Todas las imágenes creadas correctamente");
      } catch (error) {
        console.error("Error al crear imágenes:", error);
        throw error;
      }

      // Creamos las relaciones con tallas, colores y tipos si existen
      if (validatedData.sizes?.length) {
        await tx.productSize.createMany({
          data: validatedData.sizes.map((size) => ({
            productId: newProduct.id,
            sizeId: size.sizeId,
          })),
        });
      }

      if (validatedData.colors?.length) {
        await tx.productColor.createMany({
          data: validatedData.colors.map((color) => ({
            productId: newProduct.id,
            colorId: color.colorId,
          })),
        });
      }

      if (validatedData.types?.length) {
        await tx.product.update({
          where: { id: newProduct.id },
          data: {
            types: {
              connect: validatedData.types.map(type => ({ id: type.typeId }))
            }
          }
        });
      }

      return tx.product.findUnique({
        where: { id: newProduct.id },
        include: {
          images: true,
          category: true,
          sizes: {
            include: { size: true },
          },
          colors: {
            include: { color: true },
          },
          types: true,
        },
      });
    });

    console.log(
      "Product created successfully:",
      JSON.stringify(product, null, 2),
    );
    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    console.error("[CREATE_PRODUCT_ERROR]:", error);

    if (error instanceof z.ZodError) {
      const validationErrors = {
        error: "Datos inválidos",
        details: error.errors.map((e: z.ZodIssue) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      };
      console.error("Validation errors:", validationErrors);
      return NextResponse.json(validationErrors, { status: 400 });
    }

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // First check if product exists
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    // Delete related records first using deleteMany to avoid foreign key issues
    await prisma.$transaction(async (tx) => {
      // Delete cart items if they exist
      await tx.cartItem.deleteMany({
        where: { productId: params.id },
      });

      // Delete product images if they exist
      await tx.productImage.deleteMany({
        where: { productId: params.id },
      });

      // Delete variants
      await tx.productSize.deleteMany({
        where: { productId: params.id },
      });
      await tx.productColor.deleteMany({
        where: { productId: params.id },
      });
      await tx.productType.deleteMany({
        where: { products: { some: { id: params.id } } },
      });

      // Finally delete the product
      await tx.product.delete({
        where: { id: params.id },
      });
    });

    // Delete images from S3
    const deleteImagePromises = product.images.map((image) =>
      fetch(`/api/admin/upload?path=${encodeURIComponent(image.url)}`, {
        method: "DELETE",
      }),
    );
    await Promise.all(deleteImagePromises);

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("[DELETE_PRODUCT_ERROR]:", error);
    return NextResponse.json(
      { error: "Error eliminando producto" },
      { status: 500 },
    );
  }
}
