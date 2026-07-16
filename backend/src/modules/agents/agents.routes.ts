import type { FastifyInstance } from "fastify";
import { listAgentsSchema } from "./agents.schema.js";
import { listAgents, getAgent, getCategories, simulateTest } from "./agents.service.js";
import { success, error } from "../../utils/response.util.js";
import { isAdminEmail } from "../../utils/admin.util.js";

export default async function agentRoutes(fastify: FastifyInstance) {
  fastify.get("/api/agents", async (request, reply) => {
    const parsed = listAgentsSchema.safeParse(request.query);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }
    const result = await listAgents(fastify.prisma, parsed.data);
    return success(result);
  });

  fastify.get("/api/agents/categories", async () => {
    const categories = await getCategories(fastify.prisma);
    return success(categories);
  });

  fastify.get<{ Params: { id: string } }>("/api/agents/:id", async (request, reply) => {
    const agent = await getAgent(fastify.prisma, request.params.id);
    if (!agent) return reply.status(404).send(error("Agent not found"));
    return success(agent);
  });

  fastify.post<{ Params: { id: string } }>("/api/agents/:id/test", async (request, reply) => {
    const agent = await fastify.prisma.agent.findUnique({
      where: { id: request.params.id },
      select: { rawJson: true },
    });
    if (!agent) return reply.status(404).send(error("Agent not found"));

    const result = simulateTest(agent.rawJson);
    return success(result);
  });

  fastify.get<{ Params: { id: string } }>(
    "/api/agents/:id/download",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const userId = request.user.id;
      const isAdmin = isAdminEmail(request.user.email);
      const agentId = request.params.id;

      if (!isAdmin) {
        const purchase = await fastify.prisma.purchase.findUnique({
          where: { userId_agentId: { userId, agentId } },
        });
        if (!purchase) {
          return reply.status(403).send(error("You must purchase this agent before downloading"));
        }
      }

      const agent = await fastify.prisma.agent.findUnique({ where: { id: agentId } });
      if (!agent) return reply.status(404).send(error("Agent not found"));

      reply.header("Content-Type", "application/json");
      reply.header("Content-Disposition", `attachment; filename="${agent.name}.json"`);
      return agent.rawJson;
    }
  );
}
