import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  is_active: z.boolean().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;

//capture information from video and data, and convert that into intelligence to drive strategy.
// Also maintained players stats for every season.
// Generate the Reports for Bowlers and Batsman which show there strength and weakness as well as team analysis for better performance.
// Performance oriented Analysis for Each Individual.