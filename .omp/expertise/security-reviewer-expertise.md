# Security Reviewer — Expertise

## Project Overview
- **Employee Service** — Backend microservice handling employee PII
- **Tech**: Bun, Hono v4, PostgreSQL, Drizzle ORM
- **Status**: Schema complete, no auth, no routes

## Security Focus Areas

### Employee Data Protection
- PII fields: names, addresses, contracts, medical checkups, warnings
- Sensitive employment data: salary (allowances), contracts, disciplinary records
- Data classification needed before production

### Authentication & Authorization
- None implemented yet — needs design
- Consider JWT, session-based, or API key patterns
- Role-based access for HR functions

### API Security
- Input validation
- Rate limiting
- CORS configuration
- SQL injection prevention (Drizzle ORM parameterized by default, but raw SQL risk)

### Dependency Security
- Bun package ecosystem
- `bun audit` for vulnerability scanning
- Drizzle ORM, Hono, Luxon dependency chains

### Infrastructure Security
- DATABASE_URL connection string management
- Environment variable handling
- HTTPS enforcement

## Common Vulnerabilities to Check
- SQL injection through raw queries or `sql` template tags
- Mass assignment through request body (DTOs/validation needed)
- PII leakage in error responses
- Insecure direct object references (IDOR) on employee endpoints
- Missing access controls on sensitive endpoints

## Session Log
— (knowledge accumulates here over time)
