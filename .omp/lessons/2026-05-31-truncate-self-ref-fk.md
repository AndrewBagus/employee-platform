# Self-referencing FK breaks plain TRUNCATE

**Date:** 2026-05-31
**Context:** Seed system — truncating 25 tables in reverse FK order before seeding
**Symptoms:** `TRUNCATE` on `employees` table failed with:

```
Table "employee_projects" references "employees".
Truncate table "employee_projects" at the same time, or use TRUNCATE ... CASCADE.
```

This happened even though `employee_projects` was already truncated in an earlier group.

## Root Cause

PostgreSQL checks **ALL** FK references when truncating a table — including references from tables that were already truncated earlier in the same transaction/session.

The `employees` table has a **self-referencing FK** (`supervisorId` → `employees.id`), which means truncating `employees` alone always fails without CASCADE.

## Fix

Added `CASCADE` to every TRUNCATE call:

```ts
// Before (broken):
await db.execute(sql`TRUNCATE TABLE ${identifiers} RESTART IDENTITY`);

// After (fixed):
await db.execute(sql`TRUNCATE TABLE ${identifiers} RESTART IDENTITY CASCADE`);
```

CASCADE is harmless because child tables are truncated first (already empty).

## Prevention

1. **Always use CASCADE on TRUNCATE** when there's any FK involvement — self-refs alone are enough to trigger the error.
2. The FK order still matters for CASCADE — truncate children before parents to avoid cascading to unintended tables.
3. Test truncation with a full seed run, not just by truncating one table in isolation.
