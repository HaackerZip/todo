"use client";

import Link from "next/link";
import { MobileMenu } from "@/modules/shared/header/MobileMenu";
import { Navbar } from "@/modules/shared/header/Navbar";
import { HeaderIcons } from "@/modules/shared/header/HeaderIcons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <nav className="w-full flex items-center justify-between py-4 px-6 lg:px-8">
        {/* Menú móvil */}
        <div className="flex lg:hidden">
          <MobileMenu />
        </div>

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-gradient">RADICAL</span>
          </Link>
        </div>

        {/* Navbar Desktop */}
        <div className="hidden lg:flex flex-grow justify-center">
          <Navbar />
        </div>

        {/* Iconos */}
        <div className="flex-shrink-0">
          <HeaderIcons />
        </div>
      </nav>
    </header>
  );
}
