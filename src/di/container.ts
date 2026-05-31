import "reflect-metadata";
import { Container } from "inversify";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "./identifiers";
import { CompanyRepository } from "../modules/companies/company.repository";
import { CompanyService } from "../modules/companies/company.service";
import { CompanyController } from "../modules/companies/company.controller";

const container = new Container();

// Database — concrete instance, no interface
container.bind<NodePgDatabase>(TYPES.Database).toConstantValue(
  drizzle({ connection: process.env.DATABASE_URL!, casing: "snake_case" }),
);

// Repository
container.bind(TYPES.ICompanyRepository).to(CompanyRepository);

// Service
container.bind(TYPES.ICompanyService).to(CompanyService);

// Controller (no interface — concrete class injection)
container.bind(CompanyController).toSelf();

export { container };
