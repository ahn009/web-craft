# WebCraft AI

An AI agent marketplace and deployment platform. Browse, test, and deploy AI agents built from real n8n workflows.

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router v6
- Three.js / React Three Fiber (3D visuals)

**Backend**
- Node.js + Fastify
- Prisma ORM
- PostgreSQL
- JWT authentication
- Zod validation

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Backend Setup

```bash
cd backend
cp .env.example .env   # Configure DATABASE_URL, JWT_SECRET
npm install
npx prisma migrate dev
npm run dev             # Starts on http://localhost:3000
```

To run `test-api.sh`, start the backend with `ENABLE_TEST_ROUTES=true` and `NODE_ENV` set to `development` or `test`. The test-only verification endpoint is disabled in production.

### Frontend Setup

```bash
npm install
cp .env.example .env   # Optional: set VITE_API_URL=http://localhost:3000 for split dev
npm run dev             # Starts on http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/agents` | List agents (paginated, filterable) |
| GET | `/api/agents/categories` | Get all categories |
| GET | `/api/agents/:id` | Get agent details |
| POST | `/api/agents/:id/test` | Simulate agent test run |
| GET | `/api/agents/:id/download` | Download agent JSON (auth required) |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |

### Query Parameters for `GET /api/agents`

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 20 | Items per page (max 100) |
| search | string | - | Search by name/description |
| category | string | - | Filter by category |
| tag | string | - | Filter by tag |
| sort | string | newest | `newest`, `price_asc`, `price_desc`, `name_asc` |

## Environment Variables

### Backend (`backend/.env`)

```
DATABASE_URL=postgresql://user:password@localhost:5432/webcraft
JWT_SECRET=your-secret-key
PORT=3000
```

### Frontend (`.env`)

```
VITE_API_URL=http://localhost:3000
```

If the frontend is served by the backend in Docker/production, leave `VITE_API_URL` empty so requests use the same origin.

## Project Structure

```
├── src/                    # Frontend source
│   ├── components/         # Reusable UI components
│   ├── lib/                # Static data and utilities
│   ├── pages/              # Route pages
│   ├── sections/           # Homepage sections
│   ├── services/           # API service layer
│   └── types/              # TypeScript types
├── backend/                # Backend source
│   └── src/
│       ├── modules/        # Feature modules (agents, auth, purchases)
│       ├── plugins/        # Fastify plugins (prisma, cors, auth)
│       ├── services/       # Shared services
│       └── server.ts       # Entry point
└── public/                 # Static assets
```
