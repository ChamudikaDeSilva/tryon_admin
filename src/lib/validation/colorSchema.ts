import { z } from "zod";

export const colorSchema = z.object({
  name: z.string().min(2, "Color name is required"),
  color_code: z.string().optional(),
  is_active:z.boolean().optional(),
});

export type ColorInput = z.infer<typeof colorSchema>;
