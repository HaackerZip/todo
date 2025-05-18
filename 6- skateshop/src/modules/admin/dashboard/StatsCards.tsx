"use client";

import { Card, CardContent } from "@/modules/ui/card";
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users
} from "lucide-react";

const stats = [
  {
    title: "Total Sales",
    value: "$12,450",
    icon: DollarSign,
    change: "+12%",
    color: "text-green-500",
  },
  {
    title: "Pending Orders",
    value: "45",
    icon: ShoppingCart,
    change: "+5%",
    color: "text-yellow-500",
  },
  {
    title: "Active Products",
    value: "120",
    icon: Package,
    change: "+2%",
    color: "text-blue-500",
  },
  {
    title: "Registered Users",
    value: "1,240",
    icon: Users,
    change: "+8%",
    color: "text-purple-500",
  },
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-[#1E293B] border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full bg-[#38BDF8]/10 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                </div>
              </div>
              <span className={`text-sm ${stat.color}`}>{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}