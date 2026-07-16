import type { PrismaClient } from "@prisma/client";

type N8nNodeCredential = {
  id?: string;
  name?: string;
};

type N8nWorkflowNode = {
  name?: string;
  type?: string;
  credentials?: Record<string, N8nNodeCredential | string | null | undefined>;
};

type N8nWorkflow = {
  nodes?: N8nWorkflowNode[];
};

export type DetectedCredentialRequirement = {
  nodeName: string;
  nodeType: string;
  credentialType: string;
  displayName: string;
  required: boolean;
  schema: string;
};

function humanizeCredentialType(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export function detectCredentialRequirements(rawJson: string): DetectedCredentialRequirement[] {
  const workflow = JSON.parse(rawJson) as N8nWorkflow;
  const nodes = workflow.nodes ?? [];
  const seen = new Set<string>();
  const requirements: DetectedCredentialRequirement[] = [];

  for (const node of nodes) {
    const credentials = node.credentials ?? {};

    for (const credentialType of Object.keys(credentials)) {
      const nodeName = node.name ?? "Unnamed node";
      const nodeType = node.type ?? "unknown";
      const key = `${nodeName}:${nodeType}:${credentialType}`;
      if (seen.has(key)) continue;
      seen.add(key);

      requirements.push({
        nodeName,
        nodeType,
        credentialType,
        displayName: humanizeCredentialType(credentialType),
        required: true,
        schema: JSON.stringify({
          fields: [
            {
              name: "value",
              label: humanizeCredentialType(credentialType),
              type: "secret",
              required: true,
            },
          ],
        }),
      });
    }
  }

  return requirements;
}

export async function listCredentialRequirements(prisma: PrismaClient, agentId: string) {
  const requirements = await prisma.agentCredentialRequirement.findMany({
    where: { agentId },
    orderBy: [{ nodeName: "asc" }, { credentialType: "asc" }],
  });

  return requirements.map((requirement) => ({
    ...requirement,
    schema: JSON.parse(requirement.schema),
  }));
}

export async function refreshCredentialRequirements(prisma: PrismaClient, agentId: string) {
  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
    select: { id: true, rawJson: true },
  });
  if (!agent) return null;

  const requirements = detectCredentialRequirements(agent.rawJson);

  await prisma.$transaction([
    prisma.agentCredentialRequirement.deleteMany({ where: { agentId } }),
    ...requirements.map((requirement) =>
      prisma.agentCredentialRequirement.create({
        data: {
          agentId,
          ...requirement,
        },
      })
    ),
  ]);

  return listCredentialRequirements(prisma, agentId);
}

export async function backfillCredentialRequirements(prisma: PrismaClient) {
  const agents = await prisma.agent.findMany({
    select: { id: true, rawJson: true },
  });

  let agentCount = 0;
  let requirementCount = 0;

  for (const agent of agents) {
    const requirements = detectCredentialRequirements(agent.rawJson);

    await prisma.$transaction([
      prisma.agentCredentialRequirement.deleteMany({ where: { agentId: agent.id } }),
      ...requirements.map((requirement) =>
        prisma.agentCredentialRequirement.create({
          data: {
            agentId: agent.id,
            ...requirement,
          },
        })
      ),
    ]);

    agentCount += 1;
    requirementCount += requirements.length;
  }

  return { agentCount, requirementCount };
}
