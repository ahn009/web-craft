# WebCraft AI Project Completion Plan

This document tracks the remaining work needed to move WebCraft AI from the current working prototype into a cleaner, production-ready marketplace/deployment platform.

## Current Project Summary

WebCraft AI is an AI agent marketplace built around n8n workflow templates.

- Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn UI, Framer Motion, Three.js / React Three Fiber.
- Backend: Node.js, Fastify, Prisma, PostgreSQL, JWT auth, Zod validation.
- Data import: extracts workflow JSON files from `n8n-workflow-templates-main.zip` and imports them as marketplace agents.
- Deployment: Dockerfile builds frontend and backend, then serves frontend static files through the Fastify backend.

## Current Health Check

Last reviewed on 2026-07-14.

- Frontend production build: passes with `npm run build`.
- Backend TypeScript build: passes with `cd backend && npm run build`.
- Lint: fails with 63 errors from frontend and backend files.
- Automated tests: no real unit/integration test framework is configured.
- Manual scripts: `test-api.sh` exists, but it is not aligned with current email verification behavior.
- Git working tree at review time: clean before this documentation file was added.

## Recommended Execution Order

1. Fix lint and project hygiene.
2. Make frontend API configuration production-safe.
3. Finish marketplace purchase/download user flow.
4. Fix auth verification and API test mismatch.
5. Add user account dashboard / My Agents page.
6. Add real payment provider or clearly keep checkout as demo mode.
7. Add automated tests.
8. Harden production config and deployment.
9. Improve performance and bundle splitting.
10. Final QA pass across desktop, mobile, and Docker deployment.

## 1. Fix Lint And Code Hygiene

### Problem

`npm run lint` currently fails. A clean lint result is important before adding more features, otherwise new issues will be hard to separate from existing noise.

### Known Issues

- `backend/dist` is being linted after backend build output exists.
- Backend uses `any` in route error handling and Prisma query helpers.
- Frontend 3D components call `Math.random()` in render/memo paths that React lint rules flag as impure.
- Some pages call hooks such as `useInView` inside callbacks/maps.
- Several shadcn UI files export both components and non-component helpers, triggering Fast Refresh lint warnings.
- `AuthContext` initializes state through synchronous `setState` inside an effect.
- Several auth pages use `catch (err: any)`.
- `MarketplacePage` has an unused `err` catch variable.

### Likely Files

- `eslint.config.js`
- `backend/src/modules/agents/agents.service.ts`
- `backend/src/modules/auth/auth.routes.ts`
- `backend/src/server.ts`
- `src/components/3d/BrainSphere.tsx`
- `src/components/3d/DeploymentScenes.tsx`
- `src/components/3d/ParticleField.tsx`
- `src/pages/product/ChangelogPage.tsx`
- `src/pages/product/FeaturesPage.tsx`
- `src/pages/product/IntegrationsPage.tsx`
- `src/pages/product/PricingPage.tsx`
- `src/contexts/AuthContext.tsx`
- `src/pages/auth/*`
- `src/components/ui/*`

### Acceptance Criteria

- `npm run lint` exits successfully.
- Backend build output such as `backend/dist` is ignored by lint.
- No hook rule violations remain.
- No accidental behavior changes are introduced while fixing lint.

## 2. Make Frontend API URL Configurable

### Problem

Previously, the frontend hardcoded `http://localhost:3000` in multiple places. That works locally but breaks when deployed to a real domain or Docker same-origin setup.

### Current Files

- `src/services/api.ts`
- `src/contexts/AuthContext.tsx`

### Recommended Fix

Create one API base URL helper.

Expected behavior:

- In production Docker/same-origin mode, use relative API paths like `/api`.
- In local split-server development, allow `VITE_API_URL=http://localhost:3000`.
- Keep all auth and marketplace requests using the same helper.

### Acceptance Criteria

- No frontend source file directly hardcodes `http://localhost:3000`.
- `.env.example` documents `VITE_API_URL`.
- Local dev still works with backend on port `3000` and frontend on port `5173`.
- Docker production build works when frontend is served by the backend.

## 3. Finish Marketplace Purchase And Download Flow

### Problem

The backend has purchase and download endpoints, but the frontend detail page only allows testing an agent. Users cannot complete the marketplace journey from browse to buy to download.

### Existing Backend Endpoints

- `POST /api/checkout/:agentId`
- `GET /api/my-agents`
- `GET /api/agents/:id/download`

### Missing Frontend Work

