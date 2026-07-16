import type { FastifyInstance } from "fastify";
import { error, success } from "../../utils/response.util.js";
import {
  linkAgentInstanceCredentialsSchema,
  updateAgentInstanceSchema,
} from "./agent-instances.schema.js";
import {
  createOrGetAgentInstance,
  getAgentInstance,
  linkAgentInstanceCredentials,
  listAgentInstances,
  updateAgentInstance,
} from "./agent-instances.service.js";

export default async function agentInstanceRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { id: string } }>(
    "/api/agents/:id/instances",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const result = await createOrGetAgentInstance(fastify.prisma, request.user, request.params.id);
      if (result.status === "missing") return reply.status(404).send(error("Agent not found"));
      if (result.status === "forbidden") return reply.status(403).send(error("You must own this agent before using it"));

      return success(result.instance);
    }
  );

  fastify.get("/api/agent-instances", { preHandler: [fastify.authenticate] }, async (request) => {
    const instances = await listAgentInstances(fastify.prisma, request.user);
    return success(instances);
  });

  fastify.get<{ Params: { id: string } }>(
    "/api/agent-instances/:id",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const instance = await getAgentInstance(fastify.prisma, request.user, request.params.id);
      if (!instance) return reply.status(404).send(error("Agent instance not found"));

      return success(instance);
    }
  );

  fastify.patch<{ Params: { id: string } }>(
    "/api/agent-instances/:id",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const parsed = updateAgentInstanceSchema.safeParse(request.body);
      if (!parsed.success) return reply.status(400).send(error(parsed.error.errors[0].message));

      const instance = await updateAgentInstance(fastify.prisma, request.user, request.params.id, parsed.data);
      if (!instance) return reply.status(404).send(error("Agent instance not found"));

      return success(instance);
    }
  );

  fastify.put<{ Params: { id: string } }>(
    "/api/agent-instances/:id/credentials",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const parsed = linkAgentInstanceCredentialsSchema.safeParse(request.body);
      if (!parsed.success) return reply.status(400).send(error(parsed.error.errors[0].message));

      const result = await linkAgentInstanceCredentials(fastify.prisma, request.user, request.params.id, parsed.data);
      if (result.status === "missing") return reply.status(404).send(error("Agent instance not found"));
      if (result.status === "invalid_link") return reply.status(400).send(error("Invalid credential mapping"));

      return success(result.instance);
    }
  );
}
