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
import type { EmployeeContractRepositoryInterface } from "@repositories/employeeContracts/employeeContracts.repository.interface";
import type { EmployeeContractServiceInterface } from "./employeeContracts.service.interface";

@injectable()
export class EmployeeContractService
  extends BaseService<EMployeeContractResponseDto, CreateEMployeeContractDto, UpdateEMployeeContractDto, EmployeeContractRepositoryInterface>
  implements EmployeeContractServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeContractRepositoryInterface) repository: EmployeeContractRepositoryInterface,
  ) {
    super(repository, CreateEMployeeContractSchema, UpdateEMployeeContractSchema, "EmployeeContract");
  }
}
