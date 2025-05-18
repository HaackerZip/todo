import { User } from "./user";
import { Product } from "./product";


export interface Order {
    id: string;
    user?: User; // Relación opcional con User
    date: string; // ISO date string
    status: "PENDING" | "SHIPPED" | "COMPLETED" | "CANCELLED";
    total: string; // Decimal como string
    trackingCode: string | null;
    notes: string | null;
    details: OrderDetail[];
    payments: Payment[];
  }
  
  export interface OrderDetail {
    id: string;
    order: Order;
    product: Product;
    quantity: number;
    unitPrice: string; // Decimal como string
    total: string; // Decimal como string
  }

  export interface Payment {
    id: string;
    order: Order;
    method: "CARD" | "PAYPAL" | "TRANSFER";
    status: "PENDING" | "COMPLETED" | "FAILED";
    date: string; // ISO date string
    transactionReference: string | null;
  }