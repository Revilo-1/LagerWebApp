import z from "zod";

export const PRODUCT_STATUS_OPTIONS = ["Opslåt", "Solgt"] as const;
export type ProductStatus = (typeof PRODUCT_STATUS_OPTIONS)[number];

export const PRODUCT_CATEGORY_OPTIONS = ["Elektronik", "Tøj", "Møbler", "Mad & Drikke", "Sport", "Andet"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORY_OPTIONS)[number];

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  addedDate: z.string(),
  costPrice: z.number().optional(),
  estimatedValue: z.number(),
  soldPrice: z.number().optional(),
  status: z.enum(PRODUCT_STATUS_OPTIONS),
  description: z.string(),
});

export type ProductRow = z.infer<typeof productSchema>;
