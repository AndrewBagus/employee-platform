import "reflect-metadata";
import { Container } from "inversify";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "./types";
import { registerCountryBindings } from "./bindings/country.binding";
import { registerCompanyBindings } from "./bindings/company.binding";
import { registerReferenceBindings } from "./bindings/reference.binding";
import { registerAllowanceBindings } from "./bindings/allowance.binding";
import { registerTrainingBindings } from "./bindings/training.binding";
import { registerZoneBindings } from "./bindings/zone.binding";
import { registerEmployeeBindings } from "./bindings/employee.binding";

const container = new Container();

container.bind<NodePgDatabase>(TYPES.Database).toConstantValue(
  drizzle({ connection: process.env.DATABASE_URL!, casing: "snake_case" }),
);

registerCountryBindings(container);
registerCompanyBindings(container);
registerReferenceBindings(container);
registerAllowanceBindings(container);
registerTrainingBindings(container);
registerZoneBindings(container);
registerEmployeeBindings(container);

export { container };
