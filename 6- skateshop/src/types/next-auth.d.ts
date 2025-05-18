// import { DefaultSession } from "next-auth";
import "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       role?: string;
//     } & DefaultSession["user"];
//   }

//   interface User {
//     role?: string;
//   }
// }

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Agregar el ID del usuario a la sesión
      email: string;
      name?: string | null;
      role?: string;

    };
  }
}

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//   }
// }

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Agregar el ID del usuario al token JWT
  }
}
