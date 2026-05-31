# Planning Lead — Expertise

## Project Overview
- **Employee Service** — Backend microservice in `the-journey` monorepo
- Phase: Schema complete (25 tables), API routes not yet built
- Team: 1 backend engineer, 0 frontend (pure backend)

## Architecture Patterns
- Hono v4 framework with TypeScript
- Drizzle ORM with PostgreSQL (snake_case, UUIDv7 PKs)
- Soft-delete and audit columns on all tables
- Routes currently inline in `src/index.ts` — refactor to route modules needed

## Schema Overview
- **Master tables** (15): countries, companies, departments, positions, religion, costCenters, grades, projects, allowances, warningGrades, warnings, trainingTypes, trainings, trainingSchedules, workingZones
- **Employee master**: employees (25 columns, 4 enums, self-ref supervisorId)
- **Transaction tables** (9): employeeAddresses, employeeContracts, employeeContractAdvisors, employeeLeaveAdvisors, employeeProjects, employeeMcus, employeeWarnings, employeeTrainings, employeeWorkZones

## Known Approaches
- Plans should be structured and actionable
- Delegate research to Strategist for deep dives
- Session log in `.omp/sessions/` for cross-agent awareness
- Always read `.commandcode/MEMORY.md` for full project context

## Session Log
— (knowledge accumulates here over time)
