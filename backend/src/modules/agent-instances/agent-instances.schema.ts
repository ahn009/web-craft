import { z } from "zod";

export const updateAgentInstanceSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  configuration: z.record(z.unknown()).optional(),
});

export const linkAgentInstanceCredentialsSchema = z.object({
  links: z.array(
    z.object({
      credentialRequirementId: z.string().min(1),
      userCredentialId: z.string().min(1),
    })
  ),
});

export type UpdateAgentInstanceInput = z.infer<typeof updateAgentInstanceSchema>;
export type LinkAgentInstanceCredentialsInput = z.infer<typeof linkAgentInstanceCredentialsSchema>;
