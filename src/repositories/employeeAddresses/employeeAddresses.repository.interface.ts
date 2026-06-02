import type { EmployeeAddressResponseDto, CreateEmployeeAddressDto, UpdateEmployeeAddressDto } from "@dtos/employeeAddress.dto";

export interface EmployeeAddressRepositoryInterface {
  findAll(): Promise<EmployeeAddressResponseDto[]>;
  findById(id: string): Promise<EmployeeAddressResponseDto | null>;
  create(data: CreateEmployeeAddressDto): Promise<EmployeeAddressResponseDto>;
  update(id: string, data: UpdateEmployeeAddressDto): Promise<EmployeeAddressResponseDto | null>;
  softDelete(id: string): Promise<void>;
}
