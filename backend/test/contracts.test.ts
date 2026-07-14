import test from "node:test";
import assert from "node:assert/strict";
import { listAgentsSchema } from "../src/modules/agents/agents.schema.js";
import { loginSchema, registerSchema, verifyEmailSchema } from "../src/modules/auth/auth.schema.js";
import { simulateTest } from "../src/modules/agents/agents.service.js";
import { error, success } from "../src/utils/response.util.js";
import { parseEnv } from "../src/config/env.config.js";

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
      FRONTEND_URL: "https://example.com",
      ENABLE_TEST_ROUTES: "true",
      CHECKOUT_MODE: "disabled",
    })
  );
});
