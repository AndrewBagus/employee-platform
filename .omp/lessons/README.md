# .omp/lessons/ — Lessons Learned

Drop a file here after fixing a bug, hitting a gotcha, or discovering a
pitfall so no agent repeats the same mistake.

## When to write

- You fixed a bug that cost >5 minutes to debug
- You hit a surprising framework/ORM behavior
- You discovered a concurrency, ordering, or edge-case issue
- You made a wrong assumption that led to rework

## Format

Filename: `<date>-<short-description>.md`

```
2026-06-01-inversify-import-type.md
2026-06-01-truncate-self-ref-fk.md
```

Content template:

```md
# <title>

**Date:** YYYY-MM-DD
**Context:** What were you working on? (feature, bug, refactor)
**Symptoms:** What went wrong? (error message, wrong behavior)

## Root Cause

Why it happened. Be specific — code snippets help.

## Fix

What you changed. Link to the commit or file if relevant.

## Prevention

How to avoid this in the future. Checklist item, lint rule,
pattern change, test, etc.
```

## Example

```md
# Self-referencing FK breaks plain TRUNCATE

**Date:** 2026-05-31
**Context:** Seed system — truncating all 25 tables before seeding
**Symptoms:** TRUNCATE on employees table failed with:
  "Table employee_projects references employees"

## Root Cause

PostgreSQL checks ALL FK references at TRUNCATE time, even if the
referencing table was already emptied in an earlier TRUNCATE group.
Additionally, employees has a self-referencing FK (supervisorId).

## Fix

Added CASCADE to every TRUNCATE call. Since child tables are
truncated first, cascading to already-empty tables is harmless.

## Prevention

Always use CASCADE on TRUNCATE when any FK involvement exists,
even simple self-refs. Document in the seed system pattern.
```
