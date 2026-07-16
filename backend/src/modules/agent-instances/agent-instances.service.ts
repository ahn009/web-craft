import type { AgentInstance, PrismaClient } from "@prisma/client";
import { userCanAccessAgent, type AuthenticatedUser } from "../../utils/access.util.js";
import type { LinkAgentInstanceCredentialsInput, UpdateAgentInstanceInput } from "./agent-instances.schema.js";

function parseJson(value: string) {
  return JSON.parse(value);
}

async function getSetupState(prisma: PrismaClient, instanceId: string, agentId: string) {
  const [requiredCount, linkedCount] = await Promise.all([
    prisma.agentCredentialRequirement.count({ where: { agentId, required: true } }),
    prisma.agentInstanceCredential.count({
      where: {
        agentInstanceId: instanceId,
        credentialRequirement: { required: true },
      },
    }),
  ]);

  return {
    requiredCount,
    linkedCount,
    missingCount: Math.max(requiredCount - linkedCount, 0),
    ready: linkedCount >= requiredCount,
  };
}

async function serializeInstance(prisma: PrismaClient, instance: AgentInstance) {
  const setup = await getSetupState(prisma, instance.id, instance.agentId);
  const links = await prisma.agentInstanceCredential.findMany({
    where: { agentInstanceId: instance.id },
    select: {
      credentialRequirementId: true,
      userCredentialId: true,
    },
  });

  return {
    ...instance,
    configuration: parseJson(instance.configuration),
    setup,
    credentialLinks: links,
  };
}

export async function createOrGetAgentInstance(prisma: PrismaClient, user: AuthenticatedUser, agentId: string) {
  const canAccess = await userCanAccessAgent(prisma, user, agentId);
  if (!canAccess) return { status: "forbidden" as const };

  const agent = await prisma.agent.findUnique({
    where: { id: agentId },
    select: { id: true, name: true },
  });
  if (!agent) return { status: "missing" as const };

  const instance = await prisma.agentInstance.upsert({
    where: { userId_agentId: { userId: user.id, agentId } },
    update: {},
    create: {
      userId: user.id,
      agentId,
      displayName: agent.name,
    },
  });

  return { status: "ok" as const, instance: await serializeInstance(prisma, instance) };
}

export async function listAgentInstances(prisma: PrismaClient, user: AuthenticatedUser) {
  const instances = await prisma.agentInstance.findMany({
    where: { userId: user.id },
    include: {
      agent: {
        select: {
          id: true,
          workflowId: true,
          name: true,
          description: true,
          category: true,
          price: true,
          tags: true,
          nodeCount: true,
          createdAt: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return Promise.all(
    instances.map(async (instance) => {
      const setup = await getSetupState(prisma, instance.id, instance.agentId);
      return {
        ...instance,
        configuration: parseJson(instance.configuration),
        setup,
        agent: {
          ...instance.agent,
          tags: JSON.parse(instance.agent.tags),
        },
      };
    })
  );
}

export async function getAgentInstance(prisma: PrismaClient, user: AuthenticatedUser, instanceId: string) {
  const instance = await prisma.agentInstance.findFirst({
    where: { id: instanceId, userId: user.id },
    include: {
      agent: true,
    },
  });
  if (!instance) return null;

  return {
    ...(await serializeInstance(prisma, instance)),
    agent: {
      ...instance.agent,
      tags: JSON.parse(instance.agent.tags),
      rawJson: JSON.parse(instance.agent.rawJson),
    },
  };
}

export async function updateAgentInstance(
  prisma: PrismaClient,
  user: AuthenticatedUser,
  instanceId: string,
  input: UpdateAgentInstanceInput
) {
  const existing = await prisma.agentInstance.findFirst({ where: { id: instanceId, userId: user.id } });
  if (!existing) return null;

  const instance = await prisma.agentInstance.update({
    where: { id: instanceId },
    data: {
      ...(input.displayName ? { displayName: input.displayName } : {}),
      ...(input.configuration ? { configuration: JSON.stringify(input.configuration) } : {}),
    },
  });

  return serializeInstance(prisma, instance);
}

export async function linkAgentInstanceCredentials(
  prisma: PrismaClient,
  user: AuthenticatedUser,
  instanceId: string,
  input: LinkAgentInstanceCredentialsInput
) {
  const instance = await prisma.agentInstance.findFirst({ where: { id: instanceId, userId: user.id } });
  if (!instance) return { status: "missing" as const };

  const requirementIds = input.links.map((link) => link.credentialRequirementId);
  const credentialIds = input.links.map((link) => link.userCredentialId);

  const [requirementCount, credentialCount] = await Promise.all([
    prisma.agentCredentialRequirement.count({
      where: { id: { in: requirementIds }, agentId: instance.agentId },
    }),
    prisma.userCredential.count({
      where: { id: { in: credentialIds }, userId: user.id },
    }),
  ]);

  if (requirementCount !== new Set(requirementIds).size || credentialCount !== new Set(credentialIds).size) {
    return { status: "invalid_link" as const };
  }

  await prisma.$transaction([
    prisma.agentInstanceCredential.deleteMany({
      where: {
        agentInstanceId: instanceId,
        credentialRequirementId: { in: requirementIds },
      },
    }),
    ...input.links.map((link) =>
      prisma.agentInstanceCredential.create({
        data: {
          agentInstanceId: instanceId,
          credentialRequirementId: link.credentialRequirementId,
          userCredentialId: link.userCredentialId,
        },
      })
    ),
  ]);

  const setup = await getSetupState(prisma, instance.id, instance.agentId);
  const updated = await prisma.agentInstance.update({
    where: { id: instance.id },
    data: { status: setup.ready ? "READY" : "DRAFT" },
  });

  return { status: "ok" as const, instance: await serializeInstance(prisma, updated) };
}
