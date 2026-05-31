import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeContractAdvisorResponseDto,
  CreateEMployeeContractAdvisorSchema,
  CreateEMployeeContractAdvisorDto,
  UpdateEMployeeContractAdvisorSchema,
  UpdateEMployeeContractAdvisorDto,
} from "@dtos/employeeContractAdvisor.dto";
import type { EmployeeContractAdvisorRepository } from "@repositories/employeeContractAdvisors/employeeContractAdvisors.repository";

@injectable()
export class EmployeeContractAdvisorService extends BaseService<
  EMployeeContractAdvisorResponseDto,
  CreateEMployeeContractAdvisorDto,
  UpdateEMployeeContractAdvisorDto,
  EmployeeContractAdvisorRepository
> {
  constructor(
    @inject(TYPES.EmployeeContractAdvisorRepositoryInterface) repository: EmployeeContractAdvisorRepository,
  ) {
    super(repository, CreateEMployeeContractAdvisorSchema, UpdateEMployeeContractAdvisorSchema, "EmployeeContractAdvisor");
  }
}
