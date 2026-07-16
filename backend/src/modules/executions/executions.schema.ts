import { z } from "zod";

export const createExecutionSchema = z.object({
  input: z.record(z.unknown()).default({}),
});

export type CreateExecutionInput = z.infer<typeof createExecutionSchema>;
