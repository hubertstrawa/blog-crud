# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS deps
WORKDIR /workspace
COPY package*.json ./
COPY apps/web/package*.json apps/web/
COPY packages packages
RUN npm ci

FROM deps AS dev
ENV NODE_ENV=development
WORKDIR /workspace
COPY . .
EXPOSE 3000
CMD ["npm", "run", "--workspace", "web", "dev"]

FROM deps AS builder
ENV NODE_ENV=production
WORKDIR /workspace
COPY . .
RUN npm run --workspace web build

FROM node:22-bookworm-slim AS prod
ENV NODE_ENV=production
WORKDIR /workspace

COPY --from=builder /workspace/apps/web/.next/standalone ./
COPY --from=builder /workspace/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /workspace/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]
