import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeProjectResponseDto,
  CreateEMployeeProjectSchema,
  CreateEMployeeProjectDto,
  UpdateEMployeeProjectSchema,
  UpdateEMployeeProjectDto,
} from "@dtos/employeeProject.dto";
import type { EmployeeProjectRepository } from "@repositories/employeeProjects/employeeProjects.repository";

@injectable()
export class EmployeeProjectService extends BaseService<
  EMployeeProjectResponseDto,
  CreateEMployeeProjectDto,
  UpdateEMployeeProjectDto,
  EmployeeProjectRepository
> {
  constructor(
    @inject(TYPES.EmployeeProjectRepositoryInterface) repository: EmployeeProjectRepository,
  ) {
    super(repository, CreateEMployeeProjectSchema, UpdateEMployeeProjectSchema, "EmployeeProject");
  }
}
