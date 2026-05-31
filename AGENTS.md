# Agent System

> **Read [.omp/MEMORY.md](./.omp/MEMORY.md) first** — it contains the full architecture, schema details, patterns, and workflows for this project.
> **Update [.omp/MEMORY.md](./.omp/MEMORY.md)** as the codebase grows or whenever you discover something worth documenting.
> **Use MCP Context7** to fetch latest documentation for Drizzle ORM, Hono, Bun, and PostgreSQL when working with unfamiliar APIs or resolving issues.

## Project Overview

See @README.md for project overview and @package.json for available bun/bunx commands for this project.

## Architecture — Multi-Team Agent System

This project uses a **3-team agent system** with strict chain of command:

```
                      ┌── User ──┐
                      └────┬─────┘
                           │
                     Orchestrator
                    /       |       \
              Planning   Engineering  Validation
                 │           │           │
             Strategist  Backend Dev  QA + Security
```

### Roles & Models

| Role | Model | Responsibility |
|------|-------|----------------|
| **Orchestrator** | `deepseek-v4-pro` | Sole interface to user, delegates to leads, synthesizes results |
| **Planning Lead** | `deepseek-v4-pro` | Architecture planning, delegates to Strategist |
| **Strategist** | `deepseek-v4-flash` | Research, analysis, detailed planning |
| **Engineering Lead** | `deepseek-v4-pro` | Coordinates implementation, delegates to Backend Developer |
| **Backend Developer** | `deepseek-v4-flash` | Writes code, creates files, implements features |
| **Validation Lead** | `deepseek-v4-pro` | Coordinates review, delegates to QA/Security |
| **QA Engineer** | `deepseek-v4-flash` | Code review, bug detection, edge cases |
| **Security Reviewer** | `deepseek-v4-flash` | Security audit, vulnerability check |

### Chain of Command (Strict)

```
Orchestrator → Team Lead → Worker
```

- Orchestrator **never** delegates directly to workers
- Leads **must** delegate execution to their workers via `task`
- Leads review worker output and report back to Orchestrator
- Only Orchestrator delivers results to the user

### Feedback Flow

```
Worker → Lead → Orchestrator → User
```

No agent communicates with the user except the Orchestrator.

### Execution Order (Single Feature)

```
Planning ──> Engineering ──> Validation  (sequential)
           (parallel across teams where possible)
```

- Planning must finish before Engineering starts (needs the spec)
- Engineering must finish before Validation starts (needs code to review)
- Engineering Lead and Validation Lead can overlap after Planning completes

## Project Structure

```
src/
├── index.ts                      # App entry, route registration via app.route()
├── controllers/                  # Flat Hono sub-app controllers
│   └── company.controller.ts
├── services/                     # Domain subdirectories
│   └── company/
│       ├── company.service.ts
│       └── company.service.interface.ts
├── repositories/                 # Domain subdirectories
│   └── company/
│       ├── company.repository.ts
│       └── company.repository.interface.ts
├── cores/                        # DI infrastructure
│   ├── container.ts              # Inversify Container
│   └── types.ts                  # TYPES symbols
├── dtos/                         # Data transfer objects (flat)
│   └── company.dto.ts
└── db/
    ├── index.ts                  # DB init
    ├── schema/                   # 25 table definitions
    ├── migrations/               # 7 migration files
    ├── seed/                     # Seed system (10 files)
    └── utils/
        └── default-columns.ts
```

## Project Context — Employee Service

- **Runtime**: Bun (hot reload via `--hot`)
- **Framework**: Hono v4 (TypeScript, strict mode)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM (`node-postgres` driver, snake_case casing)
- **DI**: Inversify (decorators, container in `cores/`)
- **Migrations**: drizzle-kit (generate → migrate workflow)
- **Date lib**: Luxon (Asia/Jakarta timezone)
- **No frontend**: Backend microservice only

## Plan & Review File Convention

All plans and reviews are stored under `.omp/`:

- **Plans**: `.omp/plans/<context>/<running-number>.<plan-name>.md`
- **Reviews**: `.omp/reviews/<context>/<running-number>.<review-name>.md`

Context is kebab-case (e.g. `companies-endpoint`, `seed-architecture`).
Running numbers zero-padded (e.g. `01`, `02`).

```
.omp/plans/companies-endpoint/01.companies-di-plan.md
.omp/reviews/companies-endpoint/01.companies-di-review.md
```

## Graphify Workflow

Use Graphify before implementation, refactoring, or architectural decisions to inspect the existing codebase structure and patterns.

### Before Coding

Always use Graphify to:

- inspect related modules and dependencies
- inspect schema structure patterns
- inspect repository/service/controller patterns
- inspect foreign key declaration patterns
- inspect defaultColumn usage
- inspect index declaration patterns
- inspect pagination/filter/query conventions
- inspect naming conventions (singular/plural, DTOs, services, routes)
- identify reusable utilities before creating new abstractions
- identify affected modules before refactor

### Graphify Goals

Graphify should help to:

- reduce unnecessary context loading
- reuse existing project patterns
- avoid duplicate abstractions
- maintain architectural consistency
- understand module relationships before implementation
- minimize hallucinated implementations

### Implementation Rules

Before creating new patterns:

1. inspect existing implementation with Graphify
2. reuse existing conventions whenever possible
3. only introduce new abstractions if no suitable pattern exists
4. follow current architecture and naming consistency

### Refactor Rules

Before refactoring:

- inspect all related dependencies
- identify affected services/routes/schema
- inspect shared utilities usage
- verify downstream impact before modification

### Query Investigation

When implementing new queries:

- inspect similar existing queries first
- inspect pagination/filter patterns
- inspect response DTO patterns
- inspect repository query structure
- inspect indexing and relation patterns

### Notes

Graphify provides structural understanding of the codebase.

Use:

- MEMORY.md for business rules and architecture decisions
- Graphify for code relationships and implementation patterns
- taste-1 for coding style consistency

## Coding Style

- Use descriptive variable names
- Follow existing patterns in the codebase
- Extract complex conditions into meaningful boolean variables
- Interface naming: `<domain>.<layer>.interface.ts` (e.g. `company.service.interface.ts`)
- No `I` prefix on interfaces — suffix `.interface.ts` on filename

## Git Workflow

- Branch from `develop` (or `dev`)
- Create git worktrees inside `.omp/worktree/<worktree-name>`
- Worktree name matches branch name
- Don't commit without instruction
- Verify new/updated files exist inside the current worktree directory
- Commit using `commit-context` skill with conventional commits (subject ≤50 chars)

## Commands

| Command | Purpose |
|---------|---------|
| `bun run dev` | Start dev server with hot reload (port 3000) |
| `bun run seed` | Seed database (truncate + insert) |
| `bun run generate` | Generate migrations from schema changes |
| `bun run migrate` | Apply pending migrations |
| `bun run studio` | Open Drizzle Studio (port 3123) |

<!-- AGENTS.md = operational content (agents, workflow, git, rules). MEMORY.md = reference content (project context, schema, patterns, knowledge). -->
