import { PrismaClient } from "@prisma/client";
import { processQueuedExecutions } from "../modules/executions/executions.service.js";

const prisma = new PrismaClient();

try {
  const results = await processQueuedExecutions(prisma);
  console.log(`Processed ${results.length} queued executions.`);
  for (const result of results) {
    console.log(`${result.id}: ${result.status}`);
  }
} finally {
  await prisma.$disconnect();
}
