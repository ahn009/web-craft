import path from "node:path";
import { fileURLToPath } from "node:url";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { env } from "./config/env.config.js";
import prismaPlugin from "./plugins/prisma.plugin.js";
import corsPlugin from "./plugins/cors.plugin.js";
import authPlugin from "./plugins/auth.plugin.js";
import rateLimitPlugin from "./plugins/rate-limit.plugin.js";
import authRoutes from "./modules/auth/auth.routes.js";
import agentRoutes from "./modules/agents/agents.routes.js";
import purchaseRoutes from "./modules/purchases/purchases.routes.js";
import { hasExtractedFiles, extractZip } from "./services/zip-extractor.service.js";
import { importAgents } from "./services/agent-importer.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({ logger: true });

// Register plugins
await fastify.register(prismaPlugin);
await fastify.register(corsPlugin);
await fastify.register(authPlugin);
await fastify.register(rateLimitPlugin);

// Register routes
await fastify.register(authRoutes);
await fastify.register(agentRoutes);
await fastify.register(purchaseRoutes);

// Serve static frontend files in production
const frontendDistPath = path.resolve(__dirname, "../../dist");
try {
  await fastify.register(fastifyStatic, {
    root: frontendDistPath,
    prefix: "/",
    wildcard: false,
  });

  // SPA fallback: serve index.html for all non-API routes
  fastify.setNotFoundHandler(async (request, reply) => {
    if (request.url.startsWith("/api/")) {
      return reply.status(404).send({ success: false, error: "Not found" });
    }
    return reply.sendFile("index.html");
  });
} catch {
  // Frontend dist not built yet — skip static serving in dev
  fastify.log.info("No frontend dist found, skipping static file serving");
}

// Health check
fastify.get("/health", async () => ({ status: "ok" }));

// Startup: extract ZIP and import agents
async function bootstrap() {
  // Step 1: Extract ZIP if needed
  if (!hasExtractedFiles()) {
    fastify.log.info("No extracted files found, extracting ZIP...");
    try {
      const count = extractZip(env.ZIP_PATH);
      fastify.log.info(`Extracted ${count} workflow files`);
    } catch (e: any) {
      fastify.log.error(`Failed to extract ZIP: ${e.message}`);
    }
  } else {
    fastify.log.info("Agent files already extracted");
  }

  // Step 2: Import agents if DB is empty
  const agentCount = await fastify.prisma.agent.count();
  if (agentCount === 0) {
    fastify.log.info("No agents in DB, importing...");
    try {
      const imported = await importAgents(fastify.prisma);
      fastify.log.info(`Imported ${imported} agents`);
    } catch (e: any) {
      fastify.log.error(`Failed to import agents: ${e.message}`);
    }
  } else {
    fastify.log.info(`Database already has ${agentCount} agents`);
  }

  // Start server
  await fastify.listen({ port: env.PORT, host: "0.0.0.0" });
  fastify.log.info(`Server running on http://localhost:${env.PORT}`);
}

bootstrap().catch((err) => {
  fastify.log.error(err);
  process.exit(1);
});
