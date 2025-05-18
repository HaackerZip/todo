import type { NextAuthConfig } from "next-auth";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { loginSchema } from "@/modules/auth/schemas/authSchemas";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/utils/passwordUtils";

// Constantes para las claves de entorno
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export default {
  providers: [
    // Proveedor de Google
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    // Proveedor de credenciales (email/contraseña)
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedFields = loginSchema.safeParse(credentials);

          if (!validatedFields.success) {
            console.log("Error de validación:", validatedFields.error);
            throw new Error("Datos de entrada inválidos");
          }

          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, email: true, name: true, password: true },
          });

          if (!user || !user.password) {
            console.log("Usuario no encontrado o sin contraseña");
            throw new Error("Usuario no encontrado");
          }

          const passwordsMatch = await comparePassword(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Contraseña incorrecta");
          }

          // Retornar el usuario sin la contraseña
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Detalles del error:", {
            error,
            message: error instanceof Error ? error.message : "Error desconocido",
            stack: error instanceof Error ? error.stack : null,
          });
          throw new Error("Error en el proceso de autenticación");
        }
      },
    }),
  ],
  pages: {
    signIn: "/", // Página donde está tu LoginModal
    error: "/", // Redirige al inicio en caso de error
  },
  callbacks: {
    // Callback para manejar el inicio de sesión con OAuth (Google)
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {
        const email = profile.email;
        const providerAccountId = profile.sub;

        if (!email || !providerAccountId) {
          throw new Error("Faltan datos del perfil de Google");
        }

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await prisma.user.findUnique({
          where: { email },
          include: { accounts: true }, // Incluir cuentas vinculadas
        });

        if (existingUser) {
          // Verificar si ya tiene una cuenta de Google vinculada
          const hasGoogleAccount = existingUser.accounts.some(
            (acc) => acc.provider === "google"
          );

          if (!hasGoogleAccount) {
            // Vincular la cuenta de Google a la cuenta existente
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: "oauth",
                provider: "google",
                providerAccountId: providerAccountId,
              },
            });
          }

          // Retornar true para permitir el inicio de sesión
          return true;
        }

        // Si el usuario no existe, crear una nueva cuenta
        await prisma.user.create({
          data: {
            email,
            name: profile.name || email.split("@")[0], // Usar el nombre de Google o el correo como nombre
            accounts: {
              create: {
                type: "oauth",
                provider: "google",
                providerAccountId: providerAccountId,
              },
            },
          },
        });

        return true;
      }

      // Permitir el inicio de sesión para otros proveedores
      return true;
    },
    // Añadir el ID del usuario al token JWT
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Añadir el ID del usuario a la sesión
    async session({ session, token }: { session: Session; token: JWT }) {

      if (token && session.user) {

        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // Asegúrate de que las cookies de sesión se estén configurando correctamente.
  // En tu configuración actual, no estás definiendo explícitamente las 
  // opciones de cookies, lo cual podría causar problemas en algunos
  // entornos (especialmente en producción).
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
} satisfies NextAuthConfig;