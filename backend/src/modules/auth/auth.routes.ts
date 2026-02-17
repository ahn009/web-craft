import type { FastifyInstance } from "fastify";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { registerUser, loginUser } from "./auth.service.js";
import { success, error } from "../../utils/response.util.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/api/auth/register", async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    try {
      const user = await registerUser(fastify.prisma, parsed.data);
      const token = fastify.jwt.sign({ id: user.id, email: user.email });
      return success({ user, token });
    } catch (e: any) {
      return reply.status(409).send(error(e.message));
    }
  });

  fastify.post("/api/auth/login", async (request, reply) => {
    const parsed = loginSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    try {
      const user = await loginUser(fastify.prisma, parsed.data);
      const token = fastify.jwt.sign({ id: user.id, email: user.email });
      return success({ user, token });
    } catch (e: any) {
      return reply.status(401).send(error(e.message));
    }
  });
}
