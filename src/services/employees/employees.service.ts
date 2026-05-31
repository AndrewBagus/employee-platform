import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateEMployeeSchema,
  UpdateEMployeeSchema,
  type EMployeeResponseDto,
  type CreateEMployeeDto,
  type UpdateEMployeeDto,
} from "@dtos/employee.dto";
import type { EmployeeRepository } from "@repositories/employees/employees.repository";

@injectable()
export class EmployeeService extends BaseService<
  EMployeeResponseDto,
  CreateEMployeeDto,
  UpdateEMployeeDto,
  EmployeeRepository
> {
  constructor(
    @inject(TYPES.EmployeeRepositoryInterface) repository: EmployeeRepository,
  ) {
    super(repository, CreateEMployeeSchema, UpdateEMployeeSchema, "Employee");
  }
}
