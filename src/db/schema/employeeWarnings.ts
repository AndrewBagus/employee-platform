import { randomUUIDv7 } from "bun";
import { date, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";
import { employees } from "./employees";

export const warningStatus = pgEnum("warning_status", ["PERMANENT", "TEMPORARY"]);

export const employeeWarnings = pgTable("employee_warnings", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
  warningStartDate: date().notNull(),
  warningEndDate: date(),
  warningStatus: warningStatus(),
  remark: text(),
  ...defaultColumn,
});
