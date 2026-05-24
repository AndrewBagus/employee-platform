import { randomUUIDv7 } from "bun";
import { date, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";
import { employees } from "./employees";

export const employeeContracts = pgTable("employee_contracts", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
  startDate: date().notNull(),
  endDate: date().notNull(),
  terminationDate: date().notNull(),
  remark: text(),
  ...defaultColumn,
});
