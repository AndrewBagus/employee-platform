# Orchestrator — Expertise

## Project Overview
- **Employee Service** — Backend microservice for employee management
- **Monorepo**: `the-journey` monorepo under `backend/employee-service`
- **Runtime**: Bun (hot reload via `--hot`)
- **Framework**: Hono v4 (TypeScript, strict mode)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM (`node-postgres` driver, snake_case casing)
- **Migrations**: drizzle-kit (generate → migrate workflow)
- **Date lib**: Luxon (Asia/Jakarta timezone)

## Architecture
- `.omp/` directory contains the multi-team system configuration
- Three teams: Planning, Engineering, Validation
- Three-tier delegation: Orchestrator → Leads → Workers
- No frontend — backend-only microservice

## Project Structure
```
src/
├── index.ts                  # App entry: Hono instance
└── db/
    ├── index.ts              # DB init
    ├── schema/               # 25 database tables
    ├── utils/
    │   └── default-columns.ts  # Shared audit/soft-delete columns
    └── migrations/           # 7 migration files (0000–0006)
http/
└── employee-service/
    └── check-health.yaml
.commandcode/
    ├── MEMORY.md             # Full project memory reference
    ├── settings.local.json   # Agent config
    └── agents/               # Agent system configs
```

## Team Capabilities
- **Planning Team**: Strategy, research, architecture, specs
- **Engineering Team**: Implementation, coding, testing (backend only)
- **Validation Team**: QA, security review, quality gates

## Schema Patterns
- UUIDv7 primary keys via Bun `randomUUIDv7()`
- Spread audit columns via `...defaultColumn` (sts_active, created_at, created_by, updated_at, updated_by, deleted_at)
- Soft-delete with `sts_active` + `deleted_at`
- Snake_case casing enforced at drizzle config level
- PostgreSQL enums as Drizzle enums
- `.notNull()` unless plan says "allow null"

## Session Log
— (knowledge accumulates here over time)
