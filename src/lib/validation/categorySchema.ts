import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
  is_active:z.boolean().optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
