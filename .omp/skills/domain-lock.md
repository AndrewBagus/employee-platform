---
name: domain-lock
description: Enforces read/write boundaries for workers. Agents can read anything but only write to their authorized directories.
---

# Domain Lock — Permission Enforcement

Your domain is defined in your frontmatter under `domain`. Respect these boundaries at all times.

## Rules

### Read Access
- You can **read any file** in the project. Context is king — you need the full picture.
- Reading is never restricted.

### Write Access
- You can **ONLY write to directories listed** under `domain.write` in your frontmatter.
- If a directory is not in your write list, **do not create, edit, or delete files there**.

### What Happens If You Step Out of Domain

If you need to write to a file outside your domain:
1. **Stop.** Do not proceed.
2. **Identify** which team/agent owns that domain.
3. **Report** back to your lead: "This requires {agent} to handle."
4. The lead will delegate appropriately.

## Why Domain Locking Matters

- **Specialization** — Each agent builds deep knowledge of their area.
- **Safety** — Backend devs don't accidentally break config files.
- **Accountability** — Each agent owns their domain's quality.
- **Scale** — In large codebases, domain boundaries prevent chaos.

## Example — Employee Service

A Backend Developer can:
- Read `.omp/SYSTEM.md` (for context)
- Write `src/db/schema/employees.ts`
- Write `src/db/migrations/0007_add-index.sql`
- Write `http/employee-service/health.yaml`
- Write `.omp/expertise/backend-dev-expertise.md`
- **NOT** write `.omp/agents/engineering-lead.md` (delegate to Planning/Orchestrator)

A QA Engineer can:
- Read `src/db/schema/employees.ts` (for context)
- Write `.omp/expertise/qa-engineer-expertise.md`
- **NOT** write `src/db/schema/employees.ts` (delegate to Backend Developer via Engineering Lead)
