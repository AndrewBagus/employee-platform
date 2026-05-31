# Employee Service — Project Memory

**Last schema migration:** `0006_fix-remark-nullable.sql` (25 tables total)

---

## Overview

Backend microservice in the `the-journey` monorepo (`backend/employee-service`). Manages employee-related data with PostgreSQL via Drizzle ORM.

## Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Bun (hot reload via `--hot`) |
| Framework | Hono v4 |
| Language | TypeScript (strict) |
| Database | PostgreSQL |
| ORM | Drizzle ORM (`node-postgres` driver) |
| DI | Inversify (decorators) |
| Migrations | drizzle-kit |
| Date lib | Luxon (Asia/Jakarta tz) |
| Package manager | Bun (`bun.lock`) |

## Architecture Decisions & Patterns

| Decision | Choice | Rationale |
|---|---|---|
| **Primary key** | UUIDv7 via `randomUUIDv7()` | Monorepo-safe, no sequential guessing, sortable by time |
| **Audit columns** | Spread `...defaultColumn` on every table | Consistency, no repetition, soft-delete built-in |
| **Soft-delete** | `stsActive` bool + `deletedAt` timestamp | Non-destructive, recoverable, filterable |
| **Casing** | `snake_case` at drizzle config | PostgreSQL convention, auto-transformed by ORM |
| **Enums** | PostgreSQL `CREATE TYPE` | Type safety at DB level, Drizzle schema support |
| **Not null rule** | Columns are `.notNull()` unless explicitly nullable | Catch data issues early; `remark` and enum cols are nullable |
| **Architecture pattern** | Controller → Service → Repository | Separation of concerns, DI via Inversify |
| **Controller pattern** | Hono sub-app (`new Hono()`) per domain | Follows reference project layout, app.route() registration |
| **Interface naming** | `<domain>.<layer>.interface.ts` (no `I` prefix) | Co-located with implementation, consistent with ref project |

## Database Config

- Drizzle Kit: `out=./src/db/migrations`, `schema=./src/db/schema`, `dialect=postgresql`, `casing=snake_case`, `verbose=true`
- Connection: `DATABASE_URL` env var
- DB init: `src/db/index.ts` via `drizzle({ connection, casing })`

## Seed System

- Location: `src/db/seed/` (10 files)
- Truncates all 25 tables before seeding (reverse FK order, via CASCADE for self-refs)
- Uses hardcoded UUIDv7 strings for deterministic FK references across runs
- English-themed data: Premier Corporation, Summit Global Solutions, Apex Engineering
- Run: `bun run seed`

## Routes

| Method | Path | Handler |
|---|---|---|
| GET | `/health` | Inline — status + timestamp + service |
| GET | `/` | Inline — "Hello Hono!" |
| GET | `/companies` | `company.controller.ts` via DI |

## Migration Status

| # | Name | Status |
|---|---|---|
| 0000 | Create countries table | Applied |
| 0001 | Create companies table | Applied |
| 0002 | (magenta_ultimo) | Applied |
| 0003 | Positions | Applied |
| 0004-0005 | All master/transaction tables | Applied |
| 0006 | Fix remark nullable | Applied |

## Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Start dev server with hot reload (port 3000) |
| `bun run seed` | Seed database (truncate + insert) |
| `bun run generate` | Generate migrations from schema changes |
| `bun run migrate` | Apply pending migrations |
| `bun run studio` | Open Drizzle Studio (port 3123) |

## Inter-Service Context

Part of `the-journey` monorepo.

| Service | Location |
|---|---|
| employee-service | `backend/employee-service` |

## Documentation Reference

Use **MCP Context7** for library docs:

| Library |
|---|
| Drizzle ORM |
| Hono |
| Bun |
| PostgreSQL / node-postgres |

## Status

- **Phase**: Schema complete. Companies endpoint implemented. More routes pending.
- **Tables**: 25
- **Routes**: 3
- **Tests**: None yet

<!-- Authoritative for business rules, decisions, and project setup. Use Graphify for file structure and schema details. -->
