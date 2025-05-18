import '@/app/(main)/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from "@/providers/SessionProvider"
import { QueryClientProvider } from "@/providers/QueryClientProvider"
import { StoreProvider } from "@/providers/StoreProvider"
import { Toaster } from "@/modules/ui/toaster"
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Skateshop',
  description: 'Your skateboarding destination',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="es">
      <body className={`${inter.className} flex min-h-screen flex-col flex-1`}>
        <StoreProvider>
          <QueryClientProvider>
            <SessionProvider session={session}>
              {children}
            </SessionProvider>
          </QueryClientProvider>
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}