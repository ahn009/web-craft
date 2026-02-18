import rateLimit from "@fastify/rate-limit";
import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";

export default fp(async (fastify: FastifyInstance) => {
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    keyGenerator: (request) => request.ip,
  });
});

export const authRateLimit = {
  config: {
    rateLimit: {
      max: 5,
      timeWindow: "1 minute",
    },
  },
};
