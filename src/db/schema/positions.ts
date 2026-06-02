import { randomUUIDv7 } from "bun";
import { boolean, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { departments } from "./departments";

export const positions = pgTable("positions", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  departmentId: uuid().references(() => departments.id, { onDelete: "restrict" }),
  name: varchar({ length: 100 }),
  isHod: boolean().default(false),
  ...defaultColumn,
});
