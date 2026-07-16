import type { PrismaClient } from "@prisma/client";
import { env } from "../config/env.config.js";
import { decryptSecret } from "../utils/crypto.util.js";
import type { AuthenticatedUser } from "../utils/access.util.js";
import { isN8nConfigured, N8nClient } from "./n8n.client.js";

type StoredCredentialPayload = {
  secret: string;
};

type WorkflowNode = {
  name?: string;
  credentials?: Record<string, unknown>;
};

type WorkflowJson = {
  name?: string;
  nodes?: WorkflowNode[];
  active?: boolean;
  [key: string]: unknown;
};

export async function importAgentInstanceToN8n(prisma: PrismaClient, user: AuthenticatedUser, instanceId: string) {
  if (!isN8nConfigured({ baseUrl: env.N8N_BASE_URL, apiKey: env.N8N_API_KEY })) {
    return { status: "not_configured" as const };
  }

  const instance = await prisma.agentInstance.findFirst({
    where: { id: instanceId, userId: user.id },
    include: {
      agent: true,
      credentialLinks: {
        include: {
          credentialRequirement: true,
          userCredential: true,
        },
      },
    },
  });
  if (!instance) return { status: "missing" as const };

  const requiredCount = await prisma.agentCredentialRequirement.count({
    where: { agentId: instance.agentId, required: true },
  });
  if (instance.credentialLinks.length < requiredCount) {
    return { status: "not_ready" as const };
  }

  const client = new N8nClient({
    baseUrl: env.N8N_BASE_URL,
    apiKey: env.N8N_API_KEY,
    timeoutMs: env.N8N_TIMEOUT_MS,
  });

  const workflow = JSON.parse(instance.agent.rawJson) as WorkflowJson;
  const credentialIdByType = new Map<string, string>();

  for (const link of instance.credentialLinks) {
    const payload = JSON.parse(decryptSecret(link.userCredential.encryptedPayload)) as StoredCredentialPayload;
    const credential = await client.createCredential({
      name: `${instance.displayName || instance.agent.name} - ${link.credentialRequirement.displayName}`,
      type: link.credentialRequirement.credentialType,
      data: { value: payload.secret },
    });
    credentialIdByType.set(link.credentialRequirement.credentialType, credential.id);
  }

  workflow.active = false;
  workflow.nodes = (workflow.nodes ?? []).map((node) => {
    if (!node.credentials) return node;

    const credentials = { ...node.credentials };
    for (const credentialType of Object.keys(credentials)) {
      const credentialId = credentialIdByType.get(credentialType);
      if (credentialId) {
        credentials[credentialType] = {
          id: credentialId,
          name: `${instance.displayName || instance.agent.name} - ${credentialType}`,
        };
      }
    }

    return { ...node, credentials };
  });

  const n8nWorkflow = await client.createWorkflow({
    ...workflow,
    name: `${instance.displayName || instance.agent.name} (${instance.id})`,
  });

  const updated = await prisma.agentInstance.update({
    where: { id: instance.id },
    data: { n8nWorkflowId: n8nWorkflow.id },
  });

  return { status: "ok" as const, n8nWorkflowId: updated.n8nWorkflowId };
}
