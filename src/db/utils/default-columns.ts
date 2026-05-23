import { sql } from "drizzle-orm";
import { HasDefault } from "drizzle-orm/column-builder";
import {
  boolean,
  PgBooleanBuilderInitial,
  PgTimestampBuilderInitial,
  PgVarcharBuilderInitial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

type DefaultColumn = {
  stsActive: HasDefault<PgBooleanBuilderInitial<"">>;
  createdAt: HasDefault<PgTimestampBuilderInitial<"">>;
  createdBy: PgVarcharBuilderInitial<"", [string, ...string[]], 50>;
  updatedAt: PgTimestampBuilderInitial<"">;
  updatedBy: PgVarcharBuilderInitial<"", [string, ...string[]], 50>;
  deletedAt: PgTimestampBuilderInitial<"">;
};

export const defaultColumn = {
  stsActive: boolean().default(true),
  createdAt: timestamp({
    mode: "date",
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  createdBy: varchar({ length: 50 }),
  updatedAt: timestamp({
    mode: "date",
    precision: 6,
    withTimezone: true,
  }).$onUpdate(() => sql`now()`),
  updatedBy: varchar({ length: 50 }),
  deletedAt: timestamp({
    mode: "date",
    precision: 6,
    withTimezone: true,
  }),
};
