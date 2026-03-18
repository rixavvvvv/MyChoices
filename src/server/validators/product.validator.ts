import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().positive(),
  image: z.string().url(),
  hoverImage: z.string().url().optional(),
  badge: z.string().optional(),
  features: z.array(z.string()).default([]),
  stock: z.number().int().min(0).default(0),
  categoryId: z.string().min(1),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
