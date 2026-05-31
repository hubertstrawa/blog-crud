# Blog with Turborepo, NestJS, SQLite and NextJS

Thumbnails are stored in a Supabase bucket

## Docker setup (dev + prod)

This repository has separate Docker images for:

- `apps/api` (NestJS + Prisma + SQLite)
- `apps/web` (Next.js)

### Development mode (hot reload)

Start:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop:

```bash
docker compose -f docker-compose.dev.yml down
```

Live-reload is preserved by bind-mounting the workspace into both containers.

### Newsletter dev stack (RabbitMQ + Mailcatcher)

In development, `docker-compose.dev.yml` also starts:

- RabbitMQ (`amqp://localhost:5672`, management UI at `http://localhost:15672`)
- Mailcatcher (SMTP on `localhost:1025`, inbox UI at `http://localhost:1080`)

API publishes `post.published` events to RabbitMQ and consumes them to send newsletter emails over SMTP.

### Production mode (optimized runtime)

Start:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Stop:

```bash
docker compose -f docker-compose.prod.yml down
```

### SQLite persistence

SQLite is configured to use:

```text
DATABASE_URL=file:/data/dev.db
```

`/data` is backed by a Docker named volume (`api_db`), so DB data survives container restarts and image rebuilds.

If you want to remove data completely:

```bash
docker compose -f docker-compose.dev.yml down -v
# or
docker compose -f docker-compose.prod.yml down -v
```
