import "reflect-metadata";
import { Container } from "inversify";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "./types";
import { CompanyRepository } from "../repositories/company/company.repository";
import { CompanyService } from "../services/company/company.service";

const container = new Container();

// Database — concrete instance, no interface
container.bind<NodePgDatabase>(TYPES.Database).toConstantValue(
  drizzle({ connection: process.env.DATABASE_URL!, casing: "snake_case" }),
);

// Repository
container.bind(TYPES.CompanyRepositoryInterface).to(CompanyRepository);

// Service
container.bind(TYPES.CompanyServiceInterface).to(CompanyService);

export { container };
