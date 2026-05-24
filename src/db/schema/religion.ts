import { randomUUIDv7 } from "bun";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";

export const religion = pgTable("religion", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  name: varchar({ length: 20 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  remark: text(),
  ...defaultColumn,
});
