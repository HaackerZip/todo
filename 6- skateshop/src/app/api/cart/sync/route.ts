import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface CartItem {
  productId: string;
  quantity: number;
}

interface SyncRequest {
  items: CartItem[];
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { items } = (await request.json()) as SyncRequest;

    // Obtener el carrito actual del usuario
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: true }
    });

    if (!cart) {
      // Crear nuevo carrito si no existe
      await prisma.cart.create({
        data: {
          userId: session.user.id,
          items: {
            create: items.map((item: CartItem) => ({
              productId: item.productId,
              quantity: item.quantity
            }))
          }
        }
      });
    } else {
      // Actualizar carrito existente
      // 1. Eliminar items que ya no están en el carrito local
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId: {
            notIn: items.map((item: CartItem) => item.productId)
          }
        }
      });

      // 2. Actualizar o crear nuevos items
      for (const item of items) {
        await prisma.cartItem.upsert({
          where: {
            cartId_productId: {
              cartId: cart.id,
              productId: item.productId
            }
          },
          update: {
            quantity: item.quantity
          },
          create: {
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sincronizando carrito:", error);
    return NextResponse.json(
      { error: "Error al sincronizar el carrito" },
      { status: 500 }
    );
  }
}
