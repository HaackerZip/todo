// "use client";

// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/modules/ui/dialog";
// import { Badge } from "@/modules/ui/badge";
// import { Card } from "@/modules/ui/card";
// import { Button } from "@/modules/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/modules/ui/tabs";
// import { GripVertical, Upload, Download } from "lucide-react";
// import { toast } from "sonner";

// interface ProductDetailsModalProps {
//   open: boolean;
//   onClose: () => void;
//   product?: {
//     id: string;
//     name: string;
//     price: string;
//     stock: number;
//     category: string;
//     status: string;
//     description?: string;
//     specifications?: { key: string; value: string }[];
//     images?: {
//       main: string;
//       hover: string;
//       gallery: string[];
//     };
//     sizes?: string[];
//     colors?: string[];
//     types?: string[];
//   };
// }

// export function ProductDetailsModal({ open, onClose, product }: ProductDetailsModalProps) {
//   if (!product) return null;

//   const statusColors = {
//     "In Stock": "bg-green-500/10 text-green-500",
//     "Low Stock": "bg-yellow-500/10 text-yellow-500",
//     "Out of Stock": "bg-red-500/10 text-red-500",
//   };

//   const handleDownload = () => {
//     // Here we would handle the actual download
//     toast.success("Product details downloaded successfully");
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="bg-[#1E293B] text-white border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold flex items-center justify-between">
//             <span>{product.name}</span>
//             <div className="flex items-center gap-2">
//               <Button
//                 onClick={handleDownload}
//                 variant="outline"
//                 className="border-gray-700 text-gray-400 hover:text-white"
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Download
//               </Button>
//               <Badge 
//                 variant="secondary" 
//                 className={statusColors[product.status as keyof typeof statusColors]}
//               >
//                 {product.status}
//               </Badge>
//             </div>
//           </DialogTitle>
//         </DialogHeader>

//         <Tabs defaultValue="details" className="mt-6">
//           <TabsList className="bg-[#0F172A] border-b border-gray-700 w-full justify-start h-auto p-0 rounded-none">
//             <TabsTrigger
//               value="details"
//               className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
//             >
//               Details
//             </TabsTrigger>
//             <TabsTrigger
//               value="images"
//               className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
//             >
//               <Upload className="h-4 w-4 mr-2" />
//               Images
//             </TabsTrigger>
//             <TabsTrigger
//               value="variants"
//               className="data-[state=active]:bg-[#38BDF8] data-[state=active]:text-white px-6 py-3 rounded-none"
//             >
//               <GripVertical className="h-4 w-4 mr-2" />
//               Variants
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="details" className="mt-6">
//             <div className="grid gap-6">
//               <Card className="bg-[#0F172A] border-gray-700">
//                 <div className="p-6">
//                   <div className="grid grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-400">Price</h3>
//                       <p className="mt-1 text-lg font-semibold">{product.price}</p>
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-400">Stock</h3>
//                       <p className="mt-1 text-lg font-semibold">{product.stock} units</p>
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-medium text-gray-400">Category</h3>
//                       <p className="mt-1 text-lg font-semibold">{product.category}</p>
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               {product.description && (
//                 <Card className="bg-[#0F172A] border-gray-700">
//                   <div className="p-6">
//                     <h3 className="text-sm font-medium text-gray-400 mb-2">Description</h3>
//                     <p className="text-gray-300">{product.description}</p>
//                   </div>
//                 </Card>
//               )}

//               {product.specifications && product.specifications.length > 0 && (
//                 <Card className="bg-[#0F172A] border-gray-700">
//                   <div className="p-6">
//                     <h3 className="text-sm font-medium text-gray-400 mb-4">Specifications</h3>
//                     <div className="grid grid-cols-2 gap-4">
//                       {product.specifications.map((spec, index) => (
//                         <div key={index} className="flex justify-between">
//                           <span className="text-gray-400">{spec.key}</span>
//                           <span className="font-medium">{spec.value}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Card>
//               )}
//             </div>
//           </TabsContent>

//           <TabsContent value="images" className="mt-6">
//             <div className="grid gap-6">
//               {product.images && (
//                 <>
//                   <Card className="bg-[#0F172A] border-gray-700">
//                     <div className="p-6">
//                       <h3 className="text-sm font-medium text-gray-400 mb-4">Product Images</h3>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-xs text-gray-400 mb-2">Main Image</p>
//                           <div className="aspect-square rounded-lg overflow-hidden bg-black/20">
//                             <img
//                               src={product.images.main}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-xs text-gray-400 mb-2">Hover Image</p>
//                           <div className="aspect-square rounded-lg overflow-hidden bg-black/20">
//                             <img
//                               src={product.images.hover}
//                               alt={`${product.name} hover`}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Card>

//                   <Card className="bg-[#0F172A] border-gray-700">
//                     <div className="p-6">
//                       <h3 className="text-sm font-medium text-gray-400 mb-4">Gallery</h3>
//                       <div className="grid grid-cols-3 gap-4">
//                         {product.images.gallery.map((image, index) => (
//                           <div key={index} className="aspect-square rounded-lg overflow-hidden bg-black/20">
//                             <img
//                               src={image}
//                               alt={`${product.name} ${index + 1}`}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </Card>
//                 </>
//               )}
//             </div>
//           </TabsContent>

//           <TabsContent value="variants" className="mt-6">
//             <div className="grid gap-6">
//               {product.sizes && product.sizes.length > 0 && (
//                 <Card className="bg-[#0F172A] border-gray-700">
//                   <div className="p-6">
//                     <h3 className="text-sm font-medium text-gray-400 mb-4">Available Sizes</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {product.sizes.map((size, index) => (
//                         <Badge key={index} variant="secondary" className="bg-[#1E293B]">
//                           {size}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 </Card>
//               )}

//               {product.colors && product.colors.length > 0 && (
//                 <Card className="bg-[#0F172A] border-gray-700">
//                   <div className="p-6">
//                     <h3 className="text-sm font-medium text-gray-400 mb-4">Available Colors</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {product.colors.map((color, index) => (
//                         <Badge key={index} variant="secondary" className="bg-[#1E293B]">
//                           {color}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 </Card>
//               )}

//               {product.types && product.types.length > 0 && (
//                 <Card className="bg-[#0F172A] border-gray-700">
//                   <div className="p-6">
//                     <h3 className="text-sm font-medium text-gray-400 mb-4">Available Types</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {product.types.map((type, index) => (
//                         <Badge key={index} variant="secondary" className="bg-[#1E293B]">
//                           {type}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 </Card>
//               )}
//             </div>
//           </TabsContent>
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   );
// }