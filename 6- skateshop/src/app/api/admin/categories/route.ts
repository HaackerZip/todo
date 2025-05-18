// app/api/v1/categories/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Category } from "@/types/category";

const prisma = new PrismaClient();

// Helper para respuestas de error
const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const transformedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      isFeatured: category.isFeatured,
      imageUrl: category.imageUrl,
      productCount: category._count.products,
    }));

    return NextResponse.json(transformedCategories);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al obtener categorías" },
      { status: 500 },
    );
  }
}

// POST - Crear nueva categoría
export async function POST(request: Request) {
  try {
    const body: Omit<Category, "id"> = await request.json();

    if (!body.name) {
      return errorResponse("El nombre es requerido", 400);
    }

    // Verificar si la categoría ya existe
    const existingCategory = await prisma.category.findUnique({
      where: { name: body.name },
    });

    if (existingCategory) {
      return errorResponse("La categoría ya existe", 409);
    }

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        isFeatured: body.isFeatured || false,
        imageUrl: body.imageUrl,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.log(error);
    return errorResponse("Error al crear categoría", 500);
  }
}

// PUT - Actualizar categoría existente
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body: Partial<Category> = await request.json();

    if (!id) {
      return errorResponse("ID de categoría requerido", 400);
    }

    // Verificar existencia de la categoría
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return errorResponse("Categoría no encontrada", 404);
    }

    // Verificar si el nuevo nombre ya existe (solo si se está actualizando el nombre)
    if (body.name && body.name !== existingCategory.name) {
      const nameConflict = await prisma.category.findUnique({
        where: { name: body.name },
      });

      if (nameConflict) {
        return errorResponse("El nombre de categoría ya está en uso", 409);
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: body.name ?? existingCategory.name,
        isFeatured: body.isFeatured ?? existingCategory.isFeatured,
        imageUrl: body.imageUrl ?? existingCategory.imageUrl,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log(error);
    return errorResponse("Error al actualizar categoría", 500);
  }
}

// DELETE - Eliminar categoría
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return errorResponse("ID de categoría requerido", 400);
    }

    // Verificar si la categoría existe
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return errorResponse("Categoría no encontrada", 404);
    }

    // Verificar si tiene productos asociados
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      return errorResponse(
        "No se puede eliminar categoría con productos asociados",
        400,
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Categoría eliminada exitosamente" });
  } catch (error) {
    console.log(error);
    return errorResponse("Error al eliminar categoría", 500);
  }
}
