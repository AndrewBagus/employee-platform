import { randomUUIDv7 } from "bun";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";

export const grades = pgTable("grades", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  name: varchar({ length: 15 }).notNull(),
  remark: text(),
  ...defaultColumn,
});
