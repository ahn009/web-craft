import crypto from "node:crypto";
import bcrypt from "bcrypt";
import type { PrismaClient } from "@prisma/client";
import type { RegisterInput, LoginInput } from "./auth.schema.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../../services/email.service.js";

const SALT_ROUNDS = 10;
const VERIFICATION_TOKEN_EXPIRY_HOURS = 24;
const RESET_TOKEN_EXPIRY_HOURS = 1;

export async function registerUser(prisma: PrismaClient, input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: hashedPassword,
    },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  const token = crypto.randomUUID();
  await prisma.verificationToken.create({
    data: {
      token,
      type: "EMAIL_VERIFICATION",
      userId: user.id,
      expiresAt: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000),
    },
  });

  await sendVerificationEmail(user.email, user.name, token);

  return user;
}

export async function loginUser(prisma: PrismaClient, input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) throw new Error("Invalid email or password");

  if (!user.emailVerified) {
    throw new Error("Please verify your email before logging in. Check your inbox for a verification link.");
  }

  return { id: user.id, email: user.email, name: user.name };
}

export async function verifyEmail(prisma: PrismaClient, token: string) {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record) throw new Error("Invalid verification token");
  if (record.usedAt) throw new Error("This verification link has already been used");
  if (record.type !== "EMAIL_VERIFICATION") throw new Error("Invalid token type");
  if (new Date() > record.expiresAt) throw new Error("Verification link has expired. Please request a new one.");

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: true, emailVerifiedAt: new Date() },
    }),
    prisma.verificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return { email: record.user.email, name: record.user.name };
}

export async function requestPasswordReset(prisma: PrismaClient, email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  // Always return success to avoid revealing if email exists
  if (!user) return;

  // Invalidate any existing reset tokens
  await prisma.verificationToken.updateMany({
    where: { userId: user.id, type: "PASSWORD_RESET", usedAt: null },
    data: { usedAt: new Date() },
  });

  const token = crypto.randomUUID();
  await prisma.verificationToken.create({
    data: {
      token,
      type: "PASSWORD_RESET",
      userId: user.id,
      expiresAt: new Date(Date.now() + RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000),
    },
  });

  await sendPasswordResetEmail(user.email, user.name, token);
}

export async function resetPassword(prisma: PrismaClient, token: string, newPassword: string) {
  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) throw new Error("Invalid reset token");
  if (record.usedAt) throw new Error("This reset link has already been used");
  if (record.type !== "PASSWORD_RESET") throw new Error("Invalid token type");
  if (new Date() > record.expiresAt) throw new Error("Reset link has expired. Please request a new one.");

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { password: hashedPassword },
    }),
    prisma.verificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    }),
  ]);
}

export async function resendVerification(prisma: PrismaClient, email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  // Always return success to avoid revealing if email exists
  if (!user) return;
  if (user.emailVerified) return;

  // Check for recent verification email (rate limit: 1 per 2 minutes)
  const recentToken = await prisma.verificationToken.findFirst({
    where: {
      userId: user.id,
      type: "EMAIL_VERIFICATION",
      createdAt: { gt: new Date(Date.now() - 2 * 60 * 1000) },
    },
  });

  if (recentToken) throw new Error("Please wait a couple of minutes before requesting another verification email.");

  const token = crypto.randomUUID();
  await prisma.verificationToken.create({
    data: {
      token,
      type: "EMAIL_VERIFICATION",
      userId: user.id,
      expiresAt: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000),
    },
  });

  await sendVerificationEmail(user.email, user.name, token);
}
