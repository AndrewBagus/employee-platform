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
import type { EmployeeLeaveAdvisorRepositoryInterface } from "@repositories/employeeLeaveAdvisors/employeeLeaveAdvisors.repository.interface";
import type { EmployeeLeaveAdvisorServiceInterface } from "./employeeLeaveAdvisors.service.interface";

@injectable()
export class EmployeeLeaveAdvisorService
  extends BaseService<EMployeeLeaveAdvisorResponseDto, CreateEMployeeLeaveAdvisorDto, UpdateEMployeeLeaveAdvisorDto, EmployeeLeaveAdvisorRepositoryInterface>
  implements EmployeeLeaveAdvisorServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeLeaveAdvisorRepositoryInterface) repository: EmployeeLeaveAdvisorRepositoryInterface,
  ) {
    super(repository, CreateEMployeeLeaveAdvisorSchema, UpdateEMployeeLeaveAdvisorSchema, "EmployeeLeaveAdvisor");
  }
}
