import { randomUUIDv7 } from "bun";
import { boolean, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { countries } from "./countries";

export const companyType = pgEnum("companyType", ["GROUP", "CLIENT", "SUBCON"]);
export const companies = pgTable("companies", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  countryId: uuid().references(() => countries.id, { onDelete: "restrict" }),
  name: varchar({ length: 100 }),
  nameShort: varchar({ length: 10 }),
  type: companyType(),
  haveWorkerEmployee: boolean().default(false),
  isLdap: boolean().default(false),
  ...defaultColumn,
});
