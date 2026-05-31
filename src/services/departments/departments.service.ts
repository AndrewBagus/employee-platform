import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  CreateDEpartmentSchema,
  UpdateDEpartmentSchema,
  type DEpartmentResponseDto,
  type CreateDEpartmentDto,
  type UpdateDEpartmentDto,
} from "@dtos/department.dto";
import type { DepartmentRepositoryInterface } from "@repositories/departments/departments.repository.interface";
import type { DepartmentServiceInterface } from "./departments.service.interface";

@injectable()
export class DepartmentService
  extends BaseService<DEpartmentResponseDto, CreateDEpartmentDto, UpdateDEpartmentDto, DepartmentRepositoryInterface>
  implements DepartmentServiceInterface
{
  constructor(
    @inject(TYPES.DepartmentRepositoryInterface) repository: DepartmentRepositoryInterface,
  ) {
    super(repository, CreateDEpartmentSchema, UpdateDEpartmentSchema, "Department");
  }
}
