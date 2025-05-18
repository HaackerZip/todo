// app/api/products/featured/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Definir campos válidos para ordenamiento
const validOrderByFields = ['createdAt', 'price', 'name', 'featuredPriority'] as const;
type OrderByField = typeof validOrderByFields[number];
type SortOrder = 'asc' | 'desc';

const featuredProductSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  name: true,
  price: true,
  images: {
    select: {
      id: true,
      url: true,
      type: true,
    }
  },
  brand: true,
  stock: true,
  discount: true,
  createdAt: true,
  updatedAt: true
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parsear y validar parámetros
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "15")));
    
    // Validar orderBy
    const orderByParam = searchParams.get("orderBy") || "featuredPriority";
    const orderBy = validOrderByFields.includes(orderByParam as OrderByField) 
      ? orderByParam as OrderByField 
      : "featuredPriority";
    
    // Validar order
    const orderParam = searchParams.get("order") || "desc";
    const order: SortOrder = orderParam === "asc" ? "asc" : "desc";

    // Consulta con paginación
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: { 
          category: {
            isFeatured: true
          },
          stock: { gt: 0 } // Solo productos con stock disponible
        },
        select: featuredProductSelect,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { [orderBy]: order }
      }),
      prisma.product.count({ 
        where: { 
          category: {
            isFeatured: true
          },
          stock: { gt: 0 }
        } 
      })
    ]);

    // Si no hay productos, retornar respuesta vacía con metadata
    if (!products.length) {
      return NextResponse.json({
        data: [],
        pagination: {
          total: 0,
          totalPages: 0,
          currentPage: page,
          perPage: limit,
          hasNextPage: false,
          hasPrevPage: false
        }
      });
    }

    return NextResponse.json({
      data: products,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        perPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos destacados' },
      { status: 500 }
    );
  }
}