- Add authenticated API helpers:
  - `checkoutAgent(agentId, token)`
  - `fetchMyAgents(token)`
  - `downloadAgent(agentId, token)`
- Add purchase button on the marketplace agent detail page.
- If user is not logged in, direct them to login/register.
- If purchase succeeds, show download button.
- If already purchased, treat it as a valid owned state rather than a hard failure.
- Add clear loading/error/success states.

### Likely Files

- `src/services/api.ts`
- `src/pages/MarketplaceAgentDetailPage.tsx`
- `src/contexts/AuthContext.tsx`
- `src/router.tsx`
- `src/sections/Navbar.tsx`

### Acceptance Criteria

- A logged-out user can view and test an agent but must sign in to purchase/download.
- A logged-in verified user can purchase an agent.
- Purchased agents can be downloaded as JSON.
- Duplicate purchase does not confuse the UI.
- API errors are displayed clearly.

## 4. Fix Auth Verification And API Test Mismatch

### Problem

The backend correctly requires email verification before login. However, `test-api.sh` expects registration/login to immediately return a usable token. That script no longer matches the backend behavior.

### Current Behavior

- `POST /api/auth/register` creates a user and verification token.
- `POST /api/auth/login` fails until `emailVerified` is true.
- Verification link is logged to console when SendGrid is not configured.

### Options

Option A: Update `test-api.sh`.

- Register user.
- Read verification token through a controlled test-only route or database query.
- Verify email.
- Login.

Option B: Add a test-only endpoint.

- Only enabled when `NODE_ENV=test` or `ENABLE_TEST_ROUTES=true`.
- Returns or consumes verification token for test users.
- Must never be enabled in production.

Option C: Split manual tests.

- Keep auth verification manual.
- Make API test script cover only public endpoints unless a verified token is supplied.

### Acceptance Criteria

- `test-api.sh` reflects real auth behavior.
- Test flow can obtain a token without disabling email verification globally.
- Production auth remains secure.

## 5. Add User Dashboard / My Agents Page

### Problem

Backend supports `GET /api/my-agents`, but there is no visible user page for purchased agents.

### Recommended Page

Route: `/my-agents`

Features:

- List purchased agents.
- Show name, category, node count, purchase date, and price paid.
- Download button per agent.
- Empty state with link to Marketplace.
- Protected route behavior for logged-out users.

### Likely Files

- `src/pages/MyAgentsPage.tsx`
- `src/router.tsx`
- `src/sections/Navbar.tsx`
- `src/services/api.ts`

### Acceptance Criteria

- Logged-in users can see their purchased agents.
- Logged-out users are redirected or shown a login prompt.
- Download works from this page.
- Navbar exposes the page for authenticated users.

## 6. Add Real Payments Or Keep Demo Mode Explicit

### Problem

Checkout is currently simulated. That is acceptable for a prototype but not for a real marketplace.

### Production Payment Requirements

If using Stripe or similar:

- Create checkout session endpoint.
- Store pending/completed payment state.
- Verify webhook signatures.
- Create purchase only after confirmed payment.
- Prevent duplicate paid purchases.
- Add receipt/payment history.
- Handle failed/cancelled checkout.
- Add environment variables for payment provider secrets.

### Demo Mode Alternative

If this project is not ready for real payments:

- Rename UI copy to "Claim Demo Access" or "Simulate Purchase".
- Add a clear backend env flag such as `CHECKOUT_MODE=demo`.
- Never imply real money is being charged.

### Acceptance Criteria

- Checkout behavior is honest and unambiguous.
- Production mode cannot create paid purchases without verified payment.
- Demo mode is clearly marked.

## 7. Add Automated Tests

### Problem

There is no proper test suite. Current validation relies on build/lint and shell scripts.

### Backend Tests

Add tests for:

- Agent listing, filtering, sorting, pagination.
- Agent detail and raw JSON parsing.
- Auth registration, verification, login, reset password.
- Purchase and duplicate purchase behavior.
- Download auth/purchase checks.
- ZIP import behavior.

Recommended tools:

- Vitest or Node test runner.
- Fastify inject for HTTP route tests.
- Test database or isolated schema.

### Frontend Tests

Add tests for:

- Marketplace list loading.
- Search/filter UI state.
- Agent detail test/purchase/download states.
- Login/register form errors.
- My Agents empty and populated states.

Recommended tools:

- Vitest.
- React Testing Library.
- Mock Service Worker for API mocks.

### Acceptance Criteria

- `npm run test` exists for frontend.
- `cd backend && npm run test` exists for backend.
- Critical auth/marketplace flows have coverage.
- Tests can run in CI without manual database setup surprises.

