# Hosted Agent Platform Plan

## Goal

Move WebCraft AI from a workflow marketplace where users only download n8n JSON files to a hosted platform where users can run purchased agents inside WebCraft using their own credentials.

The user experience should become:

1. User browses marketplace.
2. User claims or purchases an agent.
3. User clicks `Use Agent`.
4. WebCraft asks only for the credentials/configuration that specific agent needs.
5. User tests the agent.
6. User runs the agent from WebCraft and sees results, logs, and history.

Downloads can remain available for admin or advanced users, but the main product should be hosted execution.

## Current State

The current app supports:

- Importing n8n workflow JSON files into the database as `Agent` records.
- Listing and filtering marketplace agents.
- Claiming demo access through `Purchase` records.
- Showing purchased agents in `My Agents`.
- Downloading workflow JSON after purchase.
- Admin account full access by email through `ADMIN_EMAIL`.

The current app does not support:

- Running real n8n workflows.
- Storing user credentials for workflow nodes.
- Per-user agent configuration.
- Execution history.
- Logs and retry handling.
- Billing based on hosted usage.

## Target Architecture

### Recommended MVP Architecture

Use a managed n8n runtime behind WebCraft.

WebCraft should own:

- Marketplace and purchase access.
- User accounts.
- Agent instances.
- Credential collection UI.
- Encrypted credential storage.
- Execution requests.
- Execution history and logs.

n8n should own:

- Actual workflow execution.
- Node compatibility.
- Native integrations.
- Workflow activation/import.

This is the fastest path because the marketplace already uses n8n workflow JSON. Building a custom runner would require reimplementing n8n node behavior, credentials, triggers, expressions, retries, and integration edge cases.

### Main Components

- Web frontend: agent setup, credential forms, run UI, execution history.
- WebCraft backend: API, auth, access checks, credential vault, execution orchestration.
- PostgreSQL: users, agents, purchases, agent instances, credential metadata, execution records.
- n8n runtime: isolated workflow execution environment.
- Secret encryption: encrypt all user-provided credentials before storing.
- Worker/queue: execute long-running workflows outside request/response lifecycle.

## Product Scope

### MVP Scope

The MVP should support manually executed workflows only.

Included:

- `Use Agent` button for owned agents.
- One agent instance per user per agent to start.
- Agent setup page.
- Required credential detection from workflow JSON.
- Secure credential input forms.
- Manual run button.
- Basic input payload editor.
- Run status: queued, running, success, failed.
- Execution output viewer.
- Execution history.
- Admin keeps full access to all agents.
- Normal users can only configure/run owned agents.

Excluded from MVP:

- Scheduled workflows.
- Webhook triggers.
- OAuth marketplace apps.
- Team accounts.
- Usage-based billing.
- Multi-tenant n8n scaling.
- Complex workflow editing.
- Public hosted endpoints per agent.

### Post-MVP Scope

- OAuth flows for Google, Slack, Gmail, Microsoft, etc.
- Webhook trigger support.
- Scheduled runs.
- Agent-specific UI templates.
- Team workspaces.
- Usage metering.
- Billing plans.
- Run retry controls.
- Versioned agent updates.
- Sandboxed preview/test data.
- Admin monitoring dashboard.

## Data Model Plan

### AgentInstance

Represents one user's configured copy of an agent.

Fields:

- `id`
- `userId`
- `agentId`
- `status`: `DRAFT`, `READY`, `DISABLED`, `ERROR`
- `displayName`
- `configuration`: JSON string for non-secret settings
- `n8nWorkflowId`: nullable string
- `lastRunAt`
- `createdAt`
- `updatedAt`

Constraints:

- Unique `(userId, agentId)` for MVP.

### AgentCredentialRequirement

Stores detected credential requirements for each marketplace agent.

Fields:

- `id`
- `agentId`
- `nodeName`
- `nodeType`
- `credentialType`
- `displayName`
- `required`
- `schema`: JSON string
- `createdAt`
- `updatedAt`

Purpose:

- Allows frontend to render setup forms without parsing the full workflow every time.
- Allows admin review and overrides.

### UserCredential

Stores encrypted user credentials.

Fields:

- `id`
- `userId`
- `provider`
- `label`
- `encryptedPayload`
- `lastFour`: optional safe display hint
- `createdAt`
- `updatedAt`

Rules:

- Never store plain API keys.
- Never return secret values to frontend after saving.
- Encrypt before writing to database.

