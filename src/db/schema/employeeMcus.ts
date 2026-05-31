import { randomUUIDv7 } from "bun";
import { date, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { employees } from "./employees";

export const mcuStatus = pgEnum("mcu_status", ["PASS", "FAILED"]);

export const employeeMcus = pgTable("employee_mcus", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
  mcuDate: date().notNull(),
  mcuEndDate: date(),
  mcuStatus: mcuStatus(),
  remark: text(),
  ...defaultColumn,
});
