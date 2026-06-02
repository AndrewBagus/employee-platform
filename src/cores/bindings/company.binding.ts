import { Container } from "inversify";
import { TYPES } from "../types";
import { CompanyRepository } from "@repositories/company/company.repository";
import { CompanyService } from "@services/company/company.service";
import { DepartmentRepository } from "@repositories/departments/departments.repository";
import { DepartmentService } from "@services/departments/departments.service";
import { PositionRepository } from "@repositories/positions/positions.repository";
import { PositionService } from "@services/positions/positions.service";

export function registerCompanyBindings(container: Container) {
  container.bind(TYPES.CompanyRepositoryInterface).to(CompanyRepository);
  container.bind(TYPES.CompanyServiceInterface).to(CompanyService);
  container.bind(TYPES.DepartmentRepositoryInterface).to(DepartmentRepository);
  container.bind(TYPES.DepartmentServiceInterface).to(DepartmentService);
  container.bind(TYPES.PositionRepositoryInterface).to(PositionRepository);
  container.bind(TYPES.PositionServiceInterface).to(PositionService);
}