### AgentInstanceCredential

Maps a user's saved credential to a specific agent instance requirement.

Fields:

- `id`
- `agentInstanceId`
- `credentialRequirementId`
- `userCredentialId`
- `createdAt`
- `updatedAt`

### AgentExecution

Tracks each hosted run.

Fields:

- `id`
- `agentInstanceId`
- `userId`
- `agentId`
- `status`: `QUEUED`, `RUNNING`, `SUCCESS`, `FAILED`, `CANCELLED`
- `input`: JSON string
- `output`: JSON string nullable
- `error`: text nullable
- `n8nExecutionId`: nullable string
- `startedAt`
- `finishedAt`
- `createdAt`
- `updatedAt`

### AgentExecutionLog

Stores structured execution events.

Fields:

- `id`
- `executionId`
- `level`: `INFO`, `WARN`, `ERROR`
- `message`
- `metadata`: JSON string nullable
- `createdAt`

## Backend API Plan

### Agent Instances

- `POST /api/agents/:id/instances`
  - Creates or returns the current user's instance for an owned agent.
  - Admin can create instances for any agent.

- `GET /api/agent-instances`
  - Lists the user's instances.

- `GET /api/agent-instances/:id`
  - Returns instance detail, setup state, and linked credential metadata.

- `PATCH /api/agent-instances/:id`
  - Updates display name and non-secret configuration.

### Credential Requirements

- `GET /api/agents/:id/credential-requirements`
  - Returns required credentials for an agent.

- `POST /api/admin/agents/:id/credential-requirements/refresh`
  - Admin-only endpoint to re-detect requirements from workflow JSON.

### User Credentials

- `POST /api/credentials`
  - Creates encrypted user credential.

- `GET /api/credentials`
  - Lists safe credential metadata only.

- `PATCH /api/credentials/:id`
  - Replaces encrypted secret payload.

- `DELETE /api/credentials/:id`
  - Deletes credential if not in use, or disables it.

### Instance Credential Mapping

- `PUT /api/agent-instances/:id/credentials`
  - Links saved credentials to required credential slots.

### Executions

- `POST /api/agent-instances/:id/runs`
  - Queues a manual execution.

- `GET /api/agent-instances/:id/runs`
  - Lists execution history.

- `GET /api/executions/:id`
  - Returns execution detail, output, and logs.

- `POST /api/executions/:id/cancel`
  - Post-MVP unless cancellation is easy with the chosen n8n setup.

## Frontend UX Plan

### Marketplace Agent Detail

Add:

- `Use Agent` button for owned agents.
- Keep `Download Workflow` secondary or admin-only.
- If not owned, keep existing claim/purchase behavior.

States:

- Not signed in: `Sign In to Use`
- Signed in but not owned: `Claim Demo Access` or `Purchase`
- Owned but not configured: `Set Up Agent`
- Configured: `Run Agent`

### My Agents

Change from only claimed workflow downloads to an operational workspace.

Each card should show:

- Agent name
- Setup status
- Last run status
- Last run time
- Buttons: `Run`, `Configure`, `History`
- Optional admin-only `Download`

### Agent Setup Page

Route:

- `/agent-instances/:id/setup`

Sections:

- Agent summary.
- Required credentials.
- Non-secret settings.
- Test connection button where possible.
- Save setup.

Important UI rule:

- Do not show secret values after saving. Show only labels like `OpenAI key ending in ...ABCD`.

### Run Agent Page

Route:

- `/agent-instances/:id/run`

Sections:

- Input form or JSON editor.
- Run button.
- Current run status.
- Output panel.
- Logs panel.

### Execution History Page

Route:

- `/agent-instances/:id/history`

Shows:

- Status
- Started time
- Duration
- Input summary
- Error summary
- Link to full run detail

## n8n Integration Plan

### MVP Runtime Option

Run n8n as an internal service in Docker Compose or a managed deployment.

Backend talks to n8n API internally.

Needed operations:

- Import workflow JSON into n8n.
- Inject user credentials or bind saved n8n credentials.
- Execute workflow manually.
- Poll execution status.
- Fetch execution output.

### Workflow Import Strategy

For MVP, create one n8n workflow per user agent instance only when setup is saved.

Flow:

1. User creates agent instance.
2. User enters credentials.
3. Backend decrypts credentials server-side.
4. Backend creates corresponding n8n credentials.
5. Backend imports workflow JSON into n8n.
6. Backend maps workflow credential references to user-specific n8n credential IDs.
7. Backend saves `n8nWorkflowId` on `AgentInstance`.

