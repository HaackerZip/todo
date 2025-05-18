"use client";

import { Card } from "@/modules/ui/card";
import { DataTable } from "@/modules/admin/DataTable";
import { Badge } from "@/modules/ui/badge";
import { Overview } from "@/modules/admin/dashboard/Overview";
import { Button } from "@/modules/ui/button";
import { Eye } from "lucide-react";
import { OrderDetails } from "@/modules/admin/order/OrderDetail";
import { useState } from "react";
import { Column } from "@/modules/admin/DataTable";
import { ReactNode } from "react";

type OrderStatus = "pending" | "completed" | "shipped";

interface OrderItem {
  product: string;
  quantity: number;
  price: string;
  total: string;
}

interface Order {
  id: string;
  customer: string;
  date: string;
  total: string;
  status: OrderStatus;
  items: OrderItem[];
  actions?: never; // Para permitir la columna de acciones
}

const orders: Order[] = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2024-03-20",
    total: "$360.00",
    status: "pending",
    items: [
      {
        product: "Skateboard Professional Baker",
        quantity: 2,
        price: "$120.00",
        total: "$240.00"
      },
      {
        product: "Independent Trucks 149mm",
        quantity: 1,
        price: "$65.00",
        total: "$65.00"
      }
    ],
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2024-03-19",
    total: "$240.00",
    status: "completed",
    items: [
      {
        product: "Skateboard Professional Baker",
        quantity: 2,
        price: "$120.00",
        total: "$240.00"
      }
    ],
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    date: "2024-03-18",
    total: "$120.00",
    status: "shipped",
    items: [
      {
        product: "Independent Trucks 149mm",
        quantity: 1,
        price: "$65.00",
        total: "$65.00"
      }
    ],
  },
];

const columns: Column<Order>[] = [
  { key: "id" as const, label: "Order ID" },
  { key: "customer" as const, label: "Customer" },
  { key: "date" as const, label: "Date" },
  { 
    key: "items" as const, 
    label: "Items",
    render: (_: unknown, row: Order): ReactNode => `${row.items.length} item${row.items.length !== 1 ? 's' : ''}`
  },
  { key: "total" as const, label: "Total" },
  {
    key: "status" as const,
    label: "Status",
    render: (_: unknown, row: Order): ReactNode => {
      const colors = {
        pending: "bg-yellow-500/10 text-yellow-500",
        completed: "bg-green-500/10 text-green-500",
        shipped: "bg-blue-500/10 text-blue-500",
      };
      return (
        <Badge variant="secondary" className={colors[row.status]}>
          {row.status}
        </Badge>
      );
    },
  },
  {
    key: "actions" as const,
    label: "Actions",
    render: (_: unknown, row: Order): ReactNode => (
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-white"
        onClick={() => window.dispatchEvent(new CustomEvent('viewOrder', { detail: row }))}
      >
        <Eye className="h-4 w-4" />
      </Button>
    ),
  },
];

const filters = [
  {
    key: "status" as const,
    label: "Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Completed", value: "completed" },
      { label: "Shipped", value: "shipped" },
    ],
  },
];

export default function Orders() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);

  // Add event listener for view button clicks
  useState(() => {
    const handleViewOrder = (event: CustomEvent<Order>) => {
      setSelectedOrder(event.detail);
      setShowOrderDetails(true);
    };

    window.addEventListener('viewOrder', handleViewOrder as EventListener);

    return () => {
      window.removeEventListener('viewOrder', handleViewOrder as EventListener);
    };
  });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Orders</h1>
      </div>

      <Card className="bg-[#1E293B] border-0 mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Orders Overview
          </h2>
          <Overview type="orders" />
        </div>
      </Card>

      <Card className="bg-[#1E293B] border-0">
        <div className="p-6">
          <DataTable<Order>
            columns={columns}
            data={orders}
            filters={filters}
            searchable
            exportable
          />
        </div>
      </Card>

      <OrderDetails
        open={showOrderDetails}
        onClose={() => {
          setShowOrderDetails(false);
          setSelectedOrder(undefined);
        }}
        order={selectedOrder}
      />
    </div>
  );
}