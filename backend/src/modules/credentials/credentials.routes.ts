import type { FastifyInstance } from "fastify";
import { error, success } from "../../utils/response.util.js";
import {
  createCredentialSchema,
  updateCredentialSchema,
} from "./credentials.schema.js";
import {
  createUserCredential,
  deleteUserCredential,
  listUserCredentials,
  updateUserCredential,
} from "./credentials.service.js";

export default async function credentialsRoutes(fastify: FastifyInstance) {
  fastify.get("/api/credentials", { preHandler: [fastify.authenticate] }, async (request) => {
    const credentials = await listUserCredentials(fastify.prisma, request.user.id);
    return success(credentials);
  });

  fastify.post("/api/credentials", { preHandler: [fastify.authenticate] }, async (request, reply) => {
    const parsed = createCredentialSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    const credential = await createUserCredential(fastify.prisma, request.user.id, parsed.data);
    return success(credential);
  });

  fastify.patch<{ Params: { id: string } }>(
    "/api/credentials/:id",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const parsed = updateCredentialSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send(error(parsed.error.errors[0].message));
      }

      const credential = await updateUserCredential(fastify.prisma, request.user.id, request.params.id, parsed.data);
      if (!credential) return reply.status(404).send(error("Credential not found"));

      return success(credential);
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    "/api/credentials/:id",
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const result = await deleteUserCredential(fastify.prisma, request.user.id, request.params.id);
      if (result.status === "missing") return reply.status(404).send(error("Credential not found"));
      if (result.status === "in_use") {
        return reply.status(409).send(error("Credential is linked to an agent instance"));
      }

      return success({ deleted: true });
    }
  );
}
