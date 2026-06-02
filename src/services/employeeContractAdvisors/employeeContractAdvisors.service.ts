import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EmployeeContractAdvisorResponseDto,
  CreateEmployeeContractAdvisorSchema,
  CreateEmployeeContractAdvisorDto,
  UpdateEmployeeContractAdvisorSchema,
  UpdateEmployeeContractAdvisorDto,
} from "@dtos/employeeContractAdvisor.dto";
import type { EmployeeContractAdvisorRepositoryInterface } from "@repositories/employeeContractAdvisors/employeeContractAdvisors.repository.interface";
import type { EmployeeContractAdvisorServiceInterface } from "./employeeContractAdvisors.service.interface";

@injectable()
export class EmployeeContractAdvisorService
  extends BaseService<EmployeeContractAdvisorResponseDto, CreateEmployeeContractAdvisorDto, UpdateEmployeeContractAdvisorDto, EmployeeContractAdvisorRepositoryInterface>
  implements EmployeeContractAdvisorServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeContractAdvisorRepositoryInterface) repository: EmployeeContractAdvisorRepositoryInterface,
  ) {
    super(repository, CreateEmployeeContractAdvisorSchema, UpdateEmployeeContractAdvisorSchema, "EmployeeContractAdvisor");
  }
}
