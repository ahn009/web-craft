import { z } from "zod";

export const listAgentsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  category: z.string().optional(),
  tag: z.string().optional(),
  sort: z.enum(["price_asc", "price_desc", "name_asc", "newest"]).default("newest"),
});

export type ListAgentsInput = z.infer<typeof listAgentsSchema>;
