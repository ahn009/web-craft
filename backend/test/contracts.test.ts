import test from "node:test";
import assert from "node:assert/strict";
import { listAgentsSchema } from "../src/modules/agents/agents.schema.js";
import { loginSchema, registerSchema, verifyEmailSchema } from "../src/modules/auth/auth.schema.js";
import { simulateTest } from "../src/modules/agents/agents.service.js";
import { error, success } from "../src/utils/response.util.js";
import { parseEnv } from "../src/config/env.config.js";
import { decryptSecret, encryptSecret, normalizeEncryptionKey } from "../src/utils/crypto.util.js";
import { userCanAccessAgent } from "../src/utils/access.util.js";
import { detectCredentialRequirements } from "../src/modules/credentials/credential-requirements.service.js";
import { createCredentialSchema, updateCredentialSchema } from "../src/modules/credentials/credentials.schema.js";
import { toSafeCredential } from "../src/modules/credentials/credentials.service.js";
import {
  linkAgentInstanceCredentialsSchema,
  updateAgentInstanceSchema,
} from "../src/modules/agent-instances/agent-instances.schema.js";

test("listAgentsSchema applies defaults and coerces numeric query params", () => {
  const parsed = listAgentsSchema.parse({ page: "2", limit: "10", sort: "price_asc" });
  assert.deepEqual(parsed, {
    page: 2,
    limit: 10,
    sort: "price_asc",
  });
});

test("listAgentsSchema rejects invalid pagination", () => {
  assert.equal(listAgentsSchema.safeParse({ page: 0 }).success, false);
  assert.equal(listAgentsSchema.safeParse({ limit: 101 }).success, false);
});

test("auth schemas enforce email and password requirements", () => {
  assert.equal(registerSchema.safeParse({ email: "bad", password: "123456", name: "A" }).success, false);
  assert.equal(registerSchema.safeParse({ email: "a@example.com", password: "12345", name: "A" }).success, false);
  assert.equal(loginSchema.safeParse({ email: "a@example.com", password: "x" }).success, true);
  assert.equal(verifyEmailSchema.safeParse({ token: "token" }).success, true);
});

test("response helpers return stable API envelopes", () => {
  assert.deepEqual(success({ ok: true }), { success: true, data: { ok: true } });
  assert.deepEqual(error("Nope", 403), { success: false, error: "Nope", statusCode: 403 });
});

test("simulateTest returns steps for workflow nodes", () => {
  const result = simulateTest(
    JSON.stringify({
      name: "Example workflow",
      nodes: [
        { name: "Trigger", type: "n8n-nodes-base.webhook" },
        { name: "Send Email", type: "n8n-nodes-base.emailSend" },
      ],
    })
  );

  assert.equal(result.workflowName, "Example workflow");
  assert.equal(result.totalNodes, 2);
  assert.equal(result.status, "completed");
  assert.equal(result.steps.length, 2);
  assert.equal(result.steps[0].name, "Trigger");
});

test("production env parser accepts ENABLE_TEST_ROUTES=false string", () => {
  const parsed = parseEnv({
    NODE_ENV: "production",
    DATABASE_URL: "postgresql://user:password@localhost:5432/webcraft",
    JWT_SECRET: "a-unique-production-secret-with-32-characters",
    CREDENTIAL_ENCRYPTION_KEY: "unique-credential-key-for-prod-32",
    FRONTEND_URL: "https://example.com",
    ENABLE_TEST_ROUTES: "false",
    CHECKOUT_MODE: "disabled",
  });

  assert.equal(parsed.ENABLE_TEST_ROUTES, false);
});

test("production env parser rejects ENABLE_TEST_ROUTES=true string", () => {
  assert.throws(() =>
    parseEnv({
      NODE_ENV: "production",
      DATABASE_URL: "postgresql://user:password@localhost:5432/webcraft",
      JWT_SECRET: "a-unique-production-secret-with-32-characters",
      CREDENTIAL_ENCRYPTION_KEY: "unique-credential-key-for-prod-32",
      FRONTEND_URL: "https://example.com",
      ENABLE_TEST_ROUTES: "true",
      CHECKOUT_MODE: "disabled",
    })
  );
});

test("production env parser rejects weak credential encryption key", () => {
  assert.throws(() =>
    parseEnv({
      NODE_ENV: "production",
      DATABASE_URL: "postgresql://user:password@localhost:5432/webcraft",
      JWT_SECRET: "a-unique-production-secret-with-32-characters",
      CREDENTIAL_ENCRYPTION_KEY: "dev-credential-key-change-me-32!",
      FRONTEND_URL: "https://example.com",
      ENABLE_TEST_ROUTES: "false",
      CHECKOUT_MODE: "disabled",
    })
  );
});

