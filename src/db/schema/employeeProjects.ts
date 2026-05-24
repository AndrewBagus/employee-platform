import { pgEnum, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";
import { employees } from "./employees";
import { projects } from "./projects";

export const employeeProjects = pgTable(
  "employee_projects",
  {
    employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
    projectId: uuid().references(() => projects.id, { onDelete: "restrict" }).notNull(),
    remark: text(),
    ...defaultColumn,
  },
  (table) => [
    primaryKey({ columns: [table.employeeId, table.projectId] }),
  ],
);
