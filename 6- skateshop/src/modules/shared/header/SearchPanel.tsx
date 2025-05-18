"use client"

import { useState } from "react"
import { Input } from "@/modules/ui/input"
import { Button } from "@/modules/ui/button"


interface CartPanelProps {
  onClose?: () => void;
}

export function SearchPanel({ onClose }: CartPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar la lógica de búsqueda aquí
    // console.log("Searching for:", searchQuery)


  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white mb-6">Buscar</h2>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-coffee-brown text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 bg-vintage-gold text-deep-black hover:bg-rustic-brown"
            onClick={onClose}
          >
            Buscar
          </Button>
        </div>
      </form>
      <div className="flex-grow overflow-auto">
        <h3 className="text-lg font-semibold text-white mb-4">Filtros</h3>
        {/* Aquí irán los futuros filtros */}
        <p className="text-gray-400">Los filtros de productos se añadirán aquí.</p>
      </div>
    </div>
  )
}

