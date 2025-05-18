"use client";

import { Card } from "@/modules/ui/card";
import { Overview } from "@/modules/admin/dashboard/Overview";
import { RecentOrders } from "@/modules/admin/dashboard/RecentOrders";
import { StatsCards } from "@/modules/admin/dashboard/StatsCards";
import { Button } from "@/modules/ui/button";
import { Plus } from "lucide-react";
// import { CreateProduct } from "@/components/admin/CreateProduct";
// import { useState } from "react";

export default function Dashboard() {
  // const [showCreateProduct, setShowCreateProduct] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Button
          // onClick={() => setShowCreateProduct(true)}
          size="icon"
          className="rounded-full w-12 h-12 bg-[#38BDF8] hover:bg-[#38BDF8]/90 fixed bottom-8 right-8 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <StatsCards />

      <div className="grid gap-6 mt-8">
        <Card className="bg-[#1E293B] border-0">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Sales Overview
            </h2>
            <Overview />
          </div>
        </Card>

        <Card className="bg-[#1E293B] border-0">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Orders
            </h2>
            <RecentOrders />
          </div>
        </Card>
      </div>

      {/* <CreateProduct open={showCreateProduct} onClose={() => setShowCreateProduct(false)} /> */}
    </div>
  );
}