import type { PrismaClient } from "@prisma/client";
import { isAdminEmail } from "./admin.util.js";

export type AuthenticatedUser = {
  id: string;
  email: string;
};

export function canUseAdminAgentAccess(user: AuthenticatedUser) {
  return isAdminEmail(user.email);
}

export async function userCanAccessAgent(prisma: PrismaClient, user: AuthenticatedUser, agentId: string) {
  if (canUseAdminAgentAccess(user)) return true;

  const purchase = await prisma.purchase.findUnique({
    where: { userId_agentId: { userId: user.id, agentId } },
    select: { id: true },
  });

  return Boolean(purchase);
}
