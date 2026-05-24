# Employee Service — Project Memory

## Overview

Backend microservice in the `the-journey` monorepo (`backend/employee-service`). Built with **Hono v4** on **Bun**. Manages employee-related data with PostgreSQL via Drizzle ORM.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Runtime | Bun (hot reload via `--hot`) |
| Framework | Hono v4 |
| Language | TypeScript (strict, JSX via `hono/jsx`) |
| Database | PostgreSQL |
| ORM | Drizzle ORM (`node-postgres` driver) |
| Migrations | drizzle-kit |
| Date lib | Luxon |
| Package manager | Bun (`bun.lock`) |

## Project Structure

```
src/
├── index.ts                  # App entry: Hono instance, /health & / routes
└── db/
    ├── index.ts              # DB init: drizzle({connection, casing: snake_case})
    ├── schema/
    │   ├── countries.ts      # countries table
    │   └── companies.ts      # companies table (FK → countries)
    ├── utils/
    │   └── default-columns.ts  # Shared audit/soft-delete columns
    └── migrations/
        ├── 0000_create_countries_table.sql
        └── 0001_create_companies_table.sql
http/
└── employee-service/
    └── check-health.yaml     # Manual API test: GET /health
```

## Schema

### countries
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | UUIDv7 via `randomUUIDv7()` |
| code | varchar(10) | |
| currency | varchar(10) | |
| flag | varchar(100) | |
| + default columns | | Audit/soft-delete |

### companies
| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | UUIDv7 |
| country_id | uuid FK | References countries(id), ON DELETE RESTRICT |
| name | varchar(100) | |
| name_short | varchar(10) | |
| type | companyType enum | GROUP, CLIENT, SUBCON |
| have_worker_employee | boolean | Default false |
| is_ldap | boolean | Default false |
| + default columns | | Audit/soft-delete |

### Shared default columns (spread on every table)
- `sts_active` — boolean, default true (active flag)
- `created_at` — timestamptz, default now()
- `created_by` — varchar(50)
- `updated_at` — timestamptz, auto-update on row change
- `updated_by` — varchar(50)
- `deleted_at` — timestamptz, null = not deleted (soft-delete)

## Key Patterns

1. **UUIDv7 primary keys** — via `randomUUIDv7()` from Bun runtime
2. **Spread audit columns** — `...defaultColumn` shared across all tables
3. **Soft-delete** — `sts_active` flag + `deleted_at` timestamp pattern
4. **snake_case casing** — enforced at drizzle config level, applied automatically
5. **PostgreSQL enums** — defined in schema, migrated as `CREATE TYPE`
6. **No route modules yet** — routes are inline in `src/index.ts` (2 routes only)

## Database Config

- Drizzle Kit: `out=./src/db/migrations`, `schema=./src/db/schema`, `dialect=postgresql`, `casing=snake_case`, `verbose=true`
- Connection: `DATABASE_URL` env var (postgres://user:pass@host:port/dbname)
- DB init file at `src/db/index.ts` — not yet imported by `src/index.ts` (entry has its own inline `drizzle()` call)

## Current Routes

| Method | Path | Response |
|--------|------|----------|
| GET | /health | `{status, timestamp, service}` JSON |
| GET | / | "Hello Hono!" text |

## Available Commands

| Command | Purpose |
|---------|---------|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server with hot reload (port 3000) |
| `bun run generate` | Generate migrations from schema changes |
| `bun run migrate` | Apply pending migrations |
| `bun run studio` | Open Drizzle Studio (port 3123) |

## Documentation Reference

When working with unfamiliar APIs or resolving issues in any of these libraries, use **MCP Context7** to fetch the latest official documentation:

| Library | Context7 Query |
|---------|---------------|
| Drizzle ORM | `mcp__context7__query-docs` with drizzle-orm library ID |
| Hono | `mcp__context7__query-docs` with hono library ID |
| Bun | `mcp__context7__query-docs` with bun library ID |
| PostgreSQL (pg) | `mcp__context7__query-docs` with node-postgres library ID |

Context7 provides up-to-date code snippets and API references directly in the session context, avoiding stale or hallucinated documentation.

## Status

- **Phase**: Early development
- **Tables**: 2 (countries, companies) — no employee table yet
- **Routes**: 2 (health, root)
- **Tests**: None yet

<!-- AGENTS.md = operational content (agents, workflow, git, rules). memory.md = reference content (project context, schema, patterns, knowledge). -->
