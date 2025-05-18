// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Selección optimizada para listado de productos
const productListSelect = Prisma.validator<Prisma.ProductSelect>()({
  id: true,
  name: true,
  price: true,
  images: {
    select: {
      id: true,
      url: true,
      type: true
    }
  },
  brand: true,
  stock: true,
  discount: true,
  createdAt: true,
  updatedAt: true
});

// Helper: Construcción de condiciones WHERE
function buildWhereConditions(searchParams: URLSearchParams): Prisma.ProductWhereInput {
  const categoryId = searchParams.get("categoryId");
  // const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const brand = searchParams.get("brand");
  const sizes = searchParams.getAll("size");
  const colors = searchParams.getAll("color");
  const types = searchParams.getAll("type");

  return {
    AND: [
      categoryId && categoryId !== "all" ? { categoryId } : {},
      minPrice || maxPrice ? {
        price: {
          ...(minPrice && { gte: Number(minPrice) }),
          ...(maxPrice && { lte: Number(maxPrice) }),
        },
      } : {},

      brand ? { brand } : {},

      sizes.length > 0 ? {
        sizes: {
          some: {
            size: {
              id: {
                in: sizes
              }
            }
          }
        }
      } : {},
      colors.length > 0 ? {
        colors: {
          some: {
            color: {
              id: {
                in: colors
              }
            }
          }
        }
      } : {},
      types.length > 0 ? {
        types: {
          some: {
            id: {
              in: types
            }
          }
        }
      } : {},
    ].filter(Boolean) as Prisma.ProductWhereInput[],
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // const rawParams = Object.fromEntries(searchParams.entries());

    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const order = searchParams.get("order") === "desc" ? "desc" : "asc";

    const orderBy = ["name", "price", "createdAt", "updatedAt"].includes(searchParams.get("orderBy") || "")
      ? searchParams.get("orderBy") as keyof Prisma.ProductOrderByWithRelationInput : "name";

    // Construcción de condiciones WHERE
    const whereConditions = buildWhereConditions(searchParams);
    // Consulta principal con transacción
    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({
        where: whereConditions,
        orderBy: { [orderBy]: order },
        take: limit,
        skip: (page - 1) * limit,
        select: productListSelect,
      }),
      prisma.product.count({ where: whereConditions }),
    ]);

    // Respuesta estandarizada
    return NextResponse.json({
      data: products,
      meta: {
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page < Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error en GET /api/products:", error);
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}
