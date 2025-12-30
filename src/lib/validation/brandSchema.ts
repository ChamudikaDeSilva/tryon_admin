import { z } from "zod";

export const brandSchema = z.object({
  name: z.string().min(2, "Brand name is required"),
  description: z.string().optional(),
  is_active:z.boolean().optional(),
});

export type BrandInput = z.infer<typeof brandSchema>;
