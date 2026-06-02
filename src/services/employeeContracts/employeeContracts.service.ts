import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EmployeeContractResponseDto,
  CreateEmployeeContractSchema,
  CreateEmployeeContractDto,
  UpdateEmployeeContractSchema,
  UpdateEmployeeContractDto,
} from "@dtos/employeeContract.dto";
import type { EmployeeContractRepositoryInterface } from "@repositories/employeeContracts/employeeContracts.repository.interface";
import type { EmployeeContractServiceInterface } from "./employeeContracts.service.interface";

@injectable()
export class EmployeeContractService
  extends BaseService<EmployeeContractResponseDto, CreateEmployeeContractDto, UpdateEmployeeContractDto, EmployeeContractRepositoryInterface>
  implements EmployeeContractServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeContractRepositoryInterface) repository: EmployeeContractRepositoryInterface,
  ) {
    super(repository, CreateEmployeeContractSchema, UpdateEmployeeContractSchema, "EmployeeContract");
  }
}
