# Engineering Lead — Expertise

## Project Overview
- **Employee Service** — Backend microservice (Bun + Hono v4 + Drizzle ORM)
- 25 database tables, 7 migrations, schema complete
- No API routes yet beyond health check

## Tech Stack
| Layer | Choice |
|-------|--------|
| Runtime | Bun (hot reload via `--hot`) |
| Framework | Hono v4 |
| Language | TypeScript (strict) |
| Database | PostgreSQL |
| ORM | Drizzle ORM (`node-postgres` driver) |
| Migrations | drizzle-kit |
| Date lib | Luxon |

## Project Structure
```
src/
├── index.ts              # App entry, inline routes (2 routes: /health, /)
└── db/
    ├── index.ts          # DB init: drizzle({connection, casing: snake_case})
    ├── schema/           # 25 table schemas
    │   ├── countries.ts  # Master tables (countries, companies, departments, positions...)
    │   ├── employees.ts  # Employee master (25 columns, 4 enums, self-ref supervisorId)
    │   ├── employeeAddresses.ts  # Transaction tables
    │   └── ...
    ├── utils/
    │   └── default-columns.ts
    └── migrations/       # 0000–0006 (25 tables)
http/
└── employee-service/
    └── check-health.yaml
```

## Key Patterns
- UUIDv7 primary keys
- Spread `...defaultColumn` for audit columns (6 columns)
- Soft-delete: `sts_active` flag + `deleted_at` timestamp
- snake_case casing auto-applied at drizzle config
- PostgreSQL enums for status fields
- Composite primary keys for join tables (employeeProjects)
- Foreign keys cascade on delete for transaction tables

## Domain Knowledge
- Backend Developer handles all implementation
- Write access: src/, src/db/, src/db/schema/, src/db/migrations/, http/
- Always read MEMORY.md for full schema context before delegating
- No tests exist yet — test setup needed

## Session Log
— (knowledge accumulates here over time)
