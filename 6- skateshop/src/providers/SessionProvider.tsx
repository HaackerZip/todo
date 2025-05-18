'use client';

import { SessionProvider as NextAuthProvider } from "next-auth/react";
import { Session } from "next-auth";

export function SessionProvider({
  children,
  session
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <NextAuthProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </NextAuthProvider>
  );
}

// 'use client';

// import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
// import { ReactNode } from "react";

// export function SessionProvider({ children }: { children: ReactNode }) {
//   return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
// } 