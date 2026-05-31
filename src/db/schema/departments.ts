import { randomUUIDv7 } from "bun";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { companies } from "./companies";

export const departments = pgTable("departments", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  companyId: uuid().references(() => companies.id, { onDelete: "restrict" }),
  name: varchar({ length: 100 }),
  ...defaultColumn,
});
