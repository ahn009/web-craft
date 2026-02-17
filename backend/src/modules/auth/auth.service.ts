import bcrypt from "bcrypt";
import type { PrismaClient } from "@prisma/client";
import type { RegisterInput, LoginInput } from "./auth.schema.js";

const SALT_ROUNDS = 10;

export async function registerUser(prisma: PrismaClient, input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
  return prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: hashedPassword,
    },
    select: { id: true, email: true, name: true, createdAt: true },
  });
}

export async function loginUser(prisma: PrismaClient, input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new Error("Invalid email or password");

  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) throw new Error("Invalid email or password");

  return { id: user.id, email: user.email, name: user.name };
}
