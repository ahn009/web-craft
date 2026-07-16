import type { PrismaClient, UserCredential } from "@prisma/client";
import { encryptSecret } from "../../utils/crypto.util.js";
import type { CreateCredentialInput, UpdateCredentialInput } from "./credentials.schema.js";

function secretLastFour(secret: string) {
  return secret.length > 4 ? secret.slice(-4) : secret;
}

export function toSafeCredential(credential: UserCredential) {
  return {
    id: credential.id,
    provider: credential.provider,
    label: credential.label,
    lastFour: credential.lastFour,
    createdAt: credential.createdAt,
    updatedAt: credential.updatedAt,
  };
}

export async function listUserCredentials(prisma: PrismaClient, userId: string) {
  const credentials = await prisma.userCredential.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return credentials.map(toSafeCredential);
}

export async function createUserCredential(prisma: PrismaClient, userId: string, input: CreateCredentialInput) {
  const credential = await prisma.userCredential.create({
    data: {
      userId,
      provider: input.provider,
      label: input.label,
      encryptedPayload: encryptSecret(JSON.stringify({ secret: input.secret })),
      lastFour: secretLastFour(input.secret),
    },
  });

  return toSafeCredential(credential);
}

export async function updateUserCredential(
  prisma: PrismaClient,
  userId: string,
  credentialId: string,
  input: UpdateCredentialInput
) {
  const existing = await prisma.userCredential.findFirst({
    where: { id: credentialId, userId },
  });
  if (!existing) return null;

  const credential = await prisma.userCredential.update({
    where: { id: credentialId },
    data: {
      ...(input.provider ? { provider: input.provider } : {}),
      ...(input.label ? { label: input.label } : {}),
      ...(input.secret
        ? {
            encryptedPayload: encryptSecret(JSON.stringify({ secret: input.secret })),
            lastFour: secretLastFour(input.secret),
          }
        : {}),
    },
  });

  return toSafeCredential(credential);
}

export async function deleteUserCredential(prisma: PrismaClient, userId: string, credentialId: string) {
  const existing = await prisma.userCredential.findFirst({
    where: { id: credentialId, userId },
    include: { instanceLinks: { select: { id: true }, take: 1 } },
  });
  if (!existing) return { status: "missing" as const };
  if (existing.instanceLinks.length > 0) return { status: "in_use" as const };

  await prisma.userCredential.delete({ where: { id: credentialId } });
  return { status: "deleted" as const };
}
