import type { FastifyInstance } from "fastify";
import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema,
} from "./auth.schema.js";
import {
  registerUser,
  loginUser,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  resendVerification,
} from "./auth.service.js";
import { success, error } from "../../utils/response.util.js";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/api/auth/register", async (request, reply) => {
    const parsed = registerSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    try {
      const user = await registerUser(fastify.prisma, parsed.data);
      return success({ user, message: "Registration successful. Please check your email to verify your account." });
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
      if (e.message.includes("verify your email")) {
        return reply.status(403).send(error(e.message));
      }
      return reply.status(401).send(error(e.message));
    }
  });

  fastify.post("/api/auth/verify-email", async (request, reply) => {
    const parsed = verifyEmailSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    try {
      const result = await verifyEmail(fastify.prisma, parsed.data.token);
      return success({ ...result, message: "Email verified successfully. You can now log in." });
    } catch (e: any) {
      return reply.status(400).send(error(e.message));
    }
  });

  fastify.post("/api/auth/forgot-password", async (request, reply) => {
    const parsed = forgotPasswordSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    try {
      await requestPasswordReset(fastify.prisma, parsed.data.email);
      return success({ message: "If an account exists with that email, a password reset link has been sent." });
    } catch (e: any) {
      return reply.status(500).send(error("Something went wrong. Please try again."));
    }
  });

  fastify.post("/api/auth/reset-password", async (request, reply) => {
    const parsed = resetPasswordSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    try {
      await resetPassword(fastify.prisma, parsed.data.token, parsed.data.password);
      return success({ message: "Password has been reset successfully. You can now log in." });
    } catch (e: any) {
      return reply.status(400).send(error(e.message));
    }
  });

  fastify.post("/api/auth/resend-verification", async (request, reply) => {
    const parsed = resendVerificationSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send(error(parsed.error.errors[0].message));
    }

    try {
      await resendVerification(fastify.prisma, parsed.data.email);
      return success({ message: "If an account exists with that email, a new verification link has been sent." });
    } catch (e: any) {
      return reply.status(429).send(error(e.message));
    }
  });
}
