# Validation Lead — Expertise

## Project Overview
- **Employee Service** — Backend microservice
- **Tech**: Bun, Hono v4, PostgreSQL, Drizzle ORM
- **Phase**: Schema done, no API routes yet

## Quality Standards
- Code correctness and edge cases
- Security best practices
- Documentation completeness
- Requirements traceability

## Known Patterns
- QA Engineer handles functional testing and edge cases
- Security Reviewer handles vulnerability assessment
- Validation should catch issues before they reach production

## Testing Context
- No tests exist yet in the project
- Bun's built-in test runner (`bun test`)
- Drizzle ORM works with testcontainers or mocked db
- Hono has testing utilities (`hono/testing`)

## Security Context
- No authentication/authorization implemented yet
- PII in employee records (names, addresses, contracts)
- DATABASE_URL connection string management
- SQL injection surface through raw queries

## Session Log
— (knowledge accumulates here over time)
