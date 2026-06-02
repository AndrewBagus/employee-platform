import { randomUUIDv7 } from "bun";
import { DateTime } from "luxon";
import { defaultColumn } from "@db/utils/default-columns";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  code: varchar({ length: 10 }),
  currency: varchar({ length: 10 }),
  flag: varchar({ length: 100 }),
  ...defaultColumn,
});
