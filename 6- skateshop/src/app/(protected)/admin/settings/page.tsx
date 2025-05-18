"use client";

import { Card } from "@/modules/ui/card";
import { Label } from "@/modules/ui/label";
import { Input } from "@/modules/ui/input";
import { Switch } from "@/modules/ui/switch";
import { Button } from "@/modules/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/modules/ui/table";
import { Truck, CreditCard, Settings2 } from "lucide-react";

const shippingRegions = [
  { region: "North America", cost: "$15.00" },
  { region: "Europe", cost: "$25.00" },
  { region: "Asia", cost: "$30.00" },
  { region: "South America", cost: "$28.00" },
  { region: "Africa", cost: "$35.00" },
  { region: "Oceania", cost: "$32.00" },
];

const paymentMethods = [
  { name: "Credit Card", enabled: true },
  { name: "PayPal", enabled: true },
  { name: "Apple Pay", enabled: false },
  { name: "Google Pay", enabled: false },
  { name: "Cryptocurrency", enabled: false },
];

export default function Settings() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <Button className="bg-[#38BDF8] hover:bg-[#38BDF8]/90">
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="shipping" className="space-y-6">
        <TabsList className="bg-[#1E293B] border-b border-gray-700 w-full justify-start h-auto p-0 rounded-none">
          <TabsTrigger
            value="shipping"
            className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
          >
            <Truck className="h-4 w-4 mr-2" />
            Shipping
          </TabsTrigger>
          <TabsTrigger
            value="payments"
            className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
          >
            <Settings2 className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shipping" className="space-y-6">
          <Card className="bg-[#1E293B] border-0">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Shipping Regions
              </h2>
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Region</TableHead>
                    <TableHead className="text-gray-400">Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippingRegions.map((region) => (
                    <TableRow key={region.region} className="border-gray-700">
                      <TableCell className="text-gray-300">
                        {region.region}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <Input
                          defaultValue={region.cost}
                          className="w-24 bg-[#0F172A] border-gray-700"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <Card className="bg-[#1E293B] border-0">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Free Shipping Rules
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Switch id="free-shipping" />
                  <Label htmlFor="free-shipping">Enable free shipping for orders over</Label>
                  <Input
                    type="number"
                    defaultValue="100"
                    className="w-24 bg-[#0F172A] border-gray-700"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="bg-[#1E293B] border-0">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Payment Methods
              </h2>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex items-center justify-between"
                  >
                    <Label>{method.name}</Label>
                    <Switch defaultChecked={method.enabled} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-[#1E293B] border-0">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Payment Processing
              </h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>API Key</Label>
                  <Input
                    type="password"
                    placeholder="Enter your payment processor API key"
                    className="bg-[#0F172A] border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Webhook URL</Label>
                  <Input
                    placeholder="https://your-domain.com/api/payment-webhook"
                    className="bg-[#0F172A] border-gray-700"
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-[#1E293B] border-0">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Store Information
              </h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Store Name</Label>
                  <Input
                    placeholder="Your Store Name"
                    className="bg-[#0F172A] border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Store Logo</Label>
                  <div className="flex gap-4">
                    <Input
                      type="file"
                      className="bg-[#0F172A] border-gray-700"
                    />
                    <Button variant="outline" className="border-gray-700">
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#1E293B] border-0">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Appearance
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" checked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <Switch id="notifications" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}