import type React from "react"
import type { Metadata } from "next"

import { Footer } from "@/modules/shared/footer/Footer"
import { Header } from "@/modules/shared/header/Header"

export const metadata: Metadata = {
  title: "Radical Skate shop",
  description: "La mejor tienda de skate",
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 min-h-screen bg-[#010207] text-white">
        {children}
      </main>
      <Footer />
    </div>
  );
}