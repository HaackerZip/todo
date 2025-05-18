// app/api/products/filters/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600; // 1 hora de cache

export async function GET() {
  try {
    const [brands, sizes, colors, types, categories] = await prisma.$transaction([
      prisma.product.findMany({
        select: { brand: true },
        distinct: ["brand"],
        orderBy: { brand: "asc" },
      }),
      prisma.size.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
      prisma.color.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
      prisma.productType.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
      prisma.category.findMany({
        where: { isFeatured: true },
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);
    return NextResponse.json({
      brands: brands.map(b => b.brand).filter(Boolean),
      sizes: sizes.map(s => ({ value: s.id, label: s.name })),
      colors: colors.map(c => ({ value: c.id, label: c.name })),
      types: types.map(t => ({ value: t.id, label: t.name })),
      categories: categories,
    });
  } catch (error) {
    console.error("Error en GET /api/products/filters:", error);
    return NextResponse.json(
      { error: "Error al obtener filtros" },
      { status: 500 }
    );
  }
}