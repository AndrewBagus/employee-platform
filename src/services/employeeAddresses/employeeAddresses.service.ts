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
import type { EmployeeAddressRepository } from "@repositories/employeeAddresses/employeeAddresses.repository";

@injectable()
export class EmployeeAddressService extends BaseService<
  EMployeeAddressResponseDto,
  CreateEMployeeAddressDto,
  UpdateEMployeeAddressDto,
  EmployeeAddressRepository
> {
  constructor(
    @inject(TYPES.EmployeeAddressRepositoryInterface) repository: EmployeeAddressRepository,
  ) {
    super(repository, CreateEMployeeAddressSchema, UpdateEMployeeAddressSchema, "EmployeeAddress");
  }
}
