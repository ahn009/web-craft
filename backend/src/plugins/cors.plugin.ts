import cors from "@fastify/cors";
import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import { env } from "../config/env.config.js";

export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(cors, {
    origin: env.FRONTEND_URL,
    credentials: true,
  });
});
