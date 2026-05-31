import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeContractResponseDto,
  CreateEMployeeContractSchema,
  CreateEMployeeContractDto,
  UpdateEMployeeContractSchema,
  UpdateEMployeeContractDto,
} from "@dtos/employeeContract.dto";
import type { EmployeeContractRepository } from "@repositories/employeeContracts/employeeContracts.repository";

@injectable()
export class EmployeeContractService extends BaseService<
  EMployeeContractResponseDto,
  CreateEMployeeContractDto,
  UpdateEMployeeContractDto,
  EmployeeContractRepository
> {
  constructor(
    @inject(TYPES.EmployeeContractRepositoryInterface) repository: EmployeeContractRepository,
  ) {
    super(repository, CreateEMployeeContractSchema, UpdateEMployeeContractSchema, "EmployeeContract");
  }
}
