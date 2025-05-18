import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Prisma } from "@prisma/client";

// Obtener el carrito del usuario
export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Obtener el carrito del usuario con sus ítems
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  // Si el usuario no tiene carrito, crear uno vacío
  if (!cart) {
    const newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
        items: {},
      },
      include: { items: true },
    });
    return NextResponse.json(newCart);
  }

  return NextResponse.json(cart);
}

// Agregar un producto al carrito
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { productId, quantity } = await request.json();

  // Verificar si el usuario existe
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuario no encontrado" },
      { status: 404 },
    );
  }

  // Buscar o crear el carrito del usuario
  let cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: session.user.id },
    });
  }

  // Verificar si el producto ya está en el carrito
  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (existingCartItem) {
    // Si ya existe, actualizar la cantidad
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity },
      include: { product: true },
    });
    return NextResponse.json(updatedCartItem);
  } else {
    // Si no existe, crear un nuevo item en el carrito
    const newCartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
      include: { product: true },
    });
    return NextResponse.json(newCartItem);
  }
}

// Eliminar un producto del carrito
export async function DELETE(request: Request) {
  const session = await auth();

  // Verificar si el usuario está autenticado
  if (!session) {
    return NextResponse.json(
      { error: "No autorizado. Inicia sesión para continuar." },
      { status: 401 },
    );
  }

  try {
    const { productId } = await request.json();

    // Verificar si el productId es válido
    if (!productId) {
      return NextResponse.json(
        { error: "El ID del producto es requerido." },
        { status: 400 },
      );
    }

    // Buscar el carrito del usuario
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
    });

    // Si el carrito no existe, devolver un error
    if (!cart) {
      return NextResponse.json(
        { error: "Carrito no encontrado." },
        { status: 404 },
      );
    }

    // Eliminar el ítem del carrito
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    // Respuesta exitosa
    return NextResponse.json({
      message: "Producto eliminado del carrito correctamente.",
    });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito:", error);

    // Manejo de errores específicos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "El producto no existe en el carrito." },
          { status: 404 },
        );
      }
    }

    // Error genérico
    return NextResponse.json(
      { error: "Ocurrió un error al eliminar el producto del carrito." },
      { status: 500 },
    );
  }
}

// Actualizar la cantidad de un producto en el carrito
export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { productId, quantity } = await request.json();

  // Buscar el carrito del usuario
  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
  });

  if (!cart) {
    return NextResponse.json(
      { error: "Carrito no encontrado" },
      { status: 404 },
    );
  }

  // Verificar si el producto está en el carrito
  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!existingCartItem) {
    return NextResponse.json(
      { error: "Producto no encontrado en el carrito" },
      { status: 404 },
    );
  }

  // Actualizar la cantidad del producto en el carrito
  const updatedCartItem = await prisma.cartItem.update({
    where: { id: existingCartItem.id },
    data: { quantity },
    include: { product: true },
  });

  return NextResponse.json(updatedCartItem);
}
