import type { FastifyInstance } from "fastify";
import { error, success } from "../../utils/response.util.js";
import { createExecutionSchema } from "./executions.schema.js";
import {
  createAgentExecution,
  getExecutionDetail,
  listRecentExecutionsForAdmin,
  listAgentExecutions,
  retryExecution,
} from "./executions.service.js";

export default async function executionRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { id: string } }>(
    "/api/agent-instances/:id/runs",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const parsed = createExecutionSchema.safeParse(request.body);
      if (!parsed.success) return reply.status(400).send(error(parsed.error.errors[0].message));

      const result = await createAgentExecution(fastify.prisma, request.user, request.params.id, parsed.data);
      if (result.status === "missing") return reply.status(404).send(error("Agent instance not found"));
      if (result.status === "not_ready") return reply.status(409).send(error("Agent instance setup is incomplete"));
      if (result.status === "rate_limited") return reply.status(429).send(error("Too many active executions"));

      return success(result.execution);
    }
  );

  fastify.get<{ Params: { id: string } }>(
    "/api/agent-instances/:id/runs",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const executions = await listAgentExecutions(fastify.prisma, request.user, request.params.id);
      if (!executions) return reply.status(404).send(error("Agent instance not found"));

      return success(executions);
    }
  );

  fastify.get<{ Params: { id: string } }>(
    "/api/executions/:id",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const execution = await getExecutionDetail(fastify.prisma, request.user, request.params.id);
      if (!execution) return reply.status(404).send(error("Execution not found"));

      return success(execution);
    }
  );

  fastify.post<{ Params: { id: string } }>(
    "/api/executions/:id/retry",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const result = await retryExecution(fastify.prisma, request.user, request.params.id);
      if (result.status === "missing") return reply.status(404).send(error("Execution not found"));
      if (result.status === "not_retryable") return reply.status(409).send(error("Only failed executions can be retried"));
      if (result.status === "not_ready") return reply.status(409).send(error("Agent instance setup is incomplete"));
      if (result.status === "rate_limited") return reply.status(429).send(error("Too many active executions"));

      return success(result.execution);
    }
  );

  fastify.get("/api/admin/executions/recent", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const result = await listRecentExecutionsForAdmin(fastify.prisma, request.user);
    if (result.status === "forbidden") return reply.status(403).send(error("Admin access required"));

    return success(result.executions);
  });
}
