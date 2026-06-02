import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";

/**
 * Truncation groups in reverse FK order (children before parents).
 * Within each group, tables have no cross-FK references so ordering
 * among them is arbitrary. All sequences are restarted.
 */
const TRUNCATE_GROUPS: string[][] = [
  // 1 — Employee details (FK to employees, projects, workingZones)
  [
    "employee_addresses",
    "employee_contracts",
    "employee_contract_advisors",
    "employee_leave_advisors",
    "employee_mcus",
    "employee_projects",
    "employee_trainings",
    "employee_warnings",
    "employee_work_zones",
  ],
  // 2 — Employees (FK to companies, departments, positions; self-ref supervisorId)
  ["employees"],
  // 3 — Warnings (FK to companies, warningGrades)
  ["warnings"],
  // 4 — Allowances (FK to companies, countries)
  ["allowances"],
  // 5 — Positions (FK to departments)
  ["positions"],
  // 6 — Company children (all FK to companies)
  [
    "departments",
    "working_zones",
    "training_types",
    "trainings",
    "training_schedules",
    "warning_grades",
  ],
  // 7 — Companies (FK to countries)
  ["companies"],
  // 8 — Root master (no FK dependencies)
  ["countries", "religion", "grades", "cost_centers", "projects"],
];

/**
 * Truncates all tables in reverse FK order (children before parents).
 * CASCADE handles self-referencing FKs (e.g. employees.supervisorId) and
 * ensures PostgreSQL doesn't complain about cross-group FK references
 * even when the referencing table has already been emptied.
 */
export async function truncateAll(db: NodePgDatabase): Promise<void> {
  for (const group of TRUNCATE_GROUPS) {
    const identifiers = group.map((t) => sql.identifier(t));
    await db.execute(
      sql`TRUNCATE TABLE ${sql.join(identifiers, sql`, `)} RESTART IDENTITY CASCADE`,
    );
  }
}
