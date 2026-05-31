# Backend Developer — Expertise

## Project Overview
- **Employee Service** — Backend microservice for employee management
- **Monorepo**: `the-journey` monorepo, `backend/employee-service`

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Runtime | Bun (hot reload via `--hot`) |
| Framework | Hono v4 |
| Language | TypeScript (strict) |
| Database | PostgreSQL |
| ORM | Drizzle ORM (`node-postgres` driver) |
| Migrations | drizzle-kit |
| Date lib | Luxon (Asia/Jakarta timezone) |

## Project Structure
- `src/index.ts` — App entry (Hono instance, routes)
- `src/db/index.ts` — DB init (drizzle with snake_case casing)
- `src/db/schema/` — 25 table schemas
- `src/db/utils/default-columns.ts` — Shared audit/soft-delete columns
- `src/db/migrations/` — Migration files
- `http/employee-service/` — API specs
- `.commandcode/MEMORY.md` — Full project memory reference

## Key Patterns
- UUIDv7 primary keys via `Bun.randomUUIDv7()`
- Spread `...defaultColumn` on every table (6 audit columns)
- Soft-delete: `sts_active` boolean + `deleted_at` timestamptz
- Snake_case casing enforced at drizzle config — write camelCase in schema
- PostgreSQL enums defined in schema, migrated as `CREATE TYPE`
- `.notNull()` is default; only nullable if plan explicitly says so
- Foreign keys cascade on delete for transaction tables
- Composite primary keys for join tables (employeeProjects: employeeId + projectId)

## Available Commands
- `bun run dev` — Start dev server with hot reload
- `bun run generate` — Generate migrations
- `bun run migrate` — Apply migrations
- `bun studio` — Open Drizzle Studio

## Domain Knowledge
- Write access: src/, src/db/, src/db/schema/, src/db/migrations/, http/
- Always check existing code before writing new code
- Read `.commandcode/MEMORY.md` at start for full context
- Report issues through Engineering Lead

## Session Log
— (knowledge accumulates here over time)
