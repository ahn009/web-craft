import type { PrismaClient } from "@prisma/client";
import { env } from "../../config/env.config.js";
import type { AuthenticatedUser } from "../../utils/access.util.js";
import { isAdminEmail } from "../../utils/admin.util.js";
import { isN8nConfigured, N8nClient } from "../../services/n8n.client.js";
import type { CreateExecutionInput } from "./executions.schema.js";

function parseJson(value: string | null) {
  if (!value) return null;
  return JSON.parse(value);
}

function serializeExecution(execution: {
  id: string;
  agentInstanceId: string;
  userId: string;
  agentId: string;
  status: string;
  input: string;
  output: string | null;
  error: string | null;
  n8nExecutionId: string | null;
  startedAt: Date | null;
  finishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  const durationMs =
    execution.startedAt && execution.finishedAt
      ? execution.finishedAt.getTime() - execution.startedAt.getTime()
      : null;

  return {
    ...execution,
    input: parseJson(execution.input) ?? {},
    output: parseJson(execution.output),
    durationMs,
  };
}

export async function createAgentExecution(
  prisma: PrismaClient,
  user: AuthenticatedUser,
  agentInstanceId: string,
  input: CreateExecutionInput
) {
  const instance = await prisma.agentInstance.findFirst({
    where: { id: agentInstanceId, userId: user.id },
  });
  if (!instance) return { status: "missing" as const };
  if (instance.status !== "READY") return { status: "not_ready" as const };

  const activeCount = await prisma.agentExecution.count({
    where: { userId: user.id, status: { in: ["QUEUED", "RUNNING"] } },
  });
  if (activeCount >= env.EXECUTION_MAX_ACTIVE_PER_USER) {
    return { status: "rate_limited" as const };
  }

  const execution = await prisma.agentExecution.create({
    data: {
      agentInstanceId,
      userId: user.id,
      agentId: instance.agentId,
      input: JSON.stringify(input.input),
    },
  });

  await prisma.agentExecutionLog.create({
    data: {
      executionId: execution.id,
      level: "INFO",
      message: "Execution queued",
    },
  });

  return { status: "ok" as const, execution: serializeExecution(execution) };
}

export async function retryExecution(prisma: PrismaClient, user: AuthenticatedUser, executionId: string) {
  const execution = await prisma.agentExecution.findFirst({
    where: { id: executionId, userId: user.id },
  });
  if (!execution) return { status: "missing" as const };
  if (execution.status !== "FAILED") return { status: "not_retryable" as const };

  return createAgentExecution(prisma, user, execution.agentInstanceId, {
    input: JSON.parse(execution.input),
  });
}

export async function listRecentExecutionsForAdmin(prisma: PrismaClient, user: AuthenticatedUser) {
  if (!isAdminEmail(user.email)) return { status: "forbidden" as const };

  const executions = await prisma.agentExecution.findMany({
    include: {
      agent: { select: { name: true } },
      user: { select: { email: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return {
    status: "ok" as const,
    executions: executions.map((execution) => ({
      ...serializeExecution(execution),
      agentName: execution.agent.name,
      userEmail: execution.user.email,
    })),
  };
}

export async function listAgentExecutions(prisma: PrismaClient, user: AuthenticatedUser, agentInstanceId: string) {
  const instance = await prisma.agentInstance.findFirst({
    where: { id: agentInstanceId, userId: user.id },
    select: { id: true },
  });
  if (!instance) return null;

  const executions = await prisma.agentExecution.findMany({
    where: { agentInstanceId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return executions.map(serializeExecution);
}

export async function getExecutionDetail(prisma: PrismaClient, user: AuthenticatedUser, executionId: string) {
  const execution = await prisma.agentExecution.findFirst({
    where: { id: executionId, userId: user.id },
    include: {
      logs: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!execution) return null;

  return {
    ...serializeExecution(execution),
    logs: execution.logs.map((log) => ({
      ...log,
      metadata: parseJson(log.metadata),
    })),
  };
}

export async function processQueuedExecutions(prisma: PrismaClient, limit = 5) {
  const queued = await prisma.agentExecution.findMany({
    where: { status: "QUEUED" },
    include: { agentInstance: true },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  const results: { id: string; status: string }[] = [];

  for (const execution of queued) {
    await prisma.agentExecution.update({
      where: { id: execution.id },
      data: { status: "RUNNING", startedAt: new Date() },
    });

    try {
      if (!execution.agentInstance.n8nWorkflowId) {
        throw new Error("Agent instance has not been imported to n8n");
      }
      if (!isN8nConfigured({ baseUrl: env.N8N_BASE_URL, apiKey: env.N8N_API_KEY })) {
        throw new Error("n8n is not configured for hosted execution");
      }

      const client = new N8nClient({
        baseUrl: env.N8N_BASE_URL,
        apiKey: env.N8N_API_KEY,
        timeoutMs: env.N8N_TIMEOUT_MS,
      });
      const output = await client.executeWorkflow(execution.agentInstance.n8nWorkflowId, JSON.parse(execution.input));
      const serializedOutput = JSON.stringify(output);
      if (Buffer.byteLength(serializedOutput, "utf8") > env.EXECUTION_MAX_OUTPUT_BYTES) {
        throw new Error("Execution output exceeded the configured size limit");
      }

      await prisma.agentExecution.update({
        where: { id: execution.id },
        data: {
          status: "SUCCESS",
          output: serializedOutput,
          n8nExecutionId: output.id ?? null,
          finishedAt: new Date(),
        },
      });
      await prisma.agentInstance.update({
        where: { id: execution.agentInstanceId },
        data: { lastRunAt: new Date() },
      });
      await prisma.agentExecutionLog.create({
        data: { executionId: execution.id, level: "INFO", message: "Execution completed" },
      });
      results.push({ id: execution.id, status: "SUCCESS" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Execution failed";
      await prisma.agentExecution.update({
        where: { id: execution.id },
        data: { status: "FAILED", error: message, finishedAt: new Date() },
      });
      await prisma.agentExecutionLog.create({
        data: { executionId: execution.id, level: "ERROR", message },
      });
      results.push({ id: execution.id, status: "FAILED" });
    }
  }

  return results;
}
