import "reflect-metadata";
import { Container } from "inversify";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "./types";
import { registerMasterBindings } from "./bindings/master.binding";
import { registerEmployeeBindings } from "./bindings/employee.binding";

const container = new Container();

container.bind<NodePgDatabase>(TYPES.Database).toConstantValue(
  drizzle({ connection: process.env.DATABASE_URL!, casing: "snake_case" }),
);

registerMasterBindings(container);
registerEmployeeBindings(container);

export { container };
