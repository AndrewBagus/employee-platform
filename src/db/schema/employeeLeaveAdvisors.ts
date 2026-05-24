import { randomUUIDv7 } from "bun";
import { pgTable, smallint, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";
import { employees } from "./employees";

export const employeeLeaveAdvisors = pgTable("employee_leave_advisors", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
  order: smallint().notNull(),
  remark: text(),
  ...defaultColumn,
});
