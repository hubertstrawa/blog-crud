# syntax=docker/dockerfile:1.7

FROM node:22-bookworm-slim AS deps
WORKDIR /workspace
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
COPY apps/api/package*.json apps/api/
COPY packages packages
RUN npm ci

FROM deps AS dev
ENV NODE_ENV=development
WORKDIR /workspace
COPY . .
CMD ["sh", "-c", "export DATABASE_URL=${DATABASE_URL:-file:/data/dev.db} && npx prisma generate --schema apps/api/prisma/schema.prisma --config apps/api/prisma.config.ts && npx prisma migrate deploy --schema apps/api/prisma/schema.prisma --config apps/api/prisma.config.ts && npm run --workspace api dev"]

FROM deps AS builder
ENV NODE_ENV=production
WORKDIR /workspace
COPY . .
RUN npx prisma generate --schema apps/api/prisma/schema.prisma
RUN npm run --workspace api build

FROM node:22-bookworm-slim AS prod
ENV NODE_ENV=production
WORKDIR /workspace
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY apps/api/package*.json apps/api/
COPY packages packages
RUN npm ci --omit=dev

COPY --from=builder /workspace/apps/api/dist apps/api/dist
COPY --from=builder /workspace/apps/api/prisma apps/api/prisma
COPY --from=builder /workspace/apps/api/generated apps/api/generated

RUN mkdir -p /data
EXPOSE 8000

CMD ["sh", "-c", "export DATABASE_URL=${DATABASE_URL:-file:/data/dev.db} && npx prisma migrate deploy --schema apps/api/prisma/schema.prisma --config apps/api/prisma.config.ts && node apps/api/dist/main"]
