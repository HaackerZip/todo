"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/modules/ui/table";
import { Badge } from "@/modules/ui/badge";
import { Button } from "@/modules/ui/button";
import { Download } from "lucide-react";

interface OrderDetailsProps {
  open: boolean;
  onClose: () => void;
  order?: {
    id: string;
    customer: string;
    date: string;
    total: string;
    status: string;
    items: any[];
  };
}

export function OrderDetails({ open, onClose, order }: OrderDetailsProps) {
  if (!order) return null;

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500",
    completed: "bg-green-500/10 text-green-500",
    shipped: "bg-blue-500/10 text-blue-500",
  };

  // Mock customer data
  const customerInfo = {
    name: order.customer,
    email: "customer@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345"
  };

  const orderItems = [
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
  ];

  const handleDownloadInvoice = () => {
    // Mock function for downloading invoice
    console.log('Downloading invoice...');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E293B] text-white border-gray-700 max-w-3xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Order Details - {order.id}</DialogTitle>
          <Button 
            onClick={handleDownloadInvoice}
            className="bg-[#38BDF8] hover:bg-[#38BDF8]/90"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Invoice
          </Button>
        </DialogHeader>
        
        <div className="grid gap-6">
          {/* Order Information */}
          <div className="bg-[#0F172A] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Order Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">Order Date</p>
                <p className="text-base font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Amount</p>
                <p className="text-base font-medium">{order.total}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <Badge 
                  variant="secondary" 
                  className={statusColors[order.status as keyof typeof statusColors]}
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-[#0F172A] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-base font-medium">{customerInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-base font-medium">{customerInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-base font-medium">{customerInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-base font-medium">{customerInfo.address}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-[#0F172A] rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-400">Product</TableHead>
                  <TableHead className="text-gray-400 text-right">Quantity</TableHead>
                  <TableHead className="text-gray-400 text-right">Price</TableHead>
                  <TableHead className="text-gray-400 text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.map((item, index) => (
                  <TableRow key={index} className="border-gray-700">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                    <TableCell className="text-right">{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}