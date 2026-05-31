import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeLeaveAdvisorResponseDto,
  CreateEMployeeLeaveAdvisorSchema,
  CreateEMployeeLeaveAdvisorDto,
  UpdateEMployeeLeaveAdvisorSchema,
  UpdateEMployeeLeaveAdvisorDto,
} from "@dtos/employeeLeaveAdvisor.dto";
import type { EmployeeLeaveAdvisorRepository } from "@repositories/employeeLeaveAdvisors/employeeLeaveAdvisors.repository";

@injectable()
export class EmployeeLeaveAdvisorService extends BaseService<
  EMployeeLeaveAdvisorResponseDto,
  CreateEMployeeLeaveAdvisorDto,
  UpdateEMployeeLeaveAdvisorDto,
  EmployeeLeaveAdvisorRepository
> {
  constructor(
    @inject(TYPES.EmployeeLeaveAdvisorRepositoryInterface) repository: EmployeeLeaveAdvisorRepository,
  ) {
    super(repository, CreateEMployeeLeaveAdvisorSchema, UpdateEMployeeLeaveAdvisorSchema, "EmployeeLeaveAdvisor");
  }
}
