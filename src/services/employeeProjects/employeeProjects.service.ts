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
import type { EmployeeProjectRepositoryInterface } from "@repositories/employeeProjects/employeeProjects.repository.interface";
import type { EmployeeProjectServiceInterface } from "./employeeProjects.service.interface";

@injectable()
export class EmployeeProjectService
  extends BaseService<EMployeeProjectResponseDto, CreateEMployeeProjectDto, UpdateEMployeeProjectDto, EmployeeProjectRepositoryInterface>
  implements EmployeeProjectServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeProjectRepositoryInterface) repository: EmployeeProjectRepositoryInterface,
  ) {
    super(repository, CreateEMployeeProjectSchema, UpdateEMployeeProjectSchema, "EmployeeProject");
  }
}
