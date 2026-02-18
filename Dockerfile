# Stage 1: Build frontend
FROM node:lts-alpine AS frontend-build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html postcss.config.js tailwind.config.js ./
COPY src/ src/
RUN npm run build

# Stage 2: Build backend
FROM node:lts-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci
COPY backend/tsconfig.json ./
COPY backend/src/ src/
COPY backend/prisma/ prisma/
RUN npx prisma generate
RUN npm run build

# Stage 3: Production image
FROM node:lts-alpine
WORKDIR /app

# Install dumb-init for proper signal handling and bash for scripts
RUN apk add --no-cache dumb-init bash

# Copy backend build output and dependencies
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/node_modules ./backend/node_modules
COPY --from=backend-build /app/backend/package.json ./backend/
COPY --from=backend-build /app/backend/prisma ./backend/prisma

# Copy frontend build output (served by backend via @fastify/static)
COPY --from=frontend-build /app/dist ./dist

# Copy the workflow templates ZIP
COPY n8n-workflow-templates-main.zip ./

RUN chown -R node:node /app
USER node

WORKDIR /app/backend

# Health check to ensure app is ready
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["/sbin/dumb-init", "--"]

# Run migrations and start server
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
