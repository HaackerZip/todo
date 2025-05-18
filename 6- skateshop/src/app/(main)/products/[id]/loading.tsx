import { Skeleton } from "@/modules/ui/skeleton"

export default function ProductLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-deep-black">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr] gap-8">
            {/* Thumbnails gallery skeleton */}
            <div className="hidden lg:flex flex-col gap-4 order-first">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full rounded-md bg-coffee-brown" />
              ))}
            </div>

            {/* Main image skeleton */}
            <Skeleton className="aspect-square w-full rounded-lg bg-coffee-brown" />

            {/* Product info skeleton */}
            <div className="space-y-6 lg:order-3">
              <div>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-64 bg-coffee-brown" />
                    <Skeleton className="h-4 w-32 bg-coffee-brown" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-8 w-32 bg-coffee-brown" />
                  </div>
                </div>

                <div className="mt-4">
                  <Skeleton className="h-4 w-48 bg-coffee-brown" />
                  <Skeleton className="h-4 w-32 mt-2 bg-coffee-brown" />
                </div>
              </div>

              <div className="border-t border-coffee-brown pt-4">
                <Skeleton className="h-20 w-full bg-coffee-brown" />
              </div>

              <div className="border-t border-coffee-brown pt-4">
                <Skeleton className="h-12 w-full bg-coffee-brown" />
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Skeleton className="h-8 w-full bg-coffee-brown" />
                  <Skeleton className="h-8 w-full bg-coffee-brown" />
                </div>
              </div>
            </div>
          </div>

          {/* Product details tabs skeleton */}
          <div className="mt-16 border-t border-coffee-brown pt-10">
            <div className="flex border-b border-coffee-brown">
              <Skeleton className="h-10 w-24 bg-coffee-brown" />
              <Skeleton className="h-10 w-24 ml-4 bg-coffee-brown" />
              <Skeleton className="h-10 w-24 ml-4 bg-coffee-brown" />
            </div>
            <div className="py-6">
              <Skeleton className="h-32 w-full bg-coffee-brown" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
