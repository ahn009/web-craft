import type { Prisma, PrismaClient } from "@prisma/client";
import type { ListAgentsInput } from "./agents.schema.js";

export async function listAgents(prisma: PrismaClient, input: ListAgentsInput) {
  const { page, limit, search, category, tag, sort } = input;
  const skip = (page - 1) * limit;

  const where: Prisma.AgentWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (category) {
    where.category = category;
  }

  if (tag) {
    where.tags = { contains: tag };
  }

  const orderBy: Prisma.AgentOrderByWithRelationInput =
    sort === "price_asc" ? { price: "asc" }
    : sort === "price_desc" ? { price: "desc" }
    : sort === "name_asc" ? { name: "asc" }
    : { createdAt: "desc" };

  const [agents, total] = await Promise.all([
    prisma.agent.findMany({
      where,
      orderBy,
      skip,
      take: limit,
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
    }),
    prisma.agent.count({ where }),
  ]);

  const parsed = agents.map((a) => ({
    ...a,
    tags: JSON.parse(a.tags),
  }));

  return {
    agents: parsed,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAgent(prisma: PrismaClient, id: string) {
  const agent = await prisma.agent.findUnique({ where: { id } });
  if (!agent) return null;
  return { ...agent, tags: JSON.parse(agent.tags), rawJson: JSON.parse(agent.rawJson) };
}

export async function getCategories(prisma: PrismaClient) {
  const agents = await prisma.agent.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  return agents.map((a) => a.category).sort();
}

interface WorkflowNode {
  name?: string;
  type?: string;
  parameters?: Record<string, unknown>;
}

export function simulateTest(rawJson: string) {
  const workflow = JSON.parse(rawJson);
  const nodes: WorkflowNode[] = workflow.nodes ?? [];

  const steps = nodes.map((node, i) => ({
    step: i + 1,
    name: node.name ?? `Step ${i + 1}`,
    type: node.type ?? "Unknown",
    status: "success" as const,
    duration: `${Math.floor(Math.random() * 500 + 50)}ms`,
    output: `Processed by ${node.name ?? node.type}`,
  }));

  return {
    workflowName: workflow.name ?? "Unknown Workflow",
    totalNodes: nodes.length,
    executionTime: `${steps.reduce((sum, s) => sum + parseInt(s.duration), 0)}ms`,
    status: "completed",
    steps,
  };
}
