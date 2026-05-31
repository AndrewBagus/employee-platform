import { injectable, inject } from "inversify";
import { TYPES } from "@cores/types";
import { BaseService } from "@services/base.service";
import {
  EMployeeAddressResponseDto,
  CreateEMployeeAddressSchema,
  CreateEMployeeAddressDto,
  UpdateEMployeeAddressSchema,
  UpdateEMployeeAddressDto,
} from "@dtos/employeeAddress.dto";
import type { EmployeeAddressRepositoryInterface } from "@repositories/employeeAddresses/employeeAddresses.repository.interface";
import type { EmployeeAddressServiceInterface } from "./employeeAddresses.service.interface";

@injectable()
export class EmployeeAddressService
  extends BaseService<EMployeeAddressResponseDto, CreateEMployeeAddressDto, UpdateEMployeeAddressDto, EmployeeAddressRepositoryInterface>
  implements EmployeeAddressServiceInterface
{
  constructor(
    @inject(TYPES.EmployeeAddressRepositoryInterface) repository: EmployeeAddressRepositoryInterface,
  ) {
    super(repository, CreateEMployeeAddressSchema, UpdateEMployeeAddressSchema, "EmployeeAddress");
  }
}
