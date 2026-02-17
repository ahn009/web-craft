import type { FastifyInstance } from "fastify";
import { success, error } from "../../utils/response.util.js";

export default async function purchaseRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { agentId: string } }>(
    "/api/checkout/:agentId",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const userId = request.user.id;
      const { agentId } = request.params;

      const agent = await fastify.prisma.agent.findUnique({ where: { id: agentId } });
      if (!agent) return reply.status(404).send(error("Agent not found"));

      const existing = await fastify.prisma.purchase.findUnique({
        where: { userId_agentId: { userId, agentId } },
      });
      if (existing) return reply.status(409).send(error("Already purchased"));

      const purchase = await fastify.prisma.purchase.create({
        data: {
          userId,
          agentId,
          amount: agent.price,
        },
      });

      return success({
        purchase,
        message: "Purchase successful (simulated)",
      });
    }
  );

  fastify.get(
    "/api/my-agents",
    { preHandler: [fastify.authenticate] },
    async (request) => {
      const userId = request.user.id;

      const purchases = await fastify.prisma.purchase.findMany({
        where: { userId },
        include: {
          agent: {
            select: {
              id: true,
              name: true,
              description: true,
              category: true,
              price: true,
              tags: true,
              nodeCount: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      const result = purchases.map((p) => ({
        purchaseId: p.id,
        purchasedAt: p.createdAt,
        amount: p.amount,
        agent: {
          ...p.agent,
          tags: JSON.parse(p.agent.tags),
        },
      }));

      return success(result);
    }
  );
}
