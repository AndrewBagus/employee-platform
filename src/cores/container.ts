import "reflect-metadata";
import { Container } from "inversify";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "./types";
import { registerGroupABindings } from "./bindings/group-a.binding";
import { registerGroupBBindings } from "./bindings/group-b.binding";
import { registerGroupCBindings } from "./bindings/group-c.binding";
import { registerGroupDBindings } from "./bindings/group-d.binding";

const container = new Container();

container.bind<NodePgDatabase>(TYPES.Database).toConstantValue(
  drizzle({ connection: process.env.DATABASE_URL!, casing: "snake_case" }),
);

registerGroupABindings(container);
registerGroupBBindings(container);
registerGroupCBindings(container);
registerGroupDBindings(container);

export { container };
