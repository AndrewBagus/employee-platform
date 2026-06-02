import { randomUUIDv7 } from "bun";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { employees } from "./employees";
import { workingZones } from "./workingZones";

export const employeeWorkZones = pgTable("employee_work_zones", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  employeeId: uuid().references(() => employees.id, { onDelete: "restrict" }).notNull(),
  workingZoneId: uuid().references(() => workingZones.id, { onDelete: "restrict" }).notNull(),
  remark: text(),
  ...defaultColumn,
});
