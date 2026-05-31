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
import type { EmployeeContractAdvisorRepositoryInterface } from "@repositories/employeeContractAdvisors/employeeContractAdvisors.repository.interface";
import type { EmployeeContractAdvisorServiceInterface } from "./employeeContractAdvisors.service.interface";

@injectable()
export class EmployeeContractAdvisorService
  extends BaseService<EMployeeContractAdvisorResponseDto, CreateEMployeeContractAdvisorDto, UpdateEMployeeContractAdvisorDto, EmployeeContractAdvisorRepositoryInterface>
  implements EmployeeContractAdvisorServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeContractAdvisorRepositoryInterface) repository: EmployeeContractAdvisorRepositoryInterface,
  ) {
    super(repository, CreateEMployeeContractAdvisorSchema, UpdateEMployeeContractAdvisorSchema, "EmployeeContractAdvisor");
  }
}
