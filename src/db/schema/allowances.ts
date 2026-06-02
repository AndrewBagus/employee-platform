import { randomUUIDv7 } from "bun";
import { numeric, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { companies } from "./companies";
import { countries } from "./countries";

export const allowances = pgTable("allowances", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  companyId: uuid().references(() => companies.id, { onDelete: "restrict" }).notNull(),
  currencyId: uuid().references(() => countries.id, { onDelete: "restrict" }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  nominal: numeric({ precision: 12, scale: 2 }).notNull(),
  remark: text(),
  ...defaultColumn,
});
