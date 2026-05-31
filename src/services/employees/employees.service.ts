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
import type { EmployeeRepositoryInterface } from "@repositories/employees/employees.repository.interface";
import type { EmployeeServiceInterface } from "./employees.service.interface";

@injectable()
export class EmployeeService
  extends BaseService<EMployeeResponseDto, CreateEMployeeDto, UpdateEMployeeDto, EmployeeRepositoryInterface>
  implements EmployeeServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeRepositoryInterface) repository: EmployeeRepositoryInterface,
  ) {
    super(repository, CreateEMployeeSchema, UpdateEMployeeSchema, "Employee");
  }
}
