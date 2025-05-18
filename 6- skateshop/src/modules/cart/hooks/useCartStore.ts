import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface SyncState {
  pendingSync: boolean;
  error: string | null;
}

interface CartState {
  items: CartItem[];
  syncState: SyncState;
  addItem: (item: CartItem) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  syncWithServer: () => Promise<void>;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      syncState: {
        pendingSync: false,
        error: null
      },

      addItem: (item: CartItem) => {
        set(state => {
          const existingItem = state.items.find(i => i.productId === item.productId);
          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              syncState: { ...state.syncState, pendingSync: true }
            };
          }
          return {
            items: [...state.items, item],
            syncState: { ...state.syncState, pendingSync: true }
          };
        });
      },

      updateItem: (id: string, quantity: number) => {
        set(state => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
          syncState: { ...state.syncState, pendingSync: true }
        }));
      },

      removeItem: (id: string) => {
        set(state => ({
          items: state.items.filter(item => item.id !== id),
          syncState: { ...state.syncState, pendingSync: true }
        }));
      },

      syncWithServer: async () => {
        try {
          const state = get();
          const response = await fetch("/api/cart/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ items: state.items }),
          });

          if (!response.ok) {
            throw new Error("Error al sincronizar con el servidor");
          }

          set(state => ({
            ...state,
            syncState: { pendingSync: false, error: null }
          }));
        } catch (error) {
          set(state => ({
            ...state,
            syncState: {
              pendingSync: true,
              error: error instanceof Error ? error.message : "Error desconocido"
            }
          }));
          throw error;
        }
      }
    }),
    {
      name: "shopping-cart", // nombre único para el almacenamiento
      skipHydration: true, // evita problemas de hidratación con SSR
    }
  )
);

export default useCartStore;
