"use client";

import { Skeleton } from "@/modules/ui/skeleton";

export const ProductSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-[200px] w-full bg-coffee-brown/20" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4 bg-coffee-brown/20" />
      <Skeleton className="h-4 w-1/2 bg-coffee-brown/20" />
      <Skeleton className="h-4 w-1/4 bg-coffee-brown/20" />
    </div>
  </div>
);