### Isolation Strategy

MVP:

- Logical isolation by user-specific workflow and credentials.
- Access to n8n is internal only.
- Users never receive n8n API keys.

Future:

- Separate n8n projects/workspaces per tenant if needed.
- Separate execution workers for high-value tenants.

## Security Plan

### Credential Storage

Requirements:

- Encrypt credentials with a server-side encryption key.
- Use authenticated encryption such as AES-256-GCM.
- Store IV and auth tag with encrypted payload.
- Keep encryption key outside git.
- Add `CREDENTIAL_ENCRYPTION_KEY` to backend environment.
- Validate key length at startup.

Never:

- Log secrets.
- Send saved secret values back to frontend.
- Store secrets in workflow JSON in plain text.
- Put credentials into URLs where avoidable.

### Access Control

Rules:

- User can only access their own `AgentInstance`, `UserCredential`, and `AgentExecution`.
- User can only create an instance for an agent they own.
- Admin email can access all agents, but admin access should still be explicit in backend checks.
- Download endpoint should remain restricted.

### Audit Logging

Add audit events for:

- Credential created.
- Credential updated.
- Credential deleted.
- Agent instance created.
- Agent run started.
- Agent run failed.
- Admin access used.

## Execution Worker Plan

Do not run long workflows directly inside API request handlers.

MVP options:

1. Simple database queue
   - `AgentExecution` starts as `QUEUED`.
   - Worker process polls queued rows.
   - Good enough for MVP.

2. Redis/BullMQ
   - Better retries and concurrency.
   - More infrastructure.

Recommended MVP:

- Start with database queue.
- Move to Redis/BullMQ after hosted runs are proven.

Worker responsibilities:

- Claim queued execution.
- Mark as running.
- Call n8n.
- Poll or receive completion.
- Save output/error/logs.
- Mark final status.

## Implementation Phases

### Phase 1: Foundations

Status: Complete on 2026-07-16.

Goal:

Prepare the database, backend structure, and security primitives.

Tasks:

- [x] Add Prisma models: `AgentInstance`, `AgentCredentialRequirement`, `UserCredential`, `AgentInstanceCredential`, `AgentExecution`, `AgentExecutionLog`.
- [x] Add migration.
- [x] Add `CREDENTIAL_ENCRYPTION_KEY` env validation.
- [x] Implement encryption/decryption utility.
- [x] Add ownership helper for purchased/admin agent access.
- [x] Add backend tests for access rules.

Acceptance criteria:

- Backend builds.
- Migrations apply cleanly.
- Credentials can be encrypted/decrypted in tests.
- Users cannot access another user's instance data.

### Phase 2: Credential Requirement Detection

Status: Complete on 2026-07-16.

Goal:

Detect what credentials a workflow needs.

Tasks:

- [x] Parse `Agent.rawJson.nodes`.
- [x] Extract node credential references.
- [x] Map n8n credential types to friendly labels.
- [x] Store detected requirements.
- [x] Add `GET /api/agents/:id/credential-requirements`.
- [x] Add admin refresh endpoint.
- [x] Add seed/backfill script for all agents.

Acceptance criteria:

- Agent detail can show required credential providers.
- Requirements can be refreshed from workflow JSON.
- Detection failures do not break marketplace browsing.

### Phase 3: User Credential Vault

Status: Complete on 2026-07-16.

Goal:

Let users securely save credentials.

Tasks:

- [x] Add credential create/list/update/delete APIs.
- [x] Return safe metadata only.
- [x] Add frontend credential form components.
- [x] Add validation per provider where possible.
- [x] Add masking/label display.

Acceptance criteria:

- User can save an API key.
- API key is encrypted in database.
- API key is never returned by GET endpoints.
- User can link saved credential to an agent instance.

### Phase 4: Agent Instances

Status: Complete on 2026-07-16.

Goal:

Create a user's configured copy of an agent.

Tasks:

- [x] Add create/list/detail/update instance APIs.
- [x] Add setup status calculation.
- [x] Add `Use Agent` button on marketplace detail.
- [x] Add `My Agents` workspace cards.
- [x] Add setup page.
- [x] Add credential linking UI.

Acceptance criteria:

- Owned user can create an agent instance.
- Unowned user cannot create one.
- Admin can create/use any agent.
- Setup page shows missing requirements.
- Instance becomes `READY` when all required credentials are linked.

