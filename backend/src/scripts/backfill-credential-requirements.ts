import { PrismaClient } from "@prisma/client";
import { backfillCredentialRequirements } from "../modules/credentials/credential-requirements.service.js";

const prisma = new PrismaClient();

try {
  const result = await backfillCredentialRequirements(prisma);
  console.log(`Backfilled ${result.requirementCount} credential requirements across ${result.agentCount} agents.`);
} finally {
  await prisma.$disconnect();
}
