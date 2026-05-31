import type { EMployeeAddressResponseDto, CreateEMployeeAddressDto, UpdateEMployeeAddressDto } from "@dtos/employeeAddress.dto";

export interface EmployeeAddressServiceInterface {
  findAll(): Promise<EMployeeAddressResponseDto[]>;
  findById(id: string): Promise<EMployeeAddressResponseDto | null>;
  create(data: unknown): Promise<EMployeeAddressResponseDto>;
  update(id: string, data: unknown): Promise<EMployeeAddressResponseDto>;
  delete(id: string): Promise<void>;
}
