// app/api/categories/featured/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const featuredCategories = await prisma.category.findMany({
      where: {
        isFeatured: true,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        // products: {
        //   take: 4,
        //   select: {
        //     id: true,
        //     name: true,
        //   },
        // },
      },
    });
    return NextResponse.json(featuredCategories);
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Error fetching featured categories' },
      { status: 500 },
    );
  }
}