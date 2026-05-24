import { randomUUIDv7 } from "bun";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";
import { employees } from "./employees";

export const employeeAddresses = pgTable("employee_addresses", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
  address: text().notNull(),
  remark: text(),
  ...defaultColumn,
});
