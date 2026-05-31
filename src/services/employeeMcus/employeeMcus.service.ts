import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeMcuResponseDto,
  CreateEMployeeMcuSchema,
  CreateEMployeeMcuDto,
  UpdateEMployeeMcuSchema,
  UpdateEMployeeMcuDto,
} from "@dtos/employeeMcu.dto";
import type { EmployeeMcuRepository } from "@repositories/employeeMcus/employeeMcus.repository";

@injectable()
export class EmployeeMcuService extends BaseService<
  EMployeeMcuResponseDto,
  CreateEMployeeMcuDto,
  UpdateEMployeeMcuDto,
  EmployeeMcuRepository
> {
  constructor(
    @inject(TYPES.EmployeeMcuRepositoryInterface) repository: EmployeeMcuRepository,
  ) {
    super(repository, CreateEMployeeMcuSchema, UpdateEMployeeMcuSchema, "EmployeeMcu");
  }
}
