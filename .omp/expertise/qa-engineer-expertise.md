# QA Engineer — Expertise

## Project Overview
- **Employee Service** — Backend microservice
- **Tech**: Bun, Hono v4, PostgreSQL, Drizzle ORM
- **Status**: Schema complete, no routes, no tests

## Testing Approach
- Use `bun test` (Bun's built-in test runner)
- Hono provides `hono/testing` utilities
- Drizzle ORM queries testable with testcontainers or mocked client
- Focus on edge cases for employee data (nullable fields, enums, relations)

## Key Areas to Test
- Schema constraints (notNull, enums, foreign keys)
- API endpoint behavior (validation, error handling, status codes)
- Soft-delete behavior (active vs deleted records)
- Cascade delete effects on transaction tables
- UUIDv7 generation and uniqueness

## Known Issues
- No tests exist at all — test infrastructure needs to be set up
- No route modules — all routes inline in `src/index.ts`
- No error handling middleware yet

## Session Log
— (knowledge accumulates here over time)
