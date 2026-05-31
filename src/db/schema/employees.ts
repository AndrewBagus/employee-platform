import { randomUUIDv7 } from "bun";
import {
  date,
  pgEnum,
  pgTable,
  text,
  type AnyPgColumn,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { defaultColumn } from "@db/utils/default-columns";
import { companies } from "./companies";
import { departments } from "./departments";
import { positions } from "./positions";

export const gender = pgEnum("gender", ["M", "W"]);
export const maritalStatus = pgEnum("marital_status", [
  "SINGLE",
  "MARRIED",
  "DIVORCED",
]);
export const employeeType = pgEnum("employee_type", ["STAFF", "WORKER"]);
export const employeeStatus = pgEnum("employee_status", [
  "PERMANENT",
  "CONTRACT",
]);

export const employees = pgTable("employees", {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => randomUUIDv7()),
  companyId: uuid().references(() => companies.id, { onDelete: "restrict" }).notNull(),
  departmentId: uuid().references(() => departments.id, {
    onDelete: "restrict",
  }).notNull(),
  positionId: uuid().references(() => positions.id, { onDelete: "restrict" }).notNull(),
  supervisorId: uuid().references((): AnyPgColumn => employees.id),
  fingerId: varchar({ length: 30 }).notNull(),
  firstName: varchar({ length: 255 }).notNull(),
  middleName: varchar({ length: 255 }),
  lastName: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }),
  mobile: varchar({ length: 255 }),
  birthDate: date(),
  birthPlace: varchar({ length: 255 }),
  gender: gender().default("M"),
  maritalStatus: maritalStatus().default("SINGLE"),
  employeeType: employeeType().default("STAFF"),
  employeeStatus: employeeStatus().default("CONTRACT"),
  remark: text(),
  ...defaultColumn,
});
