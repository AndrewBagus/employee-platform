import { randomUUIDv7 } from "bun";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "../utils/default-columns";

export const costCenters = pgTable("cost_centers", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  sapCode: varchar({ length: 15 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  remark: text(),
  ...defaultColumn,
});
