import { randomUUIDv7 } from "bun";
import { DateTime } from "luxon";
import { defaultColumn } from "../utils/default-columns";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const countryTable = pgTable("countries", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  code: varchar({ length: 10 }),
  currency: varchar({ length: 10 }),
  flag: varchar({ length: 100 }),
  ...defaultColumn,
});
