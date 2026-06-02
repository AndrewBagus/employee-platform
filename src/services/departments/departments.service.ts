import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateDepartmentSchema,
  UpdateDepartmentSchema,
  type DepartmentResponseDto,
  type CreateDepartmentDto,
  type UpdateDepartmentDto,
} from "@dtos/department.dto";
import type { DepartmentRepositoryInterface } from "@repositories/departments/departments.repository.interface";
import type { DepartmentServiceInterface } from "./departments.service.interface";

@injectable()
export class DepartmentService
  extends BaseService<DepartmentResponseDto, CreateDepartmentDto, UpdateDepartmentDto, DepartmentRepositoryInterface>
  implements DepartmentServiceInterface
{
  constructor(
    @inject(TYPES.DepartmentRepositoryInterface) repository: DepartmentRepositoryInterface,
  ) {
    super(repository, CreateDepartmentSchema, UpdateDepartmentSchema, "Department");
  }
}