test("credential encryption utility round-trips secrets without storing plaintext", () => {
  const key = "test-credential-key-change-032!!";
  const secret = "sk-test-super-secret";
  const encrypted = encryptSecret(secret, key);

  assert.notEqual(encrypted, secret);
  assert.equal(encrypted.startsWith("v1:"), true);
  assert.equal(decryptSecret(encrypted, key), secret);
});

test("credential encryption utility rejects invalid key sizes", () => {
  assert.throws(() => normalizeEncryptionKey("short-key"));
});

test("agent access helper allows admin and purchased users only", async () => {
  const prisma = {
    purchase: {
      findUnique: async ({ where }: { where: { userId_agentId: { userId: string; agentId: string } } }) => {
        const { userId, agentId } = where.userId_agentId;
        return userId === "buyer" && agentId === "agent-1" ? { id: "purchase-1" } : null;
      },
    },
  };

  assert.equal(
    await userCanAccessAgent(prisma as never, { id: "any-user", email: "admin@webcraft.ai" }, "agent-1"),
    true
  );
  assert.equal(
    await userCanAccessAgent(prisma as never, { id: "buyer", email: "buyer@example.com" }, "agent-1"),
    true
  );
  assert.equal(
    await userCanAccessAgent(prisma as never, { id: "stranger", email: "stranger@example.com" }, "agent-1"),
    false
  );
});

test("credential requirement detector extracts n8n node credentials", () => {
  const requirements = detectCredentialRequirements(
    JSON.stringify({
      nodes: [
        {
          name: "OpenAI Chat",
          type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          credentials: {
            openAiApi: { id: "1", name: "OpenAI account" },
          },
        },
        {
          name: "Google Sheets",
          type: "n8n-nodes-base.googleSheets",
          credentials: {
            googleSheetsOAuth2Api: { id: "2", name: "Google account" },
          },
        },
      ],
    })
  );

  assert.equal(requirements.length, 2);
  assert.deepEqual(
    requirements.map((requirement) => requirement.credentialType),
    ["openAiApi", "googleSheetsOAuth2Api"]
  );
  assert.equal(requirements[0].displayName, "Open Ai Api");
  assert.equal(JSON.parse(requirements[0].schema).fields[0].type, "secret");
});

test("credential requirement detector deduplicates same node credential slot", () => {
  const requirements = detectCredentialRequirements(
    JSON.stringify({
      nodes: [
        {
          name: "OpenAI Chat",
          type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          credentials: {
            openAiApi: { id: "1", name: "OpenAI account" },
          },
        },
        {
          name: "OpenAI Chat",
          type: "@n8n/n8n-nodes-langchain.lmChatOpenAi",
          credentials: {
            openAiApi: { id: "1", name: "OpenAI account" },
          },
        },
      ],
    })
  );

  assert.equal(requirements.length, 1);
});

test("credential schemas require secret on create and allow metadata-only updates", () => {
  assert.equal(
    createCredentialSchema.safeParse({ provider: "openai", label: "OpenAI", secret: "sk-test" }).success,
    true
  );
  assert.equal(createCredentialSchema.safeParse({ provider: "openai", label: "OpenAI" }).success, false);
  assert.equal(updateCredentialSchema.safeParse({ label: "New label" }).success, true);
});

test("safe credential response never includes encrypted payload", () => {
  const safe = toSafeCredential({
    id: "credential-1",
    userId: "user-1",
    provider: "openai",
    label: "OpenAI",
    encryptedPayload: "v1:secret",
    lastFour: "test",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
  });

  assert.deepEqual(Object.keys(safe), ["id", "provider", "label", "lastFour", "createdAt", "updatedAt"]);
  assert.equal("encryptedPayload" in safe, false);
});

test("agent instance schemas validate configuration and credential links", () => {
  assert.equal(updateAgentInstanceSchema.safeParse({ displayName: "Support Agent", configuration: { mode: "test" } }).success, true);
  assert.equal(updateAgentInstanceSchema.safeParse({ displayName: "" }).success, false);
  assert.equal(
    linkAgentInstanceCredentialsSchema.safeParse({
      links: [{ credentialRequirementId: "requirement-1", userCredentialId: "credential-1" }],
    }).success,
    true
  );
  assert.equal(linkAgentInstanceCredentialsSchema.safeParse({ links: [{ credentialRequirementId: "" }] }).success, false);
});
