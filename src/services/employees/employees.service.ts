import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
  type EmployeeResponseDto,
  type CreateEmployeeDto,
  type UpdateEmployeeDto,
} from "@dtos/employee.dto";
import type { EmployeeRepositoryInterface } from "@repositories/employees/employees.repository.interface";
import type { EmployeeServiceInterface } from "./employees.service.interface";

@injectable()
export class EmployeeService
  extends BaseService<EmployeeResponseDto, CreateEmployeeDto, UpdateEmployeeDto, EmployeeRepositoryInterface>
  implements EmployeeServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeRepositoryInterface) repository: EmployeeRepositoryInterface,
  ) {
    super(repository, CreateEmployeeSchema, UpdateEmployeeSchema, "Employee");
  }
}
