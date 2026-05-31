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
import type { DepartmentRepository } from "@repositories/departments/departments.repository";

@injectable()
export class DepartmentService extends BaseService<
  DEpartmentResponseDto,
  CreateDEpartmentDto,
  UpdateDEpartmentDto,
  DepartmentRepository
> {
  constructor(
    @inject(TYPES.DepartmentRepositoryInterface) repository: DepartmentRepository,
  ) {
    super(repository, CreateDEpartmentSchema, UpdateDEpartmentSchema, "Department");
  }
}
