import "reflect-metadata";
import { Container } from "inversify";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { TYPES } from "./types";
import { CompanyRepository } from "@repositories/company/company.repository";
import { CompanyService } from "@services/company/company.service";
import { CountryRepository } from "@repositories/country/country.repository";
import { CountryService } from "@services/country/country.service";
import { ReligionRepository } from "@repositories/religion/religion.repository";
import { ReligionService } from "@services/religion/religion.service";
import { GradeRepository } from "@repositories/grade/grade.repository";
import { GradeService } from "@services/grade/grade.service";
import { CostCenterRepository } from "@repositories/costCenter/costCenter.repository";
import { CostCenterService } from "@services/costCenter/costCenter.service";
import { ProjectRepository } from "@repositories/project/project.repository";
import { ProjectService } from "@services/project/project.service";

const container = new Container();

// Database — concrete instance, no interface
container.bind<NodePgDatabase>(TYPES.Database).toConstantValue(
  drizzle({ connection: process.env.DATABASE_URL!, casing: "snake_case" }),
);
// Repository
container.bind(TYPES.CompanyRepositoryInterface).to(CompanyRepository);
container.bind(TYPES.CountryRepositoryInterface).to(CountryRepository);
container.bind(TYPES.ReligionRepositoryInterface).to(ReligionRepository);
container.bind(TYPES.GradeRepositoryInterface).to(GradeRepository);
container.bind(TYPES.CostCenterRepositoryInterface).to(CostCenterRepository);
container.bind(TYPES.ProjectRepositoryInterface).to(ProjectRepository);

// Service
container.bind(TYPES.CompanyServiceInterface).to(CompanyService);
container.bind(TYPES.CountryServiceInterface).to(CountryService);
container.bind(TYPES.ReligionServiceInterface).to(ReligionService);
container.bind(TYPES.GradeServiceInterface).to(GradeService);
container.bind(TYPES.CostCenterServiceInterface).to(CostCenterService);
container.bind(TYPES.ProjectServiceInterface).to(ProjectService);

export { container };
