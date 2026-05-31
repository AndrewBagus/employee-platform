import { initDatabase } from "@db/index";
import { truncateAll } from "./truncate";
import { seedRootMaster } from "./00-root-master";
import { seedCompanies } from "./01-companies";
import { seedCompanyChildren } from "./02-company-children";
import { seedAllowancesWarnings } from "./03-allowances-warnings";
import { seedPositions } from "./04-positions";
import { seedEmployees } from "./05-employees";
import { seedEmployeeDetails } from "./06-employee-details";

async function main() {
  const db = initDatabase;

  console.log("[seed] Truncating existing data...");
  await truncateAll(db);

  console.log("[seed] Root master data (countries, religion, grades, cost centers, projects)...");
  await seedRootMaster(db);

  console.log("[seed] Companies...");
  await seedCompanies(db);

  console.log("[seed] Company children (departments, working zones, training types, trainings, schedules, warning grades)...");
  await seedCompanyChildren(db);

  console.log("[seed] Allowances and warnings...");
  await seedAllowancesWarnings(db);

  console.log("[seed] Positions...");
  await seedPositions(db);

  console.log("[seed] Employees...");
  await seedEmployees(db);

  console.log("[seed] Employee details (addresses, contracts, advisors, MCUs, projects, trainings, warnings, work zones)...");
  await seedEmployeeDetails(db);

  console.log("[seed] Done.");
  process.exit(0);
}

await main();
