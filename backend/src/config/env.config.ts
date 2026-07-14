import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().default("file:./dev.db"),
  JWT_SECRET: z.string().default("dev-secret-key-change-in-production"),
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  ZIP_PATH: z.string().default("../n8n-workflow-templates-main.zip"),
  SENDGRID_API_KEY: z.string().default(""),
  SENDGRID_FROM_EMAIL: z.string().email().default("noreply@webcraft.ai"),
  ENABLE_TEST_ROUTES: z.coerce.boolean().default(false),
  CHECKOUT_MODE: z.enum(["demo", "disabled"]).default("demo"),
});

export const env = envSchema.parse(process.env);
