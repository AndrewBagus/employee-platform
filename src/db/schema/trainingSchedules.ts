import { randomUUIDv7 } from "bun";
import { date, pgTable, text, time, uuid } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { companies } from "./companies";

export const trainingSchedules = pgTable("training_schedules", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  companyId: uuid().references(() => companies.id, { onDelete: "restrict" }).notNull(),
  trainingDate: date(),
  trainingTime: time(),
  remark: text(),
  ...defaultColumn,
});
