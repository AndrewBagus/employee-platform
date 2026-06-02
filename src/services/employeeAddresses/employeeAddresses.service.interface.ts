import type { EmployeeAddressResponseDto, CreateEmployeeAddressDto, UpdateEmployeeAddressDto } from "@dtos/employeeAddress.dto";

export interface EmployeeAddressServiceInterface {
  findAll(): Promise<EmployeeAddressResponseDto[]>;
  findById(id: string): Promise<EmployeeAddressResponseDto | null>;
  create(data: unknown): Promise<EmployeeAddressResponseDto>;
  update(id: string, data: unknown): Promise<EmployeeAddressResponseDto>;
  delete(id: string): Promise<void>;
}