## 8. Harden Production Config And Deployment

### Problem

The project has Docker deployment support, but production security/config still needs cleanup.

### Required Work

- Ensure strong `JWT_SECRET` is required in production.
- Confirm `DATABASE_URL` is required and uses PostgreSQL consistently.
- Document all env vars in root and backend examples.
- Configure SendGrid or another email provider for production verification/reset emails.
- Ensure CORS works for the real frontend domain.
- Add production logging/error handling policy.
- Decide whether frontend and backend are deployed together or separately.
- Add CI build steps.

### Likely Files

- `.env.example`
- `backend/.env.example`
- `backend/src/config/env.config.ts`
- `docker-compose.yml`
- `Dockerfile`
- `README.md`

### Acceptance Criteria

- Production refuses unsafe default secrets.
- Setup docs match actual commands.
- Docker deployment can start, migrate, import agents, and serve frontend.
- Health check returns OK after startup.

## 9. Improve Performance And Bundle Size

### Problem

Frontend build passes, but Vite warns about large chunks:

- Main bundle around 672 kB minified.
- React Three Fiber bundle around 875 kB minified.

### Recommended Work

- Lazy-load 3D components only where needed.
- Consider route-level splitting for heavy sections.
- Add manual chunks in Vite config for large vendor groups.
- Reduce unused shadcn UI imports if possible.
- Audit whether all Three.js visual effects are needed on mobile.

### Acceptance Criteria

- Build has fewer or no chunk warnings.
- Homepage still renders correctly.
- 3D assets/components do not block important page content.
- Mobile performance is acceptable.

## 10. Final QA Checklist

### Local Development

- `npm install`
- `npm run dev`
- `cd backend && npm install`
- `cd backend && npx prisma migrate dev`
- `cd backend && npm run dev`

### Build

- `npm run lint`
- `npm run build`
- `cd backend && npm run build`
- frontend tests pass
- backend tests pass

### Docker

- `docker compose build`
- `docker compose up`
- `GET /health` returns OK.
- `GET /api/agents` returns data.
- App opens at `http://localhost:3000`.

### User Flows

- Register.
- Verify email.
- Login.
- Browse marketplace.
- Search/filter marketplace.
- View agent detail.
- Test agent.
- Purchase or simulate purchase.
- Download workflow JSON.
- View My Agents.
- Reset password.
- Logout.

### Responsive QA

- Desktop navigation works.
- Mobile sheet menu works.
- Auth buttons do not overflow.
- Marketplace cards fit on mobile.
- Agent detail JSON preview does not break layout.
- 3D visuals do not hide important content.

## Tracking Table

| Area | Priority | Status |
| --- | --- | --- |
| Lint/code hygiene | High | Completed |
| API URL config | High | Completed |
| Purchase/download UI | High | Not started |
| Auth/test mismatch | High | Not started |
| My Agents page | Medium | Not started |
| Payment provider/demo mode | Medium | Not started |
| Automated tests | Medium | Not started |
| Production config | Medium | Not started |
| Performance optimization | Low | Not started |
| Final QA | High | Not started |

## Step-By-Step Working Notes

Use this section to update progress as work is completed.

### Step 1: Lint And Hygiene

Status: Completed on 2026-07-14.

Notes:

- Generated folders are excluded from ESLint.
- Backend `any` catch/query types were replaced with typed handling.
- Render-time random generation was made deterministic in 3D components.
- Product page hook usage was moved into child components.
- Auth page error handling now uses `unknown` with a shared helper.
- Verified with `npm run lint`, `npm run build`, and `cd backend && npm run build`.

### Step 2: API Configuration

Status: Completed on 2026-07-14.

Notes:

- Added shared API URL helper in `src/config/api.ts`.
- `src/services/api.ts` now uses the shared helper.
- `AuthContext` now reuses auth API service functions instead of duplicating fetch calls.
- `.env.example` and `README.md` document `VITE_API_URL`.
- Default behavior uses same-origin API paths when `VITE_API_URL` is empty.

### Step 3: Marketplace Ownership Flow

Status: Not started.

Notes:

- Add API client helpers first.
- Then update agent detail page.
- Then add My Agents page.

### Step 4: Auth Tests

Status: Not started.

Notes:

- Decide whether to add a test-only route or make the script consume console/database verification token.

### Step 5: Production Readiness

Status: Not started.

Notes:

- Harden env parsing.
- Update README deployment instructions.
- Verify Docker flow.
