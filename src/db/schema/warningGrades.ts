import { randomUUIDv7 } from "bun";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { companies } from "./companies";

export const warningGrades = pgTable("warning_grades", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  companyId: uuid().references(() => companies.id, { onDelete: "restrict" }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  remark: text(),
  ...defaultColumn,
});
