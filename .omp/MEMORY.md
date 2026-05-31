# Employee Service — Project Memory

**Last schema migration:** `0006_fix-remark-nullable.sql` (25 tables total)

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
    ├── schema/               # 25 tables total
    │   ├── countries.ts      # Master — countries list
    │   ├── companies.ts      # Master — companies (enum: GROUP/CLIENT/SUBCON)
    │   ├── departments.ts    # Master — departments (FK → companies)
    │   ├── positions.ts      # Master — positions (FK → departments, isHod flag)
    │   ├── religion.ts       # Master — religion
    │   ├── costCenters.ts    # Master — cost centers (sapCode)
    │   ├── grades.ts         # Master — grade names
    │   ├── projects.ts       # Master — projects (sapCode)
    │   ├── allowances.ts     # Master — allowances (FK → companies, countries, nominal)
    │   ├── warningGrades.ts  # Master — warning grade definitions (FK → companies)
    │   ├── warnings.ts       # Master — warning definitions (FK → companies, warningGrades)
    │   ├── trainingTypes.ts  # Master — training type (FK → companies)
    │   ├── trainings.ts      # Master — training offering (FK → companies)
    │   ├── trainingSchedules.ts # Master — training schedule (FK → companies)
    │   ├── workingZones.ts   # Master — working zone (FK → companies)
    │   ├── employees.ts      # Employee master — core employee data (4 enums, self-ref supervisorId)
    │   ├── employeeAddresses.ts    # Transaction — employee addresses
    │   ├── employeeContracts.ts    # Transaction — employee contracts
    │   ├── employeeContractAdvisors.ts # Transaction — contract advisors (order)
    │   ├── employeeLeaveAdvisors.ts    # Transaction — leave advisors (order)
    │   ├── employeeProjects.ts   # Transaction — employee-project assignments (composite PK)
    │   ├── employeeMcus.ts       # Transaction — medical checkups
    │   ├── employeeWarnings.ts   # Transaction — employee warnings
    │   ├── employeeTrainings.ts  # Transaction — employee training records
    │   └── employeeWorkZones.ts  # Transaction — employee work zone assignments
    ├── utils/
    │   └── default-columns.ts  # Shared audit/soft-delete columns
    └── migrations/             # 7 migration files (0000–0006)
http/
└── employee-service/
    └── check-health.yaml     # Manual API test: GET /health
```

## Schema

Current tables grouped by type. All tables use UUIDv7 PK + `...defaultColumn` unless noted.

### Master Tables
| Table | FKs | Notable columns |
|-------|-----|-----------------|
| countries | — | code(10), currency(10), flag(100) |
| companies | countries | name(100), nameShort(10), type(enum), haveWorkerEmployee, isLdap |
| departments | companies | name(100) |
| positions | departments | name(100), isHod(bool) |
| religion | — | name(20), description(255) |
| costCenters | — | sapCode(15), name(255) |
| grades | — | name(15) |
| projects | — | sapCode(15), name(255) |
| allowances | companies, countries | name(255), nominal(12,2) |
| warningGrades | companies | name(255) |
| warnings | companies, warningGrades | name(255) |
| trainingTypes | companies | name(255) |
| trainings | companies | name(255) |
| trainingSchedules | companies | trainingDate(date), trainingTime(time) |
| workingZones | companies | name(255) |

### Employee Master
- **employees** — 25 columns. FKs: companies, departments, positions. Self-ref: supervisorId. Enums: gender(M/W), maritalStatus(SINGLE/MARRIED/DIVORCED), employeeType(STAFF/WORKER), employeeStatus(PERMANENT/CONTRACT). Nullable: supervisorId, middleName, lastName, phone, mobile, birthDate, birthPlace.

### Transaction Tables
| Table | FKs | Notable |
|-------|-----|---------|
| employeeAddresses | employees | address(text) |
| employeeContracts | employees | startDate, endDate, terminationDate |
| employeeContractAdvisors | employees | order(smallint) |
| employeeLeaveAdvisors | employees | order(smallint) |
| employeeProjects | employees, projects | **Composite PK** (employeeId + projectId), no id column |
| employeeMcus | employees | mcuDate, mcuEndDate, mcuStatus(enum PASS/FAILED) |
| employeeWarnings | employees | warningStartDate, warningEndDate, warningStatus(enum PERMANENT/TEMPORARY) |
| employeeTrainings | employees | trainingDate, trainingStatus(enum PASS/FAILED/REGISTERED/NOTATTEND, default REGISTERED) |
| employeeWorkZones | employees, workingZones | |

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
6. **`.notNull()` rule** — columns are `.notNull()` unless plan says "allow null"; enum columns and `remark` are always nullable
7. **No route modules yet** — routes are inline in `src/index.ts` (2 routes only)

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

## Inter-Service Context

Part of the `the-journey` monorepo. Other services in the monorepo:

| Service | Location | Description |
|---------|----------|-------------|
| employee-service | `backend/employee-service` | (this service) |

This section should be updated as other services are discovered or added to the monorepo.

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

- **Phase**: Schema complete (25 tables). No API routes built yet beyond health check.
- **Tables**: 25 (4 existing + 21 new)
- **Routes**: 2 (health, root)
- **Tests**: None yet

<!-- AGENTS.md = operational content (agents, workflow, git, rules). MEMORY.md = reference content (project context, schema, patterns, knowledge). -->
