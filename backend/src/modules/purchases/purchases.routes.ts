import type { FastifyInstance } from "fastify";
import { env } from "../../config/env.config.js";
import { success, error } from "../../utils/response.util.js";
import { isAdminEmail } from "../../utils/admin.util.js";

export default async function purchaseRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { agentId: string } }>(
    "/api/checkout/:agentId",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const userId = request.user.id;
      const { agentId } = request.params;

      if (env.CHECKOUT_MODE !== "demo") {
        return reply.status(501).send(error("Checkout is disabled. Configure a payment provider before enabling paid purchases."));
      }

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
        checkoutMode: env.CHECKOUT_MODE,
        message: "Demo access granted. No payment was processed.",
      });
    }
  );

  fastify.get(
    "/api/my-agents",
    { preHandler: [fastify.authenticate] },
    async (request) => {
      const userId = request.user.id;

      if (isAdminEmail(request.user.email)) {
        const agents = await fastify.prisma.agent.findMany({
          select: {
            id: true,
            name: true,
            description: true,
            category: true,
            price: true,
            tags: true,
            nodeCount: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        });

        return success(
          agents.map((agent) => ({
            purchaseId: `admin-${agent.id}`,
            purchasedAt: agent.createdAt,
            amount: 0,
            agent: {
              id: agent.id,
              workflowId: "",
              name: agent.name,
              description: agent.description,
              category: agent.category,
              price: agent.price,
              tags: JSON.parse(agent.tags),
              nodeCount: agent.nodeCount,
              createdAt: agent.createdAt,
            },
          }))
        );
      }

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
