"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/ui/table";
import { Badge } from "@/modules/ui/badge";

const orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    total: "$360.00",
    status: "pending",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    total: "$240.00",
    status: "completed",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    total: "$120.00",
    status: "shipped",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    total: "$480.00",
    status: "pending",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    total: "$180.00",
    status: "completed",
    items: 2,
  },
];

const statusColors = {
  pending: "bg-yellow-500/10 text-yellow-500",
  completed: "bg-green-500/10 text-green-500",
  shipped: "bg-blue-500/10 text-blue-500",
};

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700">
          <TableHead className="text-gray-400">Order ID</TableHead>
          <TableHead className="text-gray-400">Customer</TableHead>
          <TableHead className="text-gray-400">Items</TableHead>
          <TableHead className="text-gray-400">Total</TableHead>
          <TableHead className="text-gray-400">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="border-gray-700">
            <TableCell className="font-medium text-white">{order.id}</TableCell>
            <TableCell className="text-gray-300">{order.customer}</TableCell>
            <TableCell className="text-gray-300">{order.items} items</TableCell>
            <TableCell className="text-gray-300">{order.total}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={statusColors[order.status as keyof typeof statusColors]}
              >
                {order.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}