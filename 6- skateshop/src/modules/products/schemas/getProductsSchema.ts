// import { z } from "zod";

// export const getProductsSchema = z.object({
//   limit: z.coerce.number().int().min(1).max(100).default(20),
//   page: z.coerce.number().int().min(1).default(1),
//   orderBy: z.enum(["name", "price", "createdAt", "updatedAt"]).default("name"),
//   order: z.enum(["asc", "desc"]).default("asc"),
//   categoryId: z.string().uuid().optional(),
//   search: z.string().trim().optional(),
//   minPrice: z.coerce.number().min(0).optional(),
//   maxPrice: z.coerce.number().min(0).optional(),
//   brand: z.string().trim().optional(),
//   sizes: z.array(z.string().uuid()).optional(),
//   colors: z.array(z.string().uuid()).optional(),
//   types: z.array(z.string().uuid()).optional(),
// });