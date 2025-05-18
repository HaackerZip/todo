// // src/app/api/profile/route.ts
// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

// // Obtener el perfil del usuario
// export async function GET() {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "No autorizado" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { id: session.user.id },
//     select: { name: true, email: true, image: true },
//   });

//   return NextResponse.json(user);
// }

// // Actualizar el perfil del usuario
// export async function PUT(request: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return NextResponse.json({ error: "No autorizado" }, { status: 401 });
//   }

//   const { name, image } = await request.json();

//   const updatedUser = await prisma.user.update({
//     where: { id: session.user.id },
//     data: { name, image },
//   });

//   return NextResponse.json(updatedUser);
// }
