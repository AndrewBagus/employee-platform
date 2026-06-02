import { initDatabase } from "@db/index";
import { truncateAll } from "./truncate";
import { seedRootMaster } from "./00-root-master";
import { seedCompanies } from "./01-companies";
import { log } from "@cores/logger";
import { seedCompanyChildren } from "./02-company-children";
import { seedAllowancesWarnings } from "./03-allowances-warnings";
import { seedPositions } from "./04-positions";
import { seedEmployees } from "./05-employees";
import { seedEmployeeDetails } from "./06-employee-details";

async function main() {
  const db = initDatabase;

  log.info("[seed] Truncating existing data...");
  await truncateAll(db);

  log.info("[seed] Root master data (countries, religion, grades, cost centers, projects)...");
  await seedRootMaster(db);

  log.info("[seed] Companies...");
  await seedCompanies(db);

  log.info("[seed] Company children (departments, working zones, training types, trainings, schedules, warning grades)...");
  await seedCompanyChildren(db);

  log.info("[seed] Allowances and warnings...");
  await seedAllowancesWarnings(db);

  log.info("[seed] Positions...");
  await seedPositions(db);

  log.info("[seed] Employees...");
  await seedEmployees(db);

  log.info("[seed] Employee details (addresses, contracts, advisors, MCUs, projects, trainings, warnings, work zones)...");
  await seedEmployeeDetails(db);

  log.info("[seed] Done.");
  process.exit(0);
}

await main();
