// app/api/v1/categories/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID de categoría requeridoxd' },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            brand: true
          },
          orderBy: { name: 'asc' }
        },
        _count: {
          select: { products: true }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      );
    }

    const responseData = {
      id: category.id,
      name: category.name,
      isFeatured: category.isFeatured,
      imageUrl: category.imageUrl,
      productCount: category._count.products,
      products: category.products
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error al obtener categoría' },
      { status: 500 }
    );
  }
}