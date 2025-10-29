import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type CategoryInput = z.infer<typeof categorySchema>;
