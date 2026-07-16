import type { FastifyInstance } from "fastify";
import { isAdminEmail } from "../../utils/admin.util.js";
import { error, success } from "../../utils/response.util.js";
import {
  listCredentialRequirements,
  refreshCredentialRequirements,
} from "./credential-requirements.service.js";

export default async function credentialRequirementRoutes(fastify: FastifyInstance) {
  fastify.get<{ Params: { id: string } }>("/api/agents/:id/credential-requirements", async (request, reply) => {
    const agent = await fastify.prisma.agent.findUnique({
      where: { id: request.params.id },
      select: { id: true },
    });
    if (!agent) return reply.status(404).send(error("Agent not found"));

    const requirements = await listCredentialRequirements(fastify.prisma, request.params.id);
    return success(requirements);
  });

  fastify.post<{ Params: { id: string } }>(
    "/api/admin/agents/:id/credential-requirements/refresh",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      if (!isAdminEmail(request.user.email)) {
        return reply.status(403).send(error("Admin access required"));
      }

      const requirements = await refreshCredentialRequirements(fastify.prisma, request.params.id);
      if (!requirements) return reply.status(404).send(error("Agent not found"));

      return success({ requirements, count: requirements.length });
    }
  );
}
