"use client"

import { Button } from "@/modules/ui/button"
import { Trash2, ShoppingCart } from "lucide-react"
import Image from "next/image"
import useCartStore from "@/modules/cart/hooks/useCartStore"

interface CartPanelProps {
  onClose?: () => void;
}

export function CartPanel({ onClose }: CartPanelProps) {
  const { items, updateItem, removeItem } = useCartStore();

  const total = items.reduce((sum, item) =>
    sum + (item.price * item.quantity), 0
  );

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white mb-6">Tu Carrito</h2>
      <div className="flex-grow overflow-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-400">Tu carrito está vacío</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center mb-4 pb-4 border-b border-coffee-brown">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-vintage-gold">${Number(item.price).toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                    className="text-white bg-coffee-brown px-2 py-1 rounded hover:bg-rustic-brown transition-colors"
                  >
                    -
                  </button>
                  <span className="mx-2 text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateItem(item.id, item.quantity + 1)}
                    className="text-white bg-coffee-brown px-2 py-1 rounded hover:bg-rustic-brown transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          ))
        )}
      </div>
      <div className="mt-6 border-t border-coffee-brown pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-white">Total:</span>
          <span className="text-xl font-bold text-vintage-gold">${total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full bg-vintage-gold text-deep-black hover:bg-rustic-brown hover:text-white"
          onClick={onClose}
        >
          Proceder al pago
        </Button>
      </div>
    </div>
  );
}
