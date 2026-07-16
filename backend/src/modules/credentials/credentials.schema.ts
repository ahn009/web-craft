import { z } from "zod";

export const createCredentialSchema = z.object({
  provider: z.string().min(1).max(100),
  label: z.string().min(1).max(100),
  secret: z.string().min(1).max(5000),
});

export const updateCredentialSchema = z.object({
  provider: z.string().min(1).max(100).optional(),
  label: z.string().min(1).max(100).optional(),
  secret: z.string().min(1).max(5000).optional(),
});

export type CreateCredentialInput = z.infer<typeof createCredentialSchema>;
export type UpdateCredentialInput = z.infer<typeof updateCredentialSchema>;
