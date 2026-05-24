import { randomUUIDv7 } from "bun";
import { date, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";
import { employees } from "./employees";

export const trainingStatus = pgEnum("training_status", ["PASS", "FAILED", "REGISTERED", "NOTATTEND"]);

export const employeeTrainings = pgTable("employee_trainings", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
  trainingDate: date().notNull(),
  trainingStatus: trainingStatus().default("REGISTERED"),
  remark: text(),
  ...defaultColumn,
});
