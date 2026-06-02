import { Hono } from "hono";
import { container } from "@cores/container";
import { TYPES } from "@cores/types";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { truncateAll } from "../db/seed/truncate";
import { seedRootMaster } from "../db/seed/00-root-master";
import { seedCompanies } from "../db/seed/01-companies";
import { seedCompanyChildren } from "../db/seed/02-company-children";
import { seedAllowancesWarnings } from "../db/seed/03-allowances-warnings";
import { seedPositions } from "../db/seed/04-positions";
import { seedEmployees } from "../db/seed/05-employees";
import { seedEmployeeDetails } from "../db/seed/06-employee-details";

const seedController = new Hono();

function devOnly(): boolean {
  return process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
}

function getDb(): NodePgDatabase {
  return container.get<NodePgDatabase>(TYPES.Database);
}

seedController.post("/truncate", async (c) => {
  if (!devOnly()) {
    return c.json({ success: false, message: "Only available in development mode" }, 403);
  }

  try {
    const db = getDb();
    await truncateAll(db);
    return c.json({ success: true, message: "All data truncated successfully" });
  } catch (error) {
    return c.json({ success: false, message: "Truncation failed: " + (error as Error).message }, 500);
  }
});

seedController.post("/", async (c) => {
  if (!devOnly()) {
    return c.json({ success: false, message: "Only available in development mode" }, 403);
  }

  try {
    const db = getDb();

    await truncateAll(db);
    await seedRootMaster(db);
    await seedCompanies(db);
    await seedCompanyChildren(db);
    await seedAllowancesWarnings(db);
    await seedPositions(db);
    await seedEmployees(db);
    await seedEmployeeDetails(db);

    return c.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    return c.json({ success: false, message: "Seed failed: " + (error as Error).message }, 500);
  }
});

export default seedController;
