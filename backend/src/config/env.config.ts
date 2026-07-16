import { z } from "zod";

const weakJwtSecrets = new Set([
  "dev-secret-key-change-in-production",
  "change-me-to-a-random-secret",
  "your-secret-key-change-in-production",
  "change-me-in-production",
]);

const weakCredentialEncryptionKeys = new Set([
  "dev-credential-key-change-me-32!",
  "change-me-credential-key-32-bytes",
]);

const booleanFromEnv = z.preprocess((value) => {
  if (typeof value !== "string") return value;

  const normalizedValue = value.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalizedValue)) return true;
  if (["false", "0", "no", "off", ""].includes(normalizedValue)) return false;

  return value;
}, z.boolean());

export const envSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    DATABASE_URL: z.string().default("file:./dev.db"),
    JWT_SECRET: z.string().default("dev-secret-key-change-in-production"),
    PORT: z.coerce.number().default(3000),
    FRONTEND_URL: z.string().url().default("http://localhost:5173"),
    ZIP_PATH: z.string().default("../n8n-workflow-templates-main.zip"),
    SENDGRID_API_KEY: z.string().default(""),
    SENDGRID_FROM_EMAIL: z.string().email().default("noreply@webcraft.ai"),
    ADMIN_EMAIL: z.string().email().default("admin@webcraft.ai"),
    CREDENTIAL_ENCRYPTION_KEY: z.string().default("dev-credential-key-change-me-32!"),
    N8N_BASE_URL: z.string().url().optional(),
    N8N_API_KEY: z.string().default(""),
    N8N_TIMEOUT_MS: z.coerce.number().positive().default(15000),
    ENABLE_TEST_ROUTES: booleanFromEnv.default(false),
    CHECKOUT_MODE: z.enum(["demo", "disabled"]).default("demo"),
  })
  .superRefine((env, ctx) => {
    if (env.NODE_ENV !== "production") return;

    if (!env.DATABASE_URL.startsWith("postgresql://") && !env.DATABASE_URL.startsWith("postgres://")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["DATABASE_URL"],
        message: "Production DATABASE_URL must be a PostgreSQL connection string",
      });
    }

    if (weakJwtSecrets.has(env.JWT_SECRET) || env.JWT_SECRET.length < 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["JWT_SECRET"],
        message: "Production JWT_SECRET must be unique and at least 32 characters",
      });
    }

    if (env.ENABLE_TEST_ROUTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["ENABLE_TEST_ROUTES"],
        message: "ENABLE_TEST_ROUTES cannot be true in production",
      });
    }

    if (weakCredentialEncryptionKeys.has(env.CREDENTIAL_ENCRYPTION_KEY) || env.CREDENTIAL_ENCRYPTION_KEY.length < 32) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["CREDENTIAL_ENCRYPTION_KEY"],
        message: "Production CREDENTIAL_ENCRYPTION_KEY must be unique and at least 32 characters",
      });
    }
  });

export const parseEnv = (input: NodeJS.ProcessEnv) => envSchema.parse(input);

export const env = parseEnv(process.env);
