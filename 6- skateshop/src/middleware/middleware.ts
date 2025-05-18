import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Definición de rutas
const publicRoutes = ["/", "/prices", "/about", "/contact"];
const apiAuthPrefix = "/api/auth";
const protectedRoutes = [
  "/profile",
  "/dashboard",
  "/admin",
  "/cart",
  "/orders",
];

// Función auxiliar para verificar si una ruta es pública
const isPublicRoute = (pathname: string) => {
  return publicRoutes.includes(pathname);
};

// Función auxiliar para verificar si una ruta está protegida
const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.includes(pathname);
};

// Función auxiliar para verificar si una ruta es de autenticación de API
const isApiAuthRoute = (pathname: string) => {
  return pathname.startsWith(apiAuthPrefix);
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Permitir todas las rutas de API de autenticación
  if (isApiAuthRoute(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Para API routes protegidas
  if (
    nextUrl.pathname.startsWith("/api/products") &&
    (req.method === "POST" || req.method === "PUT" || req.method === "DELETE")
  ) {
    if (!isLoggedIn) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
  }

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  if (!isLoggedIn && isProtectedRoute(nextUrl.pathname)) {
    const callbackUrl = nextUrl.pathname;
    return NextResponse.redirect(
      new URL(`/?authModal=login&callbackUrl=${callbackUrl}`, nextUrl),
    );
  }

  // Permitir acceso a rutas públicas sin importar el estado de autenticación
  if (isPublicRoute(nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Permitir el acceso a la ruta
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
