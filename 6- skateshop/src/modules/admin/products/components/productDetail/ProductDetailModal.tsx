"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui/dialog";
import { Button } from "@/modules/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/modules/ui/tabs";
import { GripVertical, Upload, Download } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "./subcomponentes/StatusBadge";
import { DetailsSection } from "./sections/DetailSecion";
import { ImagesSection } from "./sections/ImagesSection";
import { VariantsSection } from "./sections/VariantsSection";
import { Product } from "@/types/product";

interface ProductDetailsModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | undefined;
}

export function ProductDetailsModal({ open, onClose, product }: ProductDetailsModalProps) {
  if (!product) return null;

  const handleDownload = () => {
    toast.success("Product details downloaded successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1E293B] text-white border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-between">
            <span>{product.name}</span>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="border-gray-700 text-gray-400 hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <StatusBadge status={product.brand} />
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="bg-[#0F172A] border-b border-gray-700 w-full justify-start h-auto p-0 rounded-none">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
            >
              <Upload className="h-4 w-4 mr-2" />
              Images
            </TabsTrigger>
            <TabsTrigger
              value="variants"
              className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
            >
              <GripVertical className="h-4 w-4 mr-2" />
              Variants
            </TabsTrigger>
          </TabsList>

          <DetailsSection product={product} />
          <ImagesSection images={product.images} productName={product.name} />
          <VariantsSection product={product} />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}