
import { Cart } from "./cart";
import { Order } from "./order";

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "ADMIN" | "USER";
  registrationDate: string; // ISO date string
  addresses: Address[];
  orders: Order[];
  cart?: Cart; // Relación uno a uno con Cart (opcional)
}

export interface Address {
  id: string;
  user: User;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Account {
  id: string;
  user: User;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}