### Phase 5: n8n Runtime Integration

Goal:

Import configured workflows into n8n and execute them manually.

Tasks:

- Add n8n service client.
- Add n8n env config: base URL, API key, timeout.
- Add internal Docker Compose n8n service for local dev.
- Implement workflow import for an agent instance.
- Implement n8n credential creation/mapping.
- Save `n8nWorkflowId`.
- Add error handling around unsupported nodes.

Acceptance criteria:

- Backend can create a workflow in n8n for a ready instance.
- User-specific credentials are bound to that workflow.
- n8n is not publicly exposed by default.

### Phase 6: Manual Runs

Goal:

Run hosted agents from WebCraft.

Tasks:

- Add `POST /api/agent-instances/:id/runs`.
- Add execution worker.
- Add run status polling endpoint.
- Add output/log storage.
- Add run UI with input editor.
- Add execution detail page.

Acceptance criteria:

- User can run a ready agent.
- Status updates from queued to running to success/failed.
- Output is visible in WebCraft.
- Failed runs show useful error messages.
- Users cannot view others' executions.

### Phase 7: Polish and Reliability

Goal:

Make the hosted execution experience usable and supportable.

Tasks:

- Add retry button for failed runs.
- Add run duration and basic metrics.
- Add admin execution monitor.
- Add rate limits per user.
- Add max execution time.
- Add output size limits.
- Add better empty/error states.
- Add docs for supported/unsupported workflow nodes.

Acceptance criteria:

- System handles bad credentials gracefully.
- Long or failed workflows do not hang API requests.
- Admin can inspect recent failures.

### Phase 8: Production Hardening

Goal:

Prepare hosted agents for real users.

Tasks:

- Move worker to separate process/container.
- Add Redis/BullMQ if database queue becomes limiting.
- Add secret rotation plan.
- Add backup/restore plan for credentials.
- Add monitoring and alerts.
- Add usage metering.
- Add billing hooks.
- Add tenant isolation strategy.
- Add penetration review for credential handling.

Acceptance criteria:

- Production runbook exists.
- Secrets are not exposed in logs or API responses.
- System has basic monitoring.
- Billing/usage limits can prevent abuse.

## Suggested Task Breakdown

### Backend Tasks

- Add Prisma models and migration.
- Add encryption utility.
- Add admin/ownership access helper.
- Add credential requirement parser.
- Add credential vault module.
- Add agent instance module.
- Add execution module.
- Add n8n client module.
- Add worker process.
- Add API tests.

### Frontend Tasks

- Update marketplace detail actions.
- Update My Agents into workspace.
- Build setup page.
- Build credential form components.
- Build run page.
- Build execution detail/history pages.
- Add loading, empty, and error states.
- Add admin-only download visibility.

### DevOps Tasks

- Add n8n service to Docker Compose.
- Add n8n environment documentation.
- Add backend env docs for n8n and encryption.
- Add worker startup command.
- Add health checks.
- Add production deployment notes.

### QA Tasks

- Test user cannot access unowned agent instance.
- Test user cannot download unpurchased agent.
- Test admin can access all agents.
- Test credentials are never returned after save.
- Test workflow setup with missing credentials.
- Test successful run.
- Test failed run with invalid credential.
- Test execution history permissions.

## Risks and Decisions

### Biggest Risks

- n8n workflow compatibility across 1,800 imported workflows.
- Secure credential handling.
- OAuth complexity for providers like Google and Slack.
- Long-running workflow reliability.
- Multi-tenant isolation.
- Cost control for hosted executions.

### Key Decisions Needed

- Should downloads remain available to normal users, or only admin?
- Which workflow types are supported first?
- Which credential providers are supported first?
- Will hosted runs be free in demo mode or metered?
- Should n8n be self-hosted or managed externally?

## Recommended MVP Order

1. Database models and encryption.
2. Agent instances.
3. Credential requirement detection.
4. Credential vault.
5. Setup UI.
6. n8n local integration with one simple workflow.
7. Execution worker.
8. Run/history UI.
9. Expand workflow/provider support.

## First Milestone

Build a thin vertical slice with one supported workflow.

Milestone requirements:

- User claims agent.
- User clicks `Use Agent`.
- User enters one API key.
- WebCraft creates an agent instance.
- WebCraft imports workflow to n8n.
- User runs it from WebCraft.
- User sees output and execution history.

This proves the full platform path before investing in broad workflow compatibility.
