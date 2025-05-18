import { User } from "./user";
import { Product } from "./product";

export interface Cart {
    id: string;
    user: User;
    items: CartItem[];
  }
  
  export interface CartItem {
    id: string;
    cart: Cart;
    product: Product;
    quantity: number;
  }