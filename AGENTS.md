# Agent System — Global Rules

> **Read [.omp/MEMORY.md](./.omp/MEMORY.md) first** for project-specific knowledge (tech stack, schema, decisions, commands).
> **Update [.omp/MEMORY.md](./.omp/MEMORY.md)** when you discover something worth documenting.
> **Use MCP Context7** for library docs (Drizzle ORM, Hono, Bun, PostgreSQL).

---

## Architecture — Multi-Team Agent System

3-team system with strict chain of command:

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
|---|---|---|
| **Orchestrator** | `deepseek-v4-pro` | Sole interface to user, delegates to leads, synthesizes results |
| **Planning Lead** | `deepseek-v4-pro` | Architecture planning, delegates to Strategist |
| **Strategist** | `deepseek-v4-flash` | Research, analysis, detailed planning |
| **Engineering Lead** | `deepseek-v4-pro` | Coordinates implementation, delegates to Backend Developer |
| **Backend Developer** | `deepseek-v4-flash` | Writes code, creates files, implements features |
| **QA Lead** | `deepseek-v4-pro` | Coordinates review, delegates to QA/Security |
| **QA Engineer** | `deepseek-v4-flash` | Code review, bug detection, edge cases |
| **Security Reviewer** | `deepseek-v4-flash` | Security audit, vulnerability check |

### Chain of Command

```
Orchestrator → Team Lead → Worker
Worker → Lead → Orchestrator → User
```

- Orchestrator **never** delegates directly to workers
- Leads **must** delegate execution to their workers via `task`
- Only Orchestrator delivers results to the user

### Execution Order

Single feature: `Planning → Engineering → Validation` (sequential).
Multiple independent features: parallel chains.

---

## Plan & Review Convention

- **Plans**: `.omp/plans/<context>/<running-number>.<plan-name>.md`
- **Reviews**: `.omp/reviews/<context>/<running-number>.<review-name>.md`

---

## Graphify Workflow

Use Graphify before implementation, refactoring, or architectural decisions.

### Before Coding

- inspect related modules, schema patterns, repository/service/controller patterns
- inspect foreign key, defaultColumn, index declaration patterns
- inspect naming conventions, pagination/filter conventions
- identify reusable utilities, affected modules

## Lessons Learned Registry

After fixing a bug or hitting a non-trivial gotcha, write a lesson to `.omp/lessons/`.
Read `.omp/lessons/README.md` for the template format.

**Always check existing lessons before debugging** — the fix may already be documented.

### Rules

## TDD — Test-Driven Development (Mandatory)

Every implementation MUST follow TDD cycle:

1. **Write the test first** — It will fail (Red phase)
2. **Write minimal implementation** — Just enough to pass (Green phase)
3. **Refactor if needed** — Clean up without breaking tests (Refactor phase)

Order for each new feature/entity:
1. DTO / Zod schema
2. Test: controller 404, service delegation, repository schema
3. Implementation: repository → service → controller → DI wiring
4. Verify all tests pass before committing

**Tests drive the design, not the other way around.**

## TypeScript Diagnostics — Required After Every Code Change

After creating or modifying any code, run TypeScript diagnostics:

```sh
bunx --bun tsc --noEmit 2>&1 | grep "^src/\|^tests/"
```

Expected: **zero errors** from `src/` and `tests/`.
If any exist, fix them before committing.

Do NOT rely on node_modules errors to be zero — Drizzle ORM has
pre-existing strict-mode type issues with unused drivers (gel,
mysql2, singlestore). Only check `src/` and `tests/`.

- Before creating new patterns: inspect existing ones first via Graphify
- Before refactoring: inspect all dependencies and verify downstream impact
- When implementing new queries: inspect similar existing queries first
- Only introduce new abstractions if no suitable pattern exists

---

## Coding Style

- Descriptive variable names
- Follow existing patterns in the codebase
- Extract complex conditions into meaningful boolean variables
- Interface naming: `<domain>.<layer>.interface.ts` (no `I` prefix)

---

## Git Workflow — Never Auto-Commit

**Do NOT commit unless the user explicitly says "commit" or "commit all changes."**
No auto-commits, no premature commits. Wait for the instruction.

Even if a task is "complete" — tests pass, diagnostics clean — do NOT commit
without being told to.

When instructed, use `commit-context` skill:
- Branch from `develop` / `dev`
- Worktrees inside `.omp/worktree/<worktree-name>`
- Verify files exist in the current worktree before making changes
- Conventional commits (subject ≤50 chars)

---

<!-- AGENTS.md = global operational rules only. Project knowledge (schema, decisions, commands) goes in .omp/MEMORY.md -